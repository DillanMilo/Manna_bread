'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { FadeIn } from '@/components/ui/Motion';

const organic = [0.25, 0.4, 0.25, 1] as const;

const STORY_IMAGES = [
  {
    src: '/images/323CA2F7-CC46-4EF4-B722-9394486AB6C2.jpeg',
    alt: 'Christin and her husband sharing coffee at Manna Bakery',
  },
  {
    src: '/images/8311148C-C91B-4191-84C3-6D760FBD9AE6.jpeg',
    alt: 'Christin and her husband smiling together',
  },
];

const SHUFFLE_MS = 5000;

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [frontIndex, setFrontIndex] = useState(0);
  const [zFrontIndex, setZFrontIndex] = useState(0);
  const shufflingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const shuffle = useCallback(() => {
    if (shufflingRef.current) return;
    shufflingRef.current = true;

    const next = (frontIndex + 1) % STORY_IMAGES.length;

    // Start position animation — departing card arcs away
    setFrontIndex(next);

    // Delay z-index swap so departing card passes OVER the incoming card
    // before dropping behind it midway through the spring
    setTimeout(() => {
      setZFrontIndex(next);
    }, 300);

    // Cooldown so shuffles don't overlap
    setTimeout(() => {
      shufflingRef.current = false;
    }, 700);
  }, [frontIndex]);

  // Auto-shuffle on a timer
  useEffect(() => {
    const timer = setInterval(shuffle, SHUFFLE_MS);
    return () => clearInterval(timer);
  }, [shuffle]);

  return (
    <section className="py-20 md:py-28 bg-brand-warm-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image card stack with disconnected frame + parallax */}
          <div ref={containerRef} className="relative">
            {/* Frame fades in first */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: organic }}
              className="absolute top-5 left-5 w-full h-full rounded-2xl border border-brand-cognac/25"
            />

            {/* Card stack slides in from left after the frame */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: organic }}
              className="relative z-10 aspect-[4/5] cursor-pointer"
              onClick={shuffle}
            >
              {STORY_IMAGES.map((img, i) => {
                const isFront = i === frontIndex;
                const isOnTop = i === zFrontIndex;
                return (
                  <motion.div
                    key={img.src}
                    style={{ zIndex: isOnTop ? 2 : 1 }}
                    animate={{
                      x: isFront ? 0 : 18,
                      y: isFront ? 0 : 14,
                      rotate: isFront ? 0 : 3,
                      scale: isFront ? 1 : 0.95,
                      boxShadow: isFront
                        ? '0 25px 50px -10px rgba(62,39,35,0.3)'
                        : '0 8px 24px -6px rgba(62,39,35,0.1)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 70,
                      damping: 16,
                      mass: 1.2,
                    }}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                  >
                    <motion.div
                      style={{ y: imageY }}
                      className="absolute -top-[60px] -bottom-[60px] left-0 right-0 will-change-transform"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i === 0}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Content - staggered fade-ins */}
          <div className="py-4">
            <FadeIn delay={0.1}>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Our Story
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                Built on faith,<br />baked with love
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-body text-base text-brand-olive leading-relaxed mb-4">
                Seven years ago, we opened our doors with a simple belief: that bread is more than food—it&apos;s an invitation to gather, to slow down, and to share life together.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="font-body text-base text-brand-olive leading-relaxed mb-6">
                What started as a dream became a sanctuary—a place where every loaf tells a story and every cup is poured with intention.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <QuoteBlock
                quote="Come, let us break bread together."
                variant="bordered"
              />
            </FadeIn>

            <FadeIn delay={0.6}>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-cognac hover:text-brand-walnut transition-colors mt-6 group"
              >
                Read our full story <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
