import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Rentals: Private Event Space in Tomball',
  'Gather in Manna Bakery’s warm, Jerusalem-inspired event space in Old Town Tomball for private dinners, showers, workshops, celebrations, and community events.',
  '/rentals',
);

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
