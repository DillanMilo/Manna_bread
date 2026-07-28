import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Private Rentals | Manna Bakery',
  description:
    'Gather in Manna Bakery’s warm, Jerusalem-inspired spaces for private dinners, showers, workshops, celebrations, and community events.',
  path: '/rentals',
});

export default function RentalsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
