#!/usr/bin/env node
// Pulls new Netlify Forms submissions and creates them in Clientverse as leads.
// Zero dependencies (Node 18+). Run from cron on the host that runs Clientverse.
//
// Required env: NETLIFY_TOKEN, NETLIFY_SITE_ID, CLIENTVERSE_URL, CLIENTVERSE_TOKEN
// Optional env: NETLIFY_FORM_NAME (default "contact"), STATE_FILE (default ./state.json)

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clientverse, env, fetchAll, http, importAll, need, recordLead, stateFile } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const NETLIFY_API = env('NETLIFY_API', 'https://api.netlify.com/api/v1');
const NETLIFY_TOKEN = need('NETLIFY_TOKEN');
const SITE_ID = need('NETLIFY_SITE_ID');
const FORM_NAME = env('NETLIFY_FORM_NAME', 'contact');
const cv = clientverse(need('CLIENTVERSE_URL'), need('CLIENTVERSE_TOKEN'));
const store = stateFile(env('STATE_FILE', path.join(here, 'state.json')));

const netlify = (p) => http(`${NETLIFY_API}${p}`, { token: NETLIFY_TOKEN });

async function fetchNewSubmissions(formId, doneSet) {
  // Scan every page, no early exit on a fully imported one: a failed submission can sit behind 100+ newer
  // successes and must still be retried.
  const all = await fetchAll((page) => netlify(`/forms/${formId}/submissions?per_page=100&page=${page}`));
  return all.filter((s) => !doneSet.has(s.id)).reverse(); // oldest first
}

function toLead(s) {
  const d = s.data || {};
  const email = (d.email || '').trim();
  const org = (d.org || '').trim() || d.name || email;
  return {
    customer: {
      name: org, company: org, type: 'company',
      metadata: { source: 'website', industry: d.industry || null, netlify_submission_id: s.id },
    },
    contact: { name: d.name || email, email },
    note: [
      `Website contact form (${s.created_at}, Netlify submission ${s.id})`,
      d.industry ? `Industry: ${d.industry}` : null,
      '',
      d.message || '',
    ].filter((l) => l !== null).join('\n'),
  };
}

async function main() {
  const state = await store.load();
  const forms = await netlify(`/sites/${SITE_ID}/forms`);
  const form = forms.find((f) => f.name === FORM_NAME);
  if (!form) { console.log(`No Netlify form named "${FORM_NAME}" yet (nothing submitted).`); return; }

  const fresh = await fetchNewSubmissions(form.id, new Set(state.done));
  console.log(`${fresh.length} new submission(s)`);

  const failed = await importAll(fresh, (s) => s.id, state, store,
    (s, progress, save) => recordLead(cv, toLead(s), progress, save), 'submission');
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
