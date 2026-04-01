'use client';

import { CONTACT } from '@/lib/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { MannaMap } from '@/components/ui/MannaMap';

export function Contact() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#5C5248' }}>
      {/* Stone block texture — layered gradients for mortar lines + surface variation */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 58px,
              rgba(255,255,255,0.08) 58px,
              rgba(255,255,255,0.12) 60px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 118px,
              rgba(255,255,255,0.06) 118px,
              rgba(255,255,255,0.1) 120px,
              transparent 120px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 60px,
              transparent 118px,
              rgba(255,255,255,0.06) 118px,
              rgba(255,255,255,0.1) 120px,
              transparent 120px
            )
          `,
          backgroundSize: '240px 120px, 240px 120px, 240px 120px',
          backgroundPosition: '0 0, 0 0, 120px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(201,168,76,0.3) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 35%),
            radial-gradient(circle at 50% 90%, rgba(62,39,35,0.2) 0%, transparent 45%),
            radial-gradient(circle at 85% 15%, rgba(184,196,184,0.2) 0%, transparent 30%)
          `,
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-6 sm:mb-8">
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
                    <a href={`tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brand-gold transition-colors inline-block py-1">
                      {CONTACT.phone}
                    </a>
                    <br />
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold transition-colors inline-block py-1">
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
                className="absolute -inset-5 sm:-inset-8 rounded-t-[9999px] rounded-b-2xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.22) 0%, rgba(201, 168, 76, 0.08) 50%, transparent 75%)',
                  filter: 'blur(28px)',
                }}
              />
              {/* Arch frame overlaying the map — looking through the arch */}
              <div
                className="relative rounded-t-[9999px] rounded-b-[1.75rem] overflow-hidden aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/4.5]"
              >
                {/* Map fills entire container */}
                <div className="absolute inset-0">
                  <MannaMap />
                </div>
                {/* Arch frame overlay — responsive thickness for stone border feel */}
                {/* Mobile: thinner frame, Desktop: thicker frame */}
                <div
                  className="absolute inset-0 rounded-t-[9999px] rounded-b-[1.75rem] z-20 pointer-events-none sm:hidden"
                  style={{
                    boxShadow: `
                      inset 0 0 0 8px rgba(82, 72, 64, 0.85),
                      inset 0 0 0 10px rgba(201, 168, 76, 0.25),
                      inset 0 0 20px 5px rgba(45, 42, 38, 0.35)
                    `,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-t-[9999px] rounded-b-[1.75rem] z-20 pointer-events-none hidden sm:block"
                  style={{
                    boxShadow: `
                      inset 0 0 0 12px rgba(82, 72, 64, 0.85),
                      inset 0 0 0 14px rgba(201, 168, 76, 0.25),
                      inset 0 0 30px 8px rgba(45, 42, 38, 0.4)
                    `,
                  }}
                />
                {/* Outer ring for definition */}
                <div
                  className="absolute inset-0 rounded-t-[9999px] rounded-b-[1.75rem] z-20 pointer-events-none ring-1 ring-brand-sage/20"
                />
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
