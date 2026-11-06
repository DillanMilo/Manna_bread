import 'server-only';

import {
  AVAILABILITY_CACHE_SECONDS,
  TEAMUP_SUBCALENDARS,
  type SubcalendarColour,
} from '@/lib/booking/config';
import {
  addDays,
  todayInBookingZone,
  zonedTimeToUtcMs,
  type AvailabilitySource,
  type BusyInterval,
  type DateRange,
} from '@/lib/booking/availability';

/**
 * Anything that can say when Manna is busy. Swap implementations here;
 * the API route and the availability rules stay the same.
 */
export interface BusyTimeProvider {
  readonly source: AvailabilitySource;
  getBusyIntervals(range: DateRange): Promise<BusyInterval[]>;
}

/**
 * Teamup when its env vars are set. Otherwise the mock, but only in local
 * development (or when BOOKING_CALENDAR_USE_MOCK=true), so a production
 * deploy without credentials never shows made-up availability.
 */
export function getBusyTimeProvider(): BusyTimeProvider | null {
  const apiKey = process.env.TEAMUP_API_KEY?.trim();
  const calendarKey = process.env.TEAMUP_CALENDAR_KEY?.trim();

  if (apiKey && calendarKey) {
    return new TeamupProvider(apiKey, calendarKey);
  }

  if (process.env.NODE_ENV !== 'production' || process.env.BOOKING_CALENDAR_USE_MOCK === 'true') {
    return new MockProvider();
  }

  return null;
}

/* ─── Teamup ─── */

type TeamupSubcalendar = {
  id: number;
  name: string;
  active?: boolean;
};

type TeamupEvent = {
  subcalendar_ids?: number[];
  start_dt: string;
  end_dt: string;
  all_day?: boolean;
};

/** Only these colours can block a rental, so only their events are fetched. */
const BLOCKING_COLOURS = (Object.keys(TEAMUP_SUBCALENDARS) as SubcalendarColour[])
  .filter((colour) => TEAMUP_SUBCALENDARS[colour].blocks.length > 0);

class TeamupProvider implements BusyTimeProvider {
  readonly source = 'teamup' as const;

  constructor(
    private readonly apiKey: string,
    private readonly calendarKey: string,
  ) {}

  async getBusyIntervals(range: DateRange): Promise<BusyInterval[]> {
    const colourById = await this.resolveBlockingSubcalendars();
    const params = new URLSearchParams({ startDate: range.startDate, endDate: range.endDate });
    colourById.forEach((_, id) => params.append('subcalendarId[]', String(id)));

    const { events = [] } = await this.get<{ events?: TeamupEvent[] }>(`/events?${params}`);

    return events.flatMap((event) => {
      const interval = toInterval(event);
      if (!interval) return [];

      // An event can sit on several sub-calendars; it blocks for each blocking colour it carries.
      const colours = new Set(
        (event.subcalendar_ids ?? [])
          .map((id) => colourById.get(id))
          .filter((colour): colour is SubcalendarColour => Boolean(colour))
          // Holiday Hours only blocks for all-day events (closures), not special opening hours.
          .filter((colour) => event.all_day || !('allDayOnly' in TEAMUP_SUBCALENDARS[colour])),
      );
      return [...colours].map((colour) => ({ ...interval, colour }));
    });
  }

