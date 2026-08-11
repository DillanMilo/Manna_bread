import Image from 'next/image';
import { InquiryForm } from '@/components/ui/InquiryForm';
import { FadeIn, LineDraw, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Join Our Team',
  'Explore working at Manna Bakery in Tomball and introduce yourself to the team.',
  '/careers',
);

const principles = [
  {
    number: '01',
    title: 'Make people feel at home',
    description:
      'A warm smile, a thoughtful welcome, and genuine care throughout each visit help every guest feel comfortable, cared for, and at home.',
  },
  {
    number: '02',
    title: 'Warmth is part of the work',
    description:
      'The experience belongs to all of us. We notice the details, stay present, and do our part to make every visit a good one.',
  },
  {
    number: '03',
    title: 'We show up for one another',
    description:
      'We are a small, close-knit team. We communicate, step in when a hand is needed, and celebrate what we accomplish together.',
  },
] as const;

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-brand-forest">
      <section className="relative isolate min-h-[78svh] overflow-hidden pt-16 lg:pt-20">
        <Image
          src="/images/manna-kitchen-team.webp"
          alt="Manna team members working together in the bakery kitchen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_34%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111a15]/95 via-[#18231d]/78 to-[#18231d]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(78svh-4rem)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:min-h-[calc(78svh-5rem)] lg:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="mb-5 font-body text-[11px] font-semibold uppercase tracking-[3px] text-brand-gold">
                Join Our Team
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="max-w-xl font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Work with care. Welcome people well.
              </h1>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="mt-7 max-w-xl font-body text-base leading-[1.8] text-white/78 sm:text-lg">
                Manna is built by people who know how a place should feel: every guest greeted with a smile, cared for with intention, and made to feel at home &mdash; and every teammate ready to step in when another needs a hand.
              </p>
            </FadeIn>
            <FadeIn delay={0.34}>
              <a
                href="#apply"
                className="mt-9 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-gold px-7 py-3.5 font-body text-sm font-semibold text-brand-forest transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-cognac-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest"
              >
                Introduce Yourself
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-brand-soft-cream px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <FadeIn>
              <div>
                <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-cognac">
                  The Way We Work
                </p>
                <h2 className="font-display text-3xl font-medium leading-tight text-brand-walnut sm:text-4xl md:text-5xl">
                  The feeling we create together.
                </h2>
                <LineDraw className="mt-7 h-px w-20 bg-brand-gold/60" />
              </div>
            </FadeIn>

            <StaggerContainer className="grid gap-5 sm:grid-cols-3" staggerDelay={0.12}>
              {principles.map((principle) => (
                <StaggerItem key={principle.number}>
                  <article className="h-full rounded-2xl border border-brand-sage/25 bg-white p-6 shadow-[0_16px_45px_rgba(62,39,35,0.06)] sm:p-7">
                    <p className="mb-8 font-accent text-lg italic text-brand-cognac">
                      {principle.number}
                    </p>
                    <h3 className="mb-3 font-display text-xl font-medium leading-snug text-brand-walnut">
                      {principle.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.75] text-brand-olive">
                      {principle.description}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section id="apply" className="relative isolate scroll-mt-20 overflow-hidden bg-[#18231d] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-gold/[0.09] blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand-fern/[0.12] blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FadeIn>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-gold">
                Start a Conversation
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                Tell us where you might fit.
              </h2>
              <p className="mt-6 max-w-md font-body text-base leading-[1.8] text-white/68">
                Roles change with the seasons. Share what you are good at, when you are available, and the kind of work that brings out your best.
              </p>
              <p className="mt-6 border-l-2 border-brand-gold/60 pl-5 font-accent text-base italic leading-relaxed text-white/65">
                Every application is read by a person at Manna. If there is a fitting next step, the team will reach out.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="rounded-2xl border border-white/10 bg-brand-forest-mid/65 p-5 shadow-2xl shadow-black/15 sm:p-8">
              <InquiryForm defaultType="employment" source="careers-page" />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
