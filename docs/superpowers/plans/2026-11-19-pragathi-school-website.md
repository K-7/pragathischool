# Pragathi School Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium static marketing site for Pragathi School, Virajpet (LKG–10th) with a filterable photo gallery, ready to deploy to Cloudflare Pages.

**Architecture:** Start from a copy of the Ainora Hospitality codebase (`/Users/k2a/GIT/ainorahospitality`), keeping its toolchain, UI primitives (`ArchImage`, `Reveal`, `Section`, `PageHero`, `Seo`, `Lightbox`), build scripts and test setup. Replace the data layer, palette, pages and enquiry logic with school equivalents. All copy and imagery live in `src/data/`; every route is prerendered to HTML by `vite-react-ssg`.

**Tech Stack:** React 19, Vite 8, Tailwind v4 (`@theme`), react-router-dom v6, vite-react-ssg, Font Awesome (per-icon imports), Google Fonts (Cormorant Garamond + Jost), Vitest + Testing Library, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-19-pragathi-school-website-design.md`

## Global Constraints

- Project path `/Users/k2a/GIT/pragathischool`; site URL `https://www.pragathischoolvirajpet.com` (single `SITE_URL` in `src/data/site.js`; `scripts/postbuild.mjs` uses the same value).
- No news section, CMS, backend, or second language in this phase.
- Routes (exactly): `/`, `/about`, `/academics`, `/campus`, `/gallery`, `/contact`, `/404`.
- Gallery categories (exactly): `All`, `Campus`, `Events`, `Sports`, `Annual Day`, `Classroom`.
- Class bands (exactly): Pre-primary (LKG–UKG), Primary (Classes 1–5), Middle (Classes 6–7), High School (Classes 8–10).
- Gold `#c8a24a` is never used for text below 24px; body-size accents use `gold-deep` `#8c6d2f` (4.8:1) or navy.
- Reveal animations are gated behind the `js` class on `<html>` (inline script in `index.html`) and disabled under `prefers-reduced-motion`.
- No invented facts (founding year, results, affiliation, testimonials, principal name). Unknown values are placeholders marked `TODO(client)`.
- `tel:`/WhatsApp links render only when `isPhoneConfigured()` is true. No dead links ship.
- Palette tokens (`@theme` in `src/index.css`): `ivory #fffdf8`, `ivory-warm #faf6ee`, `gold #c8a24a`, `gold-soft #e4d3a8`, `gold-deep #8c6d2f`, `navy #12284a`, `navy-soft #1d3a66`, `slate #4a5d78`, `ink #1a1a18`. Rename Ainora's `forest`/`moss` utility usages to `navy`/`slate`.

## Review Focus

- Gallery filter on a category with zero images: show an empty-state message, not a blank grid.
- Lightbox: Escape closes, arrow keys move, focus returns to the tile that opened it, and the index stays valid when the filter changes.
- Phone unconfigured: no `tel:` or `wa.me` hrefs anywhere in the prerendered HTML, and the enquiry form still works through `mailto:`.
- Enquiry text with Kannada script, emoji, newlines and a 2,000-character message: URL stays correctly encoded and the WhatsApp/mailto links are still built.
- A remote gallery image that fails to load: tile keeps its aspect box and alt text rather than collapsing the grid.

---

### Task 1: Scaffold from Ainora

**Files:**
- Create: whole project root by copying from `/Users/k2a/GIT/ainorahospitality`: `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.gitignore`, `src/`, `public/_headers`, `public/robots.txt`, `scripts/postbuild.mjs`, `test/`
- Do not copy: `node_modules`, `dist`, `.git`, `implementation.md`, `README.md`, `public/brand/*`, `public/og-default.jpg`
- Delete after copy: `src/data/{services,promise,testimonials}.js`, `src/pages/Services.jsx`, `src/components/home/{ServicesGrid,Promise,Testimonials}.jsx` and `ServicesGrid.test.jsx`
- Modify: `package.json` (name `pragathischool`, description "Pragathi School, Virajpet — LKG to 10th, Kodagu.")

