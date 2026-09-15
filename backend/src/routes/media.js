import { Router } from 'express';
import multer from 'multer';
import Media from '../models/Media.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB — plenty for optimized web images, keeps DB documents small

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, WEBP, GIF or SVG images are allowed.'));
    }
    cb(null, true);
  },
});

// ── Public ──────────────────────────────────────────────────────────
// Unauthenticated on purpose — these are the actual <img src> URLs
// embedded in public pages (updates, team photos, etc).
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).select('+data');
    if (!media) return res.status(404).end();
    res.set('Content-Type', media.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(media.data);
  } catch {
    res.status(404).end();
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const items = await Media.find().sort({ createdAt: -1 }).select('-data');
    res.json(items.map((m) => m.toJSON()));
  } catch (err) {
    console.error('[media] list error:', err.message);
    res.status(500).json({ error: 'Could not load the image library.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file was uploaded.' });
    try {
      const media = await Media.create({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
      });
      res.status(201).json(media.toJSON());
    } catch (createErr) {
      console.error('[media] create error:', createErr.message);
      res.status(500).json({ error: 'Could not save this image.' });
    }
  });
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ error: 'Image not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[media] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this image.' });
  }
});

export default router;
