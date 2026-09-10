import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '';
const TOKEN_TTL = '12h';
const SALT_ROUNDS = 12;

if (!SECRET) {
  console.warn(
    '[auth] JWT_SECRET is not set in .env — logins cannot be safely signed. ' +
      'Add one before using the admin login feature.'
  );
}

export function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: TOKEN_TTL });
}

/**
 * Verifies `Authorization: Bearer <token>` and attaches `{ id, role }` to
 * `req.user`. 401s on anything wrong (missing header, bad/expired token) —
 * deliberately doesn't distinguish the reason in the response body so a
 * caller can't probe for which part of the token was invalid.
 */
export function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'Not authenticated' });
  }
}

/**
 * Must run after requireAuth. Usage: requireAuth, requireRole('admin')
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    return next();
  };
}