**Interfaces:**
- Produces: a runnable repo with `npm run dev|build|test` available; later tasks overwrite the remaining Ainora-specific files.

- [ ] **Step 1: Copy the files above with `rsync -a --exclude` and run `git init`**
- [ ] **Step 2: `npm install`**
- [ ] **Step 3: Delete the Ainora-only files listed; temporarily stub `routes.jsx` to Home/About/Gallery/Contact/NotFound so the build is not broken by missing imports**
- [ ] **Step 4: Run `npm test` and `npm run build`. Expected: baseline tests still run; failures only where Ainora data is referenced (fixed in Tasks 3 to 5)**
- [ ] **Step 5: Commit** `git add -A && git commit -m "chore: scaffold from Ainora stack"`

---

### Task 2: Design tokens and brand mark

**Files:**
- Modify: `src/index.css` (`@theme` palette per Global Constraints; keep `.arch`, reveal, `js`-gating and reduced-motion rules), `index.html` (`theme-color #fffdf8`, title-less)
- Modify: `src/components/ui/Logo.jsx` (text wordmark: "Pragathi" in display serif, "School · Virajpet" kicker, small gold arch glyph as inline SVG; props `variant: 'light' | 'dark'`, `className`)
- Create: `public/brand/icon-32.png`, `icon-48.png`, `icon-180.png`, `public/og-default.jpg` (1200×630) as navy tiles with a gold "P" (placeholder; script or any image tool), marked `TODO(client)` in README for the real logo
- Test: `src/components/ui/Logo.test.jsx`

**Interfaces:**
- Produces: Tailwind utilities `bg-navy`, `text-navy`, `text-slate`, `text-gold-deep`, `bg-ivory-warm`; `<Logo variant className />`.

- [ ] **Step 1: Write failing test** `Logo.test.jsx`: renders text "Pragathi" and "Virajpet"; `variant="dark"` renders on-navy-safe classes (no navy text).
- [ ] **Step 2: Run** `npx vitest run src/components/ui/Logo.test.jsx` — Expected: FAIL (still Ainora logo)
- [ ] **Step 3: Implement the palette and `Logo`**
- [ ] **Step 4: Re-run the test — Expected: PASS**
- [ ] **Step 5: Commit** `feat: navy and gold design tokens, school wordmark`

---

### Task 3: Data layer

**Files:**
- Modify: `src/data/site.js`, `src/data/seo.js`, `src/data/images.js`, `src/data/whyUs.js`
- Create: `src/data/academics.js`, `src/data/facilities.js`
- Test: `src/data/data.test.js`

**Interfaces:**
- `site.js` exports: `BRAND = 'Pragathi School'`, `SITE_URL`, `PHONE_DISPLAY`, `PHONE_E164`, `WHATSAPP` (digits only), `EMAIL` (placeholder `info@pragathischoolvirajpet.com`, `TODO(client)`), `ADDRESS_LINE` (`'Virajpet, Kodagu, Karnataka'` plus `TODO(client)` for street), `MAP_URL`, `NAV: {label, to}[]` for Home, About, Academics, Campus, Gallery, Contact, `CLASS_OPTIONS: string[]` (`['LKG','UKG','1','2',…,'10']` as labels like `'Class 1'`), `isPhoneConfigured(): boolean` (false while the number is the placeholder).
- `academics.js` exports `BANDS: {id, title, classes, summary, highlights: string[]}[]` for the four bands in Global Constraints.
- `facilities.js` exports `FACILITIES: {id, icon, title, text}[]` (icon is a Font Awesome icon-definition import). Use at least 8: classrooms, library, computer lab, science lab, playground, sports, arts and music, safe transport (all `TODO(client)` to confirm).
- `images.js` exports `HERO`, `ABOUT_PORTRAIT`, `CATEGORIES` (exact list from Global Constraints), `gallery: {id, src, alt, category, aspect}[]` with at least 18 stock placeholders covering every non-All category (`aspect ∈ 'tall' | 'square' | 'wide'`). Alt text is written from the actual photo.
- `seo.js` exports `seo` (title and description for each of the 7 routes), `DEFAULT_OG_IMAGE`, `schoolJsonLd(): object` with `@type: 'EducationalOrganization'`, name, url, address (`addressLocality: 'Virajpet'`, `addressRegion: 'Karnataka'`, `addressCountry: 'IN'`), and `telephone` included only when `isPhoneConfigured()`.

