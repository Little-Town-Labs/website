# Little Town Labs site (Astro)

Static marketing site. Source of truth for design: `BUILD_BRIEF.md` and `reference-design.html` from the design handoff.

## Run locally

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Edit copy

All homepage copy (services, industries, process steps, benchmark tiles, about, contact text, nav, footer) lives in `src/data/site.ts`. Components in `src/components/` only render that data. Do not use em dashes in copy.

Benchmark values `[RECALL]`, `[PRECISION]`, `[F1]` are placeholders. Replace them in `benchmarks.metrics` once real results exist.

## Contact form

Uses Netlify Forms (form name `contact`), so it only accepts submissions once deployed on Netlify. It does not submit from `npm run dev`. The form has client-side validation, a `bot-field` honeypot, and a note asking people not to submit PHI. After the first deploy, confirm the form appears under Forms in the Netlify dashboard and add an email notification there.

## Deploy

`netlify.toml` builds from `astro-site/` and publishes `dist/`. Security headers are in `public/_headers` (Netlify and Cloudflare Pages format); port them to the host config if using another provider. The CSP allows only same-origin resources.

## Still to do

- Replace `public/images/og-image.png` with a purpose-made 1200x630 image
- Real content for `/healthcare`, `/legal`, `/benchmarks`, `/privacy`
