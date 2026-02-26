'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const organic = [0.25, 0.4, 0.25, 1] as const;

export function FounderInterlude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={containerRef}
      className="relative h-[55vh] md:h-[65vh] overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute -top-[60px] -bottom-[60px] left-0 right-0 will-change-transform"
      >
        <Image
          src="/images/5094151F-9BC2-4D50-87F7-E1751B7D59BA.jpeg"
          alt="Christin enjoying coffee and pastries at Manna Bakery"
          fill
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay — soft dark from bottom for legible text */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-walnut/75 via-brand-walnut/20 to-transparent" />

      {/* Quote content — anchored to bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-10 md:pb-14 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: organic }}
          className="text-center max-w-2xl"
        >
          <p className="font-accent text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed mb-4">
            &ldquo;We didn&apos;t just open a bakery&mdash;we opened our hearts.&rdquo;
          </p>
          <p className="font-body text-sm text-white/60 tracking-[2px] uppercase">
            &mdash; Christin, Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
