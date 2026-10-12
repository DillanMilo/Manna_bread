import { createPageMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { TimedVisibility } from '@/components/ui/TimedVisibility';
import { CoffeeDayBanner } from '@/components/sections/CoffeeDayBanner';
import { Story } from '@/components/sections/Story';
import { WelcomeInterlude } from '@/components/sections/WelcomeInterlude';
import { FeaturedMenu } from '@/components/sections/FeaturedMenu';

import { KeywordCarousel } from '@/components/sections/KeywordCarousel';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { FounderInterlude } from '@/components/sections/FounderInterlude';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

const COFFEE_DAY_BANNER_ENDS_AT_CENTRAL = '2026-09-29T20:00:00-05:00';

export const metadata = createPageMetadata(
  'Bread from Heaven',
  'Manna Bakery is a handcrafted bakery, café, and gathering place in Tomball, Texas—made for good food, unhurried moments, and community.',
  '/',
);

// Skip expired promos at render time so their text never reaches the server HTML.
// TimedVisibility still handles the live client-side cutoff while a promo is running.
function hasNotEnded(endsAt: string) {
  return Date.now() < Date.parse(endsAt);
}

export default function HomePage() {
  const showCoffeeDayBanner = hasNotEnded(COFFEE_DAY_BANNER_ENDS_AT_CENTRAL);

  return (
    <main>
      {showCoffeeDayBanner && (
        <TimedVisibility endsAt={COFFEE_DAY_BANNER_ENDS_AT_CENTRAL}>
          <CoffeeDayBanner />
        </TimedVisibility>
      )}
      <Hero />
      <Story />
      <WelcomeInterlude />
      <FeaturedMenu />
      <KeywordCarousel />
      <Experience />
      <Testimonials />
      <FounderInterlude />
      <Services />
      <Contact />
    </main>
  );
}
