/**
 * Rentals availability calendar settings.
 *
 * Every value marked PLACEHOLDER still needs Christin's confirmation.
 * Change them here only; the API route and the calendar UI both read
 * from this file.
 */

/** Teamup calendar timezone. Every date and time below is in this zone. */
export const BOOKING_TIMEZONE = 'America/Chicago';

/**
 * PLACEHOLDER: first and last start time offered each day, in 24-hour
 * clock hours. 8 → 8:00 AM, 18 → 6:00 PM (the last start offered).
 */
export const FIRST_START_HOUR = 8;
export const LAST_START_HOUR = 18;

/** PLACEHOLDER: minutes between offered start times (60 = hourly). */
export const SLOT_INTERVAL_MINUTES = 60;

/**
 * PLACEHOLDER: a start time is unavailable if it falls within this many
 * minutes BEFORE a busy event starts (room for setup and turnover).
 */
export const BUFFER_BEFORE_EVENT_MINUTES = 120;

/**
 * PLACEHOLDER: a start time is unavailable if it falls within this many
 * minutes AFTER a busy event ends (cleanup). 0 means a new event may start
 * the moment the previous one ends.
 */
export const BUFFER_AFTER_EVENT_MINUTES = 0;

/**
 * PLACEHOLDER: days that can be requested (0 = Sunday … 6 = Saturday).
 * Matches "Monday - Saturday" on the rentals page.
 */
export const BOOKABLE_WEEKDAYS: readonly number[] = [1, 2, 3, 4, 5, 6];

/** Earliest bookable date, in days from today. 1 = no same-day requests. */
export const MIN_DAYS_AHEAD = 1;

/** Furthest bookable date, in months from today. */
export const MAX_MONTHS_AHEAD = 6;

/** How long availability responses are cached, in seconds (5 minutes). */
export const AVAILABILITY_CACHE_SECONDS = 300;

/**
 * Teamup sub-calendars counted as busy when TEAMUP_BUSY_SUBCALENDAR_IDS is
 * not set. Matched case-insensitively against sub-calendar names, so the
 * building reservation (green) and conference room (purple) calendars block
 * time, while catering orders (blue) and inquiries (grey) do not.
 * Setting TEAMUP_BUSY_SUBCALENDAR_IDS (comma-separated ids) overrides this.
 */
export const BUSY_SUBCALENDAR_NAME_MATCHES: readonly string[] = ['building', 'conference'];

/** Spaces a visitor can ask about in the calendar inquiry form. */
export const RENTAL_SPACES = [
  { value: 'full-building', label: 'Full building' },
  { value: 'conference-room', label: 'Conference room' },
  { value: 'not-sure', label: 'Still deciding' },
] as const;
