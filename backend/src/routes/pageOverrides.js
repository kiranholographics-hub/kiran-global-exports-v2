import { Router } from 'express';
import cors from 'cors';
import PageOverride from '../models/PageOverride.js';
import { requireAuth, requireRole } from '../auth.js';
import { cleanFaqs, cleanParagraphs, cleanText } from '../marketStats.js';

// Same reasoning as the public routes in markets.js: the prerender script
// and the live pages read this without credentials, from origins the
// app-wide CORS policy does not know about, and the data is public copy.
const allowAnyOrigin = cors();

const router = Router();

const SECTIONS = ['export', 'solutions'];
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,100}$/;

const PUBLIC_FIELDS = 'section slug seoTitle seoDescription heading lead intro faqs';

router.get('/public', allowAnyOrigin, async (_req, res) => {
  try {
    const rows = await PageOverride.find({}, PUBLIC_FIELDS);
    res.json(rows.map((r) => r.toJSON()));
  } catch (err) {
    console.error('[page-overrides] public list error:', err.message);
    res.status(500).json({ error: 'Could not load page text.' });
  }
});

router.use(requireAuth, requireRole('admin'));

router.get('/', async (_req, res) => {
  try {
    const rows = await PageOverride.find().sort({ section: 1, slug: 1 });
    res.json(rows.map((r) => r.toJSON()));
  } catch (err) {
    console.error('[page-overrides] list error:', err.message);
    res.status(500).json({ error: 'Could not load page text.' });
  }
});

function parseKey(req, res) {
  const section = String(req.params.section || '').toLowerCase();
  const slug = String(req.params.slug || '').toLowerCase();
  if (!SECTIONS.includes(section) || !SLUG_RE.test(slug)) {
    res.status(400).json({ error: 'Unknown page.' });
    return null;
  }
  return { section, slug };
}

// Upsert. Sending every field empty removes the override, so the page goes
// back to the copy that ships with the site.
router.put('/:section/:slug', async (req, res) => {
  const key = parseKey(req, res);
  if (!key) return;
  try {
    const body = req.body || {};
    const fields = {
      seoTitle: cleanText(body.seoTitle, 200),
      seoDescription: cleanText(body.seoDescription, 320),
      heading: cleanText(body.heading, 200),
      lead: cleanText(body.lead, 800),
      intro: cleanParagraphs(body.intro),
      faqs: cleanFaqs(body.faqs),
    };
    const isEmpty =
      !fields.seoTitle && !fields.seoDescription && !fields.heading && !fields.lead &&
      fields.intro.length === 0 && fields.faqs.length === 0;

    if (isEmpty) {
      await PageOverride.deleteOne(key);
      return res.json({ ok: true, removed: true });
    }
    const row = await PageOverride.findOneAndUpdate(
      key,
      { $set: fields },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(row.toJSON());
  } catch (err) {
    console.error('[page-overrides] save error:', err.message);
    res.status(500).json({ error: 'Could not save page text.' });
  }
});

router.delete('/:section/:slug', async (req, res) => {
  const key = parseKey(req, res);
  if (!key) return;
  try {
    await PageOverride.deleteOne(key);
    res.json({ ok: true });
  } catch (err) {
    console.error('[page-overrides] delete error:', err.message);
    res.status(500).json({ error: 'Could not reset page text.' });
  }
});

export default router;
