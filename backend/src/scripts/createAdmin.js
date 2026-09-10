// One-off bootstrap: creates (or resets the password of) the first admin
// account. There is deliberately no public registration route — this
// script is the only way an admin user gets created. Run with
// `npm run create-admin` after setting ADMIN_EMAIL / ADMIN_PASSWORD in
// backend/.env, then blank those two values back out.

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import User from '../models/User.js';
import { hashPassword } from '../auth.js';

async function run() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');

  if (!email || !password) {
    console.error('[create-admin] Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }
  if (password.length < 10) {
    console.error('[create-admin] ADMIN_PASSWORD should be at least 10 characters.');
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await hashPassword(password);
  const user = await User.findOneAndUpdate(
    { email },
    { email, passwordHash, role: 'admin' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`[create-admin] admin user ready: ${user.email}`);
  console.log('[create-admin] Now remove ADMIN_EMAIL / ADMIN_PASSWORD from .env — they are no longer needed.');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[create-admin] failed:', err);
  process.exit(1);
});
