import { Router } from 'express';
import Settings from '../models/Settings.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

async function getOrCreateSettings() {
  let settings = await Settings.findOne({ key: 'global' });
  if (!settings) settings = await Settings.create({ key: 'global' });
  return settings;
}

router.get('/', async (_req, res) => {
  const settings = await getOrCreateSettings();
  res.json(settings.toJSON());
});

router.patch('/', async (req, res) => {
  const { notifyWhatsappNumber } = req.body || {};
  const update = {};
  if (notifyWhatsappNumber !== undefined) {
    // WhatsApp numbers are dialled with country code, digits only (e.g.
    // 919983911181) — strip anything else so a pasted "+91 99839 11181"
    // still works.
    update.notifyWhatsappNumber = String(notifyWhatsappNumber).replace(/[^\d]/g, '');
  }
  const settings = await Settings.findOneAndUpdate({ key: 'global' }, update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
  res.json(settings.toJSON());
});

export default router;
