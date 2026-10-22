'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { isPumpkinDayLive, PUMPKIN_DAY_ENDS_AT_CENTRAL } from '@/lib/pumpkinDay';
import { LEAF_COLORS, Leaf, SmallPumpkin } from './PumpkinArt';
import styles from './PumpkinTouches.module.css';

// Client-only so the decorations never end up in cached server HTML after the cutoff.
function usePumpkinDay() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const update = () => setIsLive(isPumpkinDayLive());
    // Defer past the effect body so the first paint matches the server render.
    const frame = window.requestAnimationFrame(update);
    const remaining = Date.parse(PUMPKIN_DAY_ENDS_AT_CENTRAL) - Date.now();
    const timeoutId = remaining > 0 && remaining < 2_147_000_000
      ? window.setTimeout(update, remaining + 50)
      : undefined;

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return isLive;
}

// [left %, size px, delay s, settle offset px]
const MENU_PUMPKINS = [[7, 26, 0.15, 0], [17, 18, 0.35, 2], [78, 20, 0.28, 1], [88, 30, 0.08, 0]];
// [left %, size px, delay s, sway px, colour index]
const MENU_LEAVES = [[30, 14, 0.2, 22, 0], [55, 12, 0.45, -18, 1], [70, 15, 0.05, 16, 2]];

export function MenuPumpkinFall() {
  const isLive = usePumpkinDay();

  if (!isLive) {
    return null;
  }

  return (
    <div className={styles.menuScene} aria-hidden="true">
      {MENU_LEAVES.map(([left, size, delay, sway, colorIndex]) => (
        <span key={left} className={styles.menuLeaf} style={{
          left: `${left}%`, width: size, height: size, '--delay': `${delay}s`, '--sway': `${sway}px`,
        } as CSSProperties}>
          <Leaf color={LEAF_COLORS[colorIndex]} />
        </span>
      ))}
      {MENU_PUMPKINS.map(([left, size, delay, offset]) => (
        <span key={left} className={styles.menuPumpkin} style={{
          left: `${left}%`, width: size, bottom: 6 + offset, '--delay': `${delay}s`,
        } as CSSProperties}>
          <SmallPumpkin />
        </span>
      ))}
    </div>
  );
}

export function FooterPumpkins() {
  const isLive = usePumpkinDay();

  if (!isLive) {
    return null;
  }

  return (
    <div className={styles.footerPatch} aria-hidden="true">
      <span className={styles.footerPumpkin} style={{ width: 30, '--delay': '0s' } as CSSProperties}>
        <SmallPumpkin />
      </span>
      <span className={styles.footerPumpkin} style={{ width: 20, '--delay': '.15s' } as CSSProperties}>
        <SmallPumpkin />
      </span>
    </div>
  );
}

// One small pumpkin that drops in above a page's eyebrow label. It takes no layout space,
// so the heading never shifts when it appears after hydration.
export function HeadingPumpkin() {
  const isLive = usePumpkinDay();

  return (
    <span className={styles.headingSlot} aria-hidden="true">
      {isLive && (
        <span className={styles.headingPumpkin}>
          <SmallPumpkin />
        </span>
      )}
    </span>
  );
}

// [left %, size px, delay s, sway px, colour index]
const FLURRY = [
  [8, 15, 0, 24, 1], [21, 12, 0.35, -20, 3], [37, 16, 0.15, 18, 0], [52, 13, 0.5, -24, 2],
  [66, 17, 0.1, 22, 1], [79, 12, 0.4, -16, 0], [92, 15, 0.25, 20, 2],
];
const FLURRY_MS = 3200;

// A one-off gust of extra leaves when a desktop visitor hovers over the banner.
export function BannerLeafFlurry() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const banner = anchorRef.current?.closest('[data-pumpkin-banner]');
    const canHover = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!banner) {
      return;
    }

    let running = false;
    let timeoutId: number | undefined;
    const handleEnter = () => {
      if (running || !canHover.matches) {
        return;
      }
      running = true;
      setBurst((count) => count + 1);
      timeoutId = window.setTimeout(() => {
        running = false;
        setBurst(0);
      }, FLURRY_MS);
    };

    banner.addEventListener('mouseenter', handleEnter);
    return () => {
      banner.removeEventListener('mouseenter', handleEnter);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <span ref={anchorRef} className={styles.flurry}>
      {burst > 0 && FLURRY.map(([left, size, delay, sway, colorIndex]) => (
        <span key={`${burst}-${left}`} className={styles.flurryLeaf} style={{
          left: `${left}%`, width: size, height: size, '--delay': `${delay}s`, '--sway': `${sway}px`,
        } as CSSProperties}>
          <Leaf color={LEAF_COLORS[colorIndex]} />
        </span>
      ))}
    </span>
  );
}
