'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCheck, Clock3, Wheat } from 'lucide-react';
import { ingredients, steps } from './content';
import { KitchenImage, Reveal } from './KitchenMotion';
import styles from './KitchenMoments.module.css';

export function FeaturedRecipe() {
  const [scale, setScale] = useState(1);
  const [guided, setGuided] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  function moveStep(next: number) {
    setActiveStep(next);
    setFinished(false);
    stepHeading.current?.focus({ preventScroll: true });
  }

  return (
    <section id="recipe" aria-labelledby="recipe-title" className={`${styles.recipeSection} scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-28`}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className={styles.eyebrow}>On the counter / Recipe no. 01</p>
            <h2 id="recipe-title" className={`${styles.sectionTitle} mt-4`}>A loaf, from the beginning.</h2>
          </div>
          <p className="max-w-64 text-sm leading-[1.8] text-brand-olive">A sample recipe to try the experience.<br />Christin’s tested version comes next.</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <figure className="relative">
              <KitchenImage src="/images/kitchen-moments/bread-and-linen.webp" alt="AI concept: a rustic round loaf and torn slices of bread on cream linen" sizes="(min-width: 1024px) 490px, 90vw" className="aspect-[5/4] rounded-2xl" />
              <figcaption className="mt-3 flex justify-between gap-4 text-[10px] uppercase tracking-[1.5px] text-brand-olive"><span>Flour. Water. A little patience.</span><span>AI concept</span></figcaption>
            </figure>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-y border-brand-walnut/15 py-5 text-xs text-brand-walnut">
              <span className="flex items-center gap-2"><Clock3 size={16} aria-hidden="true" />20 min hands-on</span>
              <span className="flex items-center gap-2"><Wheat size={16} aria-hidden="true" />About 3½ hours, with cooling</span>
            </div>
            <p className="mt-6 font-accent text-lg italic leading-[1.8] text-brand-walnut">The first mix looks a little untidy. That’s part of it.</p>
            <p className="mt-3 text-sm leading-[1.85] text-brand-olive">This round loaf begins in a bowl and finishes with a crisp crust. The pauses matter as much as the kneading.</p>
            <p className="mt-4 text-xs leading-[1.8] text-brand-olive">Sample editorial copy and recipe; not a Manna recipe or a quotation from Christin. Quantities and method await her review.</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-brand-walnut">What you’ll need</h3>
              <div role="group" aria-label="Recipe batch size" className="flex rounded-lg border border-brand-walnut/20 p-1">
                {[1, 2, 3].map((amount) => <button key={amount} type="button" aria-pressed={scale === amount} onClick={() => setScale(amount)} className={`${styles.scaleButton} ${scale === amount ? styles.selectedScale : ''}`}>{amount}×</button>)}
              </div>
            </div>
            <p className="mt-2 text-xs text-brand-olive" aria-live="polite">Makes {scale} {scale === 1 ? 'loaf' : 'loaves'} · gram & millilitre measures</p>
            <ul className="mt-5">
              {ingredients.map((ingredient) => (
                <li key={ingredient.name} className="border-b border-brand-walnut/10">
                  <label className="flex min-h-14 cursor-pointer items-center gap-3 py-3">
                    <input type="checkbox" className="size-4 shrink-0 accent-brand-forest" checked={checked.includes(ingredient.name)} onChange={() => setChecked((current) => current.includes(ingredient.name) ? current.filter((name) => name !== ingredient.name) : [...current, ingredient.name])} />
                    <span className={`flex-1 text-sm text-brand-charcoal ${checked.includes(ingredient.name) ? 'line-through opacity-60' : ''}`}>{ingredient.name}{ingredient.note && <span className="mt-0.5 block text-xs leading-relaxed text-brand-olive">{ingredient.note}</span>}</span>
                    <span className="whitespace-nowrap font-accent text-lg tabular-nums text-brand-walnut">{ingredient.quantity * scale}<span className="ml-1 font-body text-xs">{ingredient.unit}</span></span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-brand-olive">For 2× or 3×, shape separate loaves. Baking temperature stays the same.</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-walnut/20 pt-7">
              <h3 className="font-display text-2xl text-brand-walnut">At your own pace</h3>
              <button type="button" className={styles.textButton} aria-pressed={guided} aria-controls="recipe-method" onClick={() => { setGuided(!guided); setFinished(false); }}>{guided ? 'Show all steps' : 'Step-by-step mode'} <ArrowRight size={15} aria-hidden="true" /></button>
            </div>
            <div id="recipe-method" className="mt-5">
              {guided ? (
                <div className="rounded-2xl border border-brand-walnut/15 bg-brand-warm-white p-5 sm:p-6">
                  <div aria-live="polite" aria-atomic="true">
                    <p className={styles.eyebrow}>{finished ? 'All five steps complete' : `Step ${activeStep + 1} of ${steps.length}`} / {steps[activeStep].time}</p>
                    <h4 ref={stepHeading} tabIndex={-1} className="mt-3 font-display text-2xl text-brand-walnut focus-visible:outline-2 focus-visible:outline-brand-forest">{finished ? 'Time to clear the counter.' : steps[activeStep].title}</h4>
                    <p className="mt-3 text-sm leading-[1.85] text-brand-charcoal">{finished ? 'The loaf is cooling. You can return to any step or start again.' : steps[activeStep].instruction}</p>
                    {!finished && <p className="mt-4 border-l-2 border-brand-cognac pl-4 font-accent text-sm italic leading-[1.8] text-brand-olive">{steps[activeStep].cue}</p>}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <button type="button" onClick={() => moveStep(activeStep - 1)} disabled={activeStep === 0} className={styles.stepButton}><ArrowLeft size={16} aria-hidden="true" /> Back</button>
                    {finished ? <button type="button" onClick={() => moveStep(0)} className={styles.stepButton}>Start again <CheckCheck size={16} aria-hidden="true" /></button> : activeStep === steps.length - 1 ? <button type="button" onClick={() => setFinished(true)} className={styles.stepButton}>Finish <Check size={16} aria-hidden="true" /></button> : <button type="button" onClick={() => moveStep(activeStep + 1)} className={styles.stepButton}>Next step <ArrowRight size={16} aria-hidden="true" /></button>}
                  </div>
                </div>
              ) : (
                <ol className="space-y-5">
                  {steps.map((step, index) => <li key={step.title} className="flex gap-4"><span className="pt-0.5 font-accent text-lg italic text-brand-olive" aria-hidden="true">0{index + 1}</span><div><h4 className="font-body text-sm font-semibold text-brand-walnut">{step.title} <span className="ml-1 text-xs font-normal text-brand-olive">/ {step.time}</span></h4><p className="mt-2 text-sm leading-[1.85] text-brand-charcoal">{step.instruction}</p></div></li>)}
                </ol>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
