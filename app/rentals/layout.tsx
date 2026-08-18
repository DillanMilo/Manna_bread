import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Private Event Space in Tomball',
  'Gather in Manna Bakery’s warm, Jerusalem-inspired spaces for private dinners, showers, workshops, celebrations, and community events.',
  '/rentals',
);

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
