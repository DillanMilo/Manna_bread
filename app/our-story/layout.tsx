import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Our Story',
  'The story of Christin, the family and faith behind Manna Bakery, and the daily grace that shaped a gathering place in Tomball.',
  '/our-story',
);

export default function OurStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
