import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/constants';

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  eventDate?: string;
  guestCount?: string;
  message?: string;
  source?: string;
  company?: string;
};

const inquiryLabels: Record<string, string> = {
  catering: 'Catering',
  rentals: 'Private Rental',
  general: 'General',
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

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL ?? CONTACT.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Manna Bakery <onboarding@resend.dev>';
  const inquiryType = clean(payload.inquiryType) || 'general';
  const subject = `New ${inquiryLabels[inquiryType] ?? 'Website'} Inquiry from ${name}`;

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
      text: buildTextEmail(payload),
      html: buildHtmlEmail(payload),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'We could not send that inquiry right now. Please try again or email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function buildTextEmail(payload: InquiryPayload) {
  return [
    `Name: ${clean(payload.name)}`,
    `Email: ${clean(payload.email)}`,
    `Phone: ${clean(payload.phone) || 'Not provided'}`,
    `Inquiry: ${inquiryLabels[clean(payload.inquiryType)] ?? 'General'}`,
    `Event date: ${clean(payload.eventDate) || 'Not provided'}`,
    `Guest count: ${clean(payload.guestCount) || 'Not provided'}`,
    `Source: ${clean(payload.source) || 'website'}`,
    '',
    clean(payload.message),
  ].join('\n');
}

function buildHtmlEmail(payload: InquiryPayload) {
  const rows = [
    ['Name', clean(payload.name)],
    ['Email', clean(payload.email)],
    ['Phone', clean(payload.phone) || 'Not provided'],
    ['Inquiry', inquiryLabels[clean(payload.inquiryType)] ?? 'General'],
    ['Event date', clean(payload.eventDate) || 'Not provided'],
    ['Guest count', clean(payload.guestCount) || 'Not provided'],
    ['Source', clean(payload.source) || 'website'],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#1f2a23;line-height:1.5">
      <h2 style="margin:0 0 16px">New Manna inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 12px;border:1px solid #e6e0d6;font-weight:bold">${escapeHtml(label)}</td>
                <td style="padding:8px 12px;border:1px solid #e6e0d6">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
      <p style="margin:18px 0 6px;font-weight:bold">Message</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(clean(payload.message))}</p>
    </div>
  `;
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
