import { BRAND, CONTACT, SOCIAL } from '@/lib/constants';
import { getSiteUrl } from '@/lib/siteUrl';

/**
 * The email a visitor receives after sending an inquiry from the site.
 * Table layout with inline styles so it holds up in Gmail, Outlook and
 * Apple Mail. Copy is a first pass for Quill to polish in Manna's voice.
 */

export type ConfirmationInput = {
  name: string;
  /** e.g. "private rental inquiry", "catering inquiry", "application". */
  submissionName: string;
  isEmployment: boolean;
  /** Set when the visitor picked a slot on the availability calendar. */
  request?: { space: string; date: string; time: string };
  /** What they sent, as label/value pairs. */
  rows: Array<[string, string]>;
  message: string;
};

const colours = {
  page: '#f5f2ed',
  card: '#fffdf9',
  cream: '#faf9f6',
  forest: '#3d5247',
  gold: '#c9a84c',
  walnut: '#3e2723',
  charcoal: '#2d2a26',
  olive: '#6b705c',
  line: '#e8dfd1',
};

const display = "'Playfair Display', Georgia, 'Times New Roman', serif";
const accent = "Lora, Georgia, serif";
const body = "'Libre Franklin', 'Helvetica Neue', Arial, sans-serif";

export function buildConfirmationSubject(input: ConfirmationInput) {
  if (input.request) return 'Your rental request is with the Manna team';
  if (input.isEmployment) return 'We received your application';
  return `We received your ${input.submissionName}`;
}

function intro(input: ConfirmationInput) {
  if (input.request) {
    return 'Your request has been sent to the Manna team. Nothing is booked yet. We will look over the date and details and get back to you shortly to talk through timing, setup and our rental policies.';
  }
  if (input.isEmployment) {
    return 'Thank you for introducing yourself. Your application is with our team, and we will be in touch if there is a fitting next step.';
  }
  return 'Your note has reached the Manna team. We will get back to you shortly.';
}

const nextSteps = [
  'We check your date against our calendar.',
  'We reach out to confirm the details, timing and rental policies.',
  'Your date is held once we have confirmed it with you personally.',
];

export function buildConfirmationText(input: ConfirmationInput) {
  return [
    `Hi ${firstName(input.name)},`,
    '',
    intro(input),
    '',
    ...(input.request
      ? [
        'Your request',
        `Space: ${input.request.space}`,
        `Date: ${input.request.date}`,
        `Time: ${input.request.time}`,
        '',
        'What happens next',
        ...nextSteps.map((step, index) => `${index + 1}. ${step}`),
        '',
      ]
      : []),
    'What you sent us:',
    ...input.rows.map(([label, value]) => `${label}: ${value}`),
    '',
    ...(input.message ? ['', 'Message:', input.message] : []),
    '',
    `To add anything, reply to this email or reach us at ${CONTACT.email} or ${CONTACT.phone}.`,
    '',
    `${BRAND.name}, ${BRAND.tagline}`,
    `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.state} ${CONTACT.address.zip}`,
  ].join('\n');
}

