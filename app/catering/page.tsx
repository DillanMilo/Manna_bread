'use client';

import Image from 'next/image';
import { FadeIn, LineDraw, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  description: 'Trays include one-dozen pastries. Up to two flavor selections per tray.',
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
  { name: 'Espresso Drinks', price: 'Tea Order, Open Tab' },
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
  'Zuppa Toscano',
];

/* ─── parallax image for CTA ─── */

function CateringParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-xl">
      <motion.div
        style={{ y }}
        className="absolute -top-[15%] -bottom-[15%] left-0 right-0 will-change-transform"
      >
        <Image
          src="/images/IMG_0902.jpg"
          alt="Manna Bakery gathering and event space"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>
    </div>
  );
}

/* ─── parallax image for quote section ─── */

function QuoteParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <div ref={ref} className="relative aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden shadow-xl">
      <motion.div
        style={{ y }}
        className="absolute -top-[12%] -bottom-[12%] left-0 right-0 will-change-transform"
      >
        <Image
          src="/images/IMG_0903.jpg"
          alt="Manna Bakery pastry tray prepared with care"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>
    </div>
  );
}

/* ─── image placeholder ─── */

function ImagePlaceholder({
  label,
  aspect = 'aspect-[16/9]',
  className = '',
  arch = false,
}: {
  label: string;
  aspect?: string;
  className?: string;
  arch?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-brand-soft-cream border-2 border-dashed border-brand-sage/30 flex flex-col items-center justify-center ${aspect} ${
        arch ? 'rounded-t-full rounded-b-2xl' : 'rounded-2xl'
      } ${className}`}
    >
      {/* subtle cross-hatch pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #8A9A8E 10px, #8A9A8E 11px),
          repeating-linear-gradient(-45deg, transparent, transparent 10px, #8A9A8E 10px, #8A9A8E 11px)`,
      }} />

      <svg
        className="w-10 h-10 text-brand-sage/40 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
      <p className="font-body text-xs font-medium tracking-[1.5px] uppercase text-brand-sage/60">
        {label}
      </p>
    </div>
  );
}

/* ─── section divider ─── */

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 md:py-16">
      <LineDraw className="h-px w-16 bg-brand-sage/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-cognac/50" />
      <LineDraw className="h-px w-16 bg-brand-sage/40" delay={0.2} />
    </div>
  );
}

/* ─── pricing card row ─── */

