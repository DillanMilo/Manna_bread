import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

const routes = [
  '',
  '/menu',
  '/our-story',
  '/catering',
  '/gift-cards',
  '/rentals',
  '/contact',
  '/careers',
] as const;

const routeLastModified: Partial<Record<(typeof routes)[number], string>> = {
  '/menu': '2026-08-06',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
    ...(routeLastModified[route] ? { lastModified: routeLastModified[route] } : {}),
  }));
}