- [ ] **Step 1: Write failing tests in `data.test.js`:**
  - `CATEGORIES` equals `['All','Campus','Events','Sports','Annual Day','Classroom']`.
  - Every `gallery` item has non-empty `alt`, a category in `CATEGORIES` (not `All`), a valid `aspect`, and unique `id`; each non-All category has at least 2 items.
  - `BANDS.map(b => b.id)` equals `['pre-primary','primary','middle','high']`.
  - `seo` has a key for each of the 7 routes, and every description is ≤ 160 chars.
  - `schoolJsonLd().telephone` is undefined while `isPhoneConfigured()` is false.
  - `NAV.length === 6`.
- [ ] **Step 2: Run `npx vitest run src/data/data.test.js` — Expected: FAIL**
- [ ] **Step 3: Implement the data files; draft copy plainly and flag every guess `TODO(client)`**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: school content data layer`

---

### Task 4: Admissions enquiry logic

**Files:**
- Modify: `src/lib/enquiry.js`, `src/lib/enquiry.test.js`

**Interfaces:**
- Consumes: `BRAND`, `EMAIL`, `WHATSAPP`, `PHONE_E164`, `isPhoneConfigured` from `site.js`.
- Produces (keeping Ainora's helper names where unchanged): `normalisePhone(value)`, `validateEnquiry({parentName, phone, email, childName, classApplying, message}) -> {valid, errors}`, `buildEnquiryMessage(fields) -> string`, `buildWhatsAppUrl(fields)`, `buildMailtoUrl(fields)` (subject `'Admission enquiry — <classApplying>'`, or `'Admission enquiry'` when no class), `telHref()`, `whatsappHref(text?)`, `openEnquiry(url)`.

- [ ] **Step 1: Adapt the tests.** Keep the phone cases (`9876543210`, `+919876543210`, `919876543210`, `098765 43210` accepted; too short, starting 0–5 rejected). Replace the fields: `parentName` needs ≥ 2 chars, `phone` required, optional `email` validated, `classApplying` optional, and `guests`/`date` are removed. Add cases:
  - A message containing `'ಮಗು'` and `'😀'` and a newline round-trips through `decodeURIComponent` of the WhatsApp text param.
  - A 2000-character message still yields a mailto URL starting `mailto:` and containing the encoded body.
  - `telHref()` and `whatsappHref()` return `null` while the phone is unconfigured.
- [ ] **Step 2: Run `npx vitest run src/lib/enquiry.test.js` — Expected: FAIL**
- [ ] **Step 3: Implement by editing Ainora's functions in place (rename fields, update message heading to `New admission enquiry from the ${BRAND} website`)**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: admissions enquiry helpers`

---

### Task 5: Layout (header, footer, menu, FAB)

**Files:**
- Modify: `src/components/layout/{Header,Footer,MobileMenu,Layout}.jsx`, `src/components/contact/WhatsAppFab.jsx`, `src/components/layout/Header.test.jsx`, `src/components/ui/Button.jsx` (colour classes only)

**Interfaces:**
- Consumes: `NAV`, `BRAND`, `ADDRESS_LINE`, `telHref`, `whatsappHref`, `<Logo variant>`.
- Produces: `<Layout />` (Outlet inside, with header, footer and FAB). The FAB renders nothing when `whatsappHref()` is null.

