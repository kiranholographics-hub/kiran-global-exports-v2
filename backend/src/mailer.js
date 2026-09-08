import nodemailer from 'nodemailer';
import { signAction } from './security.js';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[mailer] SMTP_HOST / SMTP_USER / SMTP_PASS not set — lead emails will not be sent.');
    return null;
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Emails the team about a new pending chat lead, with one-click
 * Approve / Decline links. Never throws — a failed email should not
 * block the visitor's request from being recorded.
 */
export async function sendLeadNotification(lead) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: 'not-configured' };

  const base = (process.env.APP_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');
  const approveUrl = `${base}/api/chat/lead/${lead.id}/approve?token=${signAction(lead.id, 'approve')}`;
  const declineUrl = `${base}/api/chat/lead/${lead.id}/decline?token=${signAction(lead.id, 'decline')}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New AI chat request</h2>
      <p style="color: #666; margin-top: 0;">Kiran Global Exports website</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #666;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(lead.name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;">${escapeHtml(lead.email)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666; vertical-align: top;">Question</td><td style="padding: 6px 0;">${escapeHtml(lead.question || '(none provided)')}</td></tr>
      </table>
      <div style="margin: 24px 0;">
        <a href="${approveUrl}" style="display:inline-block; background:#1e1a17; color:#faf6ef; padding:12px 22px; border-radius:999px; text-decoration:none; font-weight:600; margin-right:10px;">Approve chat</a>
        <a href="${declineUrl}" style="display:inline-block; background:#fff; color:#a0392a; border:1px solid #a0392a; padding:11px 22px; border-radius:999px; text-decoration:none; font-weight:600;">Decline</a>
      </div>
      <p style="color: #999; font-size: 12px;">Approving unlocks the AI chat on their end automatically — no further action needed.</p>
    </div>
  `.trim();

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER,
      replyTo: lead.email,
      subject: `New chat request from ${lead.name}`,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('[mailer] Failed to send lead notification:', err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Sends a summary email for a batch of unnotified visits. Never throws —
 * a failed digest just gets retried on the next scheduler tick since the
 * visits stay marked notified:false until the caller confirms the send.
 */
export async function sendVisitDigest(visits, { windowMinutes } = {}) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: 'not-configured' };
  if (!visits.length) return { sent: false, reason: 'no-visits' };

  const byPath = new Map();
  for (const v of visits) byPath.set(v.path, (byPath.get(v.path) || 0) + 1);
  const topPaths = [...byPath.entries()].sort((a, b) => b[1] - a[1]);

  const byCountry = new Map();
  for (const v of visits) {
    const label = v.country || 'Unknown';
    byCountry.set(label, (byCountry.get(label) || 0) + 1);
  }
  const topCountries = [...byCountry.entries()].sort((a, b) => b[1] - a[1]);

  const referrers = [...new Set(visits.map((v) => v.referrer).filter(Boolean))].slice(0, 10);

  const rowsHtml = topPaths
    .map(
      ([path, count]) =>
        `<tr><td style="padding:5px 10px 5px 0; color:#1e1a17;">${escapeHtml(path)}</td><td style="padding:5px 0; color:#666; text-align:right;">${count}</td></tr>`
    )
    .join('');

  const countryRowsHtml = topCountries
    .map(
      ([country, count]) =>
        `<tr><td style="padding:5px 10px 5px 0; color:#1e1a17;">${escapeHtml(country)}</td><td style="padding:5px 0; color:#666; text-align:right;">${count}</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">${visits.length} new visit${visits.length === 1 ? '' : 's'}</h2>
      <p style="color: #666; margin-top: 0;">Kiran Global Exports website — last ${windowMinutes || ''} min</p>
      <p style="color:#666; font-size:13px; margin: 16px 0 4px;"><strong>Pages</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 16px;">
        ${rowsHtml}
      </table>
      <p style="color:#666; font-size:13px; margin: 16px 0 4px;"><strong>Countries</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 16px;">
        ${countryRowsHtml}
      </table>
      ${
        referrers.length
          ? `<p style="color:#666; font-size:13px; margin-top:20px;"><strong>Referrers:</strong><br/>${referrers.map(escapeHtml).join('<br/>')}</p>`
          : ''
      }
    </div>
  `.trim();

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.VISIT_NOTIFY_EMAIL_TO || process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER,
      subject: `${visits.length} new visit${visits.length === 1 ? '' : 's'} on the website`,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('[mailer] Failed to send visit digest:', err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Emails the team about a new contact-form enquiry. Never throws — a
 * failed email should not block the visitor's enquiry from being saved.
 */
export async function sendEnquiryNotification(enquiry) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: 'not-configured' };

  const rows = [
    ['Name', enquiry.name],
    ['Company', enquiry.company],
    ['Country', enquiry.country],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Product interest', enquiry.productInterest],
    ['Estimated quantity', enquiry.estimatedQuantity],
    ['Product', enquiry.productSlug],
    ['Source', enquiry.source],
  ].filter(([, value]) => value);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 6px 0; color: #666; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td><td style="padding: 6px 0 6px 16px;"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New website enquiry</h2>
      <p style="color: #666; margin-top: 0;">Kiran Global Exports website</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        ${rowsHtml}
      </table>
      ${
        enquiry.message
          ? `<div style="margin-top: 12px;"><p style="color:#666; margin-bottom:4px;">Message</p><p style="white-space: pre-wrap; margin-top:0;">${escapeHtml(enquiry.message)}</p></div>`
          : ''
      }
    </div>
  `.trim();

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER,
      replyTo: enquiry.email,
      subject: `New enquiry from ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ''}`,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error('[mailer] Failed to send enquiry notification:', err.message);
    return { sent: false, reason: err.message };
  }
}
