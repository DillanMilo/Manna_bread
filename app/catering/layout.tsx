import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Catering | Manna Bakery',
  description:
    'Bring Manna Bakery to your next gathering with handcrafted pastries, breakfast, lunch, drinks, and thoughtful catering in Tomball.',
  path: '/catering',
});

export default function CateringLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
