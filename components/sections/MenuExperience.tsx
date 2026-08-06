'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { MenuCategory, MenuItem } from '@/lib/menuData';
import type { MenuDataSource } from '@/lib/toastMenu';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/Motion';
import { PageVine } from '@/components/ui/ScrollVine';
import { useMediaParallax } from '@/components/ui/useMediaParallax';
import { FEATURES, TOAST } from '@/lib/constants';
import { formatDisplayPrice } from '@/lib/pricing';

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

type MenuPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

const MENU_PHOTOS: Record<string, [MenuPhoto, MenuPhoto]> = {
  Drinks: [
    {
      src: '/images/manna-latte-art.webp',
      alt: 'Leaf-shaped latte art in a freshly poured Manna drink',
      objectPosition: 'center 62%',
    },
    {
      src: '/images/manna-espresso-pour.webp',
      alt: 'A Manna barista steaming milk at the espresso machine',
      objectPosition: 'center 56%',
    },
  ],
  Breakfast: [
    {
      src: '/images/manna-strawberry-waffle.webp',
      alt: 'Manna Liège waffle topped with strawberries and whipped cream',
      objectPosition: 'center 70%',
    },
    {
      src: '/images/manna-quiche-fruit.webp',
      alt: 'A slice of Manna quiche served with fresh fruit',
      objectPosition: 'center 72%',
    },
  ],
  Lunch: [
    {
      src: '/images/manna-turkey-panini.webp',
      alt: 'A toasted Manna turkey panini served with house chips',
      objectPosition: 'center 66%',
    },
    {
      src: '/images/manna-chophouse-soup.webp',
      alt: 'Manna chophouse potato soup served with fresh bread',
      objectPosition: 'center 70%',
    },
  ],
};

type MenuExperienceProps = {
  menuData: MenuCategory[];
  source: MenuDataSource;
  lastSyncedAt?: string;
};

function MenuItemRow({ item }: { item: MenuItem }) {
  const price = formatDisplayPrice(item.price.display);

  return (
    <div
      className={`py-4 border-b border-white/10 ${
        item.isOutOfStock ? 'opacity-35' : ''
      }`}
    >
      <div className="flex justify-between items-baseline gap-3">
        <h4 className="font-body font-medium text-white text-[15px]">
          {item.name}
        </h4>
        {price && (
          <span className="font-accent text-lg text-brand-gold shrink-0">
            {price}
          </span>
        )}
      </div>
      {item.description && (
        <p className="mt-1 font-body text-sm text-white/60 leading-relaxed">
          {item.description}
        </p>
      )}
      {item.labels && item.labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.labels.map((label) => (
            <span
              key={label}
              className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-gold"
            >
              {label}
            </span>
          ))}
        </div>
      )}
      {item.isOutOfStock && (
        <span className="mt-1.5 inline-block text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-white/40">
          Currently Unavailable
        </span>
      )}
    </div>
  );
}

