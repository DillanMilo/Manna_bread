'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, type MenuItem } from '@/lib/menuData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/Motion';
import { TOAST } from '@/lib/constants';

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div
      className={`py-4 border-b border-brand-sage/10 ${
        item.isOutOfStock ? 'opacity-35' : ''
      }`}
    >
      <div className="flex justify-between items-baseline gap-3">
        <h4 className="font-body font-medium text-brand-charcoal text-[15px]">
          {item.name}
        </h4>
        <span className="font-accent text-lg text-brand-cognac shrink-0">
          {item.price.display}
        </span>
      </div>
      {item.description && (
        <p className="mt-1 font-body text-sm text-brand-olive/80 leading-relaxed">
          {item.description}
        </p>
      )}
      {item.isOutOfStock && (
        <span className="mt-1.5 inline-block text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-brand-sage">
          Currently Unavailable
        </span>
      )}
    </div>
  );
}

export default function MenuPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const category = menuData[activeIndex];

  const switchCategory = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);

    // If scrolled past the tabs, scroll back up so content is visible
    const tabsTop = tabsRef.current?.offsetTop || 0;
    if (window.scrollY > tabsTop - 90) {
      window.scrollTo({ top: tabsTop - 90, behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-brand-warm-white min-h-screen">
      {/* Header */}
      <div className="pt-32 md:pt-40 pb-6 md:pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionHeader
              label="Our Menu"
              title="Baked Fresh Daily"
              description="From artisan breads to handcrafted pastries, every item is made with care, from scratch, daily."
            />
          </FadeIn>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        ref={tabsRef}
        className="sticky top-20 z-40 bg-brand-warm-white/95 backdrop-blur-sm border-b border-brand-sage/15"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <nav
            className="flex gap-0 overflow-x-auto -mb-px"
            style={{ scrollbarWidth: 'none' }}
          >
            {menuData.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => switchCategory(i)}
                className={`relative px-5 py-4 text-sm font-body font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeIndex === i
                    ? 'text-brand-walnut'
                    : 'text-brand-olive/70 hover:text-brand-walnut-medium'
                }`}
              >
                {cat.title}
                {activeIndex === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-cognac rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14 min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-12"
          >
            {category.sections.map((section) => (
              <div key={section.title}>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-display text-xl md:text-2xl text-brand-walnut shrink-0">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-brand-sage/20" />
                </div>

                {/* Items Grid */}
                <div className="grid gap-x-12 md:grid-cols-2">
                  {section.items.map((item) => (
                    <MenuItemRow
                      key={`${section.title}-${item.name}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Order CTA */}
      <FadeIn>
        <div className="bg-brand-soft-cream">
          <div className="max-w-2xl mx-auto text-center px-6 py-16 md:py-20">
            <p className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-cognac mb-3">
              Ready to Order?
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-brand-walnut mb-4">
              Place Your Order
            </h3>
            <p className="font-body text-brand-olive mb-8 leading-relaxed">
              Order online for pickup through our ordering system.<br className="hidden sm:block" />
              Fresh, made from scratch, waiting for you.
            </p>
            <Button href={TOAST.orderOnline} external variant="accent">
              Order Online
            </Button>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
