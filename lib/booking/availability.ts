import {
  BOOKABLE_WEEKDAYS,
  BOOKING_TIMEZONE,
  MAX_MONTHS_AHEAD,
  MIN_DAYS_AHEAD,
  RENTAL_TYPE_RULES,
  SLOT_INTERVAL_MINUTES,
  TEAMUP_SUBCALENDARS,
  type RentalType,
  type SubcalendarColour,
} from '@/lib/booking/config';

/**
 * A busy stretch of time, as UTC epoch milliseconds (end is exclusive),
 * tagged with the Teamup sub-calendar colour it came from. Stays on the
 * server; the colour decides which rental types it blocks.
 */
export type BusyInterval = {
  start: number;
  end: number;
  colour: SubcalendarColour;
};

/**
 * An open start time ("HH:MM"). `maxHours` is the longest block that fits
 * from that start, or null when the end time is agreed with Manna later.
 */
export type OpenSlot = {
  start: string;
  maxHours: number | null;
};

export type AvailabilitySource = 'mock' | 'teamup';

/**
 * What the browser receives. Only open start times are listed, never
 * what is booked or by whom. A date that is in the window but has an
 * empty list is fully booked; a date missing from `days` is not offered.
 */
export type AvailabilityResponse = {
  source: AvailabilitySource;
  type: RentalType;
  timezone: string;
  firstDate: string;
  lastDate: string;
  days: Record<string, OpenSlot[]>;
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
  type: RentalType,
): AvailabilityResponse {
  const rules = RENTAL_TYPE_RULES[type];
  const days: Record<string, OpenSlot[]> = {};
  const beforeMs = rules.bufferBeforeMinutes * MINUTE_MS;
  const afterMs = rules.bufferAfterMinutes * MINUTE_MS;
  const blocking = busy.filter((interval) => (TEAMUP_SUBCALENDARS[interval.colour].blocks as readonly RentalType[]).includes(type));
  const isFree = (start: number, end: number) =>
    !blocking.some((interval) => interval.start - beforeMs < end && start < interval.end + afterMs);

  for (let date = window.startDate; date <= window.endDate; date = addDays(date, 1)) {
    const weekday = weekdayOf(date);
    if (!BOOKABLE_WEEKDAYS.includes(weekday)) continue;

    const isSaturday = weekday === 6;
    const dayStart = zonedTimeToUtcMs(date, 0);
    const dayEnd = zonedTimeToUtcMs(addDays(date, 1), 0);

    // One booking per Saturday: any existing booking of this type that day fills it.
    if (
      isSaturday &&
      rules.oneBookingPerSaturday &&
      busy.some((interval) => interval.colour === rules.bookingColour && interval.start < dayEnd && dayStart < interval.end)
    ) {
      days[date] = [];
      continue;
    }

    const maxHoursForDay = (isSaturday ? rules.maxHoursSaturday : rules.maxHoursWeekday) ?? Infinity;
    const slots: OpenSlot[] = [];

    for (const minutes of getStartMinutes(rules.firstStartHour, rules.lastStartHour)) {
      const startsAt = zonedTimeToUtcMs(date, minutes);

      if (rules.closingHour === null) {
        // End time is agreed later, so only the start time has to be clear.
        if (isFree(startsAt, startsAt + 1)) slots.push({ start: formatMinutes(minutes), maxHours: null });
        continue;
      }

      const hoursToClose = Math.floor((rules.closingHour * 60 - minutes) / 60);
      let maxHours = 0;

      while (
        maxHours < Math.min(hoursToClose, maxHoursForDay) &&
        isFree(startsAt, zonedTimeToUtcMs(date, minutes + (maxHours + 1) * 60))
      ) {
        maxHours += 1;
      }

      if (maxHours > 0) slots.push({ start: formatMinutes(minutes), maxHours });
    }

    days[date] = slots;
  }

  return {
    source,
    type,
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

function getStartMinutes(firstHour: number, lastHour: number): number[] {
  const minutes: number[] = [];

  for (let value = firstHour * 60; value <= lastHour * 60; value += SLOT_INTERVAL_MINUTES) {
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
