#!/usr/bin/env node
// Pulls new Netlify Forms submissions and creates them in Clientverse as leads.
// Zero dependencies (Node 18+). Run from cron on the host that runs Clientverse.
//
// Required env: NETLIFY_TOKEN, NETLIFY_SITE_ID, CLIENTVERSE_URL, CLIENTVERSE_TOKEN
// Optional env: NETLIFY_FORM_NAME (default "contact"), STATE_FILE (default ./state.json)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const env = (k, d) => process.env[k] ?? d;
const need = (k) => {
  const v = process.env[k];
  if (!v) { console.error(`Missing env var ${k}`); process.exit(2); }
  return v;
};

const NETLIFY_API = env('NETLIFY_API', 'https://api.netlify.com/api/v1');
const NETLIFY_TOKEN = need('NETLIFY_TOKEN');
const SITE_ID = need('NETLIFY_SITE_ID');
const FORM_NAME = env('NETLIFY_FORM_NAME', 'contact');
const CV = need('CLIENTVERSE_URL').replace(/\/+$/, '');
const CV_TOKEN = need('CLIENTVERSE_TOKEN');
const STATE_FILE = env('STATE_FILE', path.join(here, 'state.json'));

async function http(url, { token, method = 'GET', body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${url} -> ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res.json();
}
const netlify = (p) => http(`${NETLIFY_API}${p}`, { token: NETLIFY_TOKEN });
const cv = (p, method, body) => http(`${CV}/api/v1${p}`, { token: CV_TOKEN, method, body });

async function loadState() {
  try { return JSON.parse(await fs.readFile(STATE_FILE, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return { done: [], partial: {} }; throw e; }
}
async function saveState(state) {
  const tmp = `${STATE_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(state, null, 2), { mode: 0o600 });
  await fs.rename(tmp, STATE_FILE);
}

async function fetchNewSubmissions(formId, doneSet) {
  const fresh = [];
  for (let page = 1; page <= 200; page++) {
    const batch = await netlify(`/forms/${formId}/submissions?per_page=100&page=${page}`);
    if (batch.length === 0) break;
    for (const s of batch) if (!doneSet.has(s.id)) fresh.push(s);
    // No early exit on a fully imported page: a failed submission can sit behind 100+ newer
    // successes and must still be retried. Scan to the last page.
  }
  return fresh.reverse(); // oldest first
}

function splitName(full) {
  const [first, ...rest] = full.trim().split(/\s+/);
  return { first_name: first || full, last_name: rest.join(' ') || null };
}

// `save` persists `progress` right after each CRM write, so a crash or restart resumes
// from the last completed step instead of creating a second customer.
async function importSubmission(s, progress, save) {
  const d = s.data || {};
  const email = (d.email || '').trim();
  const org = (d.org || '').trim() || d.name || email;
  const note = [
    `Website contact form (${s.created_at}, Netlify submission ${s.id})`,
    d.industry ? `Industry: ${d.industry}` : null,
    '',
    d.message || '',
  ].filter((l) => l !== null).join('\n');

  // Repeat submitter? Attach a note to the existing customer instead of a duplicate lead.
  if (!progress.customer_id && email) {
    const found = await cv('/contacts/search', 'POST', {
      filters: [{ field: 'email', operator: '=', value: email }],
      limit: 1,
    });
    if (found.data?.[0]) {
      progress.customer_id = found.data[0].customer_id;
      progress.existing = true;
      await save();
    }
  }

  if (!progress.customer_id) {
    const c = await cv('/customers', 'POST', {
      name: org, company: org, email: email || null, type: 'company', status: 'lead',
      metadata: { source: 'website', industry: d.industry || null, netlify_submission_id: s.id },
    });
    progress.customer_id = c.data.id;
    await save();
  }
  if (!progress.existing && !progress.contact_id) {
    const c = await cv('/contacts', 'POST', {
      customer_id: progress.customer_id, ...splitName(d.name || email),
      email: email || null, is_primary: true,
    });
    progress.contact_id = c.data.id;
    await save();
  }
  if (!progress.note_id) {
    const n = await cv('/customer-notes', 'POST', { customer_id: progress.customer_id, content: note });
    progress.note_id = n.data.id;
    await save();
  }
}

async function main() {
  const state = await loadState();
  const done = new Set(state.done);

  const forms = await netlify(`/sites/${SITE_ID}/forms`);
  const form = forms.find((f) => f.name === FORM_NAME);
  if (!form) { console.log(`No Netlify form named "${FORM_NAME}" yet (nothing submitted).`); return; }

  const fresh = await fetchNewSubmissions(form.id, done);
  console.log(`${fresh.length} new submission(s)`);

  let failed = 0;
  for (const s of fresh) {
    const progress = state.partial[s.id] || {};
    state.partial[s.id] = progress;
    const save = () => saveState({ ...state, done: [...done] });
    try {
      await importSubmission(s, progress, save);
      done.add(s.id);
      delete state.partial[s.id];
      console.log(`imported ${s.id} -> customer ${progress.customer_id}${progress.existing ? ' (existing)' : ''}`);
    } catch (e) {
      failed++;
      state.partial[s.id] = progress; // resume from here next run, no duplicates
      console.error(`failed ${s.id}: ${e.message}`);
    }
    state.done = [...done];
    await saveState(state);
  }
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
