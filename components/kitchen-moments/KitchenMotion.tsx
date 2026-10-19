'use client';

import Image from 'next/image';
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaParallax } from '@/components/ui/useMediaParallax';
import { enhanceEntrance } from './entrance';
import styles from './KitchenMoments.module.css';

export const KitchenMotionContext = createContext({ still: false, compact: false });

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  load?: boolean;
}

// Progressive enhancement: SSR and unobserved elements are always visible.
// Only a running, finite animation may temporarily change their appearance.
function useEntrance(delay: number, load: boolean, image = false) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const { still, compact } = useContext(KitchenMotionContext);

  useEffect(() => {
    const element = ref.current;
    if (!element || still || played.current) return;
    return enhanceEntrance(element, { delay, load, image, compact }, () => { played.current = true; });
  }, [still, compact, delay, load, image]);

  return ref;
}

export function Reveal({ children, className = '', delay = 0, load = false }: RevealProps) {
  const ref = useEntrance(delay, load);
  return (
    <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>
  );
}

interface KitchenImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  arch?: boolean;
}

export function KitchenImage({ src, alt, className = '', sizes, priority = false, arch = false }: KitchenImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { still, compact } = useContext(KitchenMotionContext);
  const y = useMediaParallax(ref, still || compact ? 0 : 20);
  const imageRef = useEntrance(0, priority, true);
  return (
    <div ref={ref} className={`${styles.imageFrame} ${arch ? styles.arch : ''} ${className}`}>
      <div ref={imageRef} className="absolute inset-0">
        <motion.div className="absolute -inset-y-7 inset-x-0" style={{ y }}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}

interface KitchenVineProps {
  hero?: boolean;
  className?: string;
}

const leaves = [
  [67, 579, -38], [42, 487, 20], [72, 399, -30], [47, 305, 28],
  [77, 219, -26], [117, 146, 20], [181, 90, -32], [256, 60, 16],
] as const;

export function KitchenVine({ hero = false, className = '' }: KitchenVineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { still, compact } = useContext(KitchenMotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 25%'] });
  const draw = useTransform(scrollYProgress, [0, 0.85], [0.08, 1]);
  const leafOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.8]);
  const drift = useTransform(scrollYProgress, [0, 1], still || compact ? [0, 0] : [16, -16]);
  const stem = 'M78 696 C28 627 99 609 67 579 C4 520 36 524 42 487 C91 435 25 445 72 399 C117 351 30 351 47 305 C64 263 42 250 77 219 C101 198 83 169 117 146 C142 128 144 107 181 90 C211 72 220 64 256 60';

  return (
    <motion.div ref={ref} aria-hidden="true" className={`${styles.vine} ${hero ? styles.heroVine : ''} ${className}`} style={{ y: drift }}>
      <div className={styles.sway}>
          {[false, true].map((mirror) => (
            <svg key={String(mirror)} viewBox="0 0 300 760" preserveAspectRatio={hero ? 'xMidYMid meet' : 'none'} fill="none" className={hero ? styles.heroVineRail : styles.vineRail} focusable="false">
            <g transform={mirror ? 'translate(300 0) scale(-1 1)' : undefined}>
              <path d={stem} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <motion.path
                d={stem} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                className={hero ? styles.growingStem : undefined} pathLength={hero ? 1 : undefined}
                style={hero || still ? undefined : { pathLength: draw }}
                initial={false}
                animate={still && !hero ? { pathLength: 1 } : undefined}
                transition={{ duration: still ? 0 : 2.6, delay: still ? 0 : 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />
              <motion.g style={hero || still ? undefined : { opacity: leafOpacity }} initial={false} animate={hero || still ? { opacity: 0.7 } : undefined} transition={{ duration: still ? 0 : 1.8, delay: still ? 0 : 1 }}>
                {leaves.filter((_, i) => !compact || i % 2 === 0).map(([x, y, angle], i) => (
                  <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
                    <path d="M0 0 C-28 -4 -37 -25 -33 -43 C-10 -38 1 -20 0 0Z M0 0 C21 -12 35 -9 42 7 C24 17 9 10 0 0Z" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="currentColor" fillOpacity="0.12" />
                    <path d="M0 0 L-27 -34 M0 0 L33 7" stroke="currentColor" strokeWidth="0.6" />
                  </g>
                ))}
              </motion.g>
            </g>
            </svg>
          ))}
      </div>
    </motion.div>
  );
}
