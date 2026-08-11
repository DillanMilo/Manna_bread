export type AnalyticsEventName =
  | 'ai_referral_visit'
  | 'contact_click'
  | 'form_start'
  | 'generate_lead'
  | 'gift_card_click'
  | 'get_directions'
  | 'inquiry_error'
  | 'order_online_click'
  | 'rewards_click'
  | 'social_click'
  | 'toast_cart_click'
  | 'toast_sign_in_click'
  | 'video_complete'
  | 'video_start';

export type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    __mannaGaConfigured?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsEventParameters = {},
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, parameters);
}
