"use client";

import { CONTACT } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { MannaMap, MapInfoCard } from "@/components/ui/MannaMap";
import { VineAccent } from "@/components/ui/ScrollVine";

export function Contact() {
  return (
    <section className="relative isolate py-12 sm:py-16 md:py-20 lg:py-28 bg-[#18231d] overflow-hidden">
      <VineAccent variant="left" className="z-0 opacity-55" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-6 sm:mb-8">
                Visit Us
              </h2>
            </FadeIn>

            <StaggerContainer
              className="space-y-6"
              staggerDelay={0.15}
              delayStart={0.2}
            >
              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-gold mb-2">
                    Address
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed">
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.city}, {CONTACT.address.state}{" "}
                    {CONTACT.address.zip}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="left" distance={30}>
                <div>
                  <p className="font-body text-[11px] font-semibold tracking-[1.5px] uppercase text-brand-gold mb-2">
                    Hours
                  </p>
                  <p className="font-body text-base text-white/85 leading-relaxed">
                    Monday – Friday: {CONTACT.hours.weekdays}
                    <br />
                    Saturday: {CONTACT.hours.saturday}
                    <br />
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
                    <a
                      href={`tel:${CONTACT.phone.replace(/[^0-9]/g, "")}`}
                      className="hover:text-brand-gold transition-colors inline-block py-1"
                    >
                      {CONTACT.phone}
                    </a>
                    <br />
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="hover:text-brand-gold transition-colors inline-block py-1"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Map */}
          <FadeIn direction="right" distance={50} delay={0.3}>
            <div className="relative aspect-[3/4] max-w-[340px] sm:max-w-[420px] md:max-w-[520px] mx-auto">
              <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-xl border border-brand-gold/35 bg-brand-forest shadow-[0_26px_70px_rgba(0,0,0,0.34)]">
                <MannaMap />
              </div>
              <div className="absolute z-[5] top-[14%] sm:top-[16%] inset-x-0 flex justify-center">
                <MapInfoCard />
              </div>
            </div>
            {/* Caption beneath */}
            <p className="text-center font-accent text-xs sm:text-sm italic text-white/60 mt-3 sm:mt-4">
              306 Commerce St, Tomball TX 77375
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
