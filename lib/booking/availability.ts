import {
  BOOKABLE_WEEKDAYS,
  BOOKING_TIMEZONE,
  BUFFER_AFTER_EVENT_MINUTES,
  BUFFER_BEFORE_EVENT_MINUTES,
  FIRST_START_HOUR,
  LAST_START_HOUR,
  MAX_MONTHS_AHEAD,
  MIN_DAYS_AHEAD,
  SLOT_INTERVAL_MINUTES,
} from '@/lib/booking/config';

/** A busy stretch of time, as UTC epoch milliseconds. End is exclusive. */
export type BusyInterval = {
  start: number;
  end: number;
};

export type AvailabilitySource = 'mock' | 'teamup';

/**
 * What the browser receives. Only open start times are listed, never
 * what is booked or by whom. A date that is in the window but has an
 * empty list is fully booked; a date missing from `days` is not offered.
 */
export type AvailabilityResponse = {
  source: AvailabilitySource;
  timezone: string;
  firstDate: string;
  lastDate: string;
  days: Record<string, string[]>;
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

const MINUTE_MS = 60 * 1000;

/** Today's date (YYYY-MM-DD) in the booking timezone. */
export function todayInBookingZone(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** The first and last dates a visitor may request. */
export function getBookingWindow(now: Date = new Date()): DateRange {
  const today = todayInBookingZone(now);

  return {
    startDate: addDays(today, MIN_DAYS_AHEAD),
    endDate: addMonths(today, MAX_MONTHS_AHEAD),
  };
}

export function computeAvailability(
  busy: BusyInterval[],
  window: DateRange,
  source: AvailabilitySource,
): AvailabilityResponse {
  const days: Record<string, string[]> = {};
  const beforeMs = BUFFER_BEFORE_EVENT_MINUTES * MINUTE_MS;
  const afterMs = BUFFER_AFTER_EVENT_MINUTES * MINUTE_MS;

  for (let date = window.startDate; date <= window.endDate; date = addDays(date, 1)) {
    if (!BOOKABLE_WEEKDAYS.includes(weekdayOf(date))) continue;

    days[date] = getStartMinutes()
      .filter((minutes) => {
        const startsAt = zonedTimeToUtcMs(date, minutes);
        return !busy.some((interval) => startsAt >= interval.start - beforeMs && startsAt < interval.end + afterMs);
      })
      .map(formatMinutes);
  }

  return {
    source,
    timezone: BOOKING_TIMEZONE,
    firstDate: window.startDate,
    lastDate: window.endDate,
    days,
  };
}

/** Converts a wall-clock time in the booking timezone to UTC epoch ms. */
export function zonedTimeToUtcMs(date: string, minutesOfDay: number): number {
  const [year, month, day] = date.split('-').map(Number);
  const wallClockAsUtc = Date.UTC(year, month - 1, day, 0, minutesOfDay);
  const firstGuess = wallClockAsUtc - zoneOffsetMs(wallClockAsUtc);
  const secondOffset = zoneOffsetMs(firstGuess);

  return wallClockAsUtc - secondOffset;
}

export function addDays(date: string, amount: number): string {
  const [year, month, day] = date.split('-').map(Number);
  return toDateString(new Date(Date.UTC(year, month - 1, day + amount)));
}

export function addMonths(date: string, amount: number): string {
  const [year, month, day] = date.split('-').map(Number);
  const lastDayOfTargetMonth = new Date(Date.UTC(year, month - 1 + amount + 1, 0)).getUTCDate();
  return toDateString(new Date(Date.UTC(year, month - 1 + amount, Math.min(day, lastDayOfTargetMonth))));
}

function weekdayOf(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function getStartMinutes(): number[] {
  const minutes: number[] = [];

  for (let value = FIRST_START_HOUR * 60; value <= LAST_START_HOUR * 60; value += SLOT_INTERVAL_MINUTES) {
    minutes.push(value);
  }

  return minutes;
}

function zoneOffsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIMEZONE,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).formatToParts(new Date(utcMs));
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));

  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatMinutes(minutes: number): string {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
}