- [ ] **Step 1: Update `Header.test.jsx`:** all 6 `NAV` labels render as links; the primary CTA reads "Admissions" and links to `/contact`; the mobile menu toggle has `aria-expanded` that flips on click.
- [ ] **Step 2: Run the test — Expected: FAIL**
- [ ] **Step 3: Implement the changes: nav from `NAV`, navy footer using the dark Logo, footer with address/phone/email and a "Quick links" list; remove Ainora copy**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: school header, footer and menu`

---

### Task 6: Home page

**Files:**
- Modify: `src/pages/Home.jsx`, `src/components/home/{Hero,Welcome,WhyUs,GalleryTeaser,CtaBand}.jsx`
- Create: `src/components/home/ClassBands.jsx` (four bands as numbered 01–04 hairline rows, from `BANDS`), `src/components/home/ClassBands.test.jsx`

**Interfaces:**
- Consumes: `BANDS`, `HERO`, `gallery`, `Seo`, `schoolJsonLd`.
- Produces: `<ClassBands />`, rendering one heading per band.

- [ ] **Step 1: Write failing test:** `<ClassBands />` renders 4 headings whose text matches each `BANDS[i].title`, and the numerals "01" to "04".
- [ ] **Step 2: Run — Expected: FAIL**
- [ ] **Step 3: Implement. Home order: Hero (arched image, "Pragathi School · Virajpet, Kodagu", CTAs "Apply for Admission" → `/contact` and "Explore Academics" → `/academics`), Welcome, ClassBands, WhyUs, GalleryTeaser (first 6 gallery items, link to `/gallery`), CtaBand. Home renders the JSON-LD via `Seo`.**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: home page`

---

### Task 7: About, Academics and Campus pages

**Files:**
- Modify: `src/pages/About.jsx`
- Create: `src/pages/Academics.jsx`, `src/pages/Campus.jsx`, `src/pages/pages.test.jsx`

**Interfaces:**
- Consumes: `BANDS`, `FACILITIES`, `PageHero`, `Section`, `SectionHeading`, `Reveal`, `ArchImage`, `Seo`, `seo`.
- Produces: default-exported page components `About`, `Academics`, `Campus`.

- [ ] **Step 1: Write failing tests in `pages.test.jsx` (use `renderWithRouter`):**
  - `Academics` shows all 4 band titles and "LKG".
  - `Campus` shows every `FACILITIES[i].title`.
  - `About` has one `h1`, plus headings containing "Vision" and "Mission".
- [ ] **Step 2: Run — Expected: FAIL**
- [ ] **Step 3: Implement. About: story (`TODO(client)` placeholder, no founding year), vision/mission, principal message block clearly marked `TODO(client)`. Academics: one section per band with highlights. Campus: facilities grid with hairline rules plus an activities list.**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: about, academics and campus pages`

---

### Task 8: Gallery

**Files:**
- Modify: `src/pages/Gallery.jsx`, `src/components/gallery/GalleryGrid.jsx`, `src/components/gallery/Lightbox.jsx`
- Create: `src/components/gallery/GalleryGrid.test.jsx`

**Interfaces:**
- Consumes: `gallery`, `CATEGORIES` from `images.js`.
- Produces: `<GalleryGrid />` with filter buttons (`aria-pressed`), a masonry grid keyed by `aspect`, and an empty-state `<p>No photos in this category yet.</p>`; `<Lightbox items index onClose onChange />`.

- [ ] **Step 1: Write failing tests:**
  - Clicking "Sports" leaves only Sports images and sets `aria-pressed="true"` on that button.
  - With a mocked `gallery` containing no "Events" items, clicking "Events" shows "No photos in this category yet."
  - Clicking a tile opens a `role="dialog"`; Escape closes it and focus returns to that tile; ArrowRight moves to the next image alt text, wrapping at the end.
  - Switching the filter while the lightbox is open closes it.
- [ ] **Step 2: Run `npx vitest run src/components/gallery` — Expected: FAIL**
- [ ] **Step 3: Adapt Ainora's grid and lightbox (category list now from `CATEGORIES`). Tile `<img>` uses `loading="lazy"`, explicit aspect box, and keeps its alt on error.**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: filterable gallery with lightbox`

---

### Task 9: Contact and admissions form

**Files:**
- Modify: `src/pages/Contact.jsx`, `src/components/contact/{ContactDetails,EnquiryForm,EnquiryForm.test}.jsx`

