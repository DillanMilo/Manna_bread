import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact | Manna Bakery',
  description:
    'Plan a visit or get in touch with Manna Bakery at 306 Commerce Street in Tomball, Texas.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main>
      <div className="pt-16 lg:pt-20">
        <Contact headingLevel="h1" />
      </div>
    </main>
  );
}
