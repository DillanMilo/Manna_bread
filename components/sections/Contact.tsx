'use client';

import { CONTACT } from '@/lib/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { MannaMap } from '@/components/ui/MannaMap';

export function Contact() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-brand-forest-mid overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <h2 className="font-display text-[26px] sm:text-3xl md:text-4xl font-medium text-white mb-6 sm:mb-8">
                Visit Us
              </h2>
            </FadeIn>

            <StaggerContainer className="space-y-6" staggerDelay={0.15} delayStart={0.2}>
              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-gold mb-2">
                    Address
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed">
                    {CONTACT.address.street}<br />
                    {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-gold mb-2">
                    Hours
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed">
                    Monday – Friday: {CONTACT.hours.weekdays}<br />
                    Saturday: {CONTACT.hours.saturday}<br />
                    Sunday: {CONTACT.hours.sunday}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-gold mb-2">
                    Contact
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed">
                    <a href={`tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brand-gold transition-colors">
                      {CONTACT.phone}
                    </a>
                    <br />
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold transition-colors">
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
              {/* Soft radial gold glow behind arch */}
              <div
                className="absolute -inset-6 rounded-t-[9999px] rounded-b-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              {/* Outer arch frame */}
              <div
                className="relative rounded-t-[9999px] rounded-b-2xl overflow-hidden shadow-lg ring-1 ring-brand-sage/20 aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/4.5]"
              >
                <MannaMap />
              </div>
              {/* Subtle caption beneath */}
              <p className="text-center font-accent text-sm italic text-white/60 mt-4">
                306 Commerce St, Tomball TX 77375
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
