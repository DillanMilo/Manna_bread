'use client';

import Image from 'next/image';
import {
  FadeIn,
  LineDraw,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from '@/components/ui/Motion';
import { Button } from '@/components/ui/Button';
import { PageVine } from '@/components/ui/ScrollVine';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { InquirySection } from '@/components/sections/InquirySection';
import { FloatingInquiryButton } from '@/components/ui/FloatingInquiryButton';
import { formatDisplayPrice } from '@/lib/pricing';

/* ─── rental images ─── */
const RENTAL_IMAGES = {
  space: {
    src: '/images/manna-pergola-lounge.webp',
    alt: 'Manna Bakery lounge under a reclaimed timber pergola with cognac leather seating',
  },
  inside: {
    src: '/images/manna-conference-room.webp',
    alt: 'Manna Bakery conference room with wood panel walls and community table',
  },
  diningRoom: {
    src: '/images/manna-interior-timber-beams.webp',
    alt: 'Bright Manna Bakery dining room with timber beams, white tables, and abundant greenery',
  },
  interior: {
    src: '/images/manna-cognac-lounge.webp',
    alt: 'Manna Bakery interior with cognac leather chairs and abundant greenery beneath tall windows',
  },
};

/* ─── aggressive parallax image ─── */
function ParallaxImage({
  src,
  alt,
  sizes,
  speed = -0.35,
}: {
  src: string;
  alt: string;
  sizes: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-[30%] -bottom-[30%] left-0 right-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </motion.div>
    </div>
  );
}

/* ─── section divider ─── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 md:py-16">
      <LineDraw className="h-px w-16 bg-brand-gold/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
      <LineDraw className="h-px w-16 bg-brand-gold/40" delay={0.2} />
    </div>
  );
}

/* ─── detail item ─── */
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-body text-sm font-semibold text-white">{label}:</span>
      <span className="font-body text-sm text-white/85">{value}</span>
    </div>
  );
}

/* ─── stat block (capacity numbers) ─── */
function StatBlock({
  number,
  label,
  sub,
}: {
  number: number;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-brand-forest-mid/50 border border-white/10 rounded-2xl p-6 sm:p-7 text-center h-full">
      <p className="font-display text-5xl sm:text-6xl text-brand-gold leading-none mb-3">
        <CountUp target={number} duration={1.6} />
      </p>
      <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold/80 mb-1">
        {label}
      </p>
      <p className="font-body text-sm text-white/70 leading-snug">{sub}</p>
    </div>
  );
}

/* ─── policy bullet list ─── */
function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-brand-gold/70 shrink-0" />
          <span className="font-body text-[15px] text-white/85 leading-[1.7]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── included-service icon card ─── */
function IncludedCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-brand-forest-mid/40 rounded-2xl p-6 shadow-sm border border-white/10 h-full">
      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 text-brand-gold">
        {icon}
      </div>
      <h3 className="font-display text-lg font-medium text-white mb-2">
        {title}
      </h3>
      <p className="font-body text-sm text-white/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ─── policy card (booking & policies trio) ─── */
function PolicyCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <details className="group md:hidden bg-brand-forest-mid/50 rounded-2xl border border-white/10 overflow-hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block font-body text-[10px] font-semibold tracking-[2px] uppercase text-brand-gold mb-2">
              {eyebrow}
            </span>
            <span className="block font-display text-xl font-medium text-white">
              {title}
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="px-5 pb-5">
          {children}
        </div>
      </details>

      <div className="hidden md:block bg-brand-forest-mid/50 rounded-2xl p-7 sm:p-8 border border-white/10 h-full">
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
          {eyebrow}
        </p>
        <h3 className="font-display text-2xl font-medium text-white mb-5">
          {title}
        </h3>
        {children}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   RENTALS PAGE
   ═══════════════════════════════════════════ */