**Interfaces:**
- Consumes: `validateEnquiry`, `buildWhatsAppUrl`, `buildMailtoUrl`, `openEnquiry`, `CLASS_OPTIONS`, `isPhoneConfigured`, `MAP_URL`.
- Produces: `<EnquiryForm />` with fields parent name, phone, email (optional), child's name (optional), class applying for (select from `CLASS_OPTIONS`), message. Buttons: "Send on WhatsApp" (hidden when phone unconfigured) and "Send by Email". `<ContactDetails />` with address, phone, email, and a "Get directions" link to `MAP_URL`.

- [ ] **Step 1: Adapt `EnquiryForm.test.jsx`:**
  - Submitting empty shows name and phone errors and calls no `openEnquiry`.
  - A valid submission through "Send by Email" calls `openEnquiry` with a `mailto:` URL.
  - With the phone unconfigured, no "Send on WhatsApp" button renders.
  - Each error is tied to its field via `aria-describedby`.
- [ ] **Step 2: Run — Expected: FAIL**
- [ ] **Step 3: Implement (fields and labels only; keep Ainora's validation and focus handling)**
- [ ] **Step 4: Run — Expected: PASS**
- [ ] **Step 5: Commit** `feat: contact page and admissions enquiry`

---

### Task 10: Routes, build output, deploy files, docs

**Files:**
- Modify: `src/routes.jsx`, `scripts/postbuild.mjs` (`SITE_URL`, `ROUTES` with `/`, `/about`, `/academics`, `/campus`, `/gallery`, `/contact`), `test/build-output.test.js`, `public/robots.txt` (sitemap URL), `public/_headers` (unchanged except paths if needed)
- Create: `README.md` (commands, `TODO(client)` checklist, content-file table, brand notes, Cloudflare deploy steps, "adding news later")

**Interfaces:**
- Consumes: all pages from Tasks 6 to 9. `routes` exports the same shape as Ainora's (Layout parent; children `index`, `about`, `academics`, `campus`, `gallery`, `contact`, `404`, `*`).

- [ ] **Step 1: Rewrite `build-output.test.js` assertions:**
  - HTML exists for all 6 pages plus `404.html` and `sitemap.xml`.
  - `academics/index.html` contains "Pre-primary" and is over 15 KB.
  - Each page has a unique `<title>` and a canonical URL starting `https://www.pragathischoolvirajpet.com`.
  - Home contains `"@type":"EducationalOrganization"`.
  - While the phone is unconfigured, no page contains `href="tel:` or `wa.me`.
  - Sitemap lists exactly 6 URLs.
  - `index.html` contains the inline script that adds the `js` class.
- [ ] **Step 2: Run `npm run build && npm test` — Expected: FAIL until routes and postbuild are updated**
- [ ] **Step 3: Update `routes.jsx` and `postbuild.mjs`; write the README**
- [ ] **Step 4: Run `npm run build && npm test` — Expected: all PASS, no console errors**
- [ ] **Step 5: Visual check with `npm run preview`, looking at 360px, 768px and 1280px widths for every page. Confirm no horizontal scroll, readable contrast, visible content with JS disabled, and a working lightbox. Optionally run a Lighthouse audit (target ≥ 95 for performance, accessibility, SEO).**
- [ ] **Step 6: Commit** `feat: routes, build verification and README`

---

## Self-review

- Spec coverage: pages → Tasks 6 to 9; gallery categories and lightbox → 3 and 8; palette and fonts → 2; enquiry channels → 4 and 9; JSON-LD, sitemap, 404 and robots → 3 and 10; placeholder policy → Global Constraints and 3; no-news non-goal respected (no news route or data).
- Type consistency: `BANDS`, `FACILITIES`, `CATEGORIES`, `gallery`, `NAV`, `CLASS_OPTIONS`, `isPhoneConfigured` and the enquiry helper names are defined in Tasks 3 and 4 and used unchanged afterwards.
- Proportion: the plan fixes names, values and tests, and leaves component bodies to the implementer; the Ainora code is the template.
