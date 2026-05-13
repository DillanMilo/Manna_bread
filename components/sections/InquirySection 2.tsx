'use client';

import { CONTACT } from '@/lib/constants';
import { FadeIn } from '@/components/ui/Motion';
import { InquiryForm } from '@/components/ui/InquiryForm';

type InquirySectionProps = {
  variant: 'catering' | 'rentals';
  id?: string;
};

const copy = {
  catering: {
    eyebrow: 'Start an order',
    title: 'Tell us what you are planning.',
    description:
      'Send a few details and we will help shape the tray sizes, timing, drinks, and pickup or event needs around your gathering.',
    source: 'catering-page',
  },
  rentals: {
    eyebrow: 'Start with a date',
    title: 'Let us check the calendar.',
    description:
      'Share your preferred date, guest count, and the kind of gathering you have in mind. We will follow up with availability and next steps.',
    source: 'rentals-page',
  },
};

export function InquirySection({ variant, id }: InquirySectionProps) {
  const content = copy[variant];

  return (
    <section id={id} className="py-16 sm:py-20 md:py-28 px-5 sm:px-6 md:px-10 bg-brand-forest">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              {content.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
              {content.title}
            </h2>
            <p className="font-body text-base text-white/72 leading-relaxed mb-7">
              {content.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/25 px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Call {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-brand-gold/45 px-5 py-3 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/10"
              >
                Email us
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.18} className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-brand-forest-mid/70 p-5 sm:p-6 md:p-8 shadow-xl shadow-black/10">
            <InquiryForm defaultType={variant} source={content.source} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
