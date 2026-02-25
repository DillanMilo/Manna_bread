import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { FeaturedMenu } from '@/components/sections/FeaturedMenu';
import { KeywordCarousel } from '@/components/sections/KeywordCarousel';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Story />
      <FeaturedMenu />
      <KeywordCarousel />
      <Experience />
      <Testimonials />
      <Services />
      <Contact />
    </main>
  );
}
