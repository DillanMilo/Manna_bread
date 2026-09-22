import type { CSSProperties } from 'react';
import styles from './CoffeeDayBanner.module.css';

const BEANS = [
  [3, 24, -32, 0.1], [8, 19, 24, 0.5], [14, 28, -48, 0.25],
  [20, 17, 62, 0.8], [27, 21, -18, 0.4], [35, 14, 35, 0.9],
  [66, 16, -40, 0.6], [74, 23, 28, 0.2], [81, 18, -22, 0.75],
  [87, 27, 48, 0.35], [93, 20, -36, 0.95], [98, 24, 18, 0.55],
];

export function CoffeeDayBanner() {
  return (
    <section aria-labelledby="coffee-day-heading" className="relative bg-brand-forest pt-16 lg:pt-20">
      <div className={styles.banner} data-coffee-banner>
        <div className={styles.sky} aria-hidden="true">
          {Array.from({ length: 22 }, (_, index) => (
            <span key={index} className={styles.star} style={{
              left: `${(index * 37 + 7) % 100}%`,
              top: `${(index * 23 + 13) % 82}%`,
              '--delay': `${(index % 5) * 0.35}s`,
            } as CSSProperties}>{index % 4 === 0 ? '✧' : '·'}</span>
          ))}
          {BEANS.map(([left, size, rotation, delay], index) => (
            <svg key={left} viewBox="0 0 32 44" className={styles.bean} style={{
              left: `${left}%`, width: size, bottom: index % 3 === 0 ? -5 : 3,
              '--rotation': `${rotation}deg`, '--delay': `${delay}s`,
            } as CSSProperties} fill="none">
              <ellipse cx="16" cy="22" rx="13" ry="20" fill="#78523B" stroke="#C4956A" strokeWidth="1.2" />
              <path d="M19 4C7 15 25 28 12 40" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 8C4 15 4 23 7 29" stroke="#C4956A" strokeOpacity=".45" strokeLinecap="round" />
            </svg>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.cup} aria-hidden="true">
            <svg viewBox="0 0 80 86" fill="none" className="h-[72px] w-[68px]">
              <path d="M29 29C19 21 35 18 29 9M40 29C30 21 46 17 40 5M51 29C41 21 57 18 51 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M19 38H58V53C58 65 50 71 39 71C28 71 19 65 19 53V38Z" stroke="currentColor" strokeWidth="1.5" fill="#C9A84C" fillOpacity=".06" />
              <path d="M58 42H63C74 42 72 58 58 58M13 76C29 81 52 81 65 76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M38 45L40 50L45 52L40 54L38 59L36 54L31 52L36 50Z" fill="currentColor" />
            </svg>
          </div>
          <div className="relative text-center sm:text-left">
            <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-[0.23em] text-[#DFC982]">September 29</p>
            <h2 id="coffee-day-heading" className="font-display text-[29px] leading-tight text-brand-warm-white sm:text-[35px]">National Coffee Day</h2>
            <p className="mt-2 font-accent text-[13px] italic leading-relaxed text-[#E3DCCB] sm:text-[15px]">We’ll see you for your usual.</p>
          </div>
        </div>
        <div className={styles.horizon} aria-hidden="true" />
      </div>
    </section>
  );
}
