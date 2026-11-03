import { NextResponse } from 'next/server';
import { AVAILABILITY_CACHE_SECONDS } from '@/lib/booking/config';
import { computeAvailability, getBookingWindow } from '@/lib/booking/availability';
import { getBusyTimeProvider } from '@/lib/booking/providers';

// "Today" moves, so compute on each request; Teamup fetches are cached in providers.ts.
export const dynamic = 'force-dynamic';

export async function GET() {
  const provider = getBusyTimeProvider();

  if (!provider) {
    return NextResponse.json(
      { error: 'The availability calendar is not connected yet.' },
      { status: 503 },
    );
  }

  try {
    const window = getBookingWindow();
    const busy = await provider.getBusyIntervals(window);

    return NextResponse.json(computeAvailability(busy, window, provider.source), {
      headers: {
        'Cache-Control': `public, s-maxage=${AVAILABILITY_CACHE_SECONDS}, stale-while-revalidate=${AVAILABILITY_CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    console.error('Availability lookup failed', {
      source: provider.source,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: 'We could not load the calendar right now.' },
      { status: 502 },
    );
  }
}
