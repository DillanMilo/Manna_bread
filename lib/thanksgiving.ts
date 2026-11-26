// 11:59 PM Central (CST, UTC-6) on Thursday 26 Nov 2026. The Thanksgiving banner switches off here.
export const THANKSGIVING_ENDS_AT_CENTRAL = '2026-11-26T23:59:00-06:00';

// Local review only: `NEXT_PUBLIC_PREVIEW_BANNER=thanksgiving npm run dev` keeps the banner
// showing after the cutoff. Ignored outside `next dev`, so it can never affect a production build.
export function isThanksgivingPreview() {
  return process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_PREVIEW_BANNER === 'thanksgiving';
}

export function isThanksgivingLive(now = Date.now()) {
  return isThanksgivingPreview() || now < Date.parse(THANKSGIVING_ENDS_AT_CENTRAL);
}
