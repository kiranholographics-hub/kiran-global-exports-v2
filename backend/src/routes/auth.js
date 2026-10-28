import { Router } from 'express';
import User from '../models/User.js';
import { verifyPassword, hashPassword, signToken, requireAuth } from '../auth.js';

const router = Router();

// Same hand-rolled per-IP limiter shape used in enquiries.js/chatLead.js —
// tighter here since this guards real credentials, not a public form.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const current = attempts.get(ip) || { count: 0, start: now };
  if (now - current.start > WINDOW_MS) {
    attempts.set(ip, { count: 1, start: now });
    return false;
  }
  current.count += 1;
  attempts.set(ip, current);
  return current.count > MAX_ATTEMPTS;
}

router.post('/login', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
  }
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+passwordHash');
    // Same generic error whether the email doesn't exist or the password is
    // wrong — never reveal which one it was.
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = signToken(user.toJSON());
    res.json({ ok: true, token, user: user.toJSON() });
  } catch (err) {
    console.error('[auth] login error:', err.message);
    res.status(500).json({ error: 'Could not sign in. Please try again.' });
  }
});

// bcrypt only reads the first 72 bytes, so a longer password would be
// silently cut short — refuse it instead.
const MIN_PASSWORD = 10;
const MAX_PASSWORD_BYTES = 72;

router.post('/change-password', requireAuth, async (req, res) => {
  if (rateLimited(`pw:${req.user.id}`)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }
  try {
    const currentPassword = String(req.body?.currentPassword || '');
    const newPassword = String(req.body?.newPassword || '');
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Enter your current password and a new one.' });
    }
    if (newPassword.length < MIN_PASSWORD) {
      return res.status(400).json({ error: `The new password must be at least ${MIN_PASSWORD} characters.` });
    }
    if (Buffer.byteLength(newPassword) > MAX_PASSWORD_BYTES) {
      return res.status(400).json({ error: `The new password must be at most ${MAX_PASSWORD_BYTES} characters.` });
    }
    if (newPassword === currentPassword) {
      return res.status(400).json({ error: 'The new password must be different from the current one.' });
    }

    const user = await User.findById(req.user.id).select('+passwordHash');
    if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
      return res.status(401).json({ error: 'The current password is not correct.' });
    }

    user.passwordHash = await hashPassword(newPassword);
    user.passwordChangedAt = new Date();
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    console.error('[auth] change-password error:', err.message);
    res.status(500).json({ error: 'Could not change the password. Please try again.' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ error: 'Not authenticated' });
    res.json(user.toJSON());
  } catch (err) {
    console.error('[auth] me error:', err.message);
    res.status(500).json({ error: 'Could not load account.' });
  }
});

export default router;
