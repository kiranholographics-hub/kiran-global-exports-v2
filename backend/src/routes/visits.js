import { Router } from 'express';
import geoip from 'geoip-lite';
import Visit from '../models/Visit.js';

const router = Router();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 120; // a real visitor navigating around the SPA fires several of these
const requests = new Map();

// Skips the obvious crawlers/bots so digest emails aren't full of bot noise.
// Not exhaustive — just the common, high-volume ones.
const BOT_UA_RE = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|pingdom|uptimerobot|ahrefsbot|semrushbot|mj12bot|dataforseo|petalbot/i;

function clean(value, max = 300) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
}

function ipHint(req) {
  const raw = req.ip || '';
  const parts = raw.split('.');
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.x.x`;
  return raw.includes(':') ? `${raw.split(':').slice(0, 2).join(':')}::` : '';
}

// Resolves a country from the visitor's IP using an offline database
// (geoip-lite) — the IP itself is never sent anywhere or stored; only the
// resolved country is kept. Returns empty strings for localhost/private
// IPs or ranges the database doesn't recognise.
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
function geoLookup(ip) {
  try {
    const geo = geoip.lookup(ip);
    if (!geo?.country) return { country: '', countryCode: '' };
    let country = geo.country;
    try {
      country = regionNames.of(geo.country) || geo.country;
    } catch {
      // unrecognised code — fall back to the raw 2-letter code
    }
    return { country, countryCode: geo.country };
  } catch {
    return { country: '', countryCode: '' };
  }
}

function rateLimited(ip) {
  const now = Date.now();
  const current = requests.get(ip) || { count: 0, start: now };
  if (now - current.start > WINDOW_MS) {
    requests.set(ip, { count: 1, start: now });
    return false;
  }
  current.count += 1;
  requests.set(ip, current);
  return current.count > MAX_REQUESTS;
}

// POST /api/visits — fired by the frontend on every route change.
// Fire-and-forget from the frontend's side: always responds fast, never
// throws, and silently drops bot traffic rather than rejecting it (a
// rejection would just cause the frontend to retry/log noise for nothing).
router.post('/', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(204).end();
  }

  const userAgent = clean(req.get('user-agent'), 300);
  if (BOT_UA_RE.test(userAgent)) {
    return res.status(204).end();
  }

  const path = clean(req.body?.path, 300) || '/';
  const referrer = clean(req.body?.referrer, 300);
  const { country, countryCode } = geoLookup(req.ip);

  try {
    await Visit.create({ path, referrer, userAgent, ipHint: ipHint(req), country, countryCode });
  } catch (err) {
    console.error('[visits] create error:', err.message);
    // Still 204 — a failed visit log should never surface as an error to the visitor's browser.
  }

  res.status(204).end();
});

// GET /api/visits — stopgap listing, admin-key protected (same pattern as /api/enquiries)
router.get('/', async (req, res) => {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || req.get('x-admin-key') !== adminKey) return res.status(404).json({ error: 'Not found' });
  try {
    const visits = await Visit.find().sort({ createdAt: -1 }).limit(500);
    res.json(visits);
  } catch (err) {
    console.error('[visits] list error:', err.message);
    res.status(500).json({ error: 'Could not load visits.' });
  }
});

export default router;
