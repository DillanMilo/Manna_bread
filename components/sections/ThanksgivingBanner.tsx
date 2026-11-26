import type { CSSProperties } from 'react';
import styles from './ThanksgivingBanner.module.css';

const LEAF_COLORS = ['#D9822B', '#C9A84C', '#B5552B', '#E3A548'];

// [left %, size px, delay s, duration s, sway px, colour index, kind (0 leaf, 1 wheat grain)]
// Negative delays start some pieces mid-fall, so the banner never opens empty.
const FALLING = [
  [3, 17, -4.6, 10, 24, 0, 0], [9, 9, -1.4, 12, -16, 1, 1], [15, 19, 1.6, 11, 30, 2, 0],
  [22, 12, -3.1, 12.5, -22, 3, 0], [29, 8, 2.8, 13, 18, 1, 1], [36, 15, -6.2, 10.4, -26, 0, 0],
  [58, 9, -2.2, 12.8, 20, 1, 1], [65, 18, 0.9, 11.2, -24, 3, 0], [72, 13, -5.1, 10.2, 28, 2, 0],
  [79, 8, 3.4, 13.4, -18, 1, 1], [85, 19, -0.6, 10.8, 22, 0, 0], [92, 14, 2.1, 12, -28, 3, 0],
  [97, 9, -3.8, 12.6, 16, 1, 1], [46, 11, 4.6, 13.6, -20, 2, 0],
];

// [left %, height px, delay s, lean deg, hide on mobile]
const STALKS = [
  [1.5, 64, 0.2, -6, 0], [4.5, 78, 0.35, 4, 0], [7.5, 56, 0.5, -2, 1], [10.5, 70, 0.3, 7, 1],
  [89, 68, 0.4, -7, 1], [92, 58, 0.25, 3, 1], [95, 80, 0.45, -4, 0], [98, 62, 0.3, 6, 0],
];

// [left %, top %, size px, delay s, duration s]
const MOTES = [
  [18, 70, 4, -1, 7], [27, 40, 3, -4, 8.5], [41, 78, 3, -2.5, 9], [55, 60, 4, -6, 7.5],
  [68, 32, 3, -3, 8], [76, 74, 4, -5, 9.5], [84, 46, 3, -0.5, 8.2], [33, 58, 2, -7, 10],
];

function Leaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2C17 5 20 9 19 14C18 18 15 21 12 22C9 21 6 18 5 14C4 9 7 5 12 2Z" fill={color} fillOpacity=".9" />
      <path d="M12 4V22M12 10L8.5 7.5M12 10L15.5 7.5M12 15L8 12.5M12 15L16 12.5" stroke="#3D2A1A" strokeOpacity=".35" strokeWidth=".8" strokeLinecap="round" />
    </svg>
  );
}

function Grain({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 10 16" fill="none">
      <path d="M5 1C8 4 8.5 10 5 15C1.5 10 2 4 5 1Z" fill={color} fillOpacity=".9" />
      <path d="M5 3V13" stroke="#3D2A1A" strokeOpacity=".3" strokeWidth=".7" strokeLinecap="round" />
    </svg>
  );
}

// One ear of wheat drawn upright around x = 0, head from y = -14 to y = 8.
function Ear() {
  return (
    <g>
      <path d="M0 -14V-21M-2.5 -10L-6 -16M2.5 -10L6 -16" strokeWidth=".8" strokeLinecap="round" />
      <ellipse cx="0" cy="-10.5" rx="1.8" ry="3.6" />
      {[-5, 0, 5].map((y) => (
        <g key={y}>
          <ellipse cx="-2.4" cy={y} rx="1.8" ry="3.6" transform={`rotate(-24 -2.4 ${y})`} />
          <ellipse cx="2.4" cy={y} rx="1.8" ry="3.6" transform={`rotate(24 2.4 ${y})`} />
        </g>
      ))}
    </g>
  );
}

