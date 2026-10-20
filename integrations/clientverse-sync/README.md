# Netlify Forms -> Clientverse sync

Pulls new submissions from the website's Netlify `contact` form and creates them in Clientverse
as leads. It runs on the same host as Clientverse (aegis-prod), so Clientverse never needs to be
reachable from the internet. Netlify keeps its own copy of every submission.

For each new submission:

- **New email:** creates a Customer (`status=lead`, name/company = organization), a primary Contact,
  and a Note holding the message and industry.
- **Email already a Contact:** adds a Note to that existing customer. No duplicate lead.
- Imported submission IDs are stored in `state.json`. If a run fails partway, the next run resumes
  that submission without creating duplicates.

No dependencies; needs Node 18+.

## Deploy on aegis-prod

Clientverse is not deployed there yet, so step 1 comes first.

1. **Deploy Clientverse** on aegis-prod (see its README: `docker compose up -d`, `composer install`,
   `php artisan migrate`). Keep nginx bound to localhost or the tailnet only. Change the default
   admin password immediately.
2. **Create an API token** in Clientverse (Account page). Use a dedicated user if you can.
3. **Create a Netlify personal access token** (User settings > Applications) and note the
   **Site ID** (Site configuration > Site details).
4. **Copy this folder** to aegis-prod, e.g. `/opt/clientverse-sync`, then:
   ```bash
   cp .env.example .env && chmod 600 .env   # fill in the four values
   ```
5. **Dry run by hand:**
   ```bash
   set -a; . ./.env; set +a; node sync.mjs
   ```
   Submit a test message on the live form first. Expect `1 new submission(s)` and a new lead in
   Clientverse. Run it again and expect `0 new submission(s)`.
6. **Schedule it** (every 5 minutes) with `crontab -e`:
   ```
   */5 * * * * cd /opt/clientverse-sync && set -a && . ./.env && set +a && node sync.mjs >> sync.log 2>&1
   ```

## Notes

- First run imports **every** submission Netlify still holds (including any test messages).
  Delete unwanted leads in Clientverse afterward, or delete the test submissions in Netlify first.
- Exit code is non-zero if any submission failed; failures are logged and retried next run.
- The Netlify token can read all of the site's form data. Keep `.env` at mode 600.
- Submissions Netlify marks as spam are not returned by this endpoint, so they are not imported.
