// Run with: node --test integrations/clientverse-sync/test.mjs
// Starts mock Netlify, Easy!Appointments and Clientverse servers and runs both syncs against them.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = mkdtempSync(path.join(tmpdir(), 'cv-sync-'));

const serve = (handler) => new Promise((resolve) => {
  const s = http.createServer((req, res) => {
    let b = ''; req.on('data', (c) => (b += c));
    req.on('end', () => {
      const json = (o, code = 200) => { res.statusCode = code; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); };
      handler(req, b ? JSON.parse(b) : {}, json);
    });
  }).listen(0, '127.0.0.1', () => resolve(s));
});
const url = (s) => `http://127.0.0.1:${s.address().port}`;

// --- Clientverse mock -------------------------------------------------------
const db = { customers: [], contacts: [], notes: [], failContacts: false, seq: 0 };
let clientverse, netlify, ea;
let submissions = [], appointments = [];

before(async () => {
  clientverse = await serve((req, body, json) => {
    if (req.headers.authorization !== 'Bearer cvtoken') return json({}, 401);
    const p = req.url.replace('/api/v1', '');
    if (p === '/contacts/search') return json({ data: db.contacts.filter((c) => c.email === body.filters[0].value).slice(0, 1) });
    if (p === '/customers') { const c = { id: ++db.seq, ...body }; db.customers.push(c); return json({ data: c }); }
    if (p === '/contacts') {
      if (db.failContacts) return json({}, 500);
      const c = { id: ++db.seq, ...body }; db.contacts.push(c); return json({ data: c });
    }
    if (p === '/customer-notes') { const n = { id: ++db.seq, ...body }; db.notes.push(n); return json({ data: n }); }
    json({}, 404);
  });
  netlify = await serve((req, body, json) => {
    if (req.headers.authorization !== 'Bearer nftoken') return json({}, 401);
    if (req.url.includes('/forms?') || req.url.endsWith('/forms')) return json([{ id: 'f1', name: 'contact' }]);
    const page = Number(new URL(req.url, 'http://x').searchParams.get('page'));
    json(page === 1 ? submissions : []);
  });
  ea = await serve((req, body, json) => {
    if (req.headers.authorization !== 'Bearer eatoken') return json({}, 401);
    const q = new URL(req.url, 'http://x').searchParams;
    const page = Number(q.get('page')), length = Number(q.get('length'));
    json(appointments.slice((page - 1) * length, page * length));
  });
});
after(() => { for (const s of [clientverse, netlify, ea]) s.close(); rmSync(tmp, { recursive: true, force: true }); });

const sync = (script, extra) => run('node', [path.join(here, script)], {
  env: { PATH: process.env.PATH, CLIENTVERSE_URL: url(clientverse), CLIENTVERSE_TOKEN: 'cvtoken', ...extra },
}).then((r) => ({ ok: true, out: r.stdout + r.stderr }), (e) => ({ ok: false, out: (e.stdout || '') + (e.stderr || '') }));
const reset = () => { db.customers = []; db.contacts = []; db.notes = []; db.failContacts = false; };

// --- Form sync: behaviour must be unchanged by the refactor ----------------------------------------
test('form sync imports leads, notes repeat emails, and is idempotent', async () => {
  reset();
  const state = path.join(tmp, 'forms.json');
  const env = { NETLIFY_API: url(netlify), NETLIFY_TOKEN: 'nftoken', NETLIFY_SITE_ID: 's', STATE_FILE: state };
  submissions = [
    { id: 's3', created_at: '2026-11-03', data: { name: 'Ann Lee', email: 'ann@x.org', org: 'X Org', industry: 'Legal', message: 'again' } },
    { id: 's2', created_at: '2026-11-02', data: { name: 'Bob Ray', email: 'bob@y.com', org: 'Y Inc', industry: 'Healthcare', message: 'hi' } },
    { id: 's1', created_at: '2026-11-01', data: { name: 'Ann Lee', email: 'ann@x.org', org: 'X Org', industry: 'Legal', message: 'first' } },
  ];
  const r1 = await sync('sync.mjs', env);
  assert.ok(r1.ok, r1.out);
  assert.equal(db.customers.length, 2, 'one customer per distinct email');
  assert.equal(db.notes.length, 3, 'every submission leaves a note');
  assert.deepEqual(db.customers.map((c) => [c.name, c.type, c.status]), [['X Org', 'company', 'lead'], ['Y Inc', 'company', 'lead']]);
  assert.ok(db.notes.some((n) => n.content.includes('Industry: Healthcare')));
  const r2 = await sync('sync.mjs', env);
  assert.ok(r2.ok && r2.out.includes('0 new submission(s)'), r2.out);
  assert.equal(db.notes.length, 3, 'rerun creates nothing');
});

