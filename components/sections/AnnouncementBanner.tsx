'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TimedVisibility } from '@/components/ui/TimedVisibility';

interface AnnouncementBannerProps {
  eyebrow: string;
  heading: string;
  message: string;
  startsAt?: string;
  endsAt?: string;
}

interface BotanicalSprigProps {
  mirrored?: boolean;
  reduceMotion?: boolean;
}

function BotanicalSprig({ mirrored = false, reduceMotion = false }: BotanicalSprigProps) {
  return (
    <motion.svg
      viewBox="0 0 180 92"
      fill="none"
      className={`h-16 w-32 sm:h-24 sm:w-48 ${mirrored ? '-scale-x-100' : ''}`}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      aria-hidden="true"
    >
      <motion.path
        d="M10 81C54 72 75 48 91 12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 1.5, delay: 1.15, ease: [0.25, 0.4, 0.25, 1] }}
      />
      {[
        'M42 68C28 65 21 58 18 47C31 47 40 54 42 68Z',
        'M66 51C53 44 49 34 51 23C64 28 70 38 66 51Z',
        'M81 31C94 28 104 21 111 10C98 7 87 15 81 31Z',
        'M57 58C70 59 81 55 90 45C78 40 66 45 57 58Z',
      ].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1 },
          }}
          transition={{
            duration: 0.8,
            delay: 1.5 + index * 0.12,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}

export function AnnouncementBanner({
  eyebrow,
  heading,
  message,
  startsAt,
  endsAt,
}: AnnouncementBannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = useId();

  return (
    <TimedVisibility startsAt={startsAt} endsAt={endsAt}>
      <section
        aria-labelledby={headingId}
        className="relative z-40 bg-brand-forest pt-16 lg:pt-20"
      >
      <motion.div
        data-announcement-banner
        className="relative isolate overflow-hidden border-y border-brand-gold/30 bg-[linear-gradient(105deg,#25352C_0%,#1E2A23_48%,#2F3E36_100%)] px-5 py-5 sm:px-8 sm:py-6"
        initial={
          prefersReducedMotion
            ? false
            : { clipPath: 'inset(50% 0 50% 0)', opacity: 0.4 }
        }
        animate={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 0.76, 0.24, 1] }}
        style={{ willChange: prefersReducedMotion ? 'auto' : 'clip-path' }}
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(201,168,76,0.16),transparent_48%)]"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
        />

        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-px w-20 -translate-x-1/2 -translate-y-1/2 bg-brand-gold shadow-[0_0_34px_10px_rgba(201,168,76,0.22)]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.9, 0], scaleX: [0, 8, 13] }}
            transition={{ duration: 1.25, delay: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
            aria-hidden="true"
          />
        )}

        <motion.div
          data-banner-botanical="left"
          className="absolute -left-8 bottom-[-1.5rem] text-brand-gold/25 sm:bottom-[-2.25rem] sm:text-brand-gold/30"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <BotanicalSprig reduceMotion={Boolean(prefersReducedMotion)} />
        </motion.div>
        <motion.div
          data-banner-botanical="right"
          className="absolute -right-8 bottom-[-1.5rem] text-brand-gold/25 sm:bottom-[-2.25rem] sm:text-brand-gold/30"
          animate={prefersReducedMotion ? undefined : { y: [-3, 3, -3], rotate: [1, -1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <BotanicalSprig mirrored reduceMotion={Boolean(prefersReducedMotion)} />
        </motion.div>

        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-gold/8 to-transparent"
            initial={{ x: '-140%' }}
            animate={{ x: '440%' }}
            transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 4.2, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-4 sm:gap-7">
          <motion.div
            className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/55 md:block"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.88, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'right' }}
            aria-hidden="true"
          />

          <motion.div
            className="shrink-0 text-brand-gold"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.48 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 40" className="h-8 w-8 sm:h-10 sm:w-10" fill="none">
              <motion.circle
                cx="20"
                cy="20"
                r="14.5"
                stroke="currentColor"
                strokeOpacity="0.5"
                initial={prefersReducedMotion ? false : { pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                style={{ transformOrigin: '20px 20px' }}
              />
              <motion.path
                d="M20 4L23 17L36 20L23 23L20 36L17 23L4 20L17 17L20 4Z"
                stroke="currentColor"
                strokeWidth="1.1"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.25, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.85, delay: 0.68, ease: [0.22, 0.76, 0.24, 1] }}
                style={{ transformOrigin: '20px 20px' }}
              />
              <motion.circle
                cx="20"
                cy="20"
                r="2.5"
                fill="currentColor"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 1.12, ease: 'backOut' }}
                style={{ transformOrigin: '20px 20px' }}
              />
            </svg>
          </motion.div>

          <div className="max-w-2xl text-center">
            <motion.p
              className="mb-1 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-cognac-light sm:text-[11px]"
              initial={prefersReducedMotion ? false : { opacity: 0, letterSpacing: '0.42em' }}
              animate={{ opacity: 1, letterSpacing: '0.26em' }}
              transition={{ duration: 0.85, delay: 0.72, ease: 'easeOut' }}
            >
              {eyebrow}
            </motion.p>
            <h2
              id={headingId}
              className="overflow-hidden font-display text-xl font-medium leading-tight text-brand-warm-white sm:text-2xl"
            >
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: '110%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.85, delay: 0.82, ease: [0.22, 0.76, 0.24, 1] }}
              >
                {heading}
              </motion.span>
            </h2>
            <motion.p
              className="mt-1.5 font-accent text-sm italic leading-relaxed text-brand-warm-white/75 sm:text-[15px]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.18, ease: 'easeOut' }}
            >
              {message}
            </motion.p>
          </div>

          <motion.div
            className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/55 md:block"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.88, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'left' }}
            aria-hidden="true"
          />
        </div>
        </motion.div>
      </section>
    </TimedVisibility>
  );
}
