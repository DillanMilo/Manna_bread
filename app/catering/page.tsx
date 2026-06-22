'use client';

import Image from 'next/image';
import { FadeIn, LineDraw, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { PageVine } from '@/components/ui/ScrollVine';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { InquirySection } from '@/components/sections/InquirySection';
import { FloatingInquiryButton } from '@/components/ui/FloatingInquiryButton';

/* ─── types ─── */

interface TraySize {
  name: string;
  detail?: string;
  price: string;
}

interface CateringItem {
  name: string;
  note?: string;
}

interface CateringCategory {
  id: string;
  title: string;
  description: string;
  sizes: TraySize[];
  items: CateringItem[];
  subsections?: { label: string; items: CateringItem[] }[];
}

interface DrinkItem {
  name: string;
  price: string;
  note?: string;
}

interface SaladItem {
  name: string;
  description: string;
}

/* ─── data ─── */

const PASTRY_TRAYS: CateringCategory = {
  id: 'pastry-trays',
  title: 'Pastry Trays',
  description: 'Trays include our dozen pastries. Up to two flavor selections per tray.',
  sizes: [
    { name: 'Mini', detail: '2-3 flavors', price: '$30' },
    { name: 'Medium', detail: '4-5 flavors', price: '$40' },
    { name: 'Full Size', detail: '7-10+', price: '$60' },
  ],
  items: [],
  subsections: [
    {
      label: 'Sweet',
      items: [
        { name: 'Almond Danish' },
        { name: 'Cinnamon Roll' },
        { name: 'Sticky Bun' },
        { name: 'Assorted Scone' },
        { name: 'Chocolate Croissant' },
        { name: 'Cream Puff' },
        { name: 'Assorted Cookie' },
        { name: 'Lemon Bar' },
        { name: 'Assorted Brownie' },
      ],
    },
    {
      label: 'Savory',
      items: [
        { name: 'Croissant' },
        { name: 'Cheese Stick' },
        { name: 'Assorted Kolache' },
        { name: 'Assorted Strata' },
      ],
    },
  ],
};

const SANDWICH_PLATTERS: CateringCategory = {
  id: 'sandwich-platters',
  title: 'Sandwich Platters',
  description: 'Platters include one dozen sandwiches. Up to two selections per tray.',
  sizes: [
    { name: 'Mini', price: '$30' },
    { name: 'Medium', price: '$40' },
    { name: 'Full Size', price: '$60' },
  ],
  items: [
    { name: 'Chicken Salad Croissant', note: 'Available on Sourdough' },
  ],
  subsections: [
    {
      label: 'Grilled Paninis',
      items: [
        { name: 'Ham & Honey Mustard' },
        { name: 'Turkey Pesto Panini' },
        { name: 'Grilled Cheese' },
      ],
    },
  ],
};

const COFFEE_DRINKS: DrinkItem[] = [
  { name: 'Espresso Drinks', price: 'Open tab' },
  { name: 'Bar Drinks', price: '$5' },
  { name: 'Hot Chocolate', price: '$5' },
  { name: 'House Drip', price: '$3 per person', note: 'Refills Included' },
  { name: 'Iced Tea', price: '$3 per person', note: 'Refills Included' },
  { name: 'Lemonade Pitcher', price: '$17' },
  { name: 'Glass Dispenser', price: '$25' },
  { name: 'Assorted Soda Glass Bottles', price: '$3 each' },
  { name: 'Cans', price: '$2 each' },
];

const FRUIT_VEG_SIZES: TraySize[] = [
  { name: 'Small', detail: 'Serves 8-12', price: '$45' },
  { name: 'Medium', detail: 'Serves 12-18', price: '$65' },
  { name: 'Large', detail: 'Serves 18-25', price: '$95' },
];

const FRUIT_VEG_ITEMS: CateringItem[] = [
  { name: 'Fruit Tray', note: 'Assorted seasonal fruits' },
  { name: 'Vegetable Tray', note: 'Assorted seasonal vegetables & ranch dressing' },
  { name: 'Fruit Bowl', note: 'Our fresh fruit variety, cut and served in style' },
];

const SALAD_SIZES: TraySize[] = [
  { name: 'Small', detail: 'Serves 8-12', price: '$45' },
  { name: 'Medium', detail: 'Serves 12-18', price: '$65' },
  { name: 'Large', detail: 'Serves 18-25', price: '$95' },
];

const SALAD_ITEMS: SaladItem[] = [
  {
    name: 'Caesar Salad',
    description: 'Romaine, shredded parmesan, herb croutons, and creamy caesar dressing',
  },
  {
    name: 'Strawberry Fields Salad',
    description: 'Spring mix, spinach, strawberries, candied pecan, feta, and sweet raspberry vinaigrette',
  },
  {
    name: 'Mandarin Sesame Salad',
    description: 'Spring mix, mandarin oranges, sliced almonds, red onion, sesame seeds, and sesame ginger dressing',
  },
  {
    name: 'Kale Crunch Salad',
    description: 'Chopped kale, shredded cabbage, sweet dried cranberries, almonds, and honey mustard dressing',
  },
];

const SOUP_FLAVORS: string[] = [
  'Chicken Tortilla',
  'Chophouse Potato',
  'Beef & Barley',
  'Poblano Pepper',
  'Zuppa Toscana',
];

/* ─── parallax image for quote section ─── */

function QuoteParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, scale: 1.04, clipPath: 'inset(8% 0% 8% 0% round 9999px 9999px 16px 16px)' }}
      animate={isInView
        ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 9999px 9999px 16px 16px)' }
        : {}}
      transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative aspect-[4/5] max-w-[320px] sm:max-w-none mx-auto rounded-t-full rounded-b-2xl overflow-hidden shadow-xl"
    >
      <div ref={ref} className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute left-0 right-0 top-[-25%] h-[150%] will-change-transform"
        >
          <Image
            src="/images/manna-quiche-fruit.webp"
            alt="House-made quiche with side fruit cup, plated on marble with gold flatware"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── generic parallax image (for static frames) ─── */

