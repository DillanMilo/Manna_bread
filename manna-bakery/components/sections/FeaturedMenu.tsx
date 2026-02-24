'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { MenuCard } from '@/components/ui/MenuCard';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Motion';

const FEATURED_ITEMS = [
  {
    title: 'Artisan Sourdough',
    description: '24-hour ferment, crusty exterior, soft tangy interior.',
    price: '$8.50',
  },
  {
    title: 'Honey Lavender Latte',
    description: 'Local honey, house-made lavender syrup, oat milk.',
    price: '$6.00',
  },
  {
    title: 'Almond Croissant',
    description: 'Twice-baked, filled with frangipane, dusted with powdered sugar.',
    price: '$5.50',
  },
];

export function FeaturedMenu() {
  return (
    <section className="py-20 md:py-28 bg-brand-soft-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeader
            label="From Our Kitchen"
            title="Crafted with intention"
            description="Every item on our menu is made from scratch, using the finest ingredients and time-honored techniques."
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
