'use client';

import Link from 'next/link';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { FadeIn, ScaleIn, LineDraw } from '@/components/ui/Motion';

export function Story() {
  return (
    <section className="py-20 md:py-28 bg-brand-warm-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image - slides in from left */}
          <FadeIn direction="left" duration={0.9} distance={60}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-soft-cream to-brand-sage-light">
              <div className="absolute inset-0 flex items-center justify-center text-brand-olive/50 text-sm font-body border-2 border-dashed border-brand-sage m-4 rounded-xl">
                [ Christin photo —<br />wedding or candid in bakery ]
              </div>
            </div>
          </FadeIn>

          {/* Content - staggered fade-ins */}
          <div className="py-4">
            <FadeIn delay={0.1}>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Our Story
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                Built on faith,<br />baked with love
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-body text-base text-brand-olive leading-relaxed mb-4">
                Seven years ago, we opened our doors with a simple belief: that bread is more than food—it&apos;s an invitation to gather, to slow down, and to share life together.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="font-body text-base text-brand-olive leading-relaxed mb-6">
                What started as a dream became a sanctuary—a place where every loaf tells a story and every cup is poured with intention.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <QuoteBlock
                quote="Come, let us break bread together."
                variant="bordered"
              />
            </FadeIn>

            <FadeIn delay={0.6}>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-cognac hover:text-brand-walnut transition-colors mt-6 group"
              >
                Read our full story <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
