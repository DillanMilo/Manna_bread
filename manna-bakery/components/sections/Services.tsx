'use client';

import { ServiceCard } from '@/components/ui/ServiceCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/Motion';

export function Services() {
  return (
    <section className="py-20 md:py-28 bg-brand-soft-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.25}>
          <StaggerItem>
            <ServiceCard
              title="Catering"
              description="From corporate breakfasts to wedding brunches, we bring the Manna experience to your gathering."
              href="/catering"
              linkText="Learn more"
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              title="Private Rentals"
              description="Host your next event in our beautiful space. Intimate gatherings, showers, and celebrations welcome."
              href="/rentals"
              linkText="Inquire now"
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
