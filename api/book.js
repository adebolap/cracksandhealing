const nodemailer = require('nodemailer');

function getTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

// Per-person packages multiply by guest count; fixed packages ignore it
const PER_PERSON = {
  'Open Session': 75000,
  'Bridal Shower': 95000,
  'Healing Circle': 95000,
};
const FIXED = {
  'Couples Session': 185000,
  'Friendship Date': 80000,   // per person, min 3
  'Birthday Package': 80000,  // per person (honoree at ₦65k avg'd in)
  'Team Bonding': 75000,      // per head (flat fee added separately)
  'Healing Session (Solo)': 120000,
};
const TEAM_FLAT = 150000; // added on top of per-head for Team Bonding

function calculateTotal(pkg, people) {
  const n = Math.max(1, parseInt(people) || 1);
  const pkgKey = Object.keys({ ...PER_PERSON, ...FIXED }).find(k => pkg.toLowerCase().includes(k.toLowerCase()));
  if (!pkgKey) return 75000 * n;
  if (pkgKey === 'Team Bonding') return TEAM_FLAT + (FIXED['Team Bonding'] * n);
  if (PER_PERSON[pkgKey]) return PER_PERSON[pkgKey] * n;
  return FIXED[pkgKey] * n;
}

function fmt(n) { return '₦' + n.toLocaleString('en-NG'); }

function generateRef(date, pkg) {
  // Format: CK-DDMMYY-PKG-XXX  e.g. CK-110726-OS-4A2
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(2);
  const pkgCodes = {
    'Open Session': 'OS', 'Couples Session': 'CP', 'Friendship Date': 'FD',
    'Birthday Package': 'BD', 'Bridal Shower': 'BS', 'Team Bonding': 'TB',
    'Healing Session': 'HS', 'Healing Circle': 'HC',
  };
  const code = Object.entries(pkgCodes).find(([k]) => pkg.toLowerCase().includes(k.toLowerCase()))?.[1] || 'CK';
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `CK-${dd}${mm}${yy}-${code}-${rand}`;
}

function row(label, value) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid #2e2c25;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:14px;color:#d4cfc4;text-align:right;font-weight:500;">${value}</span>
  </div>`;
}

function rowMono(label, value) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;border-bottom:1px solid #2e2c25;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:14px;color:#d4cfc4;text-align:right;font-weight:500;font-family:'Courier New',monospace;letter-spacing:0.06em;">${value}</span>
  </div>`;
}

function rowAmount(label, value) {
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:10px 0;gap:16px;">
    <span style="font-size:13px;color:#6e6b5e;flex-shrink:0;">${label}</span>
    <span style="font-size:20px;color:#f0ebe1;font-weight:700;">${value}</span>
  </div>`;
}

function buildHtml({ name, pkg, date, people, bookingRef, total, deposit }) {
  const badgeDate = date.toUpperCase();
  const shortDate = date.split(',').slice(1).join(',').trim();

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>You're registered - Cracks & Healing</title></head>
<body style="margin:0;padding:0;background-color:#1e1e18;font-family:Arial,sans-serif;color:#d4cfc4;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
<div style="background-color:#2b2b22;border-radius:4px;overflow:hidden;">

  <div style="padding:40px 40px 36px;">
    <div style="display:inline-block;background-color:#3a3a2e;color:#9e9880;font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:6px 12px;border-radius:2px;margin-bottom:24px;">CRACKS &amp; HEALING &middot; ${badgeDate}</div>
    <div style="font-family:Georgia,serif;font-size:36px;font-weight:700;color:#f0ebe1;line-height:1.15;margin-bottom:6px;">You're registered.<br><span style="font-style:italic;color:#c9a96e;">Cracks &amp; Healing</span></div>
    <p style="font-size:15px;color:#9e9880;line-height:1.6;margin-top:14px;">Hi ${name}, a kintsugi repair workshop awaits you on ${shortDate}. We can't wait to see you.</p>
  </div>

  <div style="background-color:#242420;margin:0 40px 8px;border-radius:4px;padding:28px 28px 20px;">
    <div style="font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#6e6b5e;margin-bottom:16px;">Workshop Details</div>
    <hr style="border:none;border-top:1px solid #38362d;margin-bottom:20px;"/>
    ${row('Package', pkg)}
    ${row('Date', date)}
    ${row('Time', '11:00 AM')}
    ${row('Duration', '2 hours')}
    ${row('Venue', 'Artzmania, Plot 9B Block 56, Lekki Phase 1, Lagos')}
    ${row('Guests', people + (parseInt(people) === 1 ? ' person' : ' people'))}
    ${rowMono('Reference', bookingRef)}
  </div>

  <div style="background-color:#242420;margin:0 40px 8px;border-radius:4px;padding:28px 28px 20px;">
    <div style="font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#6e6b5e;margin-bottom:16px;">Payment Details</div>
    <hr style="border:none;border-top:1px solid #38362d;margin-bottom:20px;"/>
    <p style="font-size:14px;color:#9e9880;line-height:1.7;margin-bottom:24px;">To confirm your spot, transfer the workshop fee to the account below and send proof of payment to <a href="mailto:kellyraise@gmail.com" style="color:#c9a96e;text-decoration:none;">kellyraise@gmail.com</a>.</p>
    ${row('Bank', 'Zenith Bank')}
    ${row('Account Name', 'Kelly Praise Craft')}
    ${rowMono('Account Number', '1017408775')}
    ${row('Total session fee', total)}
    ${rowAmount('50% Deposit to confirm', deposit)}
  </div>

  <div style="background-color:#1e1e18;border:1px solid #38362d;margin:0 40px 40px;border-radius:4px;padding:20px 24px;">
    <p style="font-size:13px;color:#6e6b5e;line-height:1.7;text-align:center;margin:0;">Your spot is held for 48 hours. Payment confirms your registration. Spots are limited.</p>
  </div>

  <div style="padding:0 40px 32px;text-align:center;">
    <p style="font-size:12px;color:#4a4840;line-height:1.7;margin:0;">Cracks &amp; Healing &middot; Lagos, Nigeria<br>Questions? <a href="https://wa.me/2348113993291" style="color:#6e6b5e;text-decoration:none;">Chat with us on WhatsApp</a><br><br><a href="https://cracksandhealing.vercel.app" style="color:#6e6b5e;text-decoration:none;">cracksandhealing.vercel.app</a></p>
  </div>

</div>
</div>
</body></html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, whatsapp, pkg, date, people, notes } = req.body || {};

  if (!name || !email || !date) {
    return res.status(400).json({ error: 'name, email and date are required' });
  }

  const selectedPkg = pkg || 'Open Session';
  const guestCount = people || '1';
  const totalAmt = calculateTotal(selectedPkg, guestCount);
  const depositAmt = Math.round(totalAmt / 2);
  const bookingRef = generateRef(date, selectedPkg);

  const html = buildHtml({
    name, pkg: selectedPkg, date, people: guestCount, bookingRef,
    total: fmt(totalAmt), deposit: fmt(depositAmt),
  });

  const transport = getTransport();

  try {
    // Confirmation to customer, BCC Kelly on every booking
    await transport.sendMail({
      from: `"Cracks & Healing" <${process.env.GMAIL_USER}>`,
      to: `${name} <${email}>`,
      bcc: 'kellyraise@gmail.com',
      subject: `You're registered - Cracks & Healing | ${pkg || 'Open Session'}`,
      html,
    });
  } catch (err) {
    console.error('Gmail error:', err.message);
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ ok: true, ref: bookingRef });
};
