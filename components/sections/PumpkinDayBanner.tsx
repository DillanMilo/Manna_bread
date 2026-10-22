import type { CSSProperties } from 'react';
import styles from './PumpkinDayBanner.module.css';

const LEAF_COLORS = ['#D9822B', '#E3A548', '#B5562B', '#C9A84C'];

// [left %, size px, delay s, duration s, sway px, colour index]
const LEAVES = [
  [4, 18, 0, 9.5, 26, 0], [11, 14, 3.2, 11, -20, 1], [18, 20, 6.1, 10, 32, 2],
  [26, 13, 1.4, 12, -24, 3], [33, 17, 7.8, 9, 22, 1], [62, 15, 2.3, 10.5, -28, 0],
  [69, 21, 5.4, 11.5, 24, 2], [76, 13, 0.8, 9.8, -18, 3], [83, 18, 4.6, 10.8, 30, 1],
  [90, 15, 7.1, 12.2, -26, 0], [96, 19, 2.9, 9.2, 20, 2], [47, 12, 9.2, 13, -22, 3],
];

// [left %, size px, delay s, hide on mobile]
const PUMPKINS = [[6, 30, 0.5, 0], [13, 22, 0.75, 1], [86, 26, 0.65, 1], [93, 34, 0.4, 0]];

function Leaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L18.6 8.4L24 6.2L22.6 11.8L29 12.4L24.6 16.6L28 21L21.6 20.4L20.4 26L16 22.2L11.6 26L10.4 20.4L4 21L7.4 16.6L3 12.4L9.4 11.8L8 6.2L13.4 8.4Z"
        fill={color}
        fillOpacity=".9"
      />
      <path d="M16 8V30M16 17L11 12.5M16 17L21 12.5M16 21L10.5 19M16 21L21.5 19" stroke="#3E2723" strokeOpacity=".35" strokeWidth=".9" strokeLinecap="round" />
    </svg>
  );
}

function SmallPumpkin() {
  return (
    <svg viewBox="0 0 48 42" fill="none">
      <path d="M24 11C24 7 25.5 4.5 28.5 3" stroke="#7A8F5E" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="14.5" cy="26" rx="11" ry="13" fill="#B85F24" />
      <ellipse cx="33.5" cy="26" rx="11" ry="13" fill="#B85F24" />
      <ellipse cx="24" cy="26" rx="11" ry="14.5" fill="#D9822B" />
      <path d="M24 13C21 19 21 33 24 40M24 13C27 19 27 33 24 40" stroke="#8E4518" strokeOpacity=".55" strokeWidth="1" />
      <ellipse cx="20" cy="20" rx="3" ry="5" fill="#F2B866" fillOpacity=".35" />
    </svg>
  );
}

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
