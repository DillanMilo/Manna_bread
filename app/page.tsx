import type { Metadata } from 'next';
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
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Bread from Heaven | Manna Bakery',
  description:
    'Manna Bakery is a handcrafted bakery, cafe, and gathering place in Tomball, Texas—made for good food, unhurried moments, and community.',
  path: '/',
});

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
