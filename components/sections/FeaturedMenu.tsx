'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { MenuCard } from '@/components/ui/MenuCard';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Motion';

const FEATURED_ITEMS = [
  {
    title: 'Chai Tea',
    description: 'House-made spiced black tea blended with steamed milk for a warm, aromatic drink.',
    price: '$5.75+',
  },
  {
    title: 'Butter Croissant',
    description: 'Flaky, golden layers of hand-folded buttery dough, baked fresh daily.',
    price: '$6.00',
  },
  {
    title: 'Cinnamon Roll',
    description: 'Soft, warm dough swirled with cinnamon and finished with cream cheese icing.',
    price: '$7.00',
  },
];

export function FeaturedMenu() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-brand-forest-mid">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <FadeIn>
          <SectionHeader
            label="From Our Kitchen"
            title="Crafted with intention"
            description="Everything here is baked with intention&mdash;real ingredients, unhurried process, and a lot of love in every batch."
            light
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.2}>
          {FEATURED_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <MenuCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Button href="/menu" variant="primary">
              View Full Menu
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
