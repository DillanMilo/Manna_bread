import 'server-only';

import {
  AVAILABILITY_CACHE_SECONDS,
  BUSY_SUBCALENDAR_NAME_MATCHES,
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
    return new TeamupProvider(apiKey, calendarKey, parseIds(process.env.TEAMUP_BUSY_SUBCALENDAR_IDS));
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

class TeamupProvider implements BusyTimeProvider {
  readonly source = 'teamup' as const;

  constructor(
    private readonly apiKey: string,
    private readonly calendarKey: string,
    private readonly configuredBusyIds: number[],
  ) {}

  async getBusyIntervals(range: DateRange): Promise<BusyInterval[]> {
    const busyIds = this.configuredBusyIds.length > 0
      ? this.configuredBusyIds
      : await this.findBusySubcalendarIds();

    const params = new URLSearchParams({ startDate: range.startDate, endDate: range.endDate });
    busyIds.forEach((id) => params.append('subcalendarId[]', String(id)));

    const { events = [] } = await this.get<{ events?: TeamupEvent[] }>(`/events?${params}`);

    return events
      .filter((event) => !event.subcalendar_ids || event.subcalendar_ids.some((id) => busyIds.includes(id)))
      .map(toBusyInterval)
      .filter((interval): interval is BusyInterval => interval !== null);
  }

  private async findBusySubcalendarIds(): Promise<number[]> {
    const { subcalendars = [] } = await this.get<{ subcalendars?: TeamupSubcalendar[] }>('/subcalendars');
    const ids = subcalendars
      .filter((calendar) => calendar.active !== false)
      .filter((calendar) => BUSY_SUBCALENDAR_NAME_MATCHES.some((match) => calendar.name.toLowerCase().includes(match)))
      .map((calendar) => calendar.id);

    if (ids.length === 0) {
      // Failing closed: better to show no calendar than to show every date as open.
      throw new Error('No Teamup sub-calendars matched BUSY_SUBCALENDAR_NAME_MATCHES; set TEAMUP_BUSY_SUBCALENDAR_IDS.');
    }

    return ids;
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

function toBusyInterval(event: TeamupEvent): BusyInterval | null {
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

function parseIds(value: string | undefined): number[] {
  return (value ?? '')
    .split(',')
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
}

/* ─── Mock (local development only) ─── */

/** Sample bookings over the next six weeks: [days from today, start hour, end hour]. */
const MOCK_BOOKINGS: Array<[number, number, number]> = [
  [2, 14, 18],
  [4, 0, 24],
  [6, 9, 11],
  [9, 17, 21],
  [12, 10, 22],
  [15, 13, 15],
  [20, 15, 20],
  [27, 0, 24],
  [33, 10, 12],
  [40, 14, 22],
];

class MockProvider implements BusyTimeProvider {
  readonly source = 'mock' as const;

  async getBusyIntervals(): Promise<BusyInterval[]> {
    const today = todayInBookingZone();

    return MOCK_BOOKINGS.map(([daysAhead, startHour, endHour]) => {
      const date = addDays(today, daysAhead);
      return {
        start: zonedTimeToUtcMs(date, startHour * 60),
        end: zonedTimeToUtcMs(date, endHour * 60),
      };
    });
  }
}