export default function RentalsPage() {
  const pageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={pageRef} className="relative isolate bg-brand-forest min-h-screen overflow-hidden">
      <PageVine variant="rentals" progress={scrollYProgress} className="z-20 opacity-85" />
      <FloatingInquiryButton variant="rentals" />
      <div className="relative z-30">
      {/* ─── HERO ─── */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-gold mb-5">
              Private Rentals
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white leading-[1.15] mb-6 sm:mb-8">
              Host Your Event at Manna
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Manna was created with you and your people in mind &mdash; for company
              meetings and Bible studies, birthday brunches and showers, rehearsal
              dinners and full-house celebrations. Manna opens its doors for the
              moments worth gathering for.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <LineDraw className="h-px w-24 bg-brand-gold/40 mx-auto mt-12" />
          </FadeIn>
        </div>
      </section>

      {/* ─── PHOTO GALLERY ─── */}
      <section className="pb-12 sm:pb-16 md:pb-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto -mx-5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 sm:gap-5 md:gap-6"
            staggerDelay={0.15}
          >
            {[RENTAL_IMAGES.space, RENTAL_IMAGES.diningRoom, RENTAL_IMAGES.interior].map(
              (img) => (
                <StaggerItem key={img.src} className="w-[78vw] shrink-0 snap-center sm:w-auto">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <ParallaxImage
                      src={img.src}
                      alt={img.alt}
                      sizes="(max-width: 640px) 78vw, (max-width: 768px) 50vw, 33vw"
                      speed={-0.35}
                    />
                  </div>
                </StaggerItem>
              )
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CONFERENCE ROOM RESERVATION ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text column */}
            <div className="lg:col-span-6 lg:order-1">
              <FadeIn>
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                  Small Gatherings
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                  Conference Room Reservation
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                  Manna&apos;s conference room seats up to 14 guests around a long
                  community table. Nestled between beautiful wood panel walls and
                  modern sliding glass doors, it is a cozy setting for company
                  meetings, Bible studies, planning sessions, birthday gatherings,
                  and other small groups.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="space-y-2 mb-6">
                  <DetailItem label="Availability" value="Monday - Saturday" />
                  <DetailItem label="Hours" value="6am - 4pm" />
                  <DetailItem label="Capacity" value="Up to 14 guests" />
                </div>
              </FadeIn>

              <FadeIn delay={0.35}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-brand-forest-mid/60 p-5 shadow-sm">
                    <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[2px] text-white/65">
                      Monday &ndash; Thursday
                    </p>
                    <p className="font-display text-3xl text-brand-gold">
                      {formatDisplayPrice('$35')}
                    </p>
                    <p className="mt-1 font-body text-sm text-white/60">per hour</p>
                  </div>
                  <div className="rounded-2xl border border-brand-gold/35 bg-brand-gold/10 p-5 shadow-sm">
                    <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[2px] text-white/65">
                      Friday &amp; Saturday
                    </p>
                    <p className="font-display text-3xl text-brand-gold">
                      {formatDisplayPrice('$45')}
                    </p>
                    <p className="mt-1 font-body text-sm text-white/60">per hour</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border-l-4 border-brand-gold bg-brand-forest/45 px-4 py-3">
                  <p className="font-body text-sm leading-relaxed text-white/85">
                    To make room for everyone, Saturday reservations are limited to
                    one two-hour time block per group.
                  </p>
                </div>
                <p className="mt-4 px-1 font-body text-xs leading-[1.7] text-white/55">
                  Please note: Outside food, promotional materials, and solicitation
                  to Manna customers are not permitted during conference room rentals
                  unless authorized by Manna staff. All activities should align with
                  Manna Bread From Heaven&apos;s welcoming and peaceful environment.
                </p>
              </FadeIn>
            </div>

            {/* Image column */}
            <div className="lg:col-span-6 lg:order-2 lg:col-start-7">
              <FadeIn delay={0.2} direction="right">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl">
                  <ParallaxImage
                    src={RENTAL_IMAGES.inside.src}
                    alt={RENTAL_IMAGES.inside.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    speed={-0.3}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── FULL BUILDING RENTALS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-14 md:mb-20">
            {/* Image column */}
            <div className="lg:col-span-6 lg:order-1">
              <FadeIn direction="left">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                  <ParallaxImage
                    src={RENTAL_IMAGES.space.src}
                    alt={RENTAL_IMAGES.space.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    speed={-0.2}
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text column */}
            <div className="lg:col-span-6 lg:order-2 lg:col-start-7">
              <FadeIn>
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                  Full Building Rentals
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                  Manna Is All Yours for the Evening
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                  Once the doors close to the public, the lights soften, and Manna
                  becomes a private space for receptions, rehearsal dinners, showers,
                  milestone parties, and the gatherings that deserve a little more
                  room to breathe.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="space-y-2 mb-6">
                  <DetailItem
                    label="Availability"
                    value="Monday - Saturday, beginning at 4pm"
                  />
                  <DetailItem
                    label="Cleaning fee"
                    value="$70 flat (self-clean waiver available on request)"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Rate cards */}
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
            staggerDelay={0.12}
          >
            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-5 sm:p-8 border border-white/10 shadow-sm h-full">
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                  Monday &ndash; Thursday
                </p>
                <p className="font-display text-4xl sm:text-6xl text-brand-gold leading-none mb-2">
                  $195
                </p>
                <p className="font-body text-sm text-white/70 mb-4">
                  per hour, at or after 4pm
                </p>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  A quieter weeknight rate for showers, dinners, and gatherings
                  that don&apos;t need a Saturday.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-5 sm:p-8 border border-brand-gold/30 shadow-sm h-full">
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                  Friday &amp; Saturday
                </p>
                <p className="font-display text-4xl sm:text-6xl text-brand-gold leading-none mb-2">
                  $295
                </p>
                <p className="font-body text-sm text-white/70 mb-4">
                  per hour, at or after 4pm
                </p>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  Manna&apos;s weekend evening rate &mdash; the most-requested window for
                  receptions and celebrations.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Button href="#rental-inquiry" variant="accent" className="w-full sm:w-auto">
                Inquire About a Date
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── CAPACITY & SPACE ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Capacity &amp; Space
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl mx-auto">
                Room enough for an intimate dinner &mdash; or a full-house party.
              </h2>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            staggerDelay={0.1}
          >
            <StaggerItem>
              <StatBlock
                number={55}
                label="Indoor Dining"
                sub="seated guests with tables and chairs"
              />
            </StaggerItem>
            <StaggerItem>
              <StatBlock
                number={25}
                label="Patio Dining"
                sub="seated guests on the outdoor patio"
              />
            </StaggerItem>
            <StaggerItem>
              <StatBlock
                number={120}
                label="Indoor Standing"
                sub="when dining tables are removed"
              />
            </StaggerItem>
            <StaggerItem>
              <StatBlock
                number={40}
                label="Patio Standing"
                sub="standing-only guests outdoors"
              />
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <p className="font-body text-sm text-white/60 text-center mt-10 max-w-xl mx-auto leading-relaxed">
              Manna&apos;s layout is flexible. Share how you picture the evening,
              and the team can help shape the room around it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                What&apos;s Included
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
                Everything the building has to offer.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-[1.8] text-white/70">
                Manna is already thoughtfully styled and ready to welcome your
                guests. With the furnishings and essentials in place, you can simply
                bring your people &mdash; for a work gathering, Bible study,
                celebration, or an easy evening together.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            staggerDelay={0.08}
          >
            <StaggerItem>
              <IncludedCard
                title="Complimentary Wifi"
                description="Fast, reliable wifi for guests, presenters, and anyone who needs to share a slideshow."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <IncludedCard
                title="Microphone & Amp"
                description="A simple, ready-to-use sound setup for toasts, readings, or a few thoughtful words."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <IncludedCard
                title="Service Counters"
                description="Use of Manna's front counters for catering setup, drink stations, or dessert displays."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <IncludedCard
                title="Outdoor Patio"
                description="Manna's shaded patio is yours to use during the rental window - great for spillover and fresh air."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <IncludedCard
                title="Unlimited Cubed Ice"
                description="Help yourself - there's always more where that came from."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364-6.364L5.636 18.364M5.636 5.636l12.728 12.728" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <IncludedCard
                title="Ambient Music"
                description="Manna's house playlist runs during your event. Custom playlists or volume changes are available — just run them by us first."
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                  </svg>
                }
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Divider />

      {/* ─── CATERING ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Catering
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
                Feed your people, the Manna way &mdash; or yours.
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* In-House */}
            <FadeIn>
              <div className="bg-brand-forest/60 rounded-2xl p-7 sm:p-9 border border-white/10 h-full">
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                  In-House Catering
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-5">
                  Made fresh, the way Manna always does it.
                </h3>
                <p className="font-body text-[15px] text-white/85 leading-[1.8] mb-5">
                  Manna offers a full in-house catering menu pulled straight from
                  the bakery kitchen &mdash; the same hands, the same recipes,
                  the same care. Custom variations, special diets, or a personal
                  favorite of yours can often be folded in. Just ask.
                </p>
                <Button href="/catering" variant="ghost" className="w-full sm:w-auto">
                  See the Catering Menu
                </Button>
              </div>
            </FadeIn>

            {/* Outside Catering */}
            <FadeIn delay={0.15}>
              <div className="bg-brand-forest/60 rounded-2xl p-7 sm:p-9 border border-white/10 h-full">
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                  Bringing Food In
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-5">
                  A few notes on outside catering.
                </h3>
                <PolicyList
                  items={[
                    'All outside food and drink must be pre-approved by Manna.',
                    'A 10% additional rental fee applies if more than 50% of catering is outside.',
                    'Outside dishes must be clearly labeled with the restaurant or origin at the serving area.',
                    'Tableware is not provided for outside-catered meals.',
                  ]}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── ADD-ONS / BARISTA ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image column */}
            <div className="lg:col-span-6 lg:order-1">
              <FadeIn direction="left">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <ParallaxImage
                    src="/images/manna-espresso-pour.webp"
                    alt="A barista's hands steaming milk at the espresso machine"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    speed={-0.25}
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text + price card column */}
            <div className="lg:col-span-6 lg:order-2 lg:col-start-7">
              <FadeIn>
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                  Add-On
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
                  A Barista, All Yours
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                  For a flat $50, we&apos;ll station a barista behind the bar for
                  your event with our full espresso menu open to your guests.
                  We&apos;ll keep an open tab and settle up at the end.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p className="font-body text-sm text-white/65 leading-[1.7] mb-6">
                  Discounted flat rate for the night: <span className="text-white">$5 small</span> &middot; <span className="text-white">$6 large</span>.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-brand-gold/10 rounded-2xl p-7 sm:p-8 border border-brand-gold/40 text-center">
                  <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                    Barista Service
                  </p>
                  <p className="font-display text-5xl sm:text-6xl text-brand-gold leading-none mb-2">
                    $50
                  </p>
                  <p className="font-body text-sm text-white/70 mb-5">
                    flat reservation fee
                  </p>
                  <div className="border-t border-brand-gold/20 pt-4 space-y-1">
                    <p className="font-body text-sm text-white/85">
                      <span className="text-brand-gold">$5</span> small &middot;{' '}
                      <span className="text-brand-gold">$6</span> large
                    </p>
                    <p className="font-body text-xs text-white/55">
                      Open tab, full espresso menu
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── DECOR & SETUP ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Decor &amp; Setup
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
                Make the space yours, gently.
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <FadeIn>
              <div>
                <h3 className="font-display text-2xl font-medium text-white mb-5">
                  Decor Guidelines
                </h3>
                <PolicyList
                  items={[
                    'Anything hung or mounted cannot leave residue, marks, or holes - an additional fee applies if it does.',
                    'No loose glitter, confetti, or other small-particle decor.',
                    'Balloons, arches, and similar pieces must be taken with you at the end of the night, or a disposal fee applies.',
                  ]}
                />
                <div className="mt-6 border-l-2 border-brand-gold/50 pl-5">
                  <p className="font-accent text-lg italic text-white/80 leading-relaxed">
                    If you&apos;d like to leave behind extra flowers or plants,
                    Manna&apos;s team will happily put them out for the next morning&apos;s
                    customers to enjoy.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h3 className="font-display text-2xl font-medium text-white mb-5">
                  Furniture &amp; Layout
                </h3>
                <p className="font-body text-[15px] text-white/85 leading-[1.8] mb-5">
                  Move things around &mdash; really. The existing furniture and
                  tables can be rearranged to fit the layout you have in mind.
                </p>
                <PolicyList
                  items={[
                    'Snap a quick photo before you move anything.',
                    'Return each piece to its original spot before you leave.',
                    "Share your vision and Manna's team can help shape the room.",
                  ]}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── BOOKING & POLICIES ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Booking &amp; Policies
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl mx-auto">
                The fine print, kept honest and short.
              </h2>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            staggerDelay={0.12}
          >
            <StaggerItem>
              <PolicyCard eyebrow="Step One" title="Deposit & Payment">
                <PolicyList
                  items={[
                    'A signed rental agreement and 50% of the total reserve your date.',
                    'The remaining balance is due 2 weeks before the event.',
                    'All invoices are paid through an emailed link by credit or debit card.',
                  ]}
                />
              </PolicyCard>
            </StaggerItem>

            <StaggerItem>
              <PolicyCard eyebrow="If Plans Change" title="Cancellation">
                <PolicyList
                  items={[
                    'More than 4 weeks out: full refund of deposit and catering invoices.',
                    'Within 4 weeks: barista service and cleaning fee fully refundable; all other payments refundable at 50%.',
                    'Within 1 week of the event: no refunds.',
                  ]}
                />
              </PolicyCard>
            </StaggerItem>

            <StaggerItem>
              <PolicyCard eyebrow="On the Day" title="Time & Overtime">
                <PolicyList
                  items={[
                    'Build setup, cleanup, and guest hangout time into your rental window.',
                    'Decor and guests may not arrive before the agreed start time.',
                    'Overtime is billed in 30-minute increments at 130% of the rental rate.',
                  ]}
                />
              </PolicyCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Divider />

      {/* ─── PARKING ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Getting Here
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
              A note on parking.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
              Street parking out front is limited, but there&apos;s a generous
              public lot tucked behind the building &mdash; accessible from the
              west (left) side of the block.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-body text-base md:text-[17px] text-white/75 leading-[1.8]">
              Dozens of spots back there, with a quiet 2&ndash;3 minute walk
              through the open-alley sidewalk to Manna&apos;s front door. Worth
              passing the tip along to your guests.
            </p>
          </FadeIn>
        </div>
      </section>

      <InquirySection id="rental-inquiry" variant="rentals" />
      </div>
    </main>
  );
}
