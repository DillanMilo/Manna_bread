import type { Metadata } from 'next';
import { MenuExperience } from '@/components/sections/MenuExperience';
import { menuData } from '@/lib/menuData';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Menu | Manna Bakery',
  description:
    'Explore Manna Bakery’s current breakfast, lunch, coffee, tea, and house-made favorites.',
  path: '/menu',
});

export default function MenuPage() {
  return <MenuExperience menuData={menuData} source="static" />;
}
