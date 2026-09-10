import { Router } from 'express';
import Market from '../models/Market.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

function clean(value, max = 200) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
}

const STATUSES = ['draft', 'active', 'paused', 'archived'];

router.use(requireAuth, requireRole('admin'));

router.get('/', async (_req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 });
    res.json(markets.map((m) => m.toJSON()));
  } catch (err) {
    console.error('[markets] list error:', err.message);
    res.status(500).json({ error: 'Could not load markets.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const slug = clean(body.slug, 60).toLowerCase();
    const countryName = clean(body.countryName, 100);
    const countryCode = clean(body.countryCode, 5);
    if (!slug || !countryName || !countryCode) {
      return res.status(400).json({ error: 'slug, countryName and countryCode are required.' });
    }
    const market = await Market.create({ slug, countryName, countryCode });
    res.status(201).json(market.toJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'A market with this slug already exists.' });
    console.error('[markets] create error:', err.message);
    res.status(500).json({ error: 'Could not create market.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const body = req.body || {};
    const update = {};
    if (body.countryName !== undefined) update.countryName = clean(body.countryName, 100);
    if (body.countryCode !== undefined) update.countryCode = clean(body.countryCode, 5);
    if (body.seoTitle !== undefined) update.seoTitle = clean(body.seoTitle, 200);
    if (body.seoDescription !== undefined) update.seoDescription = clean(body.seoDescription, 300);
    if (body.notes !== undefined) update.notes = clean(body.notes, 2000);
    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) {
        return res.status(400).json({ error: `status must be one of: ${STATUSES.join(', ')}` });
      }
      update.status = body.status;
      if (body.status === 'active') update.activatedAt = new Date();
    }

    const market = await Market.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!market) return res.status(404).json({ error: 'Market not found.' });
    res.json(market.toJSON());
  } catch (err) {
    console.error('[markets] update error:', err.message);
    res.status(500).json({ error: 'Could not update market.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const market = await Market.findByIdAndDelete(req.params.id);
    if (!market) return res.status(404).json({ error: 'Market not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[markets] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete market.' });
  }
});

export default router;
