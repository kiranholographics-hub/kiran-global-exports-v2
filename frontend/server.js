// Production static server for the built React (Vite) app. This is what
// makes the frontend "plain Node.js" end to end: `npm run build` compiles
// the SPA into dist/, then `npm run serve` boots this Express server to
// serve it — no Next.js runtime involved anywhere.
//
// For local development, `npm run dev` (Vite's own dev server, also
// Node.js) is faster — hot module reload, no rebuild step. Use this
// server for anything that should look like production: testing the real
// build output, or actually deploying.

import express from 'express';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.static(DIST_DIR, { index: false }));

// Client-side routing (React Router) — any non-file route falls back to
// index.html so deep links like /towels/classic-bath-towel work on a
// hard refresh.
//
// If `scripts/prerender.mjs` has run, some routes (the indexable ones —
// see public/sitemap.xml) have their own real, fully-rendered
// dist/<route>/index.html instead of the generic shell. Serve that
// specific file when it exists so crawlers get real content immediately;
// fall back to the plain SPA shell for every other route.
app.use((req, res) => {
  const prerendered = path.join(DIST_DIR, req.path, 'index.html');
  if (fs.existsSync(prerendered)) {
    return res.sendFile(prerendered);
  }
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[frontend] Kiran Global Exports serving dist/ on port ${PORT}`);
  console.log('[frontend] Run `npm run build` first if dist/ does not exist yet.');
});
