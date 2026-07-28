import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Our Story | Manna Bakery',
  description:
    'The story of Christin, the family and faith behind Manna Bakery, and the daily grace that shaped a gathering place in Tomball.',
  path: '/our-story',
});

export default function OurStoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
