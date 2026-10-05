# Little Town Labs Website Rebuild: Build Brief

## Goal

Rebuild littletownlabs.com as a fast, accessible, static marketing site that positions Little Town Labs around four services for healthcare and legal organizations:

1. Data De-identification
2. AI Gateway Implementation
3. AI Implementation
4. Data Analytics and Reporting

`reference-design.html` (in this folder) is the approved homepage design. Match its layout, copy, colors, and typography. Treat it as the visual and content source of truth, not as production code: rebuild it with clean, componentized markup.

## Stack

- **Astro** (static output), so the blog and industry pages can be added as Markdown later
- Plain CSS with custom properties (no Tailwind needed); one global stylesheet plus scoped component styles
- No client-side framework. Use zero JavaScript unless a feature needs it (mobile nav toggle, form submit)
- Fonts: IBM Plex Sans (400, 500, 600, 700) and IBM Plex Mono (400, 500). Self-host via `@fontsource` rather than Google Fonts, to avoid sending visitor IPs to Google (matters for a privacy-focused brand)
- Deploy target: [HOSTING PROVIDER]. Produce a static `dist/` build

## Writing rule

**Never use em dashes anywhere in copy, alt text, meta descriptions, or comments.** Use commas, periods, colons, or parentheses instead.

## Design tokens

Define these as CSS custom properties in `src/styles/tokens.css`:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0F1B2A` | Dark sections, headings, primary text |
| `--ink-2` | `#16263A` | Cards on dark backgrounds |
| `--ink-line` | `#2A3B50` | Borders on dark backgrounds |
| `--ground` | `#F5F6F3` | Page background |
| `--ground-alt` | `#E9EDEA` | Alternating section background |
| `--surface` | `#FFFFFF` | Cards |
| `--line` | `#DDE2E0` | Card borders |
| `--text-muted` | `#3D4A57` | Body copy on light |
| `--text-on-dark` | `#C9D1DA` | Body copy on dark |
| `--accent` | `#0B6564` | Buttons, links, highlights (teal) |
| `--accent-on-dark` | `#8FD3CF` | Eyebrows and links on dark |
| `--pii` | `#6B3B12` / `#FFD9B8` | Unmasked PII highlight (bg / text) |
| `--masked` | `#0B4F4E` / `#BFF0EC` | Masked token highlight (bg / text) |

Type scale: H1 60px, H2 40px (28px for in-card H2), H3 22 to 28px, body 16 to 20px. Line height 1.55 for body, about 1.1 for headings. Eyebrow labels: IBM Plex Mono, 14px, letter-spacing 0.08em, uppercase.

Layout: content max-width 1200px, 32px side padding, sections about 96 to 104px vertical padding. Radius 10px for cards, 6px for buttons. Use CSS grid with `repeat(auto-fit, minmax(...))` so cards stack on small screens.

## Site structure

```
/                 Homepage (from reference-design.html)
/healthcare       Industry page (stub now, content later)
/legal            Industry page (stub now, content later)
/benchmarks       De-identification benchmark report (stub with placeholders)
/blog             Keep pointing to https://blog.littletownlabs.site/ for now
/contact          Optional standalone contact page reusing the form component
```

## Homepage sections (in order)

Build each as an Astro component in `src/components/`:

1. **Header / Nav**: wordmark, links (Services, Industries, Benchmarks, About), "Book a consult" button. Collapses to a toggle menu under 768px
2. **Hero**: eyebrow, H1, subhead, two CTAs, and the prompt redaction demo card (prompt.in with highlighted PII, gateway.out with masked tokens)
3. **Services**: four cards (De-identification, AI Gateway, AI Implementation, Data Analytics). Four across on desktop, stacking on smaller screens. Use the inline stroke SVG icons from the reference
4. **Protection at rest and in flight**: two-row flow diagram. Must wrap cleanly on mobile
5. **Industries**: Healthcare and Legal cards, each linking to its page
6. **How we work together**: Validate, Implement, Manage
7. **Benchmarks**: dark section with three metric tiles
8. **About**: photo and bio, credentials, Timeless Technology Solutions partner link
9. **Contact**: intro text and form
10. **Footer**: wordmark, tagline, Blog and Contact links, copyright

Put service, industry, and step content in a data file (`src/data/site.ts`) so copy edits don't require touching markup.

## Contact form

- Fields: Name, Work email, Organization, Industry (Healthcare / Legal / Other), Message
- Submit to [FORM BACKEND, e.g. Formspree, Netlify Forms, or an Azure Function]
- Client-side validation (required fields, email format), success and error states, honeypot field for spam
- Do not ask for or accept PHI. Add a small note under the form: "Please don't include patient or client information in this form."

## Placeholders to leave clearly marked

- `[RECALL]`, `[PRECISION]`, `[F1]` benchmark values
- `[GARY PHOTO]` (use `public/images/gary-profile.jpg` from the current site if available)
- `[HOSTING PROVIDER]`, `[FORM BACKEND]`
- Do not invent statistics, client names, or testimonials

## Accessibility

- WCAG 2.2 AA contrast throughout (the reference palette is built for this; don't lighten grey text)
- Semantic landmarks: `header`, `nav`, `main`, `section` with headings, `footer`
- One H1 per page; logical heading order
- All interactive elements are real `<a>` or `<button>`; visible focus styles; 44px minimum touch targets
- Decorative SVGs get `aria-hidden="true"`; arrows in the flow diagram are hidden from screen readers
- Respect `prefers-reduced-motion` if any animation is added

## SEO and metadata

- Title: "Little Town Labs | De-identification, Analytics, and AI for Healthcare and Legal"
- Meta description (no em dashes): "Little Town Labs helps healthcare organizations and law firms de-identify data, build privacy-safe analytics, and implement AI gateways and AI tools with the safeguards compliance teams expect."
- Open Graph and Twitter card tags; reuse or regenerate `og-image.jpg`
- `sitemap.xml` (via `@astrojs/sitemap`) and `robots.txt`
- Canonical URL: https://littletownlabs.com

## Privacy and security (practice what we sell)

- No third-party trackers by default. If analytics is needed, use a privacy-respecting option (Plausible or self-hosted Umami) and document it
- Self-hosted fonts (see Stack)
- Add security headers via the host config: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Add a simple `/privacy` page stub

## Acceptance criteria

- `npm run build` produces a static site with no errors or warnings
- Homepage visually matches `reference-design.html` at 1440px, 1024px, 768px, and 390px widths
- Lighthouse scores of 95+ for Performance, Accessibility, Best Practices, and SEO
- No em dashes anywhere in the repo (`grep -r "—" src/` returns nothing)
- No horizontal scrolling at 390px
- README explains how to run locally, edit copy in `src/data/site.ts`, and deploy

## Suggested first prompt for Claude Code

> Read BUILD_BRIEF.md and reference-design.html. Scaffold an Astro project that implements the homepage exactly as described, with stub pages for /healthcare, /legal, /benchmarks, and /privacy. Start by proposing the file structure and component list, then build it. Ask me before choosing the form backend or hosting configuration.
