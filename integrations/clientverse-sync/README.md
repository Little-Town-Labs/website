# Website -> Clientverse sync

Two small scripts that turn website activity into leads in Clientverse. Both run from cron on the
same host as Clientverse (aegis-prod), pull from their source, and write to Clientverse's API, so
Clientverse never needs to be reachable from the internet. No dependencies; needs Node 18+.

| Script | Source | Creates |
|---|---|---|
| `sync.mjs` | Netlify Forms (the website's `contact` form) | A lead named after the organization, with the message as a note |
| `bookings.mjs` | Easy!Appointments (the booking page at book.littletownlabs.com) | A lead named after the person, with the booking details as a note |

Both share `lib.mjs`, so they behave the same way:

- **New email:** creates a Customer (`status=lead`), a primary Contact, and a Note.
- **Email already a Contact:** adds a Note to that existing customer. No duplicate lead.
- Imported IDs are stored in a state file. A run that fails part-way resumes that item next time
  without creating duplicates (progress is saved after every write).
- A non-zero exit code means at least one item failed; failures are logged and retried next run.

## Bookings: what a lead looks like

```
Customer  Cara Diaz (individual, lead, phone, source=booking)
Contact   Cara Diaz <cara@example.org>, primary
Note      Booked through the website booking page (Easy!Appointments appointment 12, booked 2026-11-10 10:49:00)
          Service: Book a consult (30 min)
          When: 2026-11-16 15:00:00 to 2026-11-16 15:30:00 (America/Chicago)
          With: Gary Brown
          Customer's time zone: America/New_York
          Customer notes: ...
```

Scope: **new bookings only.** A later reschedule or cancellation in Easy!Appointments is not mirrored.

## Set up on aegis-prod

1. **Clientverse API token:** Clientverse > Account. Use a dedicated user if you can.
2. **Easy!Appointments API token:** set the `api_token` setting (Settings > API in the admin UI, or
   `PUT /api/v1/settings/api_token`). The sync uses it as a bearer token, so it does not need an admin login.
3. **Netlify** (form sync only): a personal access token (User settings > Applications) and the Site ID.
4. **Copy this folder** to the server (for example `~/clientverse-sync`), then:
   ```bash
   cp .env.example .env && chmod 600 .env   # fill in the values, quoting each one
   ```
5. **Dry run by hand:**
   ```bash
   set -a; . ./.env; set +a; node sync.mjs; node bookings.mjs
   ```
   Make a test submission or booking first. Expect `1 new ...` and a lead in Clientverse, then `0 new ...`
   on a second run. Delete the test data afterwards.
6. **Schedule both** (every 5 minutes, offset so they do not start together) with `crontab -e`:
   ```
   */5 * * * *    cd ~/clientverse-sync && set -a && . ./.env && set +a && node sync.mjs     >> sync.log 2>&1
   2-59/5 * * * * cd ~/clientverse-sync && set -a && . ./.env && set +a && node bookings.mjs >> bookings.log 2>&1
   ```

## Tests

```bash
node --test integrations/clientverse-sync/test.mjs
```

The tests start mock Netlify, Easy!Appointments and Clientverse servers and cover both scripts:
imports, repeat customers, idempotent reruns, resume after a failure, paging, and a rejected token.
The mocks return Easy!Appointments' related records (customer, provider, service) with raw
database field names (`first_name`, `phone_number`), because that is what the real API does.

## Notes

- First run of `sync.mjs` imports **every** submission Netlify still holds (including test messages),
  and `bookings.mjs` imports every appointment that exists. Clean up test data first.
- Quote every value in `.env`: tokens can contain `|`, which breaks an unquoted file when sourced.
- The Netlify token can read all of the site's form data, and the Easy!Appointments token has full
  API access. Keep `.env` at mode 600.
- Submissions Netlify marks as spam are not returned by its API, so they are not imported.
