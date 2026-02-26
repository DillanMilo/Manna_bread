'use client';

import { CONTACT } from '@/lib/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { MannaMap } from '@/components/ui/MannaMap';

export function Contact() {
  return (
    <section className="py-20 md:py-28 bg-brand-warm-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut mb-8">
                Visit Us
              </h2>
            </FadeIn>

            <StaggerContainer className="space-y-6" staggerDelay={0.15} delayStart={0.2}>
              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-sage mb-2">
                    Address
                  </p>
                  <p className="font-body text-base text-brand-charcoal leading-relaxed">
                    {CONTACT.address.street}<br />
                    {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-sage mb-2">
                    Hours
                  </p>
                  <p className="font-body text-base text-brand-charcoal leading-relaxed">
                    Monday – Friday: {CONTACT.hours.weekdays}<br />
                    Saturday: {CONTACT.hours.saturday}<br />
                    Sunday: {CONTACT.hours.sunday}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-sage mb-2">
                    Contact
                  </p>
                  <p className="font-body text-base text-brand-charcoal leading-relaxed">
                    <a href={`tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brand-cognac transition-colors">
                      {CONTACT.phone}
                    </a>
                    <br />
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-cognac transition-colors">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Map — arched alcove frame */}
          <FadeIn direction="right" distance={50} delay={0.3}>
            <div className="relative">
              {/* Outer arch frame */}
              <div
                className="rounded-t-[9999px] rounded-b-2xl overflow-hidden shadow-lg ring-1 ring-brand-sage/20"
                style={{ aspectRatio: '4 / 4.5' }}
              >
                <MannaMap />
              </div>
              {/* Subtle caption beneath */}
              <p className="text-center font-accent text-sm italic text-brand-olive mt-4">
                306 Commerce St, Tomball TX 77375
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