function MenuPhotoCard({ photo, index }: { photo: MenuPhoto; index: number }) {
  const frameRef = useRef<HTMLElement>(null);
  const imageY = useMediaParallax(frameRef, index === 0 ? 18 : 14);

  return (
    <motion.figure
      ref={frameRef}
      initial={{ opacity: 0, y: 20, rotate: index === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      className={`group relative overflow-hidden border border-brand-gold/30 bg-brand-forest-mid shadow-[0_18px_45px_rgba(18,31,25,0.35)] ${
        index === 0
          ? 'h-36 rounded-[2rem_0.75rem_2rem_0.75rem] sm:h-48 md:h-52'
          : 'mt-7 h-28 rounded-[0.75rem_2rem_0.75rem_2rem] sm:mt-10 sm:h-36 md:h-40'
      }`}
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-x-0 -inset-y-[12%] will-change-transform"
      >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={index === 0
              ? '(min-width: 768px) 430px, 58vw'
              : '(min-width: 768px) 290px, 36vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            style={{ objectPosition: photo.objectPosition }}
          />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-forest/15 to-transparent" />
    </motion.figure>
  );
}

function MenuPhotoBreak({ categoryTitle }: { categoryTitle: string }) {
  const photos = MENU_PHOTOS[categoryTitle];

  if (!photos) return null;

  return (
    <div className="mx-auto mt-9 grid w-full max-w-3xl grid-cols-[1.15fr_0.85fr] items-start gap-3 sm:mt-11 sm:gap-5">
      {photos.map((photo, index) => (
        <MenuPhotoCard key={photo.src} photo={photo} index={index} />
      ))}
    </div>
  );
}

function MenuCategoryContent({
  category,
  showPhoto = true,
}: {
  category: MenuCategory;
  showPhoto?: boolean;
}) {
  return (
    <>
      {category.sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-4 mb-2">
            <h3 className="font-display text-xl md:text-2xl text-white shrink-0">
              {section.title}
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {section.description && (
            <p className="mb-3 max-w-2xl font-body text-sm leading-relaxed text-white/60">
              {section.description}
            </p>
          )}

          <div className="grid gap-x-8 md:gap-x-12 grid-cols-1 md:grid-cols-2">
            {section.items.map((item) => (
              <MenuItemRow
                key={`${section.title}-${item.name}`}
                item={item}
              />
            ))}
          </div>

          {showPhoto && section === category.sections[0] && (
            <MenuPhotoBreak categoryTitle={category.title} />
          )}
        </div>
      ))}
    </>
  );
}

export function MenuExperience({ menuData, source, lastSyncedAt }: MenuExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  const category = menuData[activeIndex] ?? menuData[0];

  const switchCategory = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);

    const tabsTop = tabsRef.current?.offsetTop || 0;
    if (window.scrollY > tabsTop - 90) {
      window.scrollTo({ top: tabsTop - 90, behavior: 'smooth' });
    }
  };

  return (
    <main ref={pageRef} className="relative isolate bg-brand-forest min-h-screen overflow-hidden">
      <PageVine variant="menu" progress={scrollYProgress} className="z-0 opacity-85" />
      <div className="relative z-10">
        <div className="pt-24 sm:pt-32 md:pt-40 pb-6 md:pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <FadeIn>
              <SectionHeader
                label="Our Menu"
                title="Baked Fresh Daily"
                description="Breakfast, lunch, and drinks made with care in the heart of Manna."
                headingLevel="h1"
                light
              />
            </FadeIn>
            {source === 'toast' && lastSyncedAt && (
              <p className="mt-4 text-center font-body text-[11px] uppercase tracking-[0.16em] text-white/45">
                Menu synced from Toast
              </p>
            )}
          </div>
        </div>

        <div
          ref={tabsRef}
          className="sticky top-16 lg:top-20 z-40 bg-brand-forest/95 sm:backdrop-blur-sm border-b border-white/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <nav
              aria-label="Menu categories"
              role="tablist"
              className="flex gap-0 overflow-x-auto -mb-px"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {menuData.map((cat, i) => (
                <button
                  key={cat.title}
                  id={`menu-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls={`menu-panel-${i}`}
                  onClick={() => switchCategory(i)}
                  className={`relative px-3 sm:px-5 py-4 text-[13px] sm:text-sm font-body font-medium whitespace-nowrap transition-colors duration-200 min-h-[44px] ${
                    activeIndex === i
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat.title}
                  {activeIndex === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14 min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              id={`menu-panel-${activeIndex}`}
              key={category.title}
              role="tabpanel"
              aria-labelledby={`menu-tab-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="space-y-12"
            >
              <MenuCategoryContent category={category} />
            </motion.div>
          </AnimatePresence>

          {menuData.map((indexedCategory, index) => (
            index !== activeIndex ? (
              <div
                id={`menu-panel-${index}`}
                key={`indexed-${indexedCategory.title}`}
                role="tabpanel"
                aria-labelledby={`menu-tab-${index}`}
                hidden
              >
                <MenuCategoryContent category={indexedCategory} showPhoto={false} />
              </div>
            ) : null
          ))}
        </div>

        {FEATURES.onlineOrdering && (
          <FadeIn>
            <div className="bg-brand-forest-mid">
              <div className="max-w-2xl mx-auto text-center px-5 sm:px-6 py-12 sm:py-16 md:py-20">
                <p className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
                  Ready to Order?
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                  Place Your Order
                </h3>
                <p className="font-body text-white/70 mb-8 leading-relaxed">
                  Order online for pickup through our ordering system.<br className="hidden sm:block" />
                  Fresh, made from scratch, waiting for you.
                </p>
                <Button href={TOAST.orderOnline} external variant="accent" className="w-full sm:w-auto">
                  Order Online
                </Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}
