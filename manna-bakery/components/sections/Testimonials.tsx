'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FadeIn } from '@/components/ui/Motion';

const TESTIMONIALS = [
  {
    quote: "Manna isn't just a bakery—it's become our family's Sunday morning tradition. The space, the people, the bread... it all feels like home.",
    author: 'Sarah M.',
    location: 'Tomball',
  },
  {
    quote: "Walking into Manna feels like stepping into a sanctuary. The attention to detail in everything they do is extraordinary.",
    author: 'Michael R.',
    location: 'The Woodlands',
  },
  {
    quote: "Best sourdough in Texas, hands down. But honestly, I come for the atmosphere just as much as the bread.",
    author: 'Jennifer L.',
    location: 'Spring',
  },
];

const AUTO_ADVANCE_MS = 6000;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const goTo = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  // Auto-advance when in view
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isInView, activeIndex]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-brand-warm-white">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-8">
            What People Are Saying
          </p>
        </FadeIn>

        <div className="relative min-h-[180px] md:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-accent text-2xl md:text-3xl italic text-brand-walnut leading-relaxed mb-8">
                &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
              </p>
              <p className="font-body text-sm font-medium text-brand-olive">
                — {TESTIMONIALS[activeIndex].author}, {TESTIMONIALS[activeIndex].location}
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dots with progress */}
        <div className="flex gap-3 justify-center mt-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="relative p-1"
              aria-label={`View testimonial ${index + 1}`}
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-brand-cognac' : 'bg-brand-sage-light hover:bg-brand-sage'
                }`}
                animate={index === activeIndex ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Progress ring for active dot */}
              {index === activeIndex && isInView && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-brand-cognac"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: [0.5, 0] }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  key={`progress-${activeIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
