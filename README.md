# Kiran Global Exports — Website (v2, fresh build)

A premium, buyer-facing B2B showcase for Kiran Global Exports (premium
towels & rugs, international export). No cart, no checkout, no prices —
every path leads to a direct inquiry with the export team.

**Entirely Node.js — no meta-framework.** The frontend is a React SPA
built with Vite and served in production by a plain Express server; the
backend is Express + MongoDB. Nothing here is Next.js.

```text
kiran-global-exports-v2/
├── frontend/   React (JavaScript) + Vite, individual CSS Modules per
│               component (no Tailwind), Framer Motion + GSAP ScrollTrigger
│               + Lenis for the scroll/animation system, React Router for
│               navigation. server.js (Express) serves the production build.
└── backend/    Node + Express 5 + Mongoose + MongoDB Atlas. Today its one
                live job is receiving contact-form inquiries.
```

## Quick start

```bash
# Terminal 1 — backend (http://localhost:4000)
cd backend
npm install
cp .env.example .env      # fill in MONGODB_URI at minimum
npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd frontend
npm install
cp .env.example .env.local
npm run dev                # Vite dev server, fastest for local editing
# — or, to run it exactly as it will in production —
npm run build && npm run serve   # Express serves the built dist/
```

Open http://localhost:3000. The contact form (`/contact`) posts to the
backend's `/api/enquiries` — everything else on the site renders from
structured local data (`frontend/src/data/products.js`,
`frontend/src/data/categories.js`, `frontend/src/data/config.js`) and
needs no backend connection to browse.

## Locked conventions

- **Frontend always on port 3000, backend always on port 4000.** Never
  collide the two (this bit a previous version of this project once — see
  backend/README.md).
- Secrets live only in each app's `.env` (gitignored) — copy the
  `.env.example` in each folder and fill it in by hand.
- New pages go under `frontend/src/pages/` (add the route in
  `frontend/src/App.jsx`), new components under `frontend/src/components/`
  or `frontend/src/sections/` (sections = homepage-scale compositions;
  components = smaller reusable pieces).
- New API routes go under `backend/src/routes/`, new Mongoose models under
  `backend/src/models/`.
- No Tailwind — every component/page has its own CSS Module
  (`Name.module.css`) next to it. Shared tokens live in
  `frontend/src/styles/tokens.css`.

## What's real vs. placeholder right now

- **All copy, structure, navigation, forms and animation are real and
  working** — verified with a clean production build (`vite build`), zero
  ESLint errors, and a live smoke test of every route through the actual
  Express production server (`server.js`), including a hard-refresh deep
  link (`/towels/classic-bath-towel`) and the SPA 404 fallback.
- **Photography is placeholder.** No real product photography exists yet.
  Every image reference already points to an organized path (documented in
  `frontend/ASSETS.md`) and falls back to a styled, labelled placeholder
  tile until a real file is dropped in at that exact path — no code
  changes needed to add real photos later.
- **The contact form needs a live `MONGODB_URI`** in `backend/.env` to
  actually save inquiries — the form itself, validation, and success/error
  states all work regardless; only the final save requires the database
  to be reachable. This cloud build session could not verify a live save
  against MongoDB Atlas (no network egress to Atlas from this sandbox) —
  that needs a first real test on your machine.

## What's intentionally not built yet

Scoped out of this pass to keep the build coherent and verifiable rather
than sprawling into an admin CMS. All straightforward additions later,
none requiring a rearchitecture:

- Admin panel / authenticated product-editing UI (products/categories are
  hand-edited in `frontend/src/data/*.js` today — see "Adding a new
  product later" in `frontend/ASSETS.md`).
- Real photography, hero video, and the OG share image.
- Server-side rendering / prerendering — this is a pure client-rendered
  SPA now (see "Why no Next.js" in `frontend/README.md`), which is the
  direct trade-off of moving off a meta-framework. Fine for buyers
  clicking through the site; worth revisiting only if crawler indexing or
  social-preview accuracy becomes a real problem.
- The remaining granular collection "worlds" pages beyond the anchor
  sections already on `/collections` (e.g. dedicated country pages under
  `/export`).
- Outbound email notification when an inquiry is submitted (the API
  saves every inquiry to MongoDB regardless; emailing the export team on
  top of that is a `nodemailer` addition to `backend/src/routes/enquiries.js`).
- i18n / multi-language.

## Design system

- **Palette**: warm ivory / sand / beige neutrals, charcoal / deep brown /
  near-black darks, muted olive-sage accent — see
  `frontend/src/styles/tokens.css`.
- **Type**: Fraunces (serif, editorial headlines) + Inter (sans, UI/body),
  self-hosted via `@fontsource` (no runtime dependency on Google Fonts —
  works fully offline).
- **Motion**: Lenis smooth scroll wired into GSAP's ScrollTrigger ticker;
  reusable `ScrollReveal` (fade/slide) and `ImageReveal` (clip-path
  unveil) components; a pinned horizontal scroll for the manufacturing
  journey section. Everything respects `prefers-reduced-motion`.
