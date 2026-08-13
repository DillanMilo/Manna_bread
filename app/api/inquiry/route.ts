import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/constants';
import {
  employmentApplicationFields,
  employmentRequiredFields,
} from '@/lib/employmentApplication';

type EmploymentApplicationValue = string | string[];

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
  roleInterest?: string;
  availability?: string;
  weeklyHours?: string;
  startDate?: string;
  experience?: string;
  preferredContact?: string;
  message?: string;
  source?: string;
  company?: string;
  startedAt?: string;
  recaptchaToken?: string;
  application?: Record<string, unknown>;
};

type InquiryType = 'catering' | 'rentals' | 'general' | 'employment';
type RateLimitRule = {
  key: string;
  maxRequests: number;
  windowMs: number;
};
type RateLimitEntry = {
  count: number;
  resetAt: number;
};
type RecaptchaResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};
type RecaptchaResult = {
  ok: boolean;
  error?: string;
  reason?: string;
  errors?: string[];
  score?: number;
  minimumScore?: number;
  action?: string;
};
type ResendMessage = {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

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
  employment: {
    label: 'Employment',
    subject: 'New Employment Application',
    preview: 'A prospective team member applied through the website.',
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
  'front-of-house': 'Front of house',
  barista: 'Barista',
  'bakery-pastry': 'Bakery or pastry',
  kitchen: 'Kitchen',
  leadership: 'Leadership',
  'where-needed': 'Wherever I am needed',
  'under-15': 'Fewer than 15',
  '15-25': '15–25',
  '25-35': '25–35',
  '35-plus': '35 or more',
  flexible: 'Flexible',
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const recaptchaAction = 'manna_inquiry';
const minimumSubmissionMs = 2500;

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

  const inquiryType = getInquiryType(payload.inquiryType);
  const application = inquiryType === 'employment'
    ? cleanEmploymentApplication(payload.application)
    : {};
  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const clientIp = getClientIp(request);

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

  if (inquiryType === 'employment') {
    const missingApplicationField = employmentRequiredFields.find(
      (field) => !hasEmploymentValue(application[field.name]),
    );

    if (missingApplicationField) {
      return NextResponse.json(
        { error: `Please complete “${missingApplicationField.label}.”` },
        { status: 400 },
      );
    }
  }

  if (!passesSubmissionTiming(payload.startedAt)) {
    return NextResponse.json(
      { error: 'Please wait a moment and try again.' },
      { status: 400 },
    );
  }

  const rateLimit = checkRateLimits([
    { key: `ip:${clientIp}`, maxRequests: 6, windowMs: 10 * 60 * 1000 },
    { key: `email:${email.toLowerCase()}`, maxRequests: 3, windowMs: 30 * 60 * 1000 },
  ]);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many inquiries were sent recently. Please wait a few minutes and try again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.INQUIRY_TO_EMAIL ?? CONTACT.email;
  const fromEmail = (process.env.RESEND_FROM_EMAIL ?? 'Manna Bakery <onboarding@resend.dev>').trim();
  payload.application = application;
  const config = inquiryConfig[inquiryType];
  const subject = `${config.subject} from ${name}`;
  const replyToEmail = splitEmails(toEmail)[0] ?? CONTACT.email;

  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Please call or email us directly.' },
      { status: 503 },
    );
  }

  const recaptcha = await verifyRecaptcha(payload.recaptchaToken, request);

  if (!recaptcha.ok) {
    const recaptchaLog = buildRecaptchaLog(recaptcha);

    if (!canAllowRecaptchaMonitorFailure(recaptcha)) {
      console.error('reCAPTCHA verification failed', recaptchaLog);

      return NextResponse.json(
        { error: recaptcha.error },
        { status: 400 },
      );
    }

    console.warn('reCAPTCHA verification failed in monitor mode; allowing inquiry submission.', recaptchaLog);
  }

  const businessResponse = await sendResendEmail(resendApiKey, {
    from: fromEmail,
    to: splitEmails(toEmail),
    replyTo: email,
    subject,
    text: buildTextEmail(payload, inquiryType),
    html: buildHtmlEmail(payload, inquiryType),
  });

  if (!businessResponse.ok) {
    const error = await businessResponse.text().catch(() => '');
    console.error('Resend inquiry send failed', { status: businessResponse.status, error });

    return NextResponse.json(
      { error: 'We could not send that inquiry right now. Please try again or email us directly.' },
      { status: 502 },
    );
  }

  const confirmationResponse = await sendResendEmail(resendApiKey, {
    from: fromEmail,
    to: [email],
    replyTo: replyToEmail,
    subject: buildConfirmationSubject(inquiryType),
    text: buildConfirmationTextEmail(payload, inquiryType),
    html: buildConfirmationHtmlEmail(payload, inquiryType),
  });

  if (!confirmationResponse.ok) {
    const error = await confirmationResponse.text().catch(() => '');
    console.error('Resend confirmation send failed', { status: confirmationResponse.status, error });
  }

  return NextResponse.json({ ok: true });
}

