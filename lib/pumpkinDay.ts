// 11:59 PM Central (CDT, UTC-5) on Monday 26 Oct 2026. Every pumpkin touch on the site switches off here.
export const PUMPKIN_DAY_ENDS_AT_CENTRAL = '2026-10-26T23:59:00-05:00';

// Local review only: `NEXT_PUBLIC_PREVIEW_BANNER=pumpkin npm run dev` keeps every pumpkin touch
// showing after the cutoff. `PREVIEW_BANNER=pumpkin` still works for the homepage banner alone.
// Ignored outside `next dev`, so it can never affect a production build.
export function isPumpkinDayPreview() {
  return process.env.NODE_ENV === 'development' && (
    process.env.NEXT_PUBLIC_PREVIEW_BANNER === 'pumpkin' || process.env.PREVIEW_BANNER === 'pumpkin'
  );
}

export function isPumpkinDayLive(now = Date.now()) {
  return isPumpkinDayPreview() || now < Date.parse(PUMPKIN_DAY_ENDS_AT_CENTRAL);
}
