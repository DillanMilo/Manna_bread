'use client';

import Image from 'next/image';
import { FadeIn, LineDraw, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ─── rental images ─── */
const RENTAL_IMAGES = {
  space: {
    src: '/images/manainside.webp',
    alt: 'Manna Bakery private event space with warm timber beams and greenery',
  },
  inside: {
    src: '/images/ScreenShot20241125at111415AM.webp',
    alt: 'Manna Bakery conference room with wood panel walls and community table',
  },
  interior: {
    src: '/images/TR5_3320edit.webp',
    alt: 'Manna Bakery interior featuring arched alcoves and warm lighting',
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

/* ─── price card component ─── */
function PriceCard({
  price,
  unit,
  extra,
}: {
  price: string;
  unit: string;
  extra?: string;
}) {
  return (
    <div className="bg-brand-forest-mid/60 rounded-2xl p-6 shadow-sm border border-white/10 w-full sm:inline-block sm:w-auto">
      <p className="font-display text-3xl text-brand-gold">{price}</p>
      <p className="font-body text-sm text-white/60 mt-1">{unit}</p>
      {extra && (
        <p className="font-body text-sm text-brand-gold/80 mt-1">{extra}</p>
      )}
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

/* ═══════════════════════════════════════════
   RENTALS PAGE
   ═══════════════════════════════════════════ */
export default function RentalsPage() {
  return (
    <main className="bg-brand-forest min-h-screen">
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
              Whether you are looking for a small place to gather for your meeting,
              bible study, or intimate celebration or wanting to reserve the whole
              building for a reception or party, Manna offers reservations and
              rentals to suit your needs.
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            staggerDelay={0.15}
          >
            {[RENTAL_IMAGES.space, RENTAL_IMAGES.inside, RENTAL_IMAGES.interior].map(
              (img) => (
                <StaggerItem key={img.src}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <ParallaxImage
                      src={img.src}
                      alt={img.alt}
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                  Perfect for small gatherings, our conference room seats up to 14
                  guests at our 9.5ft community table. Nestled between beautiful
                  wood panel walls and modern sliding glass doors, your party will
                  enjoy meeting together in our unique and cozy conference room.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="font-body text-sm text-white/70 leading-[1.7] mb-6">
                  Outside food, promotional materials, and solicitation to our
                  customers is not permitted during conference room rentals unless
                  authorized by Manna Staff. We ask that all activities align with
                  Manna Bread From Heaven&apos;s welcoming and peaceful environment.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="space-y-2 mb-6">
                  <DetailItem label="Availability" value="Monday &ndash; Saturday" />
                  <DetailItem label="Hours" value="6am &ndash; 2pm" />
                  <DetailItem label="Capacity" value="Up to 14 guests" />
                </div>
              </FadeIn>

              <FadeIn delay={0.35}>
                <PriceCard price="$20" unit="per hour" />
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

      {/* ─── PRIVATE EVENTS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image column */}
            <div className="lg:col-span-6 lg:order-1">
              <FadeIn direction="left">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
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
                  Full Building
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                  Private Events
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                  Celebrating a special occasion? Manna would love to host! We offer
                  flexible dining room layouts and catering options to accommodate
                  your needs.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="space-y-2 mb-6">
                  <DetailItem label="Availability" value="Monday &ndash; Saturday" />
                  <DetailItem label="Hours" value="Rental times may begin as early as 1:30pm" />
                </div>
              </FadeIn>

              <FadeIn delay={0.35}>
                <div className="mb-8">
                  <PriceCard price="$275" unit="per hour" extra="+ $70 cleaning fee" />
                </div>
              </FadeIn>

              <FadeIn delay={0.45}>
                <Button href="/contact" variant="accent" className="w-full sm:w-auto">
                  Inquire About Booking
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DETAILS & POLICIES ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Good to Know
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
                Details &amp; Information
              </h2>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            staggerDelay={0.12}
          >
            {/* Capacity */}
            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-7 shadow-sm border border-white/10 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-medium text-white mb-2">
                  Capacity
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  Conference room seats up to 14 guests at the community table.
                  Full building accommodates larger parties and events.
                </p>
              </div>
            </StaggerItem>

            {/* Hours */}
            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-7 shadow-sm border border-white/10 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-medium text-white mb-2">
                  Hours
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  Conference room available 6am&ndash;2pm. Private event rentals
                  may begin as early as 1:30pm, Monday&ndash;Saturday.
                </p>
              </div>
            </StaggerItem>

            {/* What&apos;s Included */}
            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-7 shadow-sm border border-white/10 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-medium text-white mb-2">
                  What&apos;s Included
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  Tables, seating, and access to the beautiful Manna space.
                  Flexible dining room layouts and catering options available.
                </p>
              </div>
            </StaggerItem>

            {/* How to Book */}
            <StaggerItem>
              <div className="bg-brand-forest-mid/60 rounded-2xl p-7 shadow-sm border border-white/10 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-medium text-white mb-2">
                  How to Book
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  Reach out by phone or email to check availability and reserve
                  your date. We are happy to help plan your gathering.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="py-14 sm:py-20 md:py-28 bg-brand-forest-mid">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10 text-center">
          <FadeIn>
            <p className="font-accent text-xl md:text-2xl italic text-white/80 leading-relaxed mb-8">
              &ldquo;Every gathering is an opportunity to break bread together.&rdquo;
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
              Ready to book your event?
            </h2>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              Whether it&apos;s a morning meeting or an evening celebration,
              we&apos;d love to help you make it special. Reach out and
              let&apos;s start planning.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white/60 font-body text-sm mb-10">
              <span>{CONTACT.phone}</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>{CONTACT.email}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} variant="ghost" className="w-full sm:w-auto">
                Call Us
              </Button>
              <Button href={`mailto:${CONTACT.email}`} variant="ghost" className="w-full sm:w-auto">
                Email Us
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
