import { BRAND, CONTACT, SOCIAL } from '@/lib/constants';
import { getSiteUrl } from '@/lib/siteUrl';
import type { MenuCategory } from '@/lib/menuData';

export type StructuredData = Record<string, unknown>;

const MANNA_COORDINATES = {
  latitude: 30.0972,
  longitude: -95.6161,
} as const;

export function createSiteStructuredData(): StructuredData {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Bakery',
        '@id': `${siteUrl}/#bakery`,
        name: BRAND.name,
        alternateName: 'Manna Bread From Heaven',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/manna-logo-share.png`,
          width: 1050,
          height: 600,
        },
        image: `${siteUrl}/images/manna-storefront-exterior.webp`,
        description: `${BRAND.name} is a handcrafted bakery, cafe, and gathering place in Tomball, Texas.`,
        telephone: CONTACT.phone,
        email: CONTACT.email,
        priceRange: '$$',
        servesCuisine: ['Bakery', 'Breakfast', 'Lunch', 'Coffee'],
        hasMenu: {
          '@id': `${siteUrl}/menu#menu`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT.address.street,
          addressLocality: CONTACT.address.city,
          addressRegion: CONTACT.address.state,
          postalCode: CONTACT.address.zip,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: MANNA_COORDINATES.latitude,
          longitude: MANNA_COORDINATES.longitude,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'https://schema.org/Monday',
              'https://schema.org/Tuesday',
              'https://schema.org/Wednesday',
              'https://schema.org/Thursday',
              'https://schema.org/Friday',
            ],
            opens: '06:00',
            closes: '16:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'https://schema.org/Saturday',
            opens: '07:00',
            closes: '16:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'https://schema.org/Sunday',
            opens: '00:00',
            closes: '00:00',
          },
        ],
        founder: {
          '@type': 'Person',
          name: BRAND.founder,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${CONTACT.mapQuery}`,
        sameAs: [SOCIAL.instagram, SOCIAL.facebook],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: BRAND.name,
        alternateName: BRAND.tagline,
        description: `The official website for ${BRAND.name} in Tomball, Texas.`,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${siteUrl}/#bakery`,
        },
      },
    ],
  };
}

export function createMenuStructuredData(menuData: MenuCategory[]): StructuredData {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${siteUrl}/menu#menu`,
    name: `${BRAND.name} Menu`,
    description:
      'The current breakfast, lunch, coffee, tea, and house-made favorites served at Manna Bakery in Tomball, Texas.',
    url: `${siteUrl}/menu`,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/menu`,
    },
    hasMenuSection: menuData.flatMap((category) =>
      category.sections.map((section) => ({
        '@type': 'MenuSection',
        name: `${category.title}: ${section.title}`,
        ...(section.description ? { description: section.description } : {}),
        ...(section.items.length > 0
          ? {
              hasMenuItem: section.items.map((item) => ({
                '@type': 'MenuItem',
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
              })),
            }
          : {}),
      })),
    ),
  };
}

export function serializeStructuredData(data: StructuredData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
