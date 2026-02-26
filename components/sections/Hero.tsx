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
      {/* Background video — soft reveal like eyes adjusting to the space */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        initial={{ scale: 1.06, filter: 'blur(6px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.0, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/1SE - Manna Evenings (20251221-223245).mov"
        />
        {/* Overlay gradient so content stays readable */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-charcoal/40 via-brand-charcoal/30 to-brand-charcoal/60" />
      </motion.div>

      {/* Content — gentle unified reveal, like stepping into the space */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Tagline */}
        <motion.p
          className="font-accent text-lg md:text-xl italic text-brand-cognac-light mb-4 tracking-wide"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {BRAND.tagline}
        </motion.p>

        {/* Headline — emerges as one calm moment */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          A place to gather,<br />
          a reason to stay
        </motion.h1>

        {/* Description */}
        <motion.p
          className="font-body text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {BRAND.description} Welcome to Manna.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 2.0, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Button href={TOAST.orderOnline} external variant="accent" size="lg">
            Order Online
          </Button>
          <Button href="/menu" variant="ghost" size="lg">
            Explore Menu
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
