import { Router } from 'express';
import Certification from '../models/Certification.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// ── Public ──────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const items = await Certification.find({ published: true }).sort({ order: 1, createdAt: 1 });
    res.json(items.map((c) => c.toJSON()));
  } catch (err) {
    console.error('[certifications] list error:', err.message);
    res.status(500).json({ error: 'Could not load certifications.' });
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const items = await Certification.find().sort({ order: 1, createdAt: 1 });
    res.json(items.map((c) => c.toJSON()));
  } catch (err) {
    console.error('[certifications] admin list error:', err.message);
    res.status(500).json({ error: 'Could not load certifications.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { name, image, alt, text, caption, published, order } = req.body || {};
    if (!name || !String(name).trim()) return res.status(400).json({ error: 'Name is required.' });

    const item = await Certification.create({
      name: String(name).trim(),
      image: image ? String(image).trim() : '',
      alt: alt ? String(alt).trim() : '',
      text: text ? String(text).trim() : '',
      caption: caption ? String(caption).trim() : '',
      published: published !== undefined ? Boolean(published) : true,
      order: order !== undefined && order !== '' ? Number(order) : 0,
    });
    res.status(201).json(item.toJSON());
  } catch (err) {
    console.error('[certifications] create error:', err.message);
    res.status(500).json({ error: 'Could not add this certification.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { name, image, alt, text, caption, published, order } = req.body || {};
    const patch = {};
    if (name !== undefined) {
      if (!String(name).trim()) return res.status(400).json({ error: 'Name cannot be empty.' });
      patch.name = String(name).trim();
    }
    if (image !== undefined) patch.image = String(image).trim();
    if (alt !== undefined) patch.alt = String(alt).trim();
    if (text !== undefined) patch.text = String(text).trim();
    if (caption !== undefined) patch.caption = String(caption).trim();
    if (published !== undefined) patch.published = Boolean(published);
    if (order !== undefined) patch.order = order === '' ? 0 : Number(order);

    const item = await Certification.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Certification not found.' });
    res.json(item.toJSON());
  } catch (err) {
    console.error('[certifications] update error:', err.message);
    res.status(500).json({ error: 'Could not save this certification.' });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const item = await Certification.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Certification not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[certifications] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this certification.' });
  }
});

export default router;
