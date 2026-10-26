import { Contact } from '@/components/sections/Contact';
import { CONTACT } from '@/lib/constants';
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
      <section className="bg-[#18231d] pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-4 sm:mb-6">
            Finding us
          </h2>
          <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl">
            Manna Bakery is in Old Town Tomball at {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}. We are open Monday through Saturday from {CONTACT.hours.mondayThroughSaturday.replace(' – ', ' to ')}, and closed on Sundays.
          </p>
        </div>
      </section>
    </main>
  );
}