function WheatStalk() {
  return (
    <svg viewBox="-10 -24 20 104" fill="none" preserveAspectRatio="xMidYMax meet">
      <g stroke="#E2C27A" strokeWidth="1" fill="#C9A84C" fillOpacity=".55">
        <path d="M0 8V80" strokeWidth="1.2" fill="none" />
        <path d="M0 40C-5 36 -8 30 -8 26C-4 28 -1 33 0 40Z" fillOpacity=".25" />
        <Ear />
      </g>
    </svg>
  );
}

function SheafEmblem() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
      <g stroke="currentColor" strokeWidth="1.1" fill="#C9A84C" fillOpacity=".4">
        {[-30, -15, 0, 15, 30].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 40 58)`}>
            <path d="M40 58V26" strokeWidth="1.3" fill="none" />
            <g transform="translate(40 22)"><Ear /></g>
          </g>
        ))}
      </g>
      <path d="M32.5 45.5C37 48 43 48 47.5 45.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 47C37 50 35 52 34 54M40 47C43 50 45 52 46 54" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 73C12 61 24 55 40 55C56 55 68 61 68 73Z" stroke="currentColor" strokeWidth="1.5" fill="#D9822B" fillOpacity=".55" strokeLinejoin="round" />
      <path d="M22 58C30 56.5 36 56.5 44 57" stroke="#F6D9A0" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 62C29 65 30 68 30 71M40 59.5C41 63 41 67 40 71M53 62C51 65 50 68 50 71" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 75.5C24 78.5 56 78.5 73 75.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function ThanksgivingBanner() {
  return (
    <section aria-labelledby="thanksgiving-heading" className="relative bg-brand-forest pt-16 lg:pt-20">
      <div className={styles.banner} data-thanksgiving-banner>
        <div className={styles.scene} aria-hidden="true">
          <div className={styles.glow} />
          {MOTES.map(([left, top, size, delay, duration]) => (
            <span key={`${left}-${top}`} className={styles.mote} style={{
              left: `${left}%`, top: `${top}%`, width: size, height: size,
              '--delay': `${delay}s`, '--duration': `${duration}s`,
            } as CSSProperties} />
          ))}
          {FALLING.map(([left, size, delay, duration, sway, colorIndex, kind], index) => (
            <span key={`${left}-${delay}`} className={styles.falling} style={{
              left: `${left}%`, width: kind ? size * 0.65 : size, height: size,
              '--delay': `${delay}s`, '--duration': `${duration}s`, '--sway': `${sway}px`,
              '--rest': `${34 + ((index * 37) % 96)}px`,
            } as CSSProperties}>
              {kind ? <Grain color={LEAF_COLORS[colorIndex]} /> : <Leaf color={LEAF_COLORS[colorIndex]} />}
            </span>
          ))}
          {STALKS.map(([left, height, delay, lean, hideOnMobile]) => (
            <span key={left} className={`${styles.stalk} ${hideOnMobile ? styles.desktopOnly : ''}`} style={{
              left: `${left}%`, height, '--delay': `${delay}s`, '--lean': `${lean}deg`,
            } as CSSProperties}>
              <WheatStalk />
            </span>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.emblem} aria-hidden="true">
            <SheafEmblem />
          </div>
          <div className={`${styles.copy} relative text-center sm:text-left`}>
            <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-[0.23em] text-[#E8B86A]">November 26</p>
            <h2 id="thanksgiving-heading" className="font-display text-[29px] leading-tight text-brand-warm-white sm:text-[35px]">Happy Thanksgiving</h2>
            <span className={styles.rule} aria-hidden="true" />
            <p className="font-accent text-[13px] italic leading-relaxed text-[#EADFC9] sm:text-[15px]">Grateful for every table we get to fill. From all of us at Manna, thank you.</p>
          </div>
        </div>
        <div className={styles.horizon} aria-hidden="true" />
      </div>
    </section>
  );
}
