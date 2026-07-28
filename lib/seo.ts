import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';

export const SITE_URL = 'https://mannabread.com';
export const SHARE_IMAGE_PATH = '/images/manna-logo-share.png';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: `/${string}` | '/';
}

export function absoluteUrl(path: string) {
  if (path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      siteName: BRAND.name,
      title,
      description,
      images: [
        {
          url: SHARE_IMAGE_PATH,
          width: 1050,
          height: 600,
          type: 'image/png',
          alt: 'Manna Bakery — Bread from Heaven',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE_PATH],
    },
  };
}
