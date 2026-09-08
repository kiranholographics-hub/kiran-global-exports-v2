# Kiran Global Exports — Backend

Express 5 + MongoDB (Mongoose) API. Its only job today is receiving buyer
inquiries from the frontend contact form and (optionally, via `npm run seed`)
mirroring the frontend's structured product/category data into MongoDB for a
future admin panel. The public site does **not** depend on this API being up
to render products — see "Why products aren't served from here yet" below.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGODB_URI at minimum
npm run dev             # nodemon, http://localhost:4000
```

## Locked conventions

- Backend always runs on **port 4000**. Frontend always runs on **port
  3000** (Next.js default). Never collide the two.
- Secrets live only in `backend/.env` — gitignored, and not something any
  automated tool should write; edit it by hand.
- New API routes go in `src/routes/`, new Mongoose models in `src/models/`.

## Routes

- `GET /api/health` — liveness check.
- `POST /api/enquiries` — create an inquiry (required: `name`, `country`,
  `email`, `productInterest`). Always the frontend's one live dependency
  on this API.
- `GET /api/enquiries` — stopgap listing, no auth yet (pre admin-panel).
- `GET /api/products`, `GET /api/products/:slug`, `GET
  /api/products/:slug/related` — read-only mirror of the seeded catalogue.
- `GET /api/categories`, `GET /api/categories/:slug` — same, for categories.

## Why products aren't served from here yet

The frontend renders its product/category pages directly from
`frontend/data/products.js` and `frontend/data/categories.js` — plain
structured JS, edited by hand, no database round-trip required. That keeps
the buyer-facing pages fast and reliable without needing this API running
during `next build`. `npm run seed` mirrors that same data into MongoDB via
this backend's models, so switching the frontend over to live API reads
later (e.g. once there's an admin UI that needs to edit products without a
redeploy) is a data-fetching change, not a schema migration.

## Seeding

```bash
npm run seed
```

Upserts every product/category from the frontend's data files into MongoDB,
keyed on `slug`. Safe to re-run.