async function sendResendEmail(apiKey: string, message: ResendMessage) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: message.from,
      to: message.to,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });
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

function buildConfirmationSubject(inquiryType: InquiryType) {
  return inquiryType === 'employment'
    ? 'We received your application'
    : `We received your ${inquiryConfig[inquiryType].label.toLowerCase()} inquiry`;
}

function buildConfirmationTextEmail(payload: InquiryPayload, inquiryType: InquiryType) {
  const config = inquiryConfig[inquiryType];
  const submissionName = inquiryType === 'employment'
    ? 'application'
    : `${config.label.toLowerCase()} inquiry`;
  const rows = buildRows(payload, inquiryType).filter(([label]) => label !== 'Source');

  return [
    `Hi ${clean(payload.name)},`,
    '',
    `Thank you for reaching out to Manna Bakery. We received your ${submissionName} and will follow up if there is a fitting next step.`,
    '',
    'Here is what you sent us:',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    clean(payload.message),
    '',
    `If you need to add anything, reply to this email or contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
    '',
    'Manna Bakery',
  ].join('\n');
}

function buildConfirmationHtmlEmail(payload: InquiryPayload, inquiryType: InquiryType) {
  const config = inquiryConfig[inquiryType];
  const submissionName = inquiryType === 'employment'
    ? 'application'
    : `${config.label.toLowerCase()} inquiry`;
  const confirmationHeading = inquiryType === 'employment'
    ? 'We received your application'
    : 'We received your inquiry';
  const confirmationIntro = inquiryType === 'employment'
    ? 'Thank you for introducing yourself. We will follow up if there is a fitting next step.'
    : 'Thank you for reaching out. We will follow up as soon as we can.';
  const rows = buildRows(payload, inquiryType).filter(([label]) => label !== 'Source');

  return `
    <div style="margin:0;background:#faf9f6;padding:32px 20px;font-family:Georgia,serif;color:#2d2a26;line-height:1.55">
      <div style="max-width:640px;margin:0 auto;border:1px solid #e2d8c9;background:#fffdf9">
        <div style="background:#3d5247;padding:28px 30px;color:#faf9f6">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c">
            Manna Bakery
          </p>
          <h1 style="margin:0;font-size:28px;font-weight:500;line-height:1.2">${escapeHtml(confirmationHeading)}</h1>
          <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#f5f2ed">
            ${escapeHtml(confirmationIntro)}
          </p>
        </div>

        <div style="padding:28px 30px">
          <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:#2d2a26">
            Hi ${escapeHtml(clean(payload.name))}, we received your ${escapeHtml(submissionName)}. Here is a copy of what you sent us.
          </p>

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

          <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#5f5a50">
            If you need to add anything, reply to this email or contact us at ${escapeHtml(CONTACT.email)} or ${escapeHtml(CONTACT.phone)}.
          </p>
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
    employment: [
      ...buildEmploymentRows(payload.application),
    ],
  };

  return [
    ...commonRows,
    ...contextRows[inquiryType],
    ['Source', display(payload.source, 'website')],
  ];
}

