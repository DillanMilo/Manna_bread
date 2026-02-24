'use client';

import { CONTACT } from '@/lib/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

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

          {/* Map */}
          <FadeIn direction="right" distance={50} delay={0.3}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-sage-light to-brand-sage relative">
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm font-body border-2 border-dashed border-white/30 m-4 rounded-xl">
                [ Embedded Google Map ]
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
