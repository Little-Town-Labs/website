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

Set `PUBLIC_FORM_ENDPOINT` (see `.env.example`) to a URL that accepts a JSON POST. Until it is set, the form shows a "not connected" error on submit. The form has client-side validation, a honeypot field, and a note asking people not to submit PHI.

## Deploy

Run `npm run build` and publish `dist/`. Security headers are in `public/_headers` (Netlify and Cloudflare Pages format); port them to the host config if using another provider. The CSP allows only same-origin resources, so if the form posts to a third-party backend, add that origin to `connect-src`.

## Still to do

- Choose hosting and form backend
- Replace `public/images/og-image.png` with a purpose-made 1200x630 image
- Real content for `/healthcare`, `/legal`, `/benchmarks`, `/privacy`
