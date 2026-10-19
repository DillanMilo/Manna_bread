'use client';

import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, Plus } from 'lucide-react';
import { journalCategories, journalEntries, type JournalCategory } from './content';
import { KitchenImage, KitchenMotionContext, KitchenVine, Reveal } from './KitchenMotion';
import styles from './KitchenMoments.module.css';

export function MomentsJournal() {
  const [category, setCategory] = useState<JournalCategory>('All moments');
  const { still, compact } = useContext(KitchenMotionContext);
  const entries = journalEntries.filter((entry) => category === 'All moments' || entry.category === category);

  return (
    <section id="moments" aria-labelledby="moments-title" className="relative isolate scroll-mt-24 overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <KitchenVine className={styles.journalVine} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div><p className={`${styles.eyebrow} text-brand-soft-cream!`}>From the kitchen notebook</p><h2 id="moments-title" className={`${styles.sectionTitle} mt-4 text-brand-warm-white!`}>A few things to keep.</h2></div>
          <p className="max-w-72 text-sm leading-[1.85] text-brand-soft-cream/80">Recipes, half-open cookbooks, and the things we notice while something is in the oven.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-brand-gold/25 py-4">
          <div role="group" aria-label="Filter kitchen moments" className="flex flex-wrap gap-2">
            {journalCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="moment-entries" onClick={() => setCategory(item)} className={`${styles.filterButton} ${category === item ? styles.selectedFilter : ''}`}>{item}</button>)}
          </div>
          <p className="text-[11px] text-brand-soft-cream/75" role="status" aria-live="polite">{entries.length} {entries.length === 1 ? 'moment' : 'moments'}</p>
        </Reveal>

        <div id="moment-entries" className="mt-10 grid items-start gap-8 md:min-h-[650px] md:grid-cols-3">
          <AnimatePresence initial={false}>
            {entries.map((entry, index) => (
              <motion.article key={entry.id} layout={!still && !compact} className={styles.journalCard} initial={still ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: still ? 0 : -10 }} transition={{ duration: still ? 0 : 0.4 }}>
                <Reveal delay={index * 0.12}>
                  <KitchenImage src={entry.image} alt={entry.alt} sizes="(min-width: 768px) 33vw, 90vw" className={`rounded-2xl ${index === 1 ? 'aspect-[4/5]' : 'aspect-[5/4]'}`} />
                  <div className="mt-5 flex justify-between text-[10px] uppercase tracking-[2px] text-brand-soft-cream"><span>{entry.category}</span><span>No. {entry.number}</span></div>
                  <h3 className="mt-3 font-display text-[1.7rem] leading-[1.25] text-brand-warm-white">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-[1.85] text-brand-soft-cream/80">{entry.summary}</p>
                  <details className={styles.entryDetails}>
                    <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 text-xs text-brand-soft-cream">Open this note <Plus size={16} aria-hidden="true" /></summary>
                    <p className="pb-4 text-sm leading-[1.85] text-brand-soft-cream/85"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[1.8px] text-brand-soft-cream">Sample editorial direction</span>{entry.detail}</p>
                  </details>
                </Reveal>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        <Reveal className="mt-8 flex items-start gap-3 text-xs leading-[1.8] text-brand-soft-cream/75"><ArrowDownRight size={19} className="shrink-0 text-brand-gold" aria-hidden="true" /><p>A first collection, still taking shape. All journal copy is sample content awaiting Christin’s words. Food still lifes are AI concepts; the cookbook photograph is from Manna’s library.</p></Reveal>
      </div>
    </section>
  );
}