export function buildConfirmationHtml(input: ConfirmationInput) {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/images/manna-wordmark.png`;
  const address = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.state} ${CONTACT.address.zip}`;
  const eyebrow = input.request ? 'Request received' : input.isEmployment ? 'Application received' : 'Message received';

  const requestCard = input.request
    ? `
      <tr>
        <td style="padding:0 40px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:${colours.forest};border-radius:120px 120px 14px 14px">
            <tr>
              <td align="center" style="padding:34px 28px 28px">
                <p style="margin:0 0 6px;font-family:${body};font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${colours.gold}">Your request</p>
                <p style="margin:0 0 18px;font-family:${display};font-size:24px;line-height:1.25;color:#ffffff">${escapeHtml(input.request.space)}</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 auto">
                  <tr>
                    <td style="padding:6px 14px 6px 0;font-family:${body};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${colours.gold};text-align:right">Date</td>
                    <td style="padding:6px 0;font-family:${body};font-size:15px;color:#ffffff;text-align:left">${escapeHtml(input.request.date)}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 14px 6px 0;font-family:${body};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${colours.gold};text-align:right">Time</td>
                    <td style="padding:6px 0;font-family:${body};font-size:15px;color:#ffffff;text-align:left">${escapeHtml(input.request.time)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 40px 4px">
          <p style="margin:0 0 14px;font-family:${body};font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${colours.olive}">What happens next</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${nextSteps
              .map(
                (step, index) => `
              <tr>
                <td width="38" valign="top" style="padding:0 0 14px">
                  <div style="width:26px;height:26px;border-radius:13px;border:1px solid ${colours.gold};font-family:${display};font-size:13px;line-height:26px;text-align:center;color:${colours.walnut}">${index + 1}</div>
                </td>
                <td valign="top" style="padding:3px 0 14px;font-family:${body};font-size:15px;line-height:1.6;color:${colours.charcoal}">${escapeHtml(step)}</td>
              </tr>`,
              )
              .join('')}
          </table>
        </td>
      </tr>`
    : '';

  const detailRows = input.rows
    .map(
      ([label, value]) => `
        <tr>
          <td width="38%" style="padding:9px 0;border-bottom:1px solid ${colours.line};font-family:${body};font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${colours.olive};vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:9px 0;border-bottom:1px solid ${colours.line};font-family:${body};font-size:14px;line-height:1.5;color:${colours.charcoal}">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(buildConfirmationSubject(input))}</title>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600&family=Lora:ital@1&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${colours.page}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(intro(input))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${colours.page}">
    <tr>
      <td align="center" style="padding:32px 14px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:collapse;background:${colours.card};border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(61,82,71,0.12)">
          <tr>
            <td align="center" style="background:${colours.forest};padding:38px 30px 30px">
              <a href="${siteUrl}" style="text-decoration:none">
                <img src="${logoUrl}" width="170" alt="${escapeHtml(BRAND.name)}" style="display:block;width:170px;max-width:60%;height:auto;border:0;margin:0 auto">
              </a>
              <p style="margin:14px 0 0;font-family:${body};font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${colours.gold}">${escapeHtml(BRAND.tagline)}</p>
            </td>
          </tr>
          <tr>
            <td style="height:3px;background:${colours.gold};font-size:0;line-height:0">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:40px 40px 28px">
              <p style="margin:0 0 10px;font-family:${body};font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${colours.gold}">${eyebrow}</p>
              <h1 style="margin:0 0 16px;font-family:${display};font-size:30px;font-weight:500;line-height:1.2;color:${colours.walnut}">Thank you, ${escapeHtml(firstName(input.name))}.</h1>
              <p style="margin:0;font-family:${body};font-size:16px;line-height:1.75;color:${colours.charcoal}">${escapeHtml(intro(input))}</p>
            </td>
          </tr>
          ${requestCard}
          <tr>
            <td style="padding:24px 40px 8px">
              <p style="margin:0 0 6px;font-family:${body};font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${colours.olive}">What you sent us</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${detailRows}</table>
              ${input.message ? `<p style="margin:20px 0 0;padding:16px 18px;border-left:3px solid ${colours.gold};background:${colours.cream};font-family:${accent};font-style:italic;font-size:15px;line-height:1.7;color:${colours.charcoal};white-space:pre-wrap">${escapeHtml(input.message)}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 38px">
              <p style="margin:0;font-family:${body};font-size:14px;line-height:1.7;color:${colours.olive}">
                Need to add something? Simply reply to this email, or reach us at
                <a href="mailto:${CONTACT.email}" style="color:${colours.walnut}">${escapeHtml(CONTACT.email)}</a> or
                <a href="tel:${CONTACT.phone.replace(/[^\d+]/g, '')}" style="color:${colours.walnut};white-space:nowrap">${escapeHtml(CONTACT.phone)}</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background:${colours.forest};padding:26px 30px">
              <p style="margin:0 0 6px;font-family:${display};font-size:16px;color:#ffffff">${escapeHtml(BRAND.name)}</p>
              <p style="margin:0 0 4px;font-family:${body};font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72)">${escapeHtml(address)}</p>
              <p style="margin:0 0 12px;font-family:${body};font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72)">Monday to Saturday, ${escapeHtml(CONTACT.hours.mondayThroughSaturday)}</p>
              <p style="margin:0;font-family:${body};font-size:12px">
                <a href="${siteUrl}" style="color:${colours.gold};text-decoration:none">mannabread.com</a>
                <span style="color:rgba(255,255,255,0.35)">&nbsp;&middot;&nbsp;</span>
                <a href="${SOCIAL.instagram}" style="color:${colours.gold};text-decoration:none">Instagram</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'there';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
