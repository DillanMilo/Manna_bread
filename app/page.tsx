import { createPageMetadata } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { WelcomeInterlude } from '@/components/sections/WelcomeInterlude';
import { FeaturedMenu } from '@/components/sections/FeaturedMenu';

import { KeywordCarousel } from '@/components/sections/KeywordCarousel';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { FounderInterlude } from '@/components/sections/FounderInterlude';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

export const metadata = createPageMetadata(
  'Bread from Heaven',
  'Manna Bakery is a handcrafted bakery, café, and gathering place in Tomball, Texas—made for good food, unhurried moments, and community.',
  '/',
);

export default function HomePage() {
  return (
    <main>
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
