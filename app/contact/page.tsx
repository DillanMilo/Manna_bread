import { Contact } from '@/components/sections/Contact';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Visit Manna Bakery in Tomball',
  'Plan a visit or get in touch with Manna Bakery at 306 Commerce Street in Tomball, Texas.',
  '/contact',
);

export default function ContactPage() {
  return (
    <main>
      <h1 className="sr-only">Contact Manna Bakery</h1>
      <div className="pt-16 lg:pt-20">
        <Contact />
      </div>
    </main>
  );
}
