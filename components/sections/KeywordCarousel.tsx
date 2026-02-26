'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const KEYWORD_ROWS = [
  {
    words: ['artisan', 'slow-fermented', 'stone-milled', 'handcrafted', 'from scratch', 'small-batch', 'wood-fired', 'locally sourced'],
    direction: 'left' as const,
    speed: 90,
  },
  {
    words: ['gather', 'community', 'sanctuary', 'connection', 'belonging', 'rooted', 'together', 'welcome'],
    direction: 'right' as const,
    speed: 100,
  },
  {
    words: ['fresh daily', 'honest ingredients', 'time-honored', 'with intention', 'bread from heaven', 'made whole', 'nourish', 'sustain'],
    direction: 'left' as const,
    speed: 85,
  },
];

const CARDS = [
  {
    label: 'Our Craft',
    title: 'Handcrafted',
    body: 'Every loaf shaped by hand. Every recipe earned through patience. We believe the best things can\'t be rushed.',
  },
  {
    label: 'Our Space',
    title: 'Rooted',
    body: 'A warm sanctuary where timber, greenery, and natural light set the table for real connection.',
  },
  {
    label: 'Our Why',
    title: 'Community',
    body: 'We didn\'t open a bakery — we opened a gathering place. Come for the bread, stay for the people.',
  },
];

function MarqueeRow({
  words,
  direction,
  speed,
}: {
  words: string[];
  direction: 'left' | 'right';
  speed: number;
}) {
  // Duplicate words enough to fill the screen seamlessly
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <div className="relative overflow-hidden whitespace-nowrap py-3 md:py-4">
      <motion.div
        className="inline-flex gap-6 md:gap-10"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {repeated.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide select-none"
            style={{
              WebkitTextStroke: '1.5px var(--color-brand-walnut-medium)',
              WebkitTextFillColor: 'transparent',
              opacity: 0.5,
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ValueCard({
  label,
  title,
  body,
  index,
}: {
  label: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative bg-brand-warm-white/90 backdrop-blur-md rounded-2xl p-7 md:p-9 shadow-lg shadow-brand-walnut/5 border border-brand-sage-light/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
    >
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brand-cognac font-medium">
        {label}
      </span>
      <h3 className="font-display text-2xl md:text-3xl font-semibold text-brand-walnut mt-2 mb-3">
        {title}
      </h3>
      <p className="font-body text-sm md:text-base text-brand-olive leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}

export function KeywordCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-brand-soft-cream overflow-hidden"
    >
      {/* Row 1 — above the cards */}
      <motion.div
        className="pointer-events-none mb-8 md:mb-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <MarqueeRow {...KEYWORD_ROWS[0]} />
      </motion.div>

      {/* Cards layer with row 2 scrolling behind */}
      <div className="relative">
        {/* Row 2 — behind the cards */}
        <motion.div
          className="absolute inset-0 flex items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <MarqueeRow {...KEYWORD_ROWS[1]} />
        </motion.div>

        {/* Cards — elevated above row 2 */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CARDS.map((card, i) => (
              <ValueCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 — below the cards */}
      <motion.div
        className="pointer-events-none mt-8 md:mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <MarqueeRow {...KEYWORD_ROWS[2]} />
      </motion.div>

      {/* Soft gradient edges to fade marquee text out */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-soft-cream to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-soft-cream to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
