import { createPageMetadata } from '@/lib/seo';
import { RENTAL_FAQS } from '@/lib/rentalFaqs';
import { createRentalFaqStructuredData, serializeStructuredData } from '@/lib/structuredData';

export const metadata = createPageMetadata(
  'Rentals: Private Event Space in Tomball',
  'Gather in Manna Bakery’s warm, Jerusalem-inspired event space in Old Town Tomball for private dinners, showers, workshops, celebrations, and community events.',
  '/rentals',
);

const rentalFaqStructuredData = createRentalFaqStructuredData(RENTAL_FAQS);

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        id="manna-rental-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(rentalFaqStructuredData) }}
      />
      {children}
    </>
  );
}
