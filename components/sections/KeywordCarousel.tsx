'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
      className="relative bg-brand-forest-mid/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-9 shadow-lg shadow-black/10 border border-white/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
    >
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brand-gold font-medium">
        {label}
      </span>
      <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mt-2 mb-3">
        {title}
      </h3>
      <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}

export function KeywordCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 bg-brand-forest overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {CARDS.map((card, i) => (
            <ValueCard key={card.title} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
