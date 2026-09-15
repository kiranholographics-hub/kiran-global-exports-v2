import { Router } from 'express';
import Testimonial from '../models/Testimonial.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// ── Public ──────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const testimonials = await Testimonial.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit);
    res.json(testimonials.map((t) => t.toJSON()));
  } catch (err) {
    console.error('[testimonials] list error:', err.message);
    res.status(500).json({ error: 'Could not load testimonials.' });
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json(testimonials.map((t) => t.toJSON()));
  } catch (err) {
    console.error('[testimonials] admin list error:', err.message);
    res.status(500).json({ error: 'Could not load testimonials.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { authorName, authorRole, country, quote, rating, published, order } = req.body || {};
    if (!authorName || !String(authorName).trim()) return res.status(400).json({ error: 'Author name is required.' });
    if (!quote || !String(quote).trim()) return res.status(400).json({ error: 'Quote is required.' });

    const testimonial = await Testimonial.create({
      authorName: String(authorName).trim(),
      authorRole: authorRole ? String(authorRole).trim() : '',
      country: country ? String(country).trim() : '',
      quote: String(quote).trim(),
      rating: rating !== undefined && rating !== '' ? Number(rating) : undefined,
      published: published !== undefined ? Boolean(published) : true,
      order: order !== undefined && order !== '' ? Number(order) : 0,
    });
    res.status(201).json(testimonial.toJSON());
  } catch (err) {
    console.error('[testimonials] create error:', err.message);
    res.status(500).json({ error: 'Could not create this testimonial.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { authorName, authorRole, country, quote, rating, published, order } = req.body || {};
    const patch = {};
    if (authorName !== undefined) {
      if (!String(authorName).trim()) return res.status(400).json({ error: 'Author name cannot be empty.' });
      patch.authorName = String(authorName).trim();
    }
    if (authorRole !== undefined) patch.authorRole = String(authorRole).trim();
    if (country !== undefined) patch.country = String(country).trim();
    if (quote !== undefined) {
      if (!String(quote).trim()) return res.status(400).json({ error: 'Quote cannot be empty.' });
      patch.quote = String(quote).trim();
    }
    if (rating !== undefined) patch.rating = rating === '' ? undefined : Number(rating);
    if (published !== undefined) patch.published = Boolean(published);
    if (order !== undefined) patch.order = order === '' ? 0 : Number(order);

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found.' });
    res.json(testimonial.toJSON());
  } catch (err) {
    console.error('[testimonials] update error:', err.message);
    res.status(500).json({ error: 'Could not save this testimonial.' });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[testimonials] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this testimonial.' });
  }
});

export default router;
