'use client';

import type { RefObject } from 'react';
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export function useMediaParallax<T extends HTMLElement>(
  target: RefObject<T | null>,
  distance = 16,
): MotionValue<number> {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-distance, distance],
  );

  return useSpring(rawY, {
    stiffness: 110,
    damping: 28,
    mass: 0.3,
  });
}
