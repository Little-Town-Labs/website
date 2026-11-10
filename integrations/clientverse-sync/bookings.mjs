#!/usr/bin/env node
// Pulls new Easy!Appointments bookings and creates them in Clientverse as leads.
// A person who is already in Clientverse (same email) gets a note on their existing record instead.
// Zero dependencies (Node 18+). Run from cron on the host that runs both apps.
//
// Required env: EA_API_TOKEN, CLIENTVERSE_URL, CLIENTVERSE_TOKEN
// Optional env: EA_API_URL (default http://127.0.0.1:8090/index.php/api/v1), STATE_FILE (default ./state-bookings.json)
//
// Scope: new bookings only. Later reschedules or cancellations are not mirrored.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clientverse, env, http, importAll, need, recordLead, stateFile } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const EA = env('EA_API_URL', 'http://127.0.0.1:8090/index.php/api/v1').replace(/\/+$/, '');
const EA_TOKEN = need('EA_API_TOKEN');
const cv = clientverse(need('CLIENTVERSE_URL'), need('CLIENTVERSE_TOKEN'));
const store = stateFile(env('STATE_FILE', path.join(here, 'state-bookings.json')));

const PAGE = 100;

async function fetchNewBookings(doneSet) {
  const fresh = [];
  for (let page = 1; page <= 200; page++) {
    const batch = await http(`${EA}/appointments?page=${page}&length=${PAGE}&with=customer,service,provider`, { token: EA_TOKEN });
    for (const a of batch) if (!doneSet.has(a.id)) fresh.push(a);
    if (batch.length < PAGE) break;
  }
  return fresh.sort((a, b) => a.id - b.id); // oldest booking first
}

// Related records (customer, provider, service) come back from EA with raw database field names.
const pick = (o, ...keys) => keys.map((k) => o?.[k]).find((v) => v != null && v !== '');
const fullName = (p) => [pick(p, 'first_name', 'firstName'), pick(p, 'last_name', 'lastName')].filter(Boolean).join(' ');
const phoneOf = (p) => pick(p, 'phone_number', 'mobile_number', 'phone', 'mobile') ?? null;

function toLead(a) {
  const c = a.customer || {};
  const name = fullName(c) || c.email || `Booking ${a.id}`;
  return {
    customer: {
      name, type: 'individual', phone: phoneOf(c),
      metadata: { source: 'booking', ea_appointment_id: a.id },
    },
    contact: { name, email: c.email, phone: phoneOf(c) },
    note: [
      `Booked through the website booking page (Easy!Appointments appointment ${a.id}, booked ${a.book})`,
      `Service: ${a.service?.name ?? a.serviceId}${a.service?.duration ? ` (${a.service.duration} min)` : ''}`,
      `When: ${a.start} to ${a.end}${a.provider?.timezone ? ` (${a.provider.timezone})` : ''}`,
      `With: ${fullName(a.provider) || a.providerId}`,
      c.timezone ? `Customer's time zone: ${c.timezone}` : null,
      a.notes ? `Customer notes: ${a.notes}` : null,
    ].filter(Boolean).join('\n'),
  };
}

async function main() {
  const state = await store.load();
  const fresh = await fetchNewBookings(new Set(state.done));
  console.log(`${fresh.length} new booking(s)`);

  const failed = await importAll(fresh, (a) => a.id, state, store,
    (a, progress, save) => recordLead(cv, toLead(a), progress, save), 'booking');
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