// --- Bookings sync -------------------------------------------------------------------------------
const booking = (id, email, first, last) => ({
  id, book: `2026-11-0${(id % 9) + 1} 10:00:00`, start: '2026-11-16 15:00:00', end: '2026-11-16 15:30:00',
  notes: id === 1 ? 'Talk about de-identification' : null, customerId: id, providerId: 4, serviceId: 2,
  // Related records use raw database field names, exactly as the real EA API returns them.
  customer: { first_name: first, last_name: last, email, phone_number: '+15555550100', mobile_number: null, timezone: 'America/New_York' },
  service: { name: 'Book a consult', duration: 30 },
  provider: { first_name: 'Gary', last_name: 'Brown', timezone: 'America/Chicago' },
});

test('bookings sync creates leads with the booking details and notes repeat customers', async () => {
  reset();
  const env = { EA_API_URL: `${url(ea)}/api/v1`, EA_API_TOKEN: 'eatoken', STATE_FILE: path.join(tmp, 'bookings.json') };
  appointments = [booking(1, 'cara@z.org', 'Cara', 'Diaz'), booking(2, 'dan@w.org', 'Dan', 'Eng'), booking(3, 'cara@z.org', 'Cara', 'Diaz')];
  const r1 = await sync('bookings.mjs', env);
  assert.ok(r1.ok, r1.out);
  assert.equal(db.customers.length, 2, 'the repeat booker is not duplicated');
  assert.equal(db.contacts.length, 2);
  assert.equal(db.notes.length, 3);
  const cara = db.customers.find((c) => c.name === 'Cara Diaz');
  assert.deepEqual([cara.type, cara.status, cara.phone, cara.metadata.source], ['individual', 'lead', '+15555550100', 'booking']);
  const first = db.notes.find((n) => n.content.includes('appointment 1'));
  for (const text of ['Book a consult (30 min)', '2026-11-16 15:00:00 to 2026-11-16 15:30:00 (America/Chicago)', 'With: Gary Brown', "Customer's time zone: America/New_York", 'Customer notes: Talk about de-identification'])
    assert.ok(first.content.includes(text), `note mentions "${text}"`);
  const r2 = await sync('bookings.mjs', env);
  assert.ok(r2.ok && r2.out.includes('0 new booking(s)'), r2.out);
  assert.equal(db.notes.length, 3, 'rerun creates nothing');
  appointments.push(booking(4, 'eve@v.org', 'Eve', 'Fox'));
  const r3 = await sync('bookings.mjs', env);
  assert.ok(r3.ok && r3.out.includes('1 new booking(s)'), r3.out);
  assert.equal(db.customers.length, 3, 'only the new booking is imported');
});

test('bookings sync resumes after a failure without creating duplicates', async () => {
  reset();
  const env = { EA_API_URL: `${url(ea)}/api/v1`, EA_API_TOKEN: 'eatoken', STATE_FILE: path.join(tmp, 'resume.json') };
  appointments = [booking(1, 'gus@u.org', 'Gus', 'Hall')];
  db.failContacts = true;
  const r1 = await sync('bookings.mjs', env);
  assert.equal(r1.ok, false, 'a failing import exits non-zero');
  assert.equal(db.customers.length, 1);
  db.failContacts = false;
  const r2 = await sync('bookings.mjs', env);
  assert.ok(r2.ok, r2.out);
  assert.equal(db.customers.length, 1, 'the retry reuses the customer it already created');
  assert.equal(db.contacts.length, 1);
  assert.equal(db.notes.length, 1);
});

test('bookings sync reads every page of appointments', async () => {
  reset();
  const env = { EA_API_URL: `${url(ea)}/api/v1`, EA_API_TOKEN: 'eatoken', STATE_FILE: path.join(tmp, 'pages.json') };
  appointments = Array.from({ length: 230 }, (_, i) => booking(i + 1, `p${i}@t.org`, 'P', `N${i}`));
  const r = await sync('bookings.mjs', env);
  assert.ok(r.ok, r.out);
  assert.equal(db.customers.length, 230);
});

test('a wrong EA token fails loudly and imports nothing', async () => {
  reset();
  appointments = [booking(1, 'x@x.org', 'X', 'Y')];
  const r = await sync('bookings.mjs', { EA_API_URL: `${url(ea)}/api/v1`, EA_API_TOKEN: 'wrong', STATE_FILE: path.join(tmp, 'auth.json') });
  assert.equal(r.ok, false);
  assert.equal(db.customers.length, 0);
});
