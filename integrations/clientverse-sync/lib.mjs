// Shared helpers for the Clientverse syncs (zero dependencies, Node 18+).
import fs from 'node:fs/promises';

export const env = (k, d) => process.env[k] ?? d;
export const need = (k) => {
  const v = process.env[k];
  if (!v) { console.error(`Missing env var ${k}`); process.exit(2); }
  return v;
};

export async function http(url, { token, method = 'GET', body } = {}) {
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

// Progress file: ids already imported, plus per-item progress for imports that stopped half way.
export function stateFile(file) {
  return {
    async load() {
      try { return JSON.parse(await fs.readFile(file, 'utf8')); }
      catch (e) { if (e.code === 'ENOENT') return { done: [], partial: {} }; throw e; }
    },
    async save(state) {
      const tmp = `${file}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(state, null, 2), { mode: 0o600 });
      await fs.rename(tmp, file);
    },
  };
}

export function clientverse(baseUrl, token) {
  const base = baseUrl.replace(/\/+$/, '');
  return (p, method, body) => http(`${base}/api/v1${p}`, { token, method, body });
}

export function splitName(full) {
  const [first, ...rest] = full.trim().split(/\s+/);
  return { first_name: first || full, last_name: rest.join(' ') || null };
}

// Creates (or finds) the lead in Clientverse and attaches the note.
//   lead = { customer: {name, company?, email, phone?, type, metadata}, contact: {name, email, phone?}, note }
// `progress` remembers each completed write and `save` persists it straight away, so a crash or
// restart resumes from the last completed step instead of creating a second customer.
export async function recordLead(cv, lead, progress, save) {
  const email = (lead.contact.email || '').trim();

  // Known email? Attach a note to the existing customer instead of a duplicate lead.
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
    const c = await cv('/customers', 'POST', { status: 'lead', ...lead.customer, email: email || null });
    progress.customer_id = c.data.id;
    await save();
  }
  if (!progress.existing && !progress.contact_id) {
    const c = await cv('/contacts', 'POST', {
      customer_id: progress.customer_id, ...splitName(lead.contact.name || email),
      email: email || null, phone: lead.contact.phone || null, is_primary: true,
    });
    progress.contact_id = c.data.id;
    await save();
  }
  if (!progress.note_id) {
    const n = await cv('/customer-notes', 'POST', { customer_id: progress.customer_id, content: lead.note });
    progress.note_id = n.data.id;
    await save();
  }
}

// Imports each item with crash-safe progress. Returns the number of failures.
export async function importAll(items, idOf, state, store, doImport, label) {
  const done = new Set(state.done);
  let failed = 0;
  for (const item of items) {
    const id = idOf(item);
    const progress = state.partial[id] || {};
    state.partial[id] = progress;
    const save = () => store.save({ ...state, done: [...done] });
    try {
      await doImport(item, progress, save);
      done.add(id);
      delete state.partial[id];
      console.log(`imported ${label} ${id} -> customer ${progress.customer_id}${progress.existing ? ' (existing)' : ''}`);
    } catch (e) {
      failed++;
      state.partial[id] = progress; // resume from here next run, no duplicates
      console.error(`failed ${label} ${id}: ${e.message}`);
    }
    state.done = [...done];
    await store.save(state);
  }
  return failed;
}
