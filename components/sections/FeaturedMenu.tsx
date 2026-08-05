'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/Motion';
import { VineAccent } from '@/components/ui/ScrollVine';
import { useMediaParallax } from '@/components/ui/useMediaParallax';

const FEATURED_ITEMS = [
  {
    image: '/images/manna-latte-art.webp',
    alt: 'Leaf-shaped latte art in a freshly poured cappuccino',
    className: 'relative z-10 mr-auto w-[78%] sm:col-span-7 sm:mr-0 sm:w-auto md:col-span-5',
    frameClassName: 'aspect-[5/4] sm:aspect-[4/5] rounded-[2.75rem_2.75rem_0.875rem_0.875rem]',
    mobileTilt: '-rotate-2 sm:rotate-0',
    objectPosition: 'object-[center_42%]',
    parallaxStrength: 26,
    delay: 0,
    tilt: -1.5,
  },
  {
    image: '/images/manna-croissant-tray.webp',
    alt: 'Trays of golden croissants cooling in Manna Bakery',
    className: 'relative z-20 -mt-20 ml-auto w-[68%] sm:col-span-5 sm:ml-0 sm:mt-16 sm:w-auto md:col-span-3 md:mt-20',
    frameClassName: 'aspect-[6/5] sm:aspect-[3/4] rounded-[0.875rem_2.75rem_0.875rem_2.75rem]',
    mobileTilt: 'rotate-[2.5deg] sm:rotate-0',
    objectPosition: 'object-[center_48%]',
    parallaxStrength: 34,
    delay: 0.16,
    tilt: 1.75,
  },
  {
    image: '/images/manna-danish-prep.webp',
    alt: 'Chocolate danishes being finished by hand in Manna Bakery',
    className: 'relative z-30 -mt-16 ml-7 mr-auto w-[72%] sm:col-span-7 sm:col-start-4 sm:ml-0 sm:mr-0 sm:mt-0 sm:w-auto md:col-span-4 md:col-start-auto md:mt-7',
    frameClassName: 'aspect-[5/4] sm:aspect-[4/5] rounded-[2.75rem_0.875rem_2.75rem_0.875rem]',
    mobileTilt: '-rotate-[1.5deg] sm:rotate-0',
    objectPosition: 'object-[center_48%]',
    parallaxStrength: 22,
    delay: 0.32,
    tilt: -1,
  },
] as const;

interface FoodTeaserImageProps {
  image: string;
  alt: string;
  className: string;
  frameClassName: string;
  mobileTilt: string;
  objectPosition: string;
  parallaxStrength: number;
  delay: number;
  tilt: number;
}

function FoodTeaserImage({
  image,
  alt,
  className,
  frameClassName,
  mobileTilt,
  objectPosition,
  parallaxStrength,
  delay,
  tilt,
}: FoodTeaserImageProps) {
  const frameRef = useRef<HTMLElement>(null);
  const isInView = useInView(frameRef, { once: true, amount: 0.22 });
  const prefersReducedMotion = useReducedMotion();
  const imageY = useMediaParallax(frameRef, parallaxStrength);

  return (
    <motion.figure
      ref={frameRef}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 54,
        scale: prefersReducedMotion ? 1 : 0.96,
        rotate: prefersReducedMotion ? 0 : tilt,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
          : {
              opacity: 0,
              y: prefersReducedMotion ? 0 : 54,
              scale: prefersReducedMotion ? 1 : 0.96,
              rotate: prefersReducedMotion ? 0 : tilt,
            }
      }
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.9,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      <div
        className={`group relative isolate overflow-hidden border border-brand-gold/45 bg-brand-forest shadow-[0_24px_70px_rgba(24,38,31,0.42)] ring-4 ring-brand-soft-cream/[0.06] transition-transform duration-700 ${mobileTilt} ${frameClassName}`}
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute -inset-y-[8%] left-0 right-0 will-change-transform"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 88vw"
            className={`object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035] ${objectPosition}`}
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-forest/20 via-transparent to-white/5" />
      </div>
    </motion.figure>
  );
}

export function FeaturedMenu() {
  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-20 md:py-28 bg-brand-forest-mid">
      <VineAccent variant="right" className="z-0 opacity-75" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <FadeIn>
          <SectionHeader
            label="From Manna's Kitchen"
            title="Crafted with intention"
            description="Everything at Manna is baked with intention - real ingredients, an unhurried process, and care in every batch."
            light
          />
        </FadeIn>

        <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 items-start gap-0 px-2 sm:mt-14 sm:max-w-none sm:grid-cols-12 sm:gap-6 sm:px-0 md:gap-7">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent sm:block"
          />
          {FEATURED_ITEMS.map((item) => (
            <FoodTeaserImage key={item.image} {...item} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center sm:mt-14">
            <Button href="/menu" variant="primary" className="w-full sm:w-auto">
              View Menu
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
