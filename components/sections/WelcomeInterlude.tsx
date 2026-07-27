'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/Motion';
import { CardVine, VineAccent } from '@/components/ui/ScrollVine';
import { useMediaParallax } from '@/components/ui/useMediaParallax';

const WELCOME_IMAGES = [
  {
    src: '/images/manna-storefront-exterior.webp',
    alt: 'The welcoming exterior of Manna Bread from Heaven in Tomball',
    label: 'Outside Manna',
    position: 'object-center',
  },
  {
    src: '/images/manna-entry-doors.webp',
    alt: 'Manna Bakery’s arched wooden entrance glowing warmly at dusk',
    label: 'At the door',
    position: 'object-[center_48%]',
  },
  {
    src: '/images/manna-lounge-sunlight.webp',
    alt: 'A sunlit lounge at Manna with leather seating and abundant greenery',
    label: 'A place to rest',
    position: 'object-center',
  },
  {
    src: '/images/manna-dining-sunlight.webp',
    alt: 'Warm afternoon light across Manna’s dining room and arched alcoves',
    label: 'A place to gather',
    position: 'object-center',
  },
] as const;

export function WelcomeInterlude() {
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageY = useMediaParallax(imageFrameRef, 30);
  const prefersReducedMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showImage = useCallback((index: number) => {
    const total = WELCOME_IMAGES.length;
    setActiveImage((index + total) % total);
  }, []);

  const showNext = useCallback(() => {
    setActiveImage((current) => (current + 1) % WELCOME_IMAGES.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveImage(
      (current) =>
        (current - 1 + WELCOME_IMAGES.length) % WELCOME_IMAGES.length,
    );
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(showNext, 5200);
    return () => window.clearInterval(timer);
  }, [activeImage, isPaused, prefersReducedMotion, showNext]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 55) return;
    if (info.offset.x < 0) {
      showNext();
    } else {
      showPrevious();
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-brand-forest px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <VineAccent variant="left" className="z-0 opacity-90" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-t-[3.5rem] rounded-b-2xl border border-brand-gold/30 bg-brand-walnut shadow-[0_30px_90px_rgba(16,29,23,0.42)] sm:rounded-t-[5rem] lg:grid lg:min-h-[620px] lg:grid-cols-[1.22fr_0.78fr] lg:rounded-t-[7rem]">
            <CardVine className="z-20" />

            <div
              ref={imageFrameRef}
              className="group relative min-h-[390px] touch-pan-y overflow-hidden sm:min-h-[500px] lg:min-h-full"
              onPointerEnter={() => setIsPaused(true)}
              onPointerLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={() => setIsPaused(false)}
            >
              <motion.div
                style={{ y: imageY }}
                className="absolute -inset-y-[7%] left-0 right-0 will-change-transform"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={WELCOME_IMAGES[activeImage].src}
                    drag={prefersReducedMotion ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={handleDragEnd}
                    initial={{
                      opacity: 0,
                      scale: prefersReducedMotion ? 1 : 1.035,
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: prefersReducedMotion ? 1 : 0.99,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0.15 : 1.05,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={WELCOME_IMAGES[activeImage].src}
                      alt={WELCOME_IMAGES[activeImage].alt}
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      className={`select-none object-cover ${WELCOME_IMAGES[activeImage].position}`}
                      priority={activeImage === 0}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-walnut/70 via-transparent to-brand-forest/5 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-brand-walnut/65" />

              <div className="absolute inset-x-5 bottom-5 z-30 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                <div className="rounded-full border border-white/20 bg-brand-forest/65 px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[1.8px] text-white backdrop-blur-md">
                  {WELCOME_IMAGES[activeImage].label}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Show previous Manna photo"
                    className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-brand-forest/65 text-white backdrop-blur-md transition-colors hover:border-brand-gold/70 hover:bg-brand-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Show next Manna photo"
                    className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-brand-forest/65 text-white backdrop-blur-md transition-colors hover:border-brand-gold/70 hover:bg-brand-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex items-center bg-brand-walnut px-7 py-10 sm:px-12 sm:py-14 lg:-ml-px lg:px-12 xl:px-16">
              <div
                aria-hidden="true"
                className="absolute left-7 top-0 h-px w-20 bg-brand-gold/80 sm:left-12 lg:left-0 lg:top-1/2 lg:h-24 lg:w-px lg:-translate-y-1/2"
              />

              <div className="relative z-30">
                <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[2.4px] text-brand-gold">
                  A place prepared for you
                </p>
                <h2 className="font-display text-[2rem] font-medium leading-[1.15] text-brand-warm-white sm:text-[2.6rem] lg:text-[3rem]">
                  When you walk into Manna, you know there&apos;s something more.
                </h2>
                <p className="mt-6 font-accent text-lg italic leading-relaxed text-brand-soft-cream/80 sm:text-xl">
                  It was there for Christin when she needed a place to begin
                  again. Now, it is here for you&mdash;a place to enjoy, to rest,
                  and to stay awhile.
                </p>

                <div
                  className="mt-8 flex items-center gap-2"
                  aria-label={`Photo ${activeImage + 1} of ${WELCOME_IMAGES.length}`}
                >
                  {WELCOME_IMAGES.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => showImage(index)}
                      aria-label={`Show photo: ${image.label}`}
                      aria-current={index === activeImage ? 'true' : undefined}
                      className="group flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-gold"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          index === activeImage
                            ? 'w-9 bg-brand-gold'
                            : 'w-4 bg-brand-warm-white/25 group-hover:bg-brand-warm-white/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 rounded-t-[3.5rem] rounded-b-2xl ring-1 ring-inset ring-white/5 sm:rounded-t-[5rem] lg:rounded-t-[7rem]"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
