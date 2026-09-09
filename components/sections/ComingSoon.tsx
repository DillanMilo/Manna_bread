'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import styles from './ComingSoon.module.css';

/** Original botanical linework, echoing the arches and living greenery at Manna. */
function GrowingBranch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 280 320" fill="none" className="h-full w-full text-brand-gold">
      <path d="M35 310V140a105 105 0 0 1 210 0v170M48 310V140a92 92 0 0 1 184 0v170" stroke="currentColor" strokeOpacity=".4" />
      <circle cx="140" cy="114" r="38" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeOpacity=".3" />
      <path d="M140 70v12m0 64v12m-44-44h12m64 0h12" stroke="currentColor" strokeOpacity=".5" />
      <g stroke="currentColor" strokeWidth="1.2">
        <path className={styles.stem} pathLength={1} d="M133 292c24-68-15-99 20-148" />
        <path className={styles.branch} pathLength={1} d="M140 264c-27-11-40-34-48-57" />
        <path className={styles.branch} pathLength={1} d="M143 237c26-14 40-32 48-57" />
        {[
          'M147 252c20-4 30-16 28-30-18 1-30 13-28 30Z',
          'M106 235c-18 0-30-10-31-25 17-1 28 10 31 25Z',
          'M140 223c-19-3-31-17-27-33 18 5 28 16 27 33Z',
          'M97 219c9-14 7-28-4-38-10 13-8 27 4 38Z',
          'M173 206c-6-15-2-28 10-36 7 14 3 26-10 36Z',
          'M181 196c17 1 29-9 31-23-17-2-28 8-31 23Z',
          'M144 198c17-3 28-15 26-30-18 2-27 15-26 30Z',
          'M149 168c-20-3-26-18-21-32 17 4 25 15 21 32Z',
        ].map((path, index) => (
          <path key={path} d={path} className={styles.leaf} style={{ animationDelay: `${0.7 + index * 0.16}s` }} fill="currentColor" fillOpacity=".12" />
        ))}
      </g>
      <path d="m140 38 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="currentColor" />
      <path d="M98 294h84" stroke="currentColor" strokeOpacity=".4" />
    </svg>
  );
}

export function ComingSoon() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const releaseScrollLock = useRef<(() => void) | null>(null);

  function restoreScroll() {
    releaseScrollLock.current?.();
    releaseScrollLock.current = null;
  }

  useEffect(() => () => releaseScrollLock.current?.(), []);

  function openReveal() {
    if (!dialogRef.current || dialogRef.current.open) return;

    const root = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    // Fix the page in place as well as locking the root scroll container.
    // Body overflow alone does not reliably prevent mobile background scrolling.
    root.style.overflow = 'hidden';
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: '100%',
      overflow: 'hidden',
    });

    releaseScrollLock.current = () => {
      root.style.overflow = previousRootOverflow;
      Object.assign(body.style, previousBody);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
    };
    dialogRef.current.showModal();
  }

  return (
    <>
      <button
        ref={triggerRef}
        id="coming-soon"
        type="button"
        onClick={openReveal}
        aria-haspopup="dialog"
        className={`${styles.invitation} relative inline-flex min-h-11 shrink-0 items-center gap-2 overflow-hidden rounded-full border border-brand-gold/45 bg-brand-gold/5 px-4 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold`}
      >
        <Image src="/images/manna-bread-mark.png" alt="" width={30} height={22} className="h-[22px] w-[30px] shrink-0 object-contain mix-blend-screen" />
        <span className="relative font-accent text-[13px] italic tracking-wide sm:text-sm">Coming soon</span>
        <span aria-hidden="true" className={`${styles.shimmer} pointer-events-none absolute inset-0`} />
      </button>

      <dialog ref={dialogRef} aria-labelledby="coming-soon-reveal-title" onClose={() => { restoreScroll(); triggerRef.current?.focus({ preventScroll: true }); }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} className={`${styles.reveal} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto overscroll-contain rounded-t-[12rem] rounded-b-2xl border border-brand-gold/40 bg-brand-forest p-0 text-brand-warm-white shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-md`}>
        <div className="relative overflow-hidden px-7 pb-10 pt-12 text-center sm:px-14">
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close coming soon" className="absolute right-6 top-24 z-10 flex size-11 items-center justify-center rounded-full border border-brand-gold/30 text-brand-soft-cream hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-brand-gold"><X aria-hidden="true" className="size-5" /></button>
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-12 size-64 -translate-x-1/2 rounded-full bg-brand-gold/15 blur-3xl" />
          <div className="relative mx-auto h-48 w-44 sm:h-56 sm:w-52"><GrowingBranch /></div>
          <p className="mt-5 font-body text-[10px] uppercase tracking-[3px] text-brand-gold">Coming soon to Manna</p>
          <h2 id="coming-soon-reveal-title" className="mt-4 font-display text-4xl sm:text-5xl">A little more Manna.</h2>
          <p className="mt-6 font-accent text-xl italic leading-relaxed text-brand-soft-cream">Something new is taking root.</p>
          <div aria-hidden="true" className="mx-auto my-7 h-px w-14 bg-brand-gold/40" />
          <p className="mx-auto max-w-xs font-body text-sm leading-7 text-brand-soft-cream/75">We’ve been quietly making room for it, and we can’t wait to share it with you.</p>
        </div>
      </dialog>
    </>
  );
}
