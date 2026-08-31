import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';

export const SOCIAL_SHARE_IMAGE_URL = '/images/manna-logo-share.png?v=20260727';

export const SOCIAL_SHARE_IMAGE = {
  url: SOCIAL_SHARE_IMAGE_URL,
  width: 1050,
  height: 600,
  type: 'image/png',
  alt: 'Manna — Cafe and Bakery, Bread from Heaven',
} as const;

export function createPageMetadata(
  title: string,
  description: string,
  path: `/${string}` | '/',
): Metadata {
  return {
    title: `${title} | ${BRAND.name}`,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      title: `${title} | ${BRAND.name}`,
      description,
      url: path,
      siteName: BRAND.name,
      images: [SOCIAL_SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND.name}`,
      description,
      images: [SOCIAL_SHARE_IMAGE_URL],
    },
  };
}
