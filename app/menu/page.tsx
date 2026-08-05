import { MenuExperience } from '@/components/sections/MenuExperience';
import { menuData } from '@/lib/menuData';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Menu',
  'Explore Manna Bakery’s current breakfast, lunch, coffee, tea, and house-made favorites.',
  '/menu',
);

export default function MenuPage() {
  return <MenuExperience menuData={menuData} source="static" />;
}
