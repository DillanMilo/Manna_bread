'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { BRAND, TOAST } from '@/lib/constants';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: move background slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Fade out content as user scrolls down
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns + Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/placeholder/hero-bakery-interior.jpg)',
          backgroundColor: '#8A9A8E',
          y: bgY,
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/40 via-brand-charcoal/30 to-brand-charcoal/60" />
      </motion.div>

      {/* Content with scroll fade */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Tagline */}
        <motion.p
          className="font-accent text-lg md:text-xl italic text-brand-cognac-light mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {BRAND.tagline}
        </motion.p>

        {/* Headline - word by word */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
          }}
        >
          {['A', 'place', 'to', 'gather,'].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '100%', opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
                }}
              >
                {word}
              </motion.span>
              {i < 3 && <span>&nbsp;</span>}
            </span>
          ))}
          <br />
          {['a', 'reason', 'to', 'stay'].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '100%', opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
                }}
              >
                {word}
              </motion.span>
              {i < 3 && <span>&nbsp;</span>}
            </span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="font-body text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {BRAND.description} Welcome to Manna.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.3 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <Button href={TOAST.orderOnline} external variant="accent" size="lg">
              Order Online
            </Button>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <Button href="/menu" variant="ghost" size="lg">
              Explore Menu
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-2.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
