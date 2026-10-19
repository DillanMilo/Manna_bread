'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Pause, Play, Wheat } from 'lucide-react';
import { CONTACT, FEATURES, TOAST } from '@/lib/constants';
import { useMobilePerformanceMode } from '@/components/ui/useMobilePerformanceMode';
import { FeaturedRecipe } from './FeaturedRecipe';
import { MomentsJournal } from './MomentsJournal';
import { KitchenImage, KitchenMotionContext, KitchenVine, Reveal } from './KitchenMotion';
import styles from './KitchenMoments.module.css';

export function KitchenMoments() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const compact = useMobilePerformanceMode();
  const still = paused || Boolean(reducedMotion);

  return (
    <KitchenMotionContext.Provider value={{ still, compact }}>
      <main id="kitchen-content" className={`${styles.page} w-full max-w-full overflow-x-clip pt-16 lg:pt-20`} data-motion={still ? 'static' : 'full'}>
        <noscript><style>{`.${styles.reveal}, .${styles.imageFrame} { opacity: 1 !important; transform: none !important; clip-path: none !important; }`}</style></noscript>
        <a href="#recipe" className={styles.skipLink}>Skip to the sample recipe</a>
        <div className="border-y border-brand-gold/20 bg-black/5 px-5 py-2.5">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-1">
            <p className="text-[10px] leading-[1.8] tracking-[0.8px] text-brand-soft-cream/85"><span className="font-semibold text-brand-warm-white">LOCAL DESIGN PREVIEW</span><span className="mx-2" aria-hidden="true">/</span>Sample content for Christin’s review</p>
            <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={Boolean(reducedMotion)} className="flex min-h-9 items-center gap-2 text-[11px] text-brand-soft-cream disabled:opacity-75">{still ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{reducedMotion ? 'Reduced motion on' : paused ? 'Resume motion' : 'Pause motion'}</button>
          </div>
        </div>

        <section aria-labelledby="kitchen-title" className="relative isolate px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-16 lg:pt-20">
          <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div className="relative z-10">
              <Reveal load><p className={`${styles.eyebrow} flex items-center gap-3 text-brand-soft-cream!`}><span className="h-px w-8 bg-brand-gold/60" />A Manna kitchen journal</p></Reveal>
              <Reveal load delay={0.12}><h1 id="kitchen-title" className={styles.heroTitle}>Kitchen<br />Moments<span className="mt-4 block font-accent text-[0.48em] font-normal italic tracking-normal text-brand-gold">with Christin</span></h1></Reveal>
              <Reveal load delay={0.25}><p className="mt-7 max-w-sm font-accent text-lg italic leading-[1.8] text-brand-soft-cream sm:text-xl">A little flour on the counter.<br />Something good taking its time.</p></Reveal>
              <Reveal load delay={0.38}><p className="mt-5 max-w-sm text-sm leading-[1.9] text-brand-soft-cream/80">Recipes to work through with your hands, and a few stories to read while the dough rests.</p></Reveal>
              <Reveal load delay={0.5} className="mt-8 flex flex-wrap items-center gap-6">
                <a href="#recipe" className={styles.primaryButton}>Let’s make something <ArrowDown size={16} aria-hidden="true" /></a>
                <a href="#moments" className="inline-flex min-h-11 items-center gap-2 text-xs text-brand-soft-cream">The notebook <ArrowUpRight size={15} aria-hidden="true" /></a>
              </Reveal>
              <Reveal load delay={0.65} className="mt-9 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-brand-gold/50" /><p className="text-[10px] uppercase tracking-[2px] text-brand-soft-cream/70">Tomball, Texas / From our kitchen to yours</p>
              </Reveal>
            </div>

            <figure className="relative mx-auto w-full max-w-[455px] lg:ml-auto">
              <div aria-hidden="true" className={styles.archGlow} />
              <KitchenVine hero />
              <KitchenImage src="/images/kitchen-moments/hands-and-dough.webp" alt="AI concept: anonymous flour-dusted hands folding bread dough on a walnut counter in soft window light" sizes="(min-width: 1024px) 455px, (min-width: 640px) 430px, 88vw" priority arch className="aspect-[4/5] shadow-2xl" />
              <Reveal load delay={0.8} className={styles.imageNote}><span className="text-[9px] uppercase tracking-[2px]">The first fold</span><span className="mt-1 block font-accent text-xl italic">It begins here.</span></Reveal>
              <figcaption className="mt-5 flex max-w-full flex-wrap justify-between gap-x-3 gap-y-1 text-[10px] leading-[1.7] text-brand-soft-cream/75"><span>No. 01 / At the worktable</span><span>AI concept · Visual direction</span></figcaption>
            </figure>
          </div>

          <Reveal load delay={0.7} className="mx-auto mt-14 grid max-w-6xl grid-cols-1 border-t border-brand-gold/25 sm:mt-16 sm:grid-cols-3">
            {[
              ['01', 'Something to make', '#recipe'],
              ['02', 'Something to remember', '#moments'],
              ['03', 'A moment to rest', '#a-pause'],
            ].map(([number, label, href]) => <a key={number} href={href} className={styles.chapterLink}><span className="font-accent italic text-brand-soft-cream">{number}</span><span>{label}</span><ArrowDown size={13} className="ml-auto text-brand-gold/80" aria-hidden="true" /></a>)}
          </Reveal>
        </section>

        <section aria-labelledby="christin-title" className={`${styles.introSection} relative isolate overflow-hidden px-5 py-20 sm:px-8 lg:py-24`}>
          <KitchenVine className={styles.introVine} />
          <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-14">
            <Reveal className="relative mx-auto h-44 w-36 sm:h-48 sm:w-full"><div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-2xl border border-brand-walnut/15"><Image src="/images/christin-desert-portrait.jpeg" alt="Christin, founder of Manna Bakery" fill sizes="150px" className="object-cover object-[center_35%]" /></div><Wheat size={30} strokeWidth={1} className="absolute -bottom-3 -right-4 text-brand-walnut" aria-hidden="true" /></Reveal>
            <Reveal delay={0.15}><p className={styles.eyebrow}>A note from Christin / Space reserved</p><h2 id="christin-title" className={`${styles.sectionTitle} mt-4`}>The part before the first bite.</h2><p className="mt-5 text-sm leading-[1.9] text-brand-charcoal">The scrape of a bowl. Dough catching on your fingers. A recipe book held open with a spoon. There’s a whole morning tucked into a loaf of bread.</p><p className="mt-4 text-sm leading-[1.9] text-brand-olive">This is a place for those small parts of the process, with room for Christin to tell them in her own words.</p><p className="mt-4 text-[11px] leading-relaxed text-brand-olive">Sample introduction · Christin’s personal note will replace this text.</p></Reveal>
          </div>
        </section>

        <FeaturedRecipe />
        <MomentsJournal />

        <section id="a-pause" aria-labelledby="pause-title" className={`${styles.quoteSection} relative isolate scroll-mt-24 overflow-hidden px-6 py-24 text-center lg:py-32`}>
          <KitchenVine className={styles.quoteVine} />
          <Reveal className="relative z-10 mx-auto max-w-3xl"><Wheat size={32} strokeWidth={1} className="mx-auto mb-7 text-brand-gold" aria-hidden="true" /><h2 id="pause-title" className={`${styles.eyebrow} text-brand-gold!`}>A moment to rest</h2><blockquote className="mt-7 font-accent text-[clamp(1.5rem,3vw,2.25rem)] italic leading-[1.65] text-brand-soft-cream">“I love how people pause when they’re eating bread. It’s a time where they just rest.”</blockquote><p className="mt-7 text-[10px] uppercase tracking-[2px] text-brand-gold">Christin / Founder of Manna</p><Link href="/our-story" className="mt-7 inline-flex min-h-11 items-center gap-2 text-xs text-brand-soft-cream/85">Read her story <ArrowUpRight size={14} aria-hidden="true" /></Link></Reveal>
        </section>

        <section aria-labelledby="visit-title" className={`${styles.visitSection} px-5 py-20 sm:px-8 lg:px-10 lg:py-24`}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-20">
            <Reveal><p className={styles.eyebrow}>A little closer to the kitchen</p><h2 id="visit-title" className={`${styles.sectionTitle} mt-4`}>Come by for a slice.</h2><p className="mt-5 max-w-md text-sm leading-[1.9] text-brand-charcoal">You’ll find Manna on Commerce Street. Come see what’s on the counter today.</p><p className="mt-5 flex items-start gap-2 text-xs leading-[1.9] text-brand-olive"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span>{CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state}<br />Monday–Saturday, {CONTACT.hours.mondayThroughSaturday}</span></p><div className="mt-7 flex flex-wrap items-center gap-5"><Link href="/contact" className={`${styles.primaryButton} ${styles.darkButton}`}>Visit the bakery <ArrowUpRight size={16} aria-hidden="true" /></Link>{FEATURES.onlineOrdering ? <a href={TOAST.orderOnline} className={styles.textButton}>Order through Toast <ArrowUpRight size={15} aria-hidden="true" /></a> : <Link href="/menu" className={styles.textButton}>See the menu <ArrowRight size={15} aria-hidden="true" /></Link>}</div></Reveal>
            <Reveal delay={0.15}><KitchenImage src="/images/manna-entry-doors.webp" alt="The arched timber entrance to Manna Bakery in Tomball" sizes="(min-width: 768px) 480px, 90vw" arch className="mx-auto aspect-[5/4] max-w-md" /></Reveal>
          </div>
        </section>
      </main>
    </KitchenMotionContext.Provider>
  );
}
