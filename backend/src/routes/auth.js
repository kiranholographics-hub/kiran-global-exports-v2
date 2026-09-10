import { Router } from 'express';
import User from '../models/User.js';
import { verifyPassword, signToken, requireAuth } from '../auth.js';

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
