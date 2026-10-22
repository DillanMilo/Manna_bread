import type { CSSProperties } from 'react';
import { LEAF_COLORS, Leaf, SmallPumpkin } from './PumpkinArt';
import { BannerLeafFlurry } from './PumpkinTouches';
import styles from './PumpkinDayBanner.module.css';

// [left %, size px, delay s, duration s, sway px, colour index]
// Negative delays start some leaves mid-fall, so the banner never opens empty.
const LEAVES = [
  [4, 18, -4.2, 9.5, 26, 0], [11, 14, -1, 11, -20, 1], [18, 20, 1.9, 10, 32, 2],
  [26, 13, -2.8, 12, -24, 3], [33, 17, 3.6, 9, 22, 1], [62, 15, -5.9, 10.5, -28, 0],
  [69, 21, 1.2, 11.5, 24, 2], [76, 13, -3.4, 9.8, -18, 3], [83, 18, 0.4, 10.8, 30, 1],
  [90, 15, 2.9, 12.2, -26, 0], [96, 19, -1.3, 9.2, 20, 2], [47, 12, 5, 13, -22, 3],
];

// [left %, size px, delay s, hide on mobile]
const PUMPKINS = [[6, 30, 0.35, 0], [13, 22, 0.55, 1], [86, 26, 0.45, 1], [93, 34, 0.25, 0]];

export function PumpkinDayBanner() {
  return (
    <section aria-labelledby="pumpkin-day-heading" className="relative bg-brand-forest pt-16 lg:pt-20">
      <div className={styles.banner} data-pumpkin-banner>
        <div className={styles.scene} aria-hidden="true">
          {LEAVES.map(([left, size, delay, duration, sway, colorIndex], index) => (
            <span key={`${left}-${delay}`} className={styles.leaf} style={{
              left: `${left}%`, width: size, height: size,
              '--delay': `${delay}s`, '--duration': `${duration}s`, '--sway': `${sway}px`,
              '--rest': `${36 + ((index * 37) % 96)}px`,
            } as CSSProperties}>
              <Leaf color={LEAF_COLORS[colorIndex]} />
            </span>
          ))}
          {PUMPKINS.map(([left, size, delay, hideOnMobile]) => (
            <span key={left} className={`${styles.pumpkin} ${hideOnMobile ? styles.desktopOnly : ''}`} style={{
              left: `${left}%`, width: size, '--delay': `${delay}s`,
            } as CSSProperties}>
              <SmallPumpkin />
            </span>
          ))}
          <BannerLeafFlurry />
        </div>
        <div className={styles.content}>
          <div className={styles.emblem} aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none" className="h-[70px] w-[70px]">
              <path d="M40 22C40 15 42 11 47 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M44 14C50 9 58 11 59 17C54 19 48 18 44 14Z" stroke="currentColor" strokeWidth="1.2" fill="#7A8F5E" fillOpacity=".35" />
              <path d="M38 13C33 8 26 10 27 15C28 19 33 18 33 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <ellipse cx="25" cy="46" rx="16" ry="20" stroke="currentColor" strokeWidth="1.5" fill="#D9822B" fillOpacity=".55" />
              <ellipse cx="55" cy="46" rx="16" ry="20" stroke="currentColor" strokeWidth="1.5" fill="#D9822B" fillOpacity=".55" />
              <ellipse cx="40" cy="46" rx="15" ry="23" stroke="currentColor" strokeWidth="1.5" fill="#E3A548" fillOpacity=".75" />
              <ellipse cx="34" cy="37" rx="3.5" ry="7" fill="#F6D9A0" fillOpacity=".35" />
              <path d="M10 73C26 77 54 77 70 73" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className={`${styles.copy} relative text-center sm:text-left`}>
            <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-[0.23em] text-[#E8B86A]">October 26</p>
            <h2 id="pumpkin-day-heading" className="font-display text-[29px] leading-tight text-brand-warm-white sm:text-[35px]">National Pumpkin Day</h2>
            <p className="mt-2 font-accent text-[13px] italic leading-relaxed text-[#EADFC9] sm:text-[15px]">Pumpkin season is here. Come in and warm up with us.</p>
          </div>
        </div>
        <div className={styles.horizon} aria-hidden="true" />
      </div>
    </section>
  );
}
