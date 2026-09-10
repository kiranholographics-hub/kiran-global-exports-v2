import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import { sendEnquiryNotification } from '../mailer.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();
const REQUIRED_FIELDS = ['name', 'country', 'email', 'productInterest'];
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const requests = new Map();

function clean(value, max = 200) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
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

router.post('/', async (req, res) => {
  if (rateLimited(req.ip)) return res.status(429).json({ error: 'Too many enquiries from this connection. Please try again later.' });
  try {
    const body = req.body || {};
    const payload = {
      name: clean(body.name, 120),
      company: clean(body.company, 160),
      country: clean(body.country, 100),
      email: clean(body.email, 200).toLowerCase(),
      phone: clean(body.phone, 80),
      productInterest: clean(body.productInterest, 120),
      estimatedQuantity: clean(body.estimatedQuantity, 120),
      message: clean(body.message, 3000),
      productSlug: clean(body.productSlug, 160),
      source: clean(body.source || 'website', 60),
    };
    const missing = REQUIRED_FIELDS.filter((f) => !payload[f]);
    if (missing.length) return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return res.status(400).json({ error: 'Please provide a valid email address.' });
    if (payload.name.length < 2 || payload.country.length < 2) return res.status(400).json({ error: 'Please provide your name and country.' });
    const enquiry = await Enquiry.create(payload);

    // Fire-and-forget — a slow/broken mail provider should never delay or
    // fail the visitor's response; the enquiry is already safely saved.
    sendEnquiryNotification(enquiry.toJSON()).catch((err) =>
      console.error('[enquiries] notify failed:', err.message)
    );

    res.status(201).json({ ok: true, enquiry: enquiry.toJSON() });
  } catch (err) {
    console.error('[enquiries] create error:', err.message);
    res.status(500).json({ error: 'Could not save your enquiry. Please try again.' });
  }
});

router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(200);
    res.json(enquiries.map((e) => e.toJSON()));
  } catch (err) {
    console.error('[enquiries] list error:', err.message);
    res.status(500).json({ error: 'Could not load enquiries.' });
  }
});

export default router;
