import 'server-only';

import {
  BOOKING_TIMEZONE,
  TEAMUP_SUBCALENDARS,
  isRentalType,
  minimumHoursFor,
  parseGuestCount,
  type RentalType,
} from '@/lib/booking/config';
import { zonedTimeToUtcMs } from '@/lib/booking/availability';

/**
 * Adds a website calendar request to Manna's Teamup calendar as a grey
 * "General inquiry" event, so staff see it live next to real bookings.
 * Grey never blocks availability, so a request does not hide the slot
 * from other visitors; staff move it to purple or green once confirmed.
 *
 * Env (server-side only, never NEXT_PUBLIC_):
 *   TEAMUP_API_KEY                the same API key the availability calendar uses
 *   TEAMUP_INQUIRY_CALENDAR_KEY   a sharing link with "add only" (or modify)
 *                                 permission on the grey Inquiry sub-calendar only
 *
 * Without both, nothing is sent to Teamup. In local development the event
 * that would have been added is logged instead.
 */

export type TeamupInquiry = {
  rentalType: RentalType;
  /** YYYY-MM-DD in the booking timezone. */
  date: string;
  /** HH:MM, 24-hour clock, in the booking timezone. */
  time: string;
  /** Requested length for the conference room; null when the end is agreed later. */
  hours: number | null;
  name: string;
  email: string;
  phone: string;
  guests: string;
  message: string;
};

export type TeamupInquiryResult = 'added' | 'skipped' | 'failed';

const SPACE_LABELS: Record<RentalType, string> = {
  'conference-room': 'Conference room',
  'entire-building': 'Entire building',
};

/** Turns the raw form fields into an inquiry, or null when they are missing or malformed. */
export function parseTeamupInquiry(fields: {
  rentalSpace: string;
  requestedDate: string;
  requestedTime: string;
  requestedHours: string;
  name: string;
  email: string;
  phone: string;
  guestCount: string;
  message: string;
}): TeamupInquiry | null {
  const { rentalSpace, requestedDate, requestedTime } = fields;

  if (!isRentalType(rentalSpace)) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(requestedDate) || !/^\d{2}:\d{2}$/.test(requestedTime)) return null;

  const hours = Number(fields.requestedHours);

  return {
    rentalType: rentalSpace,
    date: requestedDate,
    time: requestedTime,
    hours: Number.isInteger(hours) && hours > 0 && hours <= 12 ? hours : null,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    guests: fields.guestCount,
    message: fields.message,
  };
}

export async function addInquiryToTeamup(inquiry: TeamupInquiry): Promise<TeamupInquiryResult> {
  const apiKey = process.env.TEAMUP_API_KEY?.trim();
  const calendarKey = process.env.TEAMUP_INQUIRY_CALENDAR_KEY?.trim();
  const event = buildEvent(inquiry);

  if (!apiKey || !calendarKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[teamup mock] Would add inquiry event:', { ...event, subcalendar_ids: ['<grey inquiry>'] });
    }
    return 'skipped';
  }

  try {
    const subcalendarId = await resolveInquirySubcalendar(apiKey, calendarKey);
    const response = await teamupFetch(apiKey, calendarKey, '/events', {
      method: 'POST',
      body: JSON.stringify({ ...event, subcalendar_ids: [subcalendarId] }),
    });

    if (!response.ok) {
      // Teamup's error body explains the problem and holds no secrets.
      const detail = await response.text().catch(() => '');
      console.error('Teamup inquiry event failed', { status: response.status, detail: detail.slice(0, 300) });
      return 'failed';
    }

    return 'added';
  } catch (error) {
    console.error('Teamup inquiry event failed', { error: error instanceof Error ? error.message : 'unknown' });
    return 'failed';
  }
}

function buildEvent(inquiry: TeamupInquiry) {
  const [hour, minute] = inquiry.time.split(':').map(Number);
  const start = zonedTimeToUtcMs(inquiry.date, hour * 60 + minute);
  // Teamup needs an end time. The building's end is agreed with Manna later, so the event
  // spans the minimum for the guest count (JAMIE, 5 Nov), or one hour if that is unknown.
  const guests = parseGuestCount(inquiry.guests);
  const minimum = guests ? minimumHoursFor(inquiry.rentalType, guests) : null;
  const end = start + (inquiry.hours ?? minimum ?? 1) * 60 * 60 * 1000;
  const space = SPACE_LABELS[inquiry.rentalType];
  const length = inquiry.hours
    ? `${inquiry.hours} hour${inquiry.hours === 1 ? '' : 's'}`
    : minimum
      ? `At least ${minimum} hours (end time to be discussed)`
      : 'End time to be discussed';

  const notes = [
    ['Space', space],
    ['Length', length],
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone || 'Not provided'],
    ['Guests', inquiry.guests || 'Not provided'],
    ['Message', inquiry.message],
  ]
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join('');

  return {
    title: `Website request: ${space} (${inquiry.name})`,
    start_dt: toTeamupDateTime(start),
    end_dt: toTeamupDateTime(end),
    all_day: false,
    who: inquiry.name,
    notes: `${notes}<p><em>Request from the website calendar. Not confirmed. Move to the ${
      inquiry.rentalType === 'conference-room' ? 'purple conference room' : 'green building'
    } calendar once booked.</em></p>`,
  };
}

/**
 * Teamup only accepts ISO 8601 without milliseconds, e.g. 2027-05-03T14:00:00-05:00,
 * so this writes the booking-timezone wall time with its UTC offset.
 */
function toTeamupDateTime(utcMs: number): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIMEZONE,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '00';
  const wallClock = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
  const offsetMinutes = Math.round((Date.parse(`${wallClock}Z`) - utcMs) / 60000);
  const sign = offsetMinutes < 0 ? '-' : '+';
  const abs = Math.abs(offsetMinutes);

  return `${wallClock}${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

/** The grey sub-calendar id from TEAMUP_SUBCALENDARS, or found by name. */
async function resolveInquirySubcalendar(apiKey: string, calendarKey: string): Promise<number> {
  const { ids, nameMatches } = TEAMUP_SUBCALENDARS.grey;
  const configured: readonly number[] = ids;
  if (configured.length > 0) return configured[0];

  const response = await teamupFetch(apiKey, calendarKey, '/subcalendars');
  if (!response.ok) throw new Error(`Teamup subcalendars failed with status ${response.status}`);

  const { subcalendars = [] } = (await response.json()) as {
    subcalendars?: Array<{ id: number; name: string; active?: boolean }>;
  };
  const match = subcalendars.find(
    (calendar) => calendar.active !== false
      && nameMatches.some((name) => calendar.name.toLowerCase().includes(name)),
  );

  if (!match) throw new Error('No grey inquiry sub-calendar found; add its id to TEAMUP_SUBCALENDARS.grey.ids.');
  return match.id;
}

function teamupFetch(apiKey: string, calendarKey: string, path: string, init: RequestInit = {}) {
  return fetch(`https://api.teamup.com/${encodeURIComponent(calendarKey)}${path}`, {
    ...init,
    headers: {
      'Teamup-Token': apiKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
