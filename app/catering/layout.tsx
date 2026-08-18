import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Catering in Tomball',
  'Bring Manna Bakery to your next gathering with handcrafted pastries, breakfast, lunch, drinks, and thoughtful catering in Tomball.',
  '/catering',
);

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