function ParallaxImage({
  src,
  alt,
  className = '',
  sizes,
  speed = 70,
  objectPosition = 'center',
  reveal = 'wipe-up',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  speed?: number;
  objectPosition?: string;
  reveal?: 'wipe-up' | 'wipe-down' | 'wipe-left' | 'wipe-right' | 'zoom';
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  const initialClip =
    reveal === 'wipe-up'    ? 'inset(15% 0% 0% 0%)'
    : reveal === 'wipe-down'? 'inset(0% 0% 15% 0%)'
    : reveal === 'wipe-left'? 'inset(0% 0% 0% 15%)'
    : reveal === 'wipe-right'?'inset(0% 15% 0% 0%)'
    : 'inset(0% 0% 0% 0%)';

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, scale: 1.04, clipPath: initialClip }}
      animate={isInView
        ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
        : {}}
      transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <div ref={ref} className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute left-0 right-0 top-[-28%] h-[156%] will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── section preview image ─── */

function SectionPreviewImage({
  src,
  alt,
  className = 'aspect-[16/9]',
  objectPosition = 'center',
  parallax = true,
  speed = 55,
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  parallax?: boolean;
  speed?: number;
}) {
  if (!parallax) {
    return (
      <FadeIn delay={0.12}>
        <div className={`relative mb-8 sm:mb-10 overflow-hidden rounded-2xl shadow-xl ${className}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={0.12}>
      <div className="mb-8 sm:mb-10">
        <ParallaxImage
          src={src}
          alt={alt}
          className={`${className} rounded-2xl shadow-xl`}
          sizes="(max-width: 768px) 100vw, 896px"
          speed={speed}
          objectPosition={objectPosition}
          reveal="zoom"
        />
      </div>
    </FadeIn>
  );
}

/* ─── pricing card row ─── */

function PricingCards({ sizes }: { sizes: TraySize[] }) {
  return (
    <StaggerContainer className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
      {sizes.map((size) => (
        <StaggerItem key={size.name}>
          <div className="bg-brand-forest-mid/60 rounded-xl sm:rounded-2xl px-2 py-4 sm:p-6 shadow-sm border border-white/10 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="font-body text-xs sm:text-sm font-semibold text-white mb-1 leading-tight">
              {size.name}
            </p>
            {size.detail && (
              <p className="font-body text-[11px] sm:text-sm text-white/60 mb-2 sm:mb-3 leading-tight">
                {size.detail}
              </p>
            )}
            <p className="font-display text-xl sm:text-2xl text-brand-gold">
              {size.price}
            </p>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* ─── item grid ─── */

function ItemGrid({ items }: { items: CateringItem[] }) {
  return (
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
      {items.map((item) => (
        <StaggerItem key={item.name}>
          <div className="py-1.5 sm:py-2">
            <p className="font-body text-sm sm:text-[15px] font-medium text-white/85 leading-snug">
              {item.name}
            </p>
            {item.note && (
              <p className="font-body text-xs sm:text-sm text-white/60 mt-0.5 leading-snug">
                {item.note}
              </p>
            )}
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* ═══════════════════════════════════════════
   CATERING PAGE
   ═══════════════════════════════════════════ */

export default function CateringPage() {
  const pageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={pageRef} className="relative isolate bg-brand-forest min-h-screen overflow-hidden">
      <PageVine variant="catering" progress={scrollYProgress} className="z-0 opacity-85" />
      <FloatingInquiryButton variant="catering" />
      <div className="relative z-10">

      {/* ─── HERO ─── */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-gold mb-5">
              Catering
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white leading-[1.15] mb-6 sm:mb-8">
              Sweet & Savory
              <br />
              <span className="text-brand-gold">In-House Catering</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Select from an assortment of our catering trays to satisfy your
              craving for pastries, sandwiches, soup, salads, and more for your
              in-house events.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <LineDraw className="h-px w-24 bg-brand-gold/40 mx-auto mt-12" />
          </FadeIn>
        </div>

        {/* Hero image — catering spread / table setting */}
        <div className="max-w-5xl mx-auto mt-8 sm:mt-12 md:mt-16 px-5 sm:px-6 md:px-10">
          <ParallaxImage
            src="/images/manna-breakfast-spread.webp"
            alt="A breakfast spread of croissant sandwich and grilled cheese with fresh fruit"
            className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl shadow-xl"
            sizes="(max-width: 1024px) 100vw, 1024px"
            speed={90}
            reveal="zoom"
            priority
          />
        </div>
      </section>

      {/* ─── PASTRY TRAYS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Tray Service
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              {PASTRY_TRAYS.title}
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-8">
              {PASTRY_TRAYS.description}
            </p>
          </FadeIn>

          <SectionPreviewImage
            src="/images/manna-croissant-tray.webp"
            alt="Assorted fresh pastries arranged on a catering tray"
            objectPosition="center 58%"
          />

          <FadeIn delay={0.15}>
            <PricingCards sizes={PASTRY_TRAYS.sizes} />
          </FadeIn>

          {PASTRY_TRAYS.subsections?.map((sub) => (
            <div key={sub.label} className="mb-8 last:mb-0">
              <FadeIn>
                <h3 className="font-body text-sm font-semibold tracking-[1.5px] uppercase text-white mb-4">
                  {sub.label}
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <ItemGrid items={sub.items} />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* ─── IMAGE BREAK: Pastry close-up + quote ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn>
            <QuoteParallaxImage />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="font-accent text-2xl md:text-3xl italic text-white leading-snug mb-6">
                &ldquo;Every tray is made with the same care as if we were
                setting our own family&apos;s table.&rdquo;
              </p>
              <div className="h-px w-12 bg-brand-gold/40 mb-4" />
              <p className="font-body text-sm font-medium text-white/60 tracking-wide uppercase">
                — Christin, Founder
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SANDWICH PLATTERS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Tray Service
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              {SANDWICH_PLATTERS.title}
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-8">
              {SANDWICH_PLATTERS.description}
            </p>
          </FadeIn>

          <SectionPreviewImage
            src="/images/manna-turkey-panini.webp"
            alt="Turkey pesto panini sandwiches plated for catering"
            className="aspect-[4/3]"
            objectPosition="center 80%"
            parallax={false}
          />

          <FadeIn delay={0.15}>
            <PricingCards sizes={SANDWICH_PLATTERS.sizes} />
          </FadeIn>

          {/* Standalone items */}
          {SANDWICH_PLATTERS.items.length > 0 && (
            <FadeIn delay={0.2}>
              <ItemGrid items={SANDWICH_PLATTERS.items} />
            </FadeIn>
          )}

          {/* Subsections */}
          {SANDWICH_PLATTERS.subsections?.map((sub) => (
            <div key={sub.label} className="mt-8">
              <FadeIn>
                <h3 className="font-body text-sm font-semibold tracking-[1.5px] uppercase text-white mb-4">
                  {sub.label}
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <ItemGrid items={sub.items} />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COFFEE & DRINKS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Beverages
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              Coffee & Drinks
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-10">
              $50 minimum for beverage catering orders.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-brand-forest-mid/60 rounded-2xl border border-white/10 shadow-sm overflow-hidden">
              {COFFEE_DRINKS.map((drink, i) => (
                <div
                  key={drink.name}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 ${
                    i < COFFEE_DRINKS.length - 1 ? 'border-b border-dashed border-white/10' : ''
                  }`}
                >
                  <div>
                    <p className="font-body text-[15px] font-medium text-white/85">
                      {drink.name}
                    </p>
                    {drink.note && (
                      <p className="font-body text-sm text-white/60 mt-0.5">
                        {drink.note}
                      </p>
                    )}
                  </div>
                  <p className="font-body text-[15px] font-medium text-brand-gold whitespace-nowrap ml-4">
                    {drink.price}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── IMAGE BREAK: Two-up food photography ─── */}
      <section className="py-12 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <ParallaxImage
            src="/images/manna-latte-art.webp"
            alt="A flat white with rosetta latte art on a marble counter"
            className="aspect-[4/3] max-w-[340px] sm:max-w-none mx-auto rounded-2xl shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            speed={65}
            reveal="wipe-right"
          />
          <ParallaxImage
            src="/images/manna-grilled-panini.webp"
            alt="Grilled panini with kettle chips on marble, gold flatware and baby's breath"
            className="aspect-[4/3] max-w-[340px] sm:max-w-none mx-auto rounded-2xl shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            speed={65}
            objectPosition="center 75%"
            reveal="wipe-left"
          />
        </div>
      </section>

      {/* ─── FRUIT & VEGETABLE TRAYS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <SectionPreviewImage
            src="/images/0606EF79-0239-4CFF-B59C-A0D7898904A5.PNG"
            alt="Fresh fruit and vegetable tray"
          />

          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Fresh Selections
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              Fruit & Vegetable Trays
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <PricingCards sizes={FRUIT_VEG_SIZES} />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FRUIT_VEG_ITEMS.map((item) => (
              <StaggerItem key={item.name}>
                <div className="bg-brand-forest-mid rounded-2xl p-6 border border-white/10">
                  <p className="font-body text-[15px] font-semibold text-white mb-2">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      {item.note}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SALAD BOWLS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-forest-mid">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.12}>
            <div className="mb-8 sm:mb-10">
              <ParallaxImage
                src="/images/IMG_1389.jpeg"
                alt="Fresh salad bowl"
                className="aspect-[16/9] rounded-2xl shadow-xl"
                sizes="(max-width: 768px) 100vw, 896px"
                speed={70}
                reveal="wipe-up"
              />
            </div>
          </FadeIn>

          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Fresh Selections
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              Salad Bowls
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <PricingCards sizes={SALAD_SIZES} />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALAD_ITEMS.map((salad) => (
              <StaggerItem key={salad.name}>
                <div className="bg-brand-forest-mid/60 rounded-2xl p-6 shadow-sm border border-white/10">
                  <p className="font-body text-[15px] font-semibold text-white mb-2">
                    {salad.name}
                  </p>
                  <p className="font-body text-sm text-white/70 leading-relaxed">
                    {salad.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SCRATCH SOUP ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Made from Scratch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-4">
              Scratch Soup
            </h2>
          </FadeIn>

          <SectionPreviewImage
            src="/images/manna-tomato-soup.webp"
            alt="Tomato basil soup with bread on marble"
            objectPosition="center 60%"
          />

          <FadeIn>
            <p className="font-body text-base text-white/70 leading-relaxed mb-10">
              Ten servings per flavor&ensp;|&ensp;
              <span className="font-display text-xl text-brand-gold">$40</span>
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SOUP_FLAVORS.map((flavor) => (
              <StaggerItem key={flavor}>
                <div className="bg-brand-forest-mid rounded-2xl px-6 py-4 border border-white/10 text-center">
                  <p className="font-body text-[15px] font-medium text-white/85">
                    {flavor}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <InquirySection id="catering-inquiry" variant="catering" />

      </div>
    </main>
  );
}
