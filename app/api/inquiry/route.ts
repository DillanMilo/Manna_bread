import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/constants';

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  eventDate?: string;
  guestCount?: string;
  eventLocation?: string;
  occasion?: string;
  serviceStyle?: string;
  rentalWindow?: string;
  cateringNeeds?: string;
  helpTopic?: string;
  preferredContact?: string;
  message?: string;
  source?: string;
  company?: string;
};

type InquiryType = 'catering' | 'rentals' | 'general';

const inquiryConfig: Record<InquiryType, { label: string; subject: string; preview: string }> = {
  catering: {
    label: 'Catering',
    subject: 'New Catering Inquiry',
    preview: 'A catering request came in from the website.',
  },
  rentals: {
    label: 'Private Rental',
    subject: 'New Private Rental Inquiry',
    preview: 'A private rental request came in from the website.',
  },
  general: {
    label: 'General',
    subject: 'New Website Message',
    preview: 'A general message came in from the website.',
  },
};

const valueLabels: Record<string, string> = {
  email: 'Email',
  phone: 'Phone',
  either: 'Either is fine',
  pickup: 'Pickup',
  delivery: 'Delivery',
  setup: 'Setup help',
  'not-sure': 'Still deciding',
  'manna-catering': 'Manna catering',
  'outside-catering': 'Outside catering',
  mixed: 'A mix of both',
  general: 'General question',
  'menu-order': 'Menu or order',
  catering: 'Catering',
  rentals: 'Private rental',
  'gift-cards-rewards': 'Gift cards or rewards',
};

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please include your name, email, and a short message.' },
      { status: 400 },
    );
  }

  if (!email.includes('@')) {
    return NextResponse.json(
      { error: 'Please include a valid email address.' },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL ?? CONTACT.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Manna Bakery <onboarding@resend.dev>';
  const inquiryType = getInquiryType(payload.inquiryType);
  const config = inquiryConfig[inquiryType];
  const subject = `${config.subject} from ${name}`;

  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Please call or email us directly.' },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text: buildTextEmail(payload, inquiryType),
      html: buildHtmlEmail(payload, inquiryType),
    }),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => '');
    console.error('Resend inquiry send failed', { status: response.status, error });

    return NextResponse.json(
      { error: 'We could not send that inquiry right now. Please try again or email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function buildTextEmail(payload: InquiryPayload, inquiryType: InquiryType) {
  const config = inquiryConfig[inquiryType];
  const rows = buildRows(payload, inquiryType);

  return [
    config.preview,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    clean(payload.message),
  ].join('\n');
}

function buildHtmlEmail(payload: InquiryPayload, inquiryType: InquiryType) {
  const config = inquiryConfig[inquiryType];
  const rows = buildRows(payload, inquiryType);

  return `
    <div style="margin:0;background:#faf9f6;padding:32px 20px;font-family:Georgia,serif;color:#2d2a26;line-height:1.55">
      <div style="max-width:640px;margin:0 auto;border:1px solid #e2d8c9;background:#fffdf9">
        <div style="background:#3d5247;padding:28px 30px;color:#faf9f6">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c">
            ${escapeHtml(config.label)}
          </p>
          <h1 style="margin:0;font-size:28px;font-weight:500;line-height:1.2">${escapeHtml(config.subject)}</h1>
          <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#f5f2ed">
            ${escapeHtml(config.preview)}
          </p>
        </div>

        <div style="padding:28px 30px">
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="width:35%;padding:10px 12px;border-bottom:1px solid #ece4d8;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#6b705c">${escapeHtml(label)}</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #ece4d8;font-family:Arial,sans-serif;font-size:14px;color:#2d2a26">${escapeHtml(value)}</td>
                  </tr>
                `,
              )
              .join('')}
          </table>

          <div style="margin-top:24px">
            <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#6b705c">Message</p>
            <div style="white-space:pre-wrap;border-left:3px solid #c9a84c;background:#f5f2ed;padding:16px 18px;font-family:Arial,sans-serif;font-size:15px;color:#2d2a26">${escapeHtml(clean(payload.message))}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildRows(payload: InquiryPayload, inquiryType: InquiryType): Array<[string, string]> {
  const commonRows: Array<[string, string]> = [
    ['Name', display(payload.name)],
    ['Email', display(payload.email)],
    ['Phone', display(payload.phone)],
    ['Preferred reply', displayLabel(payload.preferredContact)],
    ['Inquiry type', inquiryConfig[inquiryType].label],
  ];

  const contextRows: Record<InquiryType, Array<[string, string]>> = {
    catering: [
      ['Gathering', display(payload.occasion)],
      ['Date', display(payload.eventDate)],
      ['Guests', display(payload.guestCount)],
      ['Service', displayLabel(payload.serviceStyle)],
      ['Location', display(payload.eventLocation)],
    ],
    rentals: [
      ['Gathering', display(payload.occasion)],
      ['Preferred date', display(payload.eventDate)],
      ['Time window', display(payload.rentalWindow)],
      ['Guests', display(payload.guestCount)],
      ['Food plans', displayLabel(payload.cateringNeeds)],
    ],
    general: [
      ['Topic', displayLabel(payload.helpTopic)],
    ],
  };

  return [
    ...commonRows,
    ...contextRows[inquiryType],
    ['Source', display(payload.source, 'website')],
  ];
}

function getInquiryType(value: unknown): InquiryType {
  const type = clean(value);
  return type === 'catering' || type === 'rentals' ? type : 'general';
}

function display(value: unknown, fallback = 'Not provided') {
  return clean(value) || fallback;
}

function displayLabel(value: unknown) {
  const cleaned = clean(value);
  return cleaned ? valueLabels[cleaned] ?? cleaned : 'Not provided';
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 2000) : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
