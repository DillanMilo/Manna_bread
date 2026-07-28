'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  type AnalyticsEventName,
  type AnalyticsEventParameters,
  trackEvent,
} from '@/lib/analytics';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

interface TrackedLink {
  eventName: AnalyticsEventName;
  parameters: AnalyticsEventParameters;
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    initializeGoogleAnalytics(measurementId);
    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
      page_title: document.title,
    });

    trackAiReferral();
  }, [pathname]);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    const startedVideos = new WeakSet<HTMLVideoElement>();

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');

      if (!anchor) {
        return;
      }

      const trackedLink = classifyTrackedLink(anchor);

      if (trackedLink) {
        trackEvent(trackedLink.eventName, trackedLink.parameters);
      }
    }

    function handleVideoPlay(event: Event) {
      if (
        !(event.target instanceof HTMLVideoElement) ||
        !event.target.dataset.analyticsVideo ||
        startedVideos.has(event.target)
      ) {
        return;
      }

      startedVideos.add(event.target);
      trackEvent('video_start', {
        video_title: event.target.dataset.analyticsVideo,
        page_path: window.location.pathname,
      });
    }

    function handleVideoEnded(event: Event) {
      if (
        !(event.target instanceof HTMLVideoElement) ||
        !event.target.dataset.analyticsVideo
      ) {
        return;
      }

      trackEvent('video_complete', {
        video_title: event.target.dataset.analyticsVideo,
        page_path: window.location.pathname,
      });
    }

    document.addEventListener('click', handleClick, true);
    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('ended', handleVideoEnded, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('ended', handleVideoEnded, true);
    };
  }, []);

  if (!measurementId) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      strategy="afterInteractive"
    />
  );
}

function initializeGoogleAnalytics(gaMeasurementId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  if (window.__mannaGaConfigured) {
    return;
  }

  window.gtag('js', new Date());
  window.gtag('config', gaMeasurementId, {
    send_page_view: false,
  });
  window.__mannaGaConfigured = true;
}

function trackAiReferral() {
  const sessionKey = 'manna_ai_referral_tracked';

  try {
    if (window.sessionStorage.getItem(sessionKey)) {
      return;
    }
  } catch {
    // Analytics should continue when storage is unavailable.
  }

  const utmSource = new URLSearchParams(window.location.search)
    .get('utm_source')
    ?.toLowerCase();
  const referrerHostname = getReferrerHostname();
  const sourceValue = utmSource ?? referrerHostname;
  const aiSource = identifyAiSource(sourceValue);

  if (!aiSource) {
    return;
  }

  trackEvent('ai_referral_visit', {
    ai_source: aiSource,
    landing_page: `${window.location.pathname}${window.location.search}`,
  });

  try {
    window.sessionStorage.setItem(sessionKey, '1');
  } catch {
    // The event still fires when storage is unavailable.
  }
}

function getReferrerHostname() {
  if (!document.referrer) {
    return '';
  }

  try {
    return new URL(document.referrer).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function identifyAiSource(value = '') {
  if (value.includes('chatgpt') || value.includes('openai')) {
    return 'chatgpt';
  }

  if (value.includes('perplexity')) {
    return 'perplexity';
  }

  if (value.includes('copilot')) {
    return 'microsoft_copilot';
  }

  if (value.includes('gemini') || value.includes('bard')) {
    return 'google_gemini';
  }

  if (value.includes('claude') || value.includes('anthropic')) {
    return 'claude';
  }

  return '';
}

function classifyTrackedLink(anchor: HTMLAnchorElement): TrackedLink | null {
  const url = new URL(anchor.href, window.location.origin);
  const linkText = (
    anchor.getAttribute('aria-label') ??
    anchor.textContent ??
    ''
  )
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
  const lowerLabel = linkText.toLowerCase();
  const sharedParameters = {
    link_text: linkText,
    page_path: window.location.pathname,
  };

  if (url.protocol === 'tel:') {
    return {
      eventName: 'contact_click',
      parameters: {
        ...sharedParameters,
        contact_method: 'phone',
      },
    };
  }

  if (url.protocol === 'mailto:') {
    return {
      eventName: 'contact_click',
      parameters: {
        ...sharedParameters,
        contact_method: 'email',
      },
    };
  }

  if (
    url.hostname === 'google.com' ||
    url.hostname.endsWith('.google.com')
  ) {
    if (url.pathname.startsWith('/maps')) {
      return {
        eventName: 'get_directions',
        parameters: sharedParameters,
      };
    }
  }

  if (
    url.hostname === 'instagram.com' ||
    url.hostname.endsWith('.instagram.com')
  ) {
    return {
      eventName: 'social_click',
      parameters: {
        ...sharedParameters,
        social_network: 'instagram',
      },
    };
  }

  if (
    url.hostname === 'facebook.com' ||
    url.hostname.endsWith('.facebook.com')
  ) {
    return {
      eventName: 'social_click',
      parameters: {
        ...sharedParameters,
        social_network: 'facebook',
      },
    };
  }

  if (
    url.hostname === 'toasttab.com' ||
    url.hostname.endsWith('.toasttab.com')
  ) {
    if (url.pathname.includes('egiftcards') || lowerLabel.includes('gift card')) {
      return {
        eventName: 'gift_card_click',
        parameters: sharedParameters,
      };
    }

    if (url.pathname.toLowerCase().includes('rewards') || lowerLabel.includes('reward')) {
      return {
        eventName: 'rewards_click',
        parameters: sharedParameters,
      };
    }

    if (lowerLabel.includes('sign in')) {
      return {
        eventName: 'toast_sign_in_click',
        parameters: sharedParameters,
      };
    }

    if (lowerLabel.includes('cart')) {
      return {
        eventName: 'toast_cart_click',
        parameters: sharedParameters,
      };
    }

    return {
      eventName: 'order_online_click',
      parameters: sharedParameters,
    };
  }

  return null;
}
