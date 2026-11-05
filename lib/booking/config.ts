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
  /** Extra turnover after a blocking event of a given colour, on top of bufferAfterMinutes. */
  extraBufferAfterMinutes: Partial<Record<SubcalendarColour, number>>;
  /**
   * Minimum rental length in hours, by guest count, or null for none.
   * A start time is only offered when at least `upTo25Guests` hours are free.
   */
  minHours: { upTo25Guests: number; over25Guests: number } | null;
  /** Latest the space can be used until, in minutes after midnight. Caps the free time counted. */
  latestEndMinutes: number;
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
    extraBufferAfterMinutes: {},
    minHours: null,
    latestEndMinutes: 16 * 60,
  },
  'entire-building': {
    // JAMIE: private rentals begin at 2:00 PM or later.
    // JAMIE (5 Nov): a conference room booking blocks the building, plus about 1 hour of
    // turnover after it ends (exact time to be confirmed with Christin).
    // JAMIE (5 Nov): minimum 3 hours for up to 25 guests, 4 hours for 26 or more.
    // PLACEHOLDER: last start 6 PM and the 2-hour setup buffer are carried over from round 1.
    // PLACEHOLDER: latest end 10:30 PM matches an existing event; Christin has not confirmed a cutoff.
    bookingColour: 'green',
    firstStartHour: 14,
    lastStartHour: 18,
    closingHour: null,
    maxHoursWeekday: null,
    maxHoursSaturday: null,
    oneBookingPerSaturday: false,
    bufferBeforeMinutes: 120,
    bufferAfterMinutes: 0,
    extraBufferAfterMinutes: { purple: 60 },
    minHours: { upTo25Guests: 3, over25Guests: 4 },
    latestEndMinutes: 22 * 60 + 30,
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
 *   Purple (conference room rental) blocks the conference room, and the
 *   whole building during the booking (JAMIE, 5 Nov).
 *   Green (entire building rental) blocks the whole building, so the
 *   conference room too.
 *   Grey (general inquiry) and Blue (catering order) block nothing.
 *
 * Ids are Manna's real Teamup sub-calendars (checked 5 Nov 2026):
 *   11428046 Inquiry (Not confirmed), 12192782 Conf. Room Reservation,
 *   11428045 Building Rentals. Holiday Hours is 11428050 (not used yet).
 * Drop any new sub-calendar ids into `ids`. Until then a
 * sub-calendar is recognised when its name contains one of `nameMatches`
 * (case-insensitive). Ids win over names when both are set.
 */
export const TEAMUP_SUBCALENDARS = {
  grey: { purpose: 'General inquiry', ids: [11428046], nameMatches: ['inquiry'], blocks: [] },
  blue: { purpose: 'Catering order', ids: [], nameMatches: ['catering'], blocks: [] },
  purple: { purpose: 'Conference room rental', ids: [12192782], nameMatches: ['conference', 'conf.'], blocks: ['conference-room', 'entire-building'] },
  green: { purpose: 'Entire building rental', ids: [11428045], nameMatches: ['building'], blocks: ['conference-room', 'entire-building'] },
  // Holiday Hours: an ALL-DAY event (e.g. "Closed for Thanksgiving") blocks both spaces that day.
  // Timed events there (special opening hours) are ignored. Decided by Dillan, 5 Nov 2026.
  black: { purpose: 'Holiday hours', ids: [11428050], nameMatches: ['holiday'], blocks: ['conference-room', 'entire-building'], allDayOnly: true },
} as const satisfies Record<string, {
  purpose: string;
  ids: readonly number[];
  nameMatches: readonly string[];
  blocks: readonly RentalType[];
  /** Only all-day events on this sub-calendar block anything. */
  allDayOnly?: boolean;
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

/** Largest guest count the forms accept; anything bigger is almost certainly a typo. */
export const MAX_GUEST_COUNT = 500;

/** JAMIE (5 Nov): guest count is required on every rental request. Returns null unless it is a whole number from 1 to MAX_GUEST_COUNT. */
export function parseGuestCount(value: unknown): number | null {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!/^\d{1,4}$/.test(text)) return null;
  const guests = Number(text);
  return guests >= 1 && guests <= MAX_GUEST_COUNT ? guests : null;
}

/** JAMIE (5 Nov): the minimum rental length for this space and group size, or null when the space has none. */
export function minimumHoursFor(rentalType: RentalType, guests: number): number | null {
  const minHours = RENTAL_TYPE_RULES[rentalType].minHours;
  if (!minHours) return null;
  return guests > 25 ? minHours.over25Guests : minHours.upTo25Guests;
}
