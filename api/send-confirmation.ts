import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Cal.com webhook sends BOOKING_CREATED events with this shape (simplified)
interface CalWebhookPayload {
  triggerEvent: string;
  payload: {
    title: string;
    startTime: string; // ISO 8601
    endTime: string;
    uid: string;
    attendees: { name: string; email: string }[];
    location?: string;
    organizer?: { name: string; email: string };
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    full: d.toLocaleDateString('en-NG', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'Africa/Lagos',
    }),
    short: d.toLocaleDateString('en-NG', {
      month: 'long', day: 'numeric', timeZone: 'Africa/Lagos',
    }),
    badge: d.toLocaleDateString('en-NG', {
      month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Africa/Lagos',
    }).toUpperCase(),
    time: d.toLocaleTimeString('en-NG', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos',
    }),
  };
}

function depositAmount(packageName: string): string {
  const prices: Record<string, number> = {
    'Open Session': 75000,
    'Couples Session': 185000,
    'Friendship Date': 255000,
    'Birthday Package': 305000,
    'Bridal Shower': 475000,
    'Team Bonding': 600000,
    'Healing Session': 120000,
    'Healing Circle': 190000,
  };
  const match = Object.entries(prices).find(([k]) =>
    packageName.toLowerCase().includes(k.toLowerCase())
  );
  const total = match ? match[1] : 75000;
  return `₦${(total / 2).toLocaleString('en-NG')}`;
}

function buildEmailHtml(opts: {
  name: string;
  packageName: string;
  fullDate: string;
  shortDate: string;
  badgeDate: string;
  sessionTime: string;
  venue: string;
  ref: string;
  deposit: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're registered – Cracks & Healing</title>
</head>
<body style="margin:0;padding:0;background-color:#1e1e18;font-family:Arial,sans-serif;color:#d4cfc4;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background-color:#2b2b22;border-radius:4px;overflow:hidden;">

      <!-- Hero -->
      <div style="padding:40px 40px 36px;">
        <div style="display:inline-block;background-color:#3a3a2e;color:#9e9880;font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:6px 12px;border-radius:2px;margin-bottom:24px;">
          CRACKS &amp; HEALING &middot; ${opts.badgeDate}
        </div>
        <div style="font-family:Georgia,serif;font-size:36px;font-weight:700;color:#f0ebe1;line-height:1.15;margin-bottom:6px;">
          You're registered.<br>
          <span style="font-style:italic;color:#c9a96e;">Cracks &amp; Healing</span>
        </div>
        <p style="font-size:15px;color:#9e9880;line-height:1.6;margin-top:14px;">
          Hi ${opts.name}, a kintsugi repair workshop awaits you on ${opts.shortDate}. We can't wait to see you.
        </p>
      </div>

      <!-- Session Details -->
      <div style="background-color:#242420;margin:0 40px 8px;border-radius:4px;padding:28px 28px 20px;">
        <div style="font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#6e6b5e;margin-bottom:16px;">Session Details</div>
        <hr style="border:none;border-top:1px solid #38362d;margin-bottom:20px;" />
        ${row('Package', opts.packageName)}
        ${row('Date', opts.fullDate)}
        ${row('Time', opts.sessionTime)}
        ${row('Duration', '2 hours')}
        ${row('Venue', opts.venue)}
        ${rowMono('Reference', opts.ref)}
      </div>

      <!-- Payment Details -->
      <div style="background-color:#242420;margin:0 40px 8px;border-radius:4px;padding:28px 28px 20px;">
        <div style="font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#6e6b5e;margin-bottom:16px;">Payment Details</div>
        <hr style="border:none;border-top:1px solid #38362d;margin-bottom:20px;" />
        <p style="font-size:14px;color:#9e9880;line-height:1.7;margin-bottom:24px;">
          To confirm your spot, transfer the deposit to the account below and send proof of payment to
          <a href="mailto:kellyraise@gmail.com" style="color:#c9a96e;text-decoration:none;">kellyraise@gmail.com</a>.
        </p>
        ${row('Bank', 'Zenith Bank')}
        ${row('Account Name', 'Kelly Praise Craft')}
        ${rowMono('Account Number', '1017408775')}
        ${rowAmount('Amount (50% deposit)', opts.deposit)}
      </div>

      <!-- Notice -->
      <div style="background-color:#1e1e18;border:1px solid #38362d;margin:0 40px 40px;border-radius:4px;padding:20px 24px;">
        <p style="font-size:13px;color:#6e6b5e;line-height:1.7;text-align:center;margin:0;">
          Your spot is held for 48 hours. Payment confirms your registration. Spots are limited.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:0 40px 32px;text-align:center;">
        <p style="font-size:12px;color:#4a4840;line-height:1.7;margin:0;">
          Cracks &amp; Healing &middot; Lagos, Nigeria<br>
          Questions? <a href="https://wa.me/2348113993291" style="color:#6e6b5e;text-decoration:none;">Chat with us on WhatsApp</a><br><br>
          <a href="https://cracksandhealing.vercel.app" style="color:#6e6b5e;text-decoration:none;">cracksandhealing.vercel.app</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid #2e2c25;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:14px;color:#d4cfc4;text-align:right;font-weight:500;">${value}</span>
  </div>`;
}

function rowMono(label: string, value: string) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid #2e2c25;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:14px;color:#d4cfc4;text-align:right;font-weight:500;font-family:'Courier New',monospace;letter-spacing:0.06em;">${value}</span>
  </div>`;
}

function rowAmount(label: string, value: string) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:20px;color:#f0ebe1;font-weight:700;">${value}</span>
  </div>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify Cal.com webhook secret
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers['x-cal-signature-256'];
    if (sig !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const body = req.body as CalWebhookPayload;

  // Only act on new bookings
  if (body.triggerEvent !== 'BOOKING_CREATED') {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const { payload } = body;
  const attendee = payload.attendees?.[0];
  if (!attendee?.email) {
    return res.status(400).json({ error: 'No attendee email' });
  }

  const dates = formatDate(payload.startTime);
  const packageName = payload.title ?? 'Open Session';
  const venue = payload.location ?? 'TBC — we'll confirm via WhatsApp';
  const ref = `CK-${payload.uid?.slice(0, 8).toUpperCase() ?? 'BOOKING'}`;
  const deposit = depositAmount(packageName);

  const html = buildEmailHtml({
    name: attendee.name,
    packageName,
    fullDate: dates.full,
    shortDate: dates.short,
    badgeDate: dates.badge,
    sessionTime: dates.time,
    venue,
    ref,
    deposit,
  });

  const { error } = await resend.emails.send({
    from: 'Cracks & Healing <onboarding@resend.dev>',
    to: attendee.email,
    bcc: 'kellyraise@gmail.com',
    subject: `You're registered – Cracks & Healing | ${packageName}`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error });
  }

  return res.status(200).json({ ok: true });
}
