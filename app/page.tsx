import { createPageMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner';
import { Story } from '@/components/sections/Story';
import { WelcomeInterlude } from '@/components/sections/WelcomeInterlude';
import { FeaturedMenu } from '@/components/sections/FeaturedMenu';

import { KeywordCarousel } from '@/components/sections/KeywordCarousel';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { FounderInterlude } from '@/components/sections/FounderInterlude';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

const LABOR_DAY_BANNER_ENDS_AT_CENTRAL = '2026-09-08T00:01:00-05:00';

export const metadata = createPageMetadata(
  'Bread from Heaven',
  'Manna Bakery is a handcrafted bakery, café, and gathering place in Tomball, Texas—made for good food, unhurried moments, and community.',
  '/',
);

export default function HomePage() {
  return (
    <main>
      <AnnouncementBanner
        eyebrow="A holiday pause"
        heading="Manna will be closed for Labor Day"
        message="Monday, September 7 · We look forward to gathering with you again Tuesday."
        endsAt={LABOR_DAY_BANNER_ENDS_AT_CENTRAL}
      />
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
