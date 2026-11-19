# Pragathi School, Virajpet

Marketing site for Pragathi School (LKG to Class 10), Virajpet taluk, Kodagu,
Karnataka. React + Vite + Tailwind v4, prerendered to static HTML with
`vite-react-ssg`, deployed on Cloudflare Pages. Same stack as the Ainora
Hospitality site.

Design: `docs/superpowers/specs/2026-11-19-pragathi-school-website-design.md`
Plan: `docs/superpowers/plans/2026-11-19-pragathi-school-website.md`

## Commands

```bash
npm install
npm run dev      # dev server at http://127.0.0.1:5173
npm run build    # prerender every route to dist/, then run postbuild
npm run preview  # serve the built output
npm test         # vitest (includes assertions against dist/ once built)
```

## Before launch: `TODO(client)`

Search the source for `TODO(client)`. In short:

1. **Phone** (`src/data/site.js`): set `PHONE_E164`, `PHONE_DISPLAY`, `WHATSAPP`.
   Until then no `tel:`/WhatsApp links render, and the enquiry form uses email.
2. **Email, street address, map link** (`src/data/site.js`).
3. **Photographs** (`src/data/images.js`): the gallery uses generated
   placeholders. Put real photos in `public/img/gallery/`, point each `src` at
   them, keep `category` and `aspect`, and rewrite `alt`.
4. **Copy**: About (story, vision, mission, principal message), academics
   (`academics.js`), facilities (`facilities.js`). Board affiliation is not stated anywhere yet.
5. **Logo**: `components/ui/Logo.jsx` and `public/brand/*` are placeholders
   (`node scripts/make-brand.py`).

## Editing content

All copy and imagery live in `src/data/`; components never hardcode text.

| File | Holds |
|---|---|
| `site.js` | Name, contact details, nav, class options |
| `academics.js` | The four class bands |
| `facilities.js` | Facilities and yearly activities |
| `whyUs.js` | Home page reasons |
| `images.js` | Hero, gallery, categories |
| `seo.js` | Per-route title/description, JSON-LD |

## Design rules

- Gold (`#c8a24a`) is for rules, icons, numerals and display type of at least
  24px. Small text uses `gold-deep`, `navy` or `slate`.
- Reveal animations only hide content under the `js` class set in
  `index.html`, so a JS failure leaves a readable page.

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `dist`, Node 20+. Or
`npm run build` then upload `dist/`. No redirect rules needed: every route is
prerendered, and `scripts/postbuild.mjs` writes `404.html` and `sitemap.xml`.
Set the custom domain to pragathischoolvirajpet.com.

## Adding news later

Add `src/data/news.js`, a `News` page and route in `src/routes.jsx`, and a
line in `ROUTES` in `scripts/postbuild.mjs`.
