'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';


const TESTIMONIALS = [
  {
    quote: "This place is beautiful, plays calming Christian music, has great service, AND HAS AN AMAZING GLUTEN FREE SELECTION! For once, I felt like I got to pick from the 'good' things on the menu, just like everyone else. I haven't gotten to feel that way in a long, long time. For that alone, I'm grateful and will be a repeat customer.",
    author: 'Sarah Rock',
    detail: 'Food: 5/5 · Service: 5/5 · Atmosphere: 5/5',
  },
  {
    quote: "This place has such a positive and calming vibe. The bread and pastries is a 10/10. Christian owned and operated. The perfect spot to grab lunch, catch up with friends or work from your laptop.",
    author: 'MC S',
    detail: 'Food: 5/5 · Service: 5/5 · Atmosphere: 5/5',
  },
  {
    quote: "Very acquainted, beautifully set up environment. Calm Christian music. Very welcoming immediately and exquisite breakfast menu. Absolutely love all the plants and vibe. Customer service was also nice and patient… our choice of stuffed French toast and coffee was delicious. Last, immaculate restrooms! Thank you Manna for making my breakfast date so sweet.",
    author: 'Vivian Torres',
    detail: 'Food: 5/5 · Service: 5/5 · Atmosphere: 5/5',
  },
  {
    quote: "Visited this spot around 8 AM on a weekday and was pleased! The staff was friendly, and they had good breakfast and lunch options. The food came out fast and coffee was good. Definitely planning my next visit soon.",
    author: 'Cecily Coe',
    detail: 'Food: 4/5 · Service: 5/5 · Atmosphere: 5/5',
  },
  {
    quote: "I lost my wallet about a month ago and assumed it was gone for good. The owner of this coffee shop found it and went out of their way to return it to me. They kept it safe and made sure it got back into my hands. That level of honesty and care says everything about how this business operates. Great coffee. Even better people. I will keep coming back.",
    author: 'Christian Ceser',
    detail: '',
  },
];

const AUTO_ADVANCE_MS = 6000;

function quoteTextClass(length: number): string {
  if (length > 250) return 'text-base sm:text-lg md:text-xl lg:text-2xl';
  return 'text-lg sm:text-xl md:text-2xl lg:text-3xl';
}

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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-28 bg-brand-forest-mid">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center"
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-8">
          What People Are Saying
        </p>

        <div className="relative min-h-[320px] sm:min-h-[280px] md:min-h-[260px] flex items-center justify-center">
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
              <p className={`font-accent ${quoteTextClass(TESTIMONIALS[activeIndex].quote.length)} italic text-white leading-relaxed mb-5 sm:mb-6 md:mb-8`}>
                &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
              </p>
              <p className="font-body text-sm font-medium text-white/60">
                — {TESTIMONIALS[activeIndex].author}
              </p>
              {TESTIMONIALS[activeIndex].detail && (
                <p className="font-body text-xs text-white/40 mt-2">
                  {TESTIMONIALS[activeIndex].detail}
                </p>
              )}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dots with progress */}
        <div className="flex gap-4 justify-center mt-8 sm:mt-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="relative p-3"
              aria-label={`View testimonial ${index + 1}`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-brand-gold' : 'bg-white/30 hover:bg-white/50'
                }`}
                animate={index === activeIndex ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Progress ring for active dot */}
              {index === activeIndex && isInView && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-brand-gold"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 2.5, opacity: [0.5, 0] }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  key={`progress-${activeIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