function cleanEmploymentApplication(value: unknown): Record<string, EmploymentApplicationValue> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const submitted = value as Record<string, unknown>;
  const cleaned: Record<string, EmploymentApplicationValue> = {};

  for (const field of employmentApplicationFields) {
    const fieldValue = submitted[field.name];

    if (field.type === 'checkbox') {
      cleaned[field.name] = Array.isArray(fieldValue)
        ? fieldValue.map(clean).filter(Boolean).slice(0, field.options?.length ?? 20)
        : [];
      continue;
    }

    cleaned[field.name] = clean(fieldValue);
  }

  return cleaned;
}

function buildEmploymentRows(value: unknown): Array<[string, string]> {
  const application = cleanEmploymentApplication(value);

  return employmentApplicationFields.map((field) => {
    const fieldValue = application[field.name];
    const displayed = Array.isArray(fieldValue)
      ? fieldValue.join(', ') || 'Not provided'
      : display(fieldValue);

    return [field.emailLabel ?? field.label, displayed];
  });
}

function hasEmploymentValue(value: EmploymentApplicationValue | undefined) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
}

function getInquiryType(value: unknown): InquiryType {
  const type = clean(value);
  return type === 'catering' || type === 'rentals' || type === 'employment'
    ? type
    : 'general';
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

function splitEmails(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function passesSubmissionTiming(startedAt: unknown) {
  const startedAtMs = Number(clean(startedAt));

  if (!Number.isFinite(startedAtMs)) {
    return false;
  }

  const ageMs = Date.now() - startedAtMs;
  return ageMs >= minimumSubmissionMs && ageMs <= 24 * 60 * 60 * 1000;
}

function checkRateLimits(rules: RateLimitRule[]) {
  const now = Date.now();
  let blockedUntil = 0;

  for (const rule of rules) {
    const entry = rateLimitStore.get(rule.key);

    if (entry && entry.resetAt > now && entry.count >= rule.maxRequests) {
      blockedUntil = Math.max(blockedUntil, entry.resetAt);
    }
  }

  if (blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((blockedUntil - now) / 1000),
    };
  }

  for (const rule of rules) {
    const entry = rateLimitStore.get(rule.key);

    if (!entry || entry.resetAt <= now) {
      rateLimitStore.set(rule.key, { count: 1, resetAt: now + rule.windowMs });
      continue;
    }

    entry.count += 1;
  }

  pruneRateLimitStore(now);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < 500) return;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

async function verifyRecaptcha(token: unknown, request: Request): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return { ok: true };
  }

  const recaptchaToken = clean(token);

  if (!recaptchaToken) {
    return {
      ok: false,
      error: 'Please verify the form and try again.',
      reason: 'missing-token',
    };
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: recaptchaToken,
  });
  const clientIp = getClientIp(request);

  if (clientIp !== 'unknown') {
    body.set('remoteip', clientIp);
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const result = (await response.json()) as RecaptchaResponse;
    const minimumScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');

    if (!result.success) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'google-failed',
        errors: result['error-codes'],
      };
    }

    if (result.action && result.action !== recaptchaAction) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'action-mismatch',
        action: result.action,
      };
    }

    if (typeof result.score === 'number' && result.score < minimumScore) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'score-below-threshold',
        score: result.score,
        minimumScore,
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Please verify the form and try again.',
      reason: 'verification-request-failed',
    };
  }
}

function isRecaptchaMonitorMode() {
  const mode = process.env.RECAPTCHA_MODE?.toLowerCase();

  return mode === 'monitor' || mode === 'off' || mode === 'false';
}

function canAllowRecaptchaMonitorFailure(result: RecaptchaResult) {
  return isRecaptchaMonitorMode() && result.reason !== 'missing-token';
}

function buildRecaptchaLog(result: RecaptchaResult) {
  return {
    reason: result.reason,
    errors: result.errors,
    score: result.score,
    minimumScore: result.minimumScore,
    action: result.action,
  };
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  return (
    forwardedFor ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
