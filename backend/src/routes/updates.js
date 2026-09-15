import { Router } from 'express';
import Update from '../models/Update.js';
import { requireAuth, requireRole } from '../auth.js';
import { suggestSeoMeta } from '../aiClient.js';

const router = Router();

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);
}

// Appends -2, -3, ... until the slug is free, so two posts with the same
// title don't collide on the unique index. `excludeId` lets an edit keep
// its own existing slug without tripping over itself.
async function uniqueSlug(base, excludeId) {
  let slug = base || 'update';
  let n = 2;
  while (await Update.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

// ── Public ──────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const updates = await Update.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
    res.json(updates.map((u) => u.toJSON()));
  } catch (err) {
    console.error('[updates] list error:', err.message);
    res.status(500).json({ error: 'Could not load updates.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const update = await Update.findOne({ slug: req.params.slug, published: true });
    if (!update) return res.status(404).json({ error: 'Update not found.' });
    res.json(update.toJSON());
  } catch (err) {
    console.error('[updates] get error:', err.message);
    res.status(500).json({ error: 'Could not load this update.' });
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const updates = await Update.find().sort({ publishedAt: -1 });
    res.json(updates.map((u) => u.toJSON()));
  } catch (err) {
    console.error('[updates] admin list error:', err.message);
    res.status(500).json({ error: 'Could not load updates.' });
  }
});

router.post('/suggest-seo', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, body } = req.body || {};
    if (!body || !String(body).trim()) {
      return res.status(400).json({ error: 'Write the update body first, then ask for suggestions.' });
    }
    const suggestion = await suggestSeoMeta({ title, body: String(body).trim() });
    res.json(suggestion);
  } catch (err) {
    console.error('[updates] suggest-seo error:', err.message);
    res.status(502).json({ error: 'Could not generate suggestions right now.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, excerpt, body, coverImage, published, publishedAt } = req.body || {};
    if (!title || !String(title).trim()) return res.status(400).json({ error: 'Title is required.' });
    if (!body || !String(body).trim()) return res.status(400).json({ error: 'Body is required.' });

    const slug = await uniqueSlug(slugify(title));
    const update = await Update.create({
      title: String(title).trim(),
      slug,
      excerpt: excerpt ? String(excerpt).trim() : '',
      body: String(body).trim(),
      coverImage: coverImage ? String(coverImage).trim() : '',
      published: published !== undefined ? Boolean(published) : true,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    });
    res.status(201).json(update.toJSON());
  } catch (err) {
    console.error('[updates] create error:', err.message);
    res.status(500).json({ error: 'Could not create this update.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, excerpt, body, coverImage, published, publishedAt } = req.body || {};
    const patch = {};
    if (title !== undefined) {
      if (!String(title).trim()) return res.status(400).json({ error: 'Title cannot be empty.' });
      patch.title = String(title).trim();
      patch.slug = await uniqueSlug(slugify(title), req.params.id);
    }
    if (excerpt !== undefined) patch.excerpt = String(excerpt).trim();
    if (body !== undefined) {
      if (!String(body).trim()) return res.status(400).json({ error: 'Body cannot be empty.' });
      patch.body = String(body).trim();
    }
    if (coverImage !== undefined) patch.coverImage = String(coverImage).trim();
    if (published !== undefined) patch.published = Boolean(published);
    if (publishedAt !== undefined) patch.publishedAt = new Date(publishedAt);

    const update = await Update.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!update) return res.status(404).json({ error: 'Update not found.' });
    res.json(update.toJSON());
  } catch (err) {
    console.error('[updates] update error:', err.message);
    res.status(500).json({ error: 'Could not save this update.' });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) return res.status(404).json({ error: 'Update not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[updates] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this update.' });
  }
});

export default router;
