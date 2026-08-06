import { BRAND, CONTACT, SOCIAL } from '@/lib/constants';
import type { MenuCategory } from '@/lib/menuData';
import { SHARE_IMAGE_PATH, SITE_URL, absoluteUrl } from '@/lib/seo';

const bakeryId = `${SITE_URL}/#bakery`;
const websiteId = `${SITE_URL}/#website`;
const mannaCoordinates = {
  latitude: 30.0972,
  longitude: -95.6161,
} as const;

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Bakery',
      '@id': bakeryId,
      name: BRAND.name,
      alternateName: 'Manna Bread From Heaven',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SHARE_IMAGE_PATH),
        width: 1050,
        height: 600,
      },
      image: absoluteUrl('/images/manna-storefront-exterior.webp'),
      description:
        'Manna Bakery is a handcrafted bakery, cafe, and gathering place in Tomball, Texas.',
      telephone: CONTACT.phone,
      email: CONTACT.email,
      priceRange: '$$',
      servesCuisine: ['Bakery', 'Breakfast', 'Lunch', 'Coffee'],
      hasMenu: {
        '@id': `${SITE_URL}/menu#menu`,
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
        latitude: mannaCoordinates.latitude,
        longitude: mannaCoordinates.longitude,
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
      '@id': websiteId,
      url: SITE_URL,
      name: BRAND.name,
      alternateName: BRAND.tagline,
      description:
        'The official website for Manna Bakery in Tomball, Texas.',
      inLanguage: 'en-US',
      publisher: {
        '@id': bakeryId,
      },
    },
  ],
};

export function createMenuStructuredData(menuData: MenuCategory[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu#menu`,
    name: `${BRAND.name} Menu`,
    description:
      'The current breakfast, lunch, coffee, tea, and house-made favorites served at Manna Bakery in Tomball, Texas.',
    url: absoluteUrl('/menu'),
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl('/menu'),
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
