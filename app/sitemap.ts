import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/menu'),
      lastModified: '2026-08-06',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/our-story'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/catering'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/gift-cards'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/rentals'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/contact'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
