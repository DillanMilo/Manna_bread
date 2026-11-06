'use client';

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { RENTAL_FAQS, type RentalFaq } from '@/lib/rentalFaqs';

interface RentalFaqSectionProps {
  id?: string;
}

/* ─── one question, opened and closed like the policy cards ─── */
function RentalFaqItem({ faq }: { faq: RentalFaq }) {
  const isExternal = faq.link?.href.startsWith('http');

  return (
    <details className="group bg-brand-forest-mid/50 rounded-2xl border border-white/10 overflow-hidden transition-colors duration-300 open:border-brand-gold/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-lg sm:text-xl font-medium text-white leading-snug">
          {faq.question}
        </span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="space-y-4 px-5 pb-6 sm:px-7">
        {faq.answer.map((block, index) =>
          typeof block === 'string' ? (
            <p key={index} className="font-body text-[15px] text-white/85 leading-[1.75]">
              {block}
            </p>
          ) : (
            <ul key={index} className="space-y-2.5">
              {block.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-brand-gold/70 shrink-0" />
                  <span className="font-body text-[15px] text-white/85 leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          ),
        )}
        {faq.link && (
          <a
            href={faq.link.href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-gold underline-offset-4 transition-colors hover:text-brand-cognac-light hover:underline"
          >
            {faq.link.label}
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </details>
  );
}

/* REVIEW: built from Jamie's rental letter (6 Nov 2026); Jamie and Christin to approve before going live. */
export function RentalFaqSection({ id = 'rental-faq' }: RentalFaqSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 px-5 sm:px-6 md:px-10 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Rental FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
              Good to know before you book.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-[1.8] text-white/70">
              Our rental guidelines, gathered in one place for your planning. If
              something isn&apos;t answered here, just ask when you send your request.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="space-y-3 sm:space-y-4" staggerDelay={0.05}>
          {RENTAL_FAQS.map((faq) => (
            <StaggerItem key={faq.question}>
              <RentalFaqItem faq={faq} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
