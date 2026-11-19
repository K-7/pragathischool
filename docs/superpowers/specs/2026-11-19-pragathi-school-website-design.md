# Pragathi School, Virajpet: Website Design

**Site:** pragathischoolvirajpet.com
**School:** classes LKG to 10th, Virajpet taluk, Kodagu district, Karnataka
**Status:** Approved by the user on 2026-11-19.

## Intent

A premium static marketing site for the school: parents find the school, see the campus, and reach the office. The reference is `/Users/k2a/GIT/ainorahospitality`, and the user asked for the same stack and choices.

## Goals

- Premium, editorial look; fast; fully static; accessible (WCAG AA).
- A photo gallery with category filters and a lightbox.
- Content changes are edits to plain files in `src/data/`.

## Non-goals (for now)

- News/updates section. Planned as a later add-on: `src/data/news.js` plus one route.
- CMS, backend, or form handling.
- Kannada or any second language.

## Anti-goals

- Invented facts (founding year, results, affiliation, testimonials). Unknown values are placeholders marked `TODO(client)`.
- Gold used as small text colour (fails contrast).
- Animations that hide content when JS fails.

## Approaches

1. **Ainora's architecture with new content and brand (chosen).** Same toolchain, proven build, tests and deploy.
2. Astro or another static generator. Rejected: the user asked for the same stack.
3. CMS-backed site. Rejected: not needed without news; can be added later.

## Stack (copied from Ainora)

React 19, Vite, Tailwind v4 (`@theme` tokens in CSS), react-router-dom v6, `vite-react-ssg` prerendering every route, Font Awesome (per-icon imports), Google Fonts, Vitest + Testing Library, `scripts/postbuild.mjs` (404.html, sitemap, charset hoist), Cloudflare Pages. Enquiries via WhatsApp, `mailto:` and `tel:`.

## Pages

| Route | Content |
|---|---|
| `/` | Arched hero, welcome, LKG–10th at a glance, why Pragathi, gallery teaser, admissions CTA |
| `/about` | Story, vision and mission, principal/management message |
| `/academics` | Pre-primary (LKG–UKG), Primary (1–5), Middle (6–7), High School (8–10) |
| `/campus` | Facilities, sports, arts, activities |
| `/gallery` | Category filters (Campus, Events, Sports, Annual Day, Classroom) and a lightbox, driven by `alt`/`category`/`aspect` in `images.js` |
| `/contact` | Address, map link, phone, admissions enquiry via WhatsApp/mailto/tel |
| `/404` | Custom not-found page |

Also: sitemap, robots.txt, `EducationalOrganization` JSON-LD with local SEO, per-route title/description/OG.

## Design language (my calls)

- Keep Ainora's devices: arch image mask, hairline rules, oversized numerals, fade-and-rise reveals gated behind a `js` class, `prefers-reduced-motion` respected.
- Palette: deep navy and warm gold on ivory. Gold is for rules, icons, numerals and display type of at least 24px only. Body-size accents use a deeper gold or navy.
- Fonts: Cormorant Garamond (display) and Jost (body), as in Ainora.

## Content (all in `src/data/`)

`site.js`, `academics.js`, `facilities.js`, `whyUs.js`, `images.js`, `seo.js`. Unknown values are placeholders flagged `TODO(client)`: photos (stock placeholders until real ones arrive), phone, address, affiliation (State Board or CBSE), principal message, testimonials.

## Constraints

- Project path `/Users/k2a/GIT/pragathischool`, new git repo.
- Domain pragathischoolvirajpet.com, so `SITE_URL` in postbuild and JSON-LD uses it.
- No news section in this phase.

## Left to the builder

Component breakdown, exact copy drafts (flagged for the school to rewrite), the placeholder image set, logo/brand mark (a simple wordmark until the school supplies one), and test coverage mirroring Ainora's (`enquiry` unit tests and build-output assertions).
