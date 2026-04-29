'use client';

import { ServiceCard } from '@/components/ui/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { VineAccent } from '@/components/ui/ScrollVine';

export function Services() {
  return (
    <section className="relative isolate py-12 sm:py-16 md:py-20 lg:py-28 bg-brand-forest overflow-hidden">
      <VineAccent variant="low" className="z-0 opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" staggerDelay={0.25}>
          <StaggerItem>
            <ServiceCard
              title="Catering"
              description="From corporate breakfasts to wedding brunches, we bring the Manna experience to your gathering."
              href="/catering"
              linkText="Learn more"
              image="/images/manna-strawberry-waffle.webp"
              imagePosition="center 68%"
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              title="Private Rentals"
              description="Host your next event in our beautiful space. Intimate gatherings, showers, and celebrations welcome."
              href="/rentals"
              linkText="Inquire now"
              image="/images/manna-cognac-lounge.webp"
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
