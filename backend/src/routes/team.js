import { Router } from 'express';
import TeamMember from '../models/TeamMember.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// ── Public ──────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const members = await TeamMember.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json(members.map((m) => m.toJSON()));
  } catch (err) {
    console.error('[team] list error:', err.message);
    res.status(500).json({ error: 'Could not load team members.' });
  }
});

// ── Admin ───────────────────────────────────────────────────────────
router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: -1 });
    res.json(members.map((m) => m.toJSON()));
  } catch (err) {
    console.error('[team] admin list error:', err.message);
    res.status(500).json({ error: 'Could not load team members.' });
  }
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { name, role, bio, photo, published, order } = req.body || {};
    if (!name || !String(name).trim()) return res.status(400).json({ error: 'Name is required.' });

    const member = await TeamMember.create({
      name: String(name).trim(),
      role: role ? String(role).trim() : '',
      bio: bio ? String(bio).trim() : '',
      photo: photo ? String(photo).trim() : '',
      published: published !== undefined ? Boolean(published) : true,
      order: order !== undefined && order !== '' ? Number(order) : 0,
    });
    res.status(201).json(member.toJSON());
  } catch (err) {
    console.error('[team] create error:', err.message);
    res.status(500).json({ error: 'Could not add this team member.' });
  }
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { name, role, bio, photo, published, order } = req.body || {};
    const patch = {};
    if (name !== undefined) {
      if (!String(name).trim()) return res.status(400).json({ error: 'Name cannot be empty.' });
      patch.name = String(name).trim();
    }
    if (role !== undefined) patch.role = String(role).trim();
    if (bio !== undefined) patch.bio = String(bio).trim();
    if (photo !== undefined) patch.photo = String(photo).trim();
    if (published !== undefined) patch.published = Boolean(published);
    if (order !== undefined) patch.order = order === '' ? 0 : Number(order);

    const member = await TeamMember.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ error: 'Team member not found.' });
    res.json(member.toJSON());
  } catch (err) {
    console.error('[team] update error:', err.message);
    res.status(500).json({ error: 'Could not save this team member.' });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[team] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete this team member.' });
  }
});

export default router;
