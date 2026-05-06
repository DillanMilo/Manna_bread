'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { MenuCard } from '@/components/ui/MenuCard';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { VineAccent } from '@/components/ui/ScrollVine';

const FEATURED_ITEMS = [
  {
    title: 'Chai Tea',
    description: 'House-made spiced black tea blended with steamed milk for a warm, aromatic drink.',
    price: '$5.75+',
    image: '/images/manna-latte-art.webp',
  },
  {
    title: 'Butter Croissant',
    description: 'Flaky, golden layers of hand-folded buttery dough, baked fresh daily.',
    price: '$6.00',
    image: '/images/manna-croissant-tray.webp',
  },
  {
    title: 'Chocolate Danish',
    description: 'Buttery puff pastry layered with rich chocolate filling, drizzled and finished by hand.',
    price: '$7.00',
    image: '/images/manna-danish-prep.webp',
  },
];

export function FeaturedMenu() {
  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-20 md:py-28 bg-brand-forest-mid">
      <VineAccent variant="right" className="z-0 opacity-75" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <FadeIn>
          <SectionHeader
            label="From Our Kitchen"
            title="Crafted with intention"
            description="Everything here is baked with intention&mdash;real ingredients, unhurried process, and a lot of love in every batch."
            light
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.2}>
          {FEATURED_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <MenuCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Button href="/menu" variant="primary" className="w-full sm:w-auto">
              View Full Menu
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
