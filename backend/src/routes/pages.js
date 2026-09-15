import { Router } from 'express';
import Page from '../models/Page.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);
}

// Appends -2, -3, ... until the slug is free, so two pages with the same
// title don't collide on the unique index. `excludeId` lets an edit keep
// its own existing slug without tripping over itself.
async function uniqueSlug(base, excludeId) {
  let slug = base || 'page';
  let n = 2;
  while (await Page.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

// ── Public ──────────────────────────────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, published: true });
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    res.json(page.toJSON());
  } catch (err) {
    console.error('[pages] get error:', err.message);
    res.status(500).json({ error: 'Could not load this page.' });
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    res.json(pages.map((p) => p.toJSON()));
  } catch (err) {
    console.error('[pages] admin list error:', err.message);
    res.status(500).json({ error: 'Could not load pages.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, metaDescription, body, published } = req.body || {};
    if (!title || !String(title).trim()) return res.status(400).json({ error: 'Title is required.' });
    if (!body || !String(body).trim()) return res.status(400).json({ error: 'Body is required.' });

    const slug = await uniqueSlug(slugify(title));
    const page = await Page.create({
      title: String(title).trim(),
      slug,
      metaDescription: metaDescription ? String(metaDescription).trim() : '',
      body: String(body).trim(),
      published: published !== undefined ? Boolean(published) : true,
    });
    res.status(201).json(page.toJSON());
  } catch (err) {
    console.error('[pages] create error:', err.message);
    res.status(500).json({ error: 'Could not create this page.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, metaDescription, body, published } = req.body || {};
    const patch = {};
    if (title !== undefined) {
      if (!String(title).trim()) return res.status(400).json({ error: 'Title cannot be empty.' });
      patch.title = String(title).trim();
      patch.slug = await uniqueSlug(slugify(title), req.params.id);
    }
    if (metaDescription !== undefined) patch.metaDescription = String(metaDescription).trim();
    if (body !== undefined) {
      if (!String(body).trim()) return res.status(400).json({ error: 'Body cannot be empty.' });
      patch.body = String(body).trim();
    }
    if (published !== undefined) patch.published = Boolean(published);

    const page = await Page.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    res.json(page.toJSON());
  } catch (err) {
    console.error('[pages] update error:', err.message);
    res.status(500).json({ error: 'Could not save this page.' });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[pages] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this page.' });
  }
});

export default router;
