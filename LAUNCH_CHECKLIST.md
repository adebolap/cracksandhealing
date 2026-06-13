# Launch Update Checklist

Use this checklist to turn the static landing page into a production-ready website before sharing it publicly.

## 1. Payments

Recommended option for Nigerian customers: **Paystack Payment Page or Paystack payment link**.

What is needed:

- A Paystack account for Cracks & Healing.
- A live Paystack Payment Page or payment link for donations, bookings, consultations, or event deposits.
- Bank transfer enabled in the Paystack dashboard if you want customers to pay from their banking app.
- The real Paystack URL to replace the placeholder `https://paystack.com/` in `index.html`.

Where to update:

- Replace the Paystack placeholder in the payment section button.
- Update the payment section copy if the payment is for donations, coaching, event registration, or consultations.

## 2. Booking

Recommended starter setup: **Calendly Free** or **Google Calendar appointment scheduling**.

What is needed:

- One booking link for the main offer, such as consultations, prayer sessions, events, or discovery calls.
- Session length, available days, timezone, and buffer time.
- Confirmation message that includes the Paystack payment link and payment instructions.
- Cancellation/rescheduling rules.

Where to update:

- Replace the Calendly placeholder `https://calendly.com/` with the real booking URL.
- Replace the Google Calendar placeholder `https://calendar.google.com/` if Google Calendar will be used instead.
- Update booking copy if payment must be completed before a booking is confirmed.

## 3. Email Signup

The current signup form validates email on the front end only. It does not save subscribers yet.

What is needed:

- An email marketing tool or storage destination, such as Mailchimp, Brevo, ConvertKit, Airtable, Google Forms, or a Vercel serverless function.
- A subscriber list name.
- A privacy note explaining what subscribers will receive.
- A success message and error message for real submissions.

Where to update:

- Connect the form in `script.js` to the chosen service.
- Replace the current temporary success message once submissions are saved.

## 4. Social and Contact Links

What is needed:

- The real Facebook page URL.
- A real contact email address.
- Optional Instagram, WhatsApp, YouTube, or TikTok URLs.

Where to update:

- Replace the Facebook placeholder in the signup/contact section.
- Replace `hello@cracksandhealing.com` with the real inbox.

## 5. Brand and Content

What is needed:

- Final brand name spelling.
- Final mission statement.
- Preferred call-to-action wording.
- Any real testimonials or quotes that are approved for public use.
- Any brand photos, logo files, or color preferences.

Where to update:

- Update hero copy, story copy, resource prompts, and community sections in `index.html`.
- Add image assets if real photography or logo files become available.

## 6. Vercel Deployment

Recommended Vercel settings for this static site:

- Framework Preset: `Other`
- Build Command: leave blank
- Output Directory: `.` or default root
- Install Command: not needed
- Root Directory: repository root

What is needed:

- A GitHub repository connected to Vercel.
- Optional custom domain.
- Optional analytics.

## Suggested Launch Order

1. Replace placeholder Facebook, booking, email, and Paystack links.
2. Deploy to Vercel preview.
3. Test desktop and mobile pages.
4. Submit a test booking.
5. Make a small test payment through Paystack if live mode is enabled.
6. Connect the email signup form.
7. Add a custom domain.
8. Share the public link on Facebook.
