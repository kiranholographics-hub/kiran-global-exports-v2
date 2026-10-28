import { Router } from 'express';
import cors from 'cors';
import Update from '../models/Update.js';
import { requireAuth, requireRole } from '../auth.js';
import { suggestSeoMeta } from '../aiClient.js';
import { publishToInstagram, isInstagramConfigured } from '../instagramClient.js';

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

// Fire-and-forget: an Instagram outage or API error should never fail the
// admin's save, so this is never awaited by the route handler — it just
// updates the post's own instagramPostId once (if) it succeeds.
function shareToInstagramIfNeeded(update) {
  if (!update.published || !update.coverImage || update.instagramPostId || !isInstagramConfigured()) return;
  // A post dated for later waits: shareDueInstagramPosts() picks it up once
  // its time comes, so it never reaches Instagram before the site.
  if (new Date(update.publishedAt) > new Date()) {
    if (!update.instagramPending) Update.findByIdAndUpdate(update._id, { instagramPending: true }).catch(() => {});
    return;
  }
  const caption = update.excerpt ? `${update.title}\n\n${update.excerpt}` : update.title;
  publishToInstagram({ imageUrl: update.coverImage, caption })
    .then((postId) => Update.findByIdAndUpdate(update._id, { instagramPostId: postId, instagramPending: false }))
    .catch((err) => console.error('[updates] Instagram share failed:', err.message));
}

// Run on a timer (server.js). Shares scheduled posts whose time has come.
// Each one is claimed first, so two overlapping runs cannot post it twice.
export async function shareDueInstagramPosts() {
  if (!isInstagramConfigured()) return;
  const due = await Update.find({ published: true, instagramPending: true, publishedAt: { $lte: new Date() } });
  for (const post of due) {
    const claimed = await Update.findOneAndUpdate(
      { _id: post._id, instagramPending: true },
      { instagramPending: false },
      { new: true }
    );
    if (claimed) shareToInstagramIfNeeded(claimed);
  }
}

// Posts dated in the future are scheduled: hidden from every public route
// until their time comes, but visible to the admin.
const live = () => ({ published: true, publishedAt: { $lte: new Date() } });

// Accepts only market slugs of the form the Market model uses, drops
// duplicates, and keeps the list a sane size. An empty result means "all
// countries", so a mistyped list can never silently hide a post.
function cleanMarkets(value) {
  if (!Array.isArray(value)) return [];
  const slugs = value
    .map((s) => String(s || '').toLowerCase().trim())
    .filter((s) => /^[a-z0-9-]{1,60}$/.test(s));
  return [...new Set(slugs)].slice(0, 60);
}

// The prerender build runs the site on a throwaway localhost origin (see
// routes/markets.js), so the one public route it needs is open to any
// origin. It returns only what /api/updates already returns publicly.
const allowAnyOrigin = cors();

// ── Public ──────────────────────────────────────────────────────────
// Posts for one country page: those written for that country first, then
// the all-countries ones, newest first within each, capped at `limit`.
router.get('/for-market/:marketSlug', allowAnyOrigin, async (req, res) => {
  try {
    const slug = String(req.params.marketSlug || '').toLowerCase();
    const limit = Math.min(Number(req.query.limit) || 3, 12);
    const specific = await Update.find({ ...live(), markets: slug })
      .sort({ publishedAt: -1 })
      .limit(limit);
    let updates = specific;
    if (specific.length < limit) {
      const general = await Update.find({
        ...live(),
        $or: [{ markets: { $exists: false } }, { markets: { $size: 0 } }],
      })
        .sort({ publishedAt: -1 })
        .limit(limit - specific.length);
      updates = [...specific, ...general];
    }
    res.json(updates.map((u) => u.toJSON()));
  } catch (err) {
    console.error('[updates] for-market error:', err.message);
    res.status(500).json({ error: 'Could not load updates.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const updates = await Update.find(live())
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
    const update = await Update.findOne({ slug: req.params.slug, ...live() });
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
    const { title, excerpt, body, coverImage, published, publishedAt, markets } = req.body || {};
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
      markets: cleanMarkets(markets),
    });
    shareToInstagramIfNeeded(update);
    res.status(201).json(update.toJSON());
  } catch (err) {
    console.error('[updates] create error:', err.message);
    res.status(500).json({ error: 'Could not create this update.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, excerpt, body, coverImage, published, publishedAt, markets } = req.body || {};
    const patch = {};
    if (markets !== undefined) patch.markets = cleanMarkets(markets);
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
    shareToInstagramIfNeeded(update);
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
