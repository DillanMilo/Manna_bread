import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/constants';
import { addInquiryToTeamup, parseTeamupInquiry } from '@/lib/booking/teamup-inquiry';
import { isRentalType, minimumHoursFor, parseGuestCount } from '@/lib/booking/config';
import {
  buildConfirmationHtml,
  buildConfirmationSubject,
  buildConfirmationText,
  type ConfirmationInput,
} from '@/lib/email/confirmation-email';
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
  rentalSpace?: string;
  startTime?: string;
  requestedHours?: string;
  requestedDate?: string;
  requestedTime?: string;
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
type RecaptchaAssessmentResponse = {
  tokenProperties?: {
    valid?: boolean;
    invalidReason?: string;
    action?: string;
  };
  riskAnalysis?: {
    score?: number;
    reasons?: string[];
  };
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
  'full-building': 'Full building',
  'conference-room': 'Conference room',
  'entire-building': 'Entire building',
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
  const startTime = inquiryType === 'rentals' ? clean(payload.startTime) : '';

  // The availability calendar treats the message as optional; its date and start time say enough.
  if (startTime && !clean(payload.message)) {
    payload.message = 'No message added.';
  }

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

  // JAMIE (5 Nov): every rental request needs an estimated guest count; it sets the minimum length.
  if (inquiryType === 'rentals' && !parseGuestCount(payload.guestCount)) {
    return NextResponse.json(
      { error: 'Please include your estimated guest count.' },
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

  // Calendar requests also go onto Manna's Teamup calendar (grey inquiry) so staff see them live.
  // Best effort: it runs alongside the email and never fails the request.
  const teamupInquiry = startTime
    ? parseTeamupInquiry({
      rentalSpace: clean(payload.rentalSpace),
      requestedDate: clean(payload.requestedDate),
      requestedTime: clean(payload.requestedTime),
      requestedHours: clean(payload.requestedHours),
      name,
      email,
      phone: clean(payload.phone),
      guestCount: clean(payload.guestCount),
      message,
    })
    : null;
  const teamupWrite = teamupInquiry ? addInquiryToTeamup(teamupInquiry) : Promise.resolve('skipped');

  const businessResponse = await sendResendEmail(resendApiKey, {
    from: fromEmail,
    to: splitEmails(toEmail),
    replyTo: email,
    subject,
    text: buildTextEmail(payload, inquiryType),
    html: buildHtmlEmail(payload, inquiryType),
  });

  await teamupWrite;

  if (!businessResponse.ok) {
    const error = await businessResponse.text().catch(() => '');
    console.error('Resend inquiry send failed', { status: businessResponse.status, error });

    return NextResponse.json(
      { error: 'We could not send that inquiry right now. Please try again or email us directly.' },
      { status: 502 },
    );
  }

  const confirmation = buildConfirmationInput(payload, inquiryType);
  const confirmationResponse = await sendResendEmail(resendApiKey, {
    from: fromEmail,
    to: [email],
    replyTo: replyToEmail,
    subject: buildConfirmationSubject(confirmation),
    text: buildConfirmationText(confirmation),
    html: buildConfirmationHtml(confirmation),
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

function buildConfirmationInput(payload: InquiryPayload, inquiryType: InquiryType): ConfirmationInput {
  const config = inquiryConfig[inquiryType];
  const isCalendarRequest = inquiryType === 'rentals' && Boolean(clean(payload.startTime));
  // The request card already shows these, so the "what you sent" list skips them.
  const shownInCard = new Set(['Preferred date', 'Requested start', 'Space', 'Minimum length', 'Inquiry type', 'Source']);
  const message = clean(payload.message);

  return {
    name: clean(payload.name),
    submissionName: inquiryType === 'employment' ? 'application' : `${config.label.toLowerCase()} inquiry`,
    isEmployment: inquiryType === 'employment',
    request: isCalendarRequest
      ? {
        space: displayLabel(payload.rentalSpace),
        date: display(payload.eventDate),
        time: describeRequestedRange(payload),
      }
      : undefined,
    rows: buildRows(payload, inquiryType).filter(([label]) => (isCalendarRequest ? !shownInCard.has(label) : label !== 'Source')),
    message: message === 'No message added.' ? '' : message,
  };
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
      ...(clean(payload.startTime)
        ? [['Requested start', describeRequestedTime(payload)] as [string, string]]
        : clean(payload.rentalWindow)
          ? [['Time window', display(payload.rentalWindow)] as [string, string]]
          : []),
      ...(clean(payload.rentalSpace)
        ? [['Space', displayLabel(payload.rentalSpace)] as [string, string]]
        : []),
      ['Guests', display(payload.guestCount)],
      ...(rentalMinimum(payload)
        ? [['Minimum length', `${rentalMinimum(payload)} hours`] as [string, string]]
        : []),
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

/** JAMIE (5 Nov): the minimum rental length set by the space and guest count, or null when none applies. */
function rentalMinimum(payload: InquiryPayload) {
  const space = clean(payload.rentalSpace);
  const guests = parseGuestCount(payload.guestCount);
  return isRentalType(space) && guests ? minimumHoursFor(space, guests) : null;
}

function describeRequestedTime(payload: InquiryPayload) {
  const hours = Number(clean(payload.requestedHours));
  const minimum = rentalMinimum(payload);
  const length = Number.isInteger(hours) && hours > 0 && hours <= 12
    ? `for ${hours} hour${hours === 1 ? '' : 's'}`
    : minimum
      ? `for at least ${minimum} hours (end time to be discussed)`
      : '(end time to be discussed)';
  return `${clean(payload.startTime)} ${length}`;
}

/** "9:00 AM to 11:00 AM", or "From 3:00 PM, at least 4 hours" when the end is agreed later. */
function describeRequestedRange(payload: InquiryPayload) {
  const start = clean(payload.startTime);
  const hours = Number(clean(payload.requestedHours));
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(start);

  if (!match || !Number.isInteger(hours) || hours <= 0 || hours > 12) {
    const minimum = rentalMinimum(payload);
    return minimum ? `From ${start}, at least ${minimum} hours` : `From ${start}, length planned together`;
  }

  const startHour = (Number(match[1]) % 12) + (match[3] === 'PM' ? 12 : 0);
  const endHour = startHour + hours;
  const end = `${endHour % 12 || 12}:${match[2]} ${endHour >= 12 && endHour < 24 ? 'PM' : 'AM'}`;
  return `${start} to ${end}`;
}

function displayLabel(value: unknown) {
  const cleaned = clean(value);
  return cleaned ? valueLabels[cleaned] ?? cleaned : 'Not provided';
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 2000) : '';
}

function cleanRecaptchaToken(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 10000) : '';
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
  const enterpriseApiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY?.trim();
  const projectId = process.env.RECAPTCHA_PROJECT_ID?.trim();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();

  if (!enterpriseApiKey && !secretKey) {
    return { ok: true };
  }

  const recaptchaToken = cleanRecaptchaToken(token);

  if (!recaptchaToken) {
    return {
      ok: false,
      error: 'Please verify the form and try again.',
      reason: 'missing-token',
    };
  }

  if (enterpriseApiKey && projectId) {
    return verifyRecaptchaAssessment(recaptchaToken, request, enterpriseApiKey, projectId);
  }

  if (!secretKey) {
    return {
      ok: false,
      error: 'Please verify the form and try again.',
      reason: 'verification-not-configured',
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
    const minimumScore = Number(process.env.RECAPTCHA_MIN_SCORE?.trim() || '0.5');

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

async function verifyRecaptchaAssessment(
  recaptchaToken: string,
  request: Request,
  apiKey: string,
  projectId: string,
): Promise<RecaptchaResult> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

  if (!siteKey) {
    return {
      ok: false,
      error: 'Please verify the form and try again.',
      reason: 'verification-not-configured',
    };
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent')?.trim();
  const event: Record<string, string> = {
    token: recaptchaToken,
    siteKey,
    expectedAction: recaptchaAction,
  };

  if (clientIp !== 'unknown') event.userIpAddress = clientIp;
  if (userAgent) event.userAgent = userAgent;

  try {
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event }),
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'verification-request-failed',
        errors: [`http-${response.status}`],
      };
    }

    const result = (await response.json()) as RecaptchaAssessmentResponse;
    const minimumScore = Number(process.env.RECAPTCHA_MIN_SCORE?.trim() || '0.5');
    const score = result.riskAnalysis?.score;
    const action = result.tokenProperties?.action;

    if (!result.tokenProperties?.valid) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'google-failed',
        errors: result.tokenProperties?.invalidReason
          ? [result.tokenProperties.invalidReason]
          : result.riskAnalysis?.reasons,
      };
    }

    if (action !== recaptchaAction) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'action-mismatch',
        action,
      };
    }

    if (typeof score !== 'number') {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'missing-score',
      };
    }

    if (score < minimumScore) {
      return {
        ok: false,
        error: 'Please verify the form and try again.',
        reason: 'score-below-threshold',
        score,
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
  const mode = process.env.RECAPTCHA_MODE?.trim().toLowerCase();

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
