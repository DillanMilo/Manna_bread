/**
 * Rentals availability calendar settings.
 *
 * Rules marked JAMIE come from Jamie Hawley's email (4 Nov 2026).
 * Every value marked PLACEHOLDER still needs Manna's confirmation.
 * Change them here only; the API route and the calendar UI both read
 * from this file.
 */

/** Teamup calendar timezone. Every date and time below is in this zone. */
export const BOOKING_TIMEZONE = 'America/Chicago';

/** JAMIE: the customer picks one of these first. Catering never goes through the calendar. */
export const RENTAL_TYPES = [
  { value: 'conference-room', label: 'Conference Room' },
  { value: 'entire-building', label: 'Entire Building' },
] as const;

export type RentalType = (typeof RENTAL_TYPES)[number]['value'];

export type RentalTypeRules = {
  /** The Teamup sub-calendar colour that holds bookings of this type. */
  bookingColour: SubcalendarColour;
  /** First start time offered, in 24-hour clock hours. */
  firstStartHour: number;
  /** Last start time offered, in 24-hour clock hours. */
  lastStartHour: number;
  /**
   * Hour the space must be free by, or null when the end time is agreed
   * with Manna later. When set, the customer also picks a length in
   * whole hours and the whole block must be free.
   */
  closingHour: number | null;
  /** Longest block on Monday to Friday, in hours. null = up to closing or the next booking. */
  maxHoursWeekday: number | null;
  /** Longest block on Saturday, in hours. */
  maxHoursSaturday: number | null;
  /** JAMIE: one block per Saturday. An existing booking of this type fills the whole Saturday. */
  oneBookingPerSaturday: boolean;
  /** A start time is unavailable within this many minutes BEFORE a blocking event (setup). */
  bufferBeforeMinutes: number;
  /** A start time is unavailable within this many minutes AFTER a blocking event (cleanup). */
  bufferAfterMinutes: number;
};

export const RENTAL_TYPE_RULES: Record<RentalType, RentalTypeRules> = {
  'conference-room': {
    // JAMIE: one-hour blocks; Saturdays a maximum of one two-hour block.
    // PLACEHOLDER: 7 AM to 4 PM matches the posted store hours on the rentals page.
    bookingColour: 'purple',
    firstStartHour: 7,
    lastStartHour: 15,
    closingHour: 16,
    maxHoursWeekday: null,
    maxHoursSaturday: 2,
    oneBookingPerSaturday: true,
    bufferBeforeMinutes: 0,
    bufferAfterMinutes: 0,
  },
  'entire-building': {
    // JAMIE: private rentals begin at 2:00 PM or later.
    // PLACEHOLDER: last start 6 PM and the 2-hour setup buffer are carried over from round 1.
    bookingColour: 'green',
    firstStartHour: 14,
    lastStartHour: 18,
    closingHour: null,
    maxHoursWeekday: null,
    maxHoursSaturday: null,
    oneBookingPerSaturday: false,
    bufferBeforeMinutes: 120,
    bufferAfterMinutes: 0,
  },
};

/** Minutes between offered start times. JAMIE: one-hour blocks. */
export const SLOT_INTERVAL_MINUTES = 60;

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
 * JAMIE: Manna's Teamup sub-calendars, by colour. `blocks` lists the rental
 * types an event on that sub-calendar makes unavailable:
 *   Purple (conference room rental) blocks the conference room.
 *   Green (entire building rental) blocks the whole building, so the
 *   conference room too.
 *   Grey (general inquiry) and Blue (catering order) block nothing.
 *
 * Drop the Teamup sub-calendar ids into `ids` once known. Until then a
 * sub-calendar is recognised when its name contains one of `nameMatches`
 * (case-insensitive). Ids win over names when both are set.
 */
export const TEAMUP_SUBCALENDARS = {
  grey: { purpose: 'General inquiry', ids: [], nameMatches: ['inquiry'], blocks: [] },
  blue: { purpose: 'Catering order', ids: [], nameMatches: ['catering'], blocks: [] },
  purple: { purpose: 'Conference room rental', ids: [], nameMatches: ['conference'], blocks: ['conference-room'] },
  green: { purpose: 'Entire building rental', ids: [], nameMatches: ['building'], blocks: ['conference-room', 'entire-building'] },
} as const satisfies Record<string, {
  purpose: string;
  ids: readonly number[];
  nameMatches: readonly string[];
  blocks: readonly RentalType[];
}>;

export type SubcalendarColour = keyof typeof TEAMUP_SUBCALENDARS;

export function isRentalType(value: unknown): value is RentalType {
  return RENTAL_TYPES.some((type) => type.value === value);
}

/**
 * POLICY: Jamie will send Manna's rental policy wording. Paste it here and
 * it shows above the Send request button. Leave empty until then; do not
 * write policy text on Manna's behalf.
 */
export const RENTAL_POLICY_TEXT = '';
