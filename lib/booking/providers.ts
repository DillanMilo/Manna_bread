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
      const colours = new Set((event.subcalendar_ids ?? []).map((id) => colourById.get(id)).filter(Boolean));
      return [...colours].map((colour) => ({ ...interval, colour: colour as SubcalendarColour }));
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
  /** Days from today, or a Saturday at least this many days out when `saturday` is set. */
  daysAhead: number;
  saturday?: boolean;
  startHour: number;
  endHour: number;
  colour: SubcalendarColour;
};

/** Sample Teamup events that exercise every rule. */
const MOCK_BOOKINGS: MockBooking[] = [
  // Saturday conference booking: conference room full that Saturday, building still open from 2 PM.
  { daysAhead: 2, saturday: true, startHour: 10, endHour: 12, colour: 'purple' },
  // Weekday conference booking: only those hours are taken.
  { daysAhead: 2, startHour: 9, endHour: 11, colour: 'purple' },
  // Building evening rental: blocks the building and the conference room from 2 PM.
  { daysAhead: 5, startHour: 14, endHour: 20, colour: 'green' },
  // Building all-day rental: both types fully booked.
  { daysAhead: 6, startHour: 0, endHour: 24, colour: 'green' },
  // Grey (inquiry) and blue (catering) never block anything.
  { daysAhead: 7, startHour: 0, endHour: 24, colour: 'grey' },
  { daysAhead: 7, startHour: 10, endHour: 18, colour: 'blue' },
  // A later Saturday with a building rental; the conference room is open in the morning.
  { daysAhead: 9, saturday: true, startHour: 14, endHour: 22, colour: 'green' },
  { daysAhead: 15, startHour: 13, endHour: 15, colour: 'purple' },
  { daysAhead: 20, startHour: 15, endHour: 20, colour: 'green' },
  { daysAhead: 27, startHour: 0, endHour: 24, colour: 'green' },
];

class MockProvider implements BusyTimeProvider {
  readonly source = 'mock' as const;

  async getBusyIntervals(): Promise<BusyInterval[]> {
    const today = todayInBookingZone();

    return MOCK_BOOKINGS.map(({ daysAhead, saturday, startHour, endHour, colour }) => {
      const date = saturday ? nextSaturday(addDays(today, daysAhead)) : addDays(today, daysAhead);
      return {
        start: zonedTimeToUtcMs(date, startHour * 60),
        end: zonedTimeToUtcMs(date, endHour * 60),
        colour,
      };
    });
  }
}

function nextSaturday(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return addDays(date, (6 - weekday + 7) % 7);
}