function PricingCards({ sizes }: { sizes: TraySize[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
      {sizes.map((size) => (
        <StaggerItem key={size.name}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-sage/10 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <p className="font-body text-sm font-semibold text-brand-walnut mb-1">
              {size.name}
            </p>
            {size.detail && (
              <p className="font-body text-sm text-brand-olive mb-3">
                {size.detail}
              </p>
            )}
            <p className="font-display text-2xl text-brand-cognac">
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
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
      {items.map((item) => (
        <StaggerItem key={item.name}>
          <div className="py-2">
            <p className="font-body text-[15px] font-medium text-brand-charcoal">
              {item.name}
            </p>
            {item.note && (
              <p className="font-body text-sm text-brand-olive mt-0.5">
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
  return (
    <main className="bg-brand-warm-white min-h-screen">

      {/* ─── HERO ─── */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-cognac mb-5">
              Catering
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-7xl font-medium text-brand-walnut leading-[1.1] mb-6 sm:mb-8">
              Sweet & Savory
              <br />
              <span className="text-brand-cognac">In-House Catering</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-lg md:text-xl text-brand-olive leading-relaxed max-w-2xl mx-auto">
              Select from an assortment of our catering trays to satisfy your
              craving for pastries, sandwiches, soup, salads, and more for your
              in-house events.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <LineDraw className="h-px w-24 bg-brand-cognac/40 mx-auto mt-12" />
          </FadeIn>
        </div>

        {/* Hero image — catering spread / table setting */}
        <FadeIn delay={0.5}>
          <div className="max-w-5xl mx-auto mt-8 sm:mt-12 md:mt-16 px-5 sm:px-6 md:px-10">
            <ImagePlaceholder
              label="Catering spread photo"
              aspect="aspect-[21/9]"
            />
          </div>
        </FadeIn>
      </section>

      {/* ─── PASTRY TRAYS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-soft-cream">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Tray Service
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              {PASTRY_TRAYS.title}
            </h2>
            <p className="font-body text-base text-brand-olive leading-relaxed mb-8">
              {PASTRY_TRAYS.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <PricingCards sizes={PASTRY_TRAYS.sizes} />
          </FadeIn>

          {PASTRY_TRAYS.subsections?.map((sub) => (
            <div key={sub.label} className="mb-8 last:mb-0">
              <FadeIn>
                <h3 className="font-body text-sm font-semibold tracking-[1.5px] uppercase text-brand-walnut mb-4">
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
              <p className="font-accent text-2xl md:text-3xl italic text-brand-walnut leading-snug mb-6">
                &ldquo;Every tray is made with the same care as if we were
                setting our own family&apos;s table.&rdquo;
              </p>
              <div className="h-px w-12 bg-brand-cognac/40 mb-4" />
              <p className="font-body text-sm font-medium text-brand-olive tracking-wide uppercase">
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
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Tray Service
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              {SANDWICH_PLATTERS.title}
            </h2>
            <p className="font-body text-base text-brand-olive leading-relaxed mb-8">
              {SANDWICH_PLATTERS.description}
            </p>
          </FadeIn>

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
                <h3 className="font-body text-sm font-semibold tracking-[1.5px] uppercase text-brand-walnut mb-4">
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
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-soft-cream">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Beverages
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              Coffee & Drinks
            </h2>
            <p className="font-body text-base text-brand-olive leading-relaxed mb-10">
              $50 minimum for beverage catering orders.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl border border-brand-sage/10 shadow-sm overflow-hidden">
              {COFFEE_DRINKS.map((drink, i) => (
                <div
                  key={drink.name}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 ${
                    i < COFFEE_DRINKS.length - 1 ? 'border-b border-dashed border-brand-sage/20' : ''
                  }`}
                >
                  <div>
                    <p className="font-body text-[15px] font-medium text-brand-charcoal">
                      {drink.name}
                    </p>
                    {drink.note && (
                      <p className="font-body text-sm text-brand-olive mt-0.5">
                        {drink.note}
                      </p>
                    )}
                  </div>
                  <p className="font-body text-[15px] font-medium text-brand-cognac whitespace-nowrap ml-4">
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
          <FadeIn>
            <ImagePlaceholder
              label="Drinks / coffee service"
              aspect="aspect-[4/3]"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <ImagePlaceholder
              label="Fresh fruit arrangement"
              aspect="aspect-[4/3]"
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── FRUIT & VEGETABLE TRAYS ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Fresh Selections
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              Fruit & Vegetable Trays
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <PricingCards sizes={FRUIT_VEG_SIZES} />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FRUIT_VEG_ITEMS.map((item) => (
              <StaggerItem key={item.name}>
                <div className="bg-brand-soft-cream rounded-2xl p-6 border border-brand-sage/10">
                  <p className="font-body text-[15px] font-semibold text-brand-walnut mb-2">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="font-body text-sm text-brand-olive leading-relaxed">
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
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 bg-brand-soft-cream">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Fresh Selections
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              Salad Bowls
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <PricingCards sizes={SALAD_SIZES} />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALAD_ITEMS.map((salad) => (
              <StaggerItem key={salad.name}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-sage/10">
                  <p className="font-body text-[15px] font-semibold text-brand-walnut mb-2">
                    {salad.name}
                  </p>
                  <p className="font-body text-sm text-brand-olive leading-relaxed">
                    {salad.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── IMAGE BREAK: Soup / kitchen scene ─── */}
      <section className="py-12 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <ImagePlaceholder
              label="Kitchen / soup preparation"
              aspect="aspect-[16/7]"
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── SCRATCH SOUP ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
              Made from Scratch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-4">
              Scratch Soup
            </h2>
            <p className="font-body text-base text-brand-olive leading-relaxed mb-10">
              Ten servings per flavor&ensp;|&ensp;
              <span className="font-display text-xl text-brand-cognac">$40</span>
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SOUP_FLAVORS.map((flavor) => (
              <StaggerItem key={flavor}>
                <div className="bg-brand-soft-cream rounded-2xl px-6 py-4 border border-brand-sage/10 text-center">
                  <p className="font-body text-[15px] font-medium text-brand-charcoal">
                    {flavor}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="py-20 md:py-28 bg-brand-soft-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10 md:gap-14 items-center">
            {/* Image — gathering / event scene */}
            <FadeIn className="md:col-span-2">
              <CateringParallaxImage />
            </FadeIn>

            {/* Text */}
            <div className="md:col-span-3 text-center md:text-left">
              <FadeIn>
                <p className="font-accent text-lg md:text-xl italic text-brand-olive mb-3">
                  Let us bring the warmth to your table
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                  Ready to place your order?
                </h2>
                <p className="font-body text-base text-brand-olive leading-relaxed mb-8">
                  Whether it&apos;s a corporate breakfast, a family celebration, or an
                  intimate gathering with friends, we&apos;d love to help you curate
                  the perfect spread. Reach out and let&apos;s start planning.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button href="/contact" variant="primary">
                    Contact us
                  </Button>
                  <Button href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} variant="secondary">
                    Call {CONTACT.phone}
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