  /** Maps Teamup sub-calendar ids to the blocking colours in TEAMUP_SUBCALENDARS. */
  private async resolveBlockingSubcalendars(): Promise<Map<number, SubcalendarColour>> {
    const colourById = new Map<number, SubcalendarColour>();
    const needsNames = BLOCKING_COLOURS.some((colour) => TEAMUP_SUBCALENDARS[colour].ids.length === 0);
    const { subcalendars = [] } = needsNames
      ? await this.get<{ subcalendars?: TeamupSubcalendar[] }>('/subcalendars')
      : { subcalendars: [] };

    for (const colour of BLOCKING_COLOURS) {
      const { ids, nameMatches } = TEAMUP_SUBCALENDARS[colour];
      const matched = ids.length > 0
        ? [...ids]
        : subcalendars
          .filter((calendar) => calendar.active !== false)
          .filter((calendar) => nameMatches.some((match) => calendar.name.toLowerCase().includes(match)))
          .map((calendar) => calendar.id);

      if (matched.length === 0) {
        // Failing closed: better to show no calendar than to show every date as open.
        throw new Error(`No Teamup sub-calendar found for ${colour}; add its id to TEAMUP_SUBCALENDARS.`);
      }

      matched.forEach((id) => colourById.set(id, colour));
    }

    return colourById;
  }

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`https://api.teamup.com/${encodeURIComponent(this.calendarKey)}${path}`, {
      headers: {
        'Teamup-Token': this.apiKey,
        Accept: 'application/json',
      },
      next: { revalidate: AVAILABILITY_CACHE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Teamup request ${path.split('?')[0]} failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

function toInterval(event: TeamupEvent): Omit<BusyInterval, 'colour'> | null {
  if (event.all_day) {
    return {
      start: zonedTimeToUtcMs(event.start_dt.slice(0, 10), 0),
      end: zonedTimeToUtcMs(addDays(event.end_dt.slice(0, 10), 1), 0),
    };
  }

  const start = Date.parse(event.start_dt);
  const end = Date.parse(event.end_dt);

  return Number.isFinite(start) && Number.isFinite(end) ? { start, end } : null;
}

/* ─── Mock (local development only) ─── */

type MockBooking = {
  /** Days from today; with `weekday` set, the first such weekday at least this many days out. */
  daysAhead: number;
  /** 0 = Sunday … 6 = Saturday. */
  weekday?: number;
  startHour: number;
  endHour: number;
  colour: SubcalendarColour;
};

/** Sample Teamup events that exercise every rule. Week one runs Saturday to Friday from tomorrow. */
const MOCK_BOOKINGS: MockBooking[] = [
  // Saturday conference booking: conference room full that Saturday, building still open from 2 PM.
  { daysAhead: 1, weekday: 6, startHour: 10, endHour: 12, colour: 'purple' },
  // Weekday conference booking: 30-minute reset either side (conference ends by 8:30 or starts from 11:30).
  { daysAhead: 1, weekday: 1, startHour: 9, endHour: 11, colour: 'purple' },
  // Weekday building rental with time free after it: no second building rental that day;
  // the conference room must end an hour before (by 1 PM).
  { daysAhead: 1, weekday: 2, startHour: 14, endHour: 18, colour: 'green' },
  // Building booking in the morning (entered by staff): conference room ends by 8 AM or starts from 1 PM.
  { daysAhead: 1, weekday: 3, startHour: 9, endHour: 12, colour: 'green' },
  // Afternoon conference booking: building opens an hour after it ends (5 PM).
  { daysAhead: 1, weekday: 4, startHour: 15, endHour: 16, colour: 'purple' },
  // Building all-day rental: both types fully booked.
  { daysAhead: 1, weekday: 5, startHour: 0, endHour: 24, colour: 'green' },
  // Jamie's example: Saturday building rental 2 to 6 PM, so no second building rental that day.
  { daysAhead: 8, weekday: 6, startHour: 14, endHour: 18, colour: 'green' },
  // Grey (inquiry) and blue (catering) never block anything.
  { daysAhead: 8, weekday: 1, startHour: 0, endHour: 24, colour: 'grey' },
  { daysAhead: 8, weekday: 1, startHour: 10, endHour: 18, colour: 'blue' },
  // Holiday closure (all day) blocks both types.
  { daysAhead: 8, weekday: 4, startHour: 0, endHour: 24, colour: 'black' },
];

class MockProvider implements BusyTimeProvider {
  readonly source = 'mock' as const;

  async getBusyIntervals(): Promise<BusyInterval[]> {
    const today = todayInBookingZone();

    return MOCK_BOOKINGS.map(({ daysAhead, weekday, startHour, endHour, colour }) => {
      const earliest = addDays(today, daysAhead);
      const date = weekday === undefined ? earliest : nextWeekday(earliest, weekday);
      return {
        start: zonedTimeToUtcMs(date, startHour * 60),
        end: zonedTimeToUtcMs(date, endHour * 60),
        colour,
      };
    });
  }
}

/** The first date on or after `date` that falls on `weekday`. */
function nextWeekday(date: string, weekday: number): string {
  const [year, month, day] = date.split('-').map(Number);
  const current = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return addDays(date, (weekday - current + 7) % 7);
}
