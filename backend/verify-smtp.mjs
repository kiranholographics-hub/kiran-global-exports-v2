// Standalone SMTP diagnostic — run with: node verify-smtp.mjs
// Tests your .env SMTP credentials directly, independent of the main app,
// and prints exactly what was loaded (partially masked) so hidden
// whitespace/line-ending issues are easy to spot.

import 'dotenv/config';
import nodemailer from 'nodemailer';

function mask(value) {
  if (!value) return '(empty)';
  const trimmed = value;
  const hasLeadingSpace = /^\s/.test(trimmed);
  const hasTrailingSpace = /\s$/.test(trimmed);
  const hasCarriageReturn = trimmed.includes('\r');
  const visible = trimmed.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
  return `"${visible}" (length: ${trimmed.length}${hasLeadingSpace ? ', HAS LEADING SPACE' : ''}${hasTrailingSpace ? ', HAS TRAILING SPACE' : ''}${hasCarriageReturn ? ', HAS \\r CHARACTER — this is almost certainly your problem' : ''})`;
}

console.log('--- What was actually loaded from .env ---');
console.log('SMTP_HOST:', mask(process.env.SMTP_HOST));
console.log('SMTP_PORT:', mask(process.env.SMTP_PORT));
console.log('SMTP_USER:', mask(process.env.SMTP_USER));
console.log('SMTP_PASS:', process.env.SMTP_PASS ? mask(process.env.SMTP_PASS).replace(/"[^"]*"/, '"(hidden, but checked below)"') : '(empty)');
if (process.env.SMTP_PASS) {
  const p = process.env.SMTP_PASS;
  console.log('  SMTP_PASS length:', p.length, '(a Gmail App Password is exactly 16 characters, no spaces)');
  console.log('  SMTP_PASS has \\r:', p.includes('\r'));
  console.log('  SMTP_PASS has space:', p.includes(' '));
}

console.log('\n--- Attempting real SMTP login ---');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log('✅ SUCCESS — Gmail accepted these credentials. SMTP is correctly configured.');
} catch (err) {
  console.log('❌ FAILED —', err.message);
  console.log('\nThis confirms Gmail itself is rejecting the username/password combination.');
  console.log('Next step: generate a brand-new App Password at https://myaccount.google.com/apppasswords');
  console.log('and paste ONLY the 16 characters (no spaces) as SMTP_PASS, using a plain text editor like VS Code (not Notepad).');
}
