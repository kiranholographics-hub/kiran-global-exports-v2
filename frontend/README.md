# Kiran Global Exports — Frontend

React (JavaScript) single-page app, built with Vite, served in production
by a plain Express/Node server (`server.js`). No Next.js anywhere in this
folder.

## Development

```bash
npm install
cp .env.example .env.local   # VITE_API_URL, defaults to http://localhost:4000
npm run dev                  # Vite dev server → http://localhost:3000
```

## Production

```bash
npm run build   # generates public/sitemap.xml, then builds to dist/
npm run serve   # Node/Express serves dist/ → http://localhost:3000
```

`npm run preview` (Vite's own preview server) also works for a quick local
check of the production build, but `npm run serve` is the real production
path — it's the one actual Node.js server, matching how this would deploy.

## Structure

```text
src/
├── main.jsx          Entry point — fonts, global CSS, router setup
├── App.jsx            Route table (React Router) + global chrome
├── pages/              One file per route (SEO + page composition)
├── sections/           Homepage-scale compositions (Hero, Manufacturing, ...)
├── components/         Smaller reusable pieces (Header, ProductCard, ...)
├── data/                Structured content: products.js, categories.js, config.js
├── lib/                  api.js — fetch wrapper to the backend
└── styles/              tokens.css (design tokens) + globals.css (reset/utilities)
```

Path alias `@/` points at `src/` (configured in `vite.config.js` and
`jsconfig.json`) — e.g. `import { siteConfig } from '@/data/config'`.

## Why no Next.js

This app was originally scaffolded with Next.js, then rebuilt on plain
Vite + React + Express per an explicit request to keep the whole stack
"Node.js" without a meta-framework. The trade-off worth knowing: this is
now a pure client-rendered SPA — there's no server-side rendering, so a
crawler or link-preview bot that doesn't execute JavaScript sees only the
static tags in `index.html`, not the per-route ones the `SEO` component
sets after mount. `src/components/SEO/SEO.jsx` documents this. If that
ever becomes a real problem (social share previews, search ranking),
the fix is prerendering the built `dist/` output (e.g. a Vite
prerender plugin) — not a rewrite.

## SEO

- Per-route `<title>`/meta tags: `src/components/SEO/SEO.jsx`, called at
  the top of every page component.
- `public/sitemap.xml`: regenerated on every `npm run build` by
  `scripts/generate-seo-files.js` from the same product/category data the
  site renders from.
- `public/robots.txt`: static, points at the sitemap.
- Organization JSON-LD: inline in `index.html` (same on every route, so no
  need to regenerate it per-page in a CSR app).
