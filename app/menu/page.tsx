import type { Metadata } from 'next';
import { MenuExperience } from '@/components/sections/MenuExperience';
import { StructuredData } from '@/components/seo/StructuredData';
import { menuData } from '@/lib/menuData';
import { createPageMetadata } from '@/lib/seo';
import { createMenuStructuredData } from '@/lib/structuredData';

const menuStructuredData = createMenuStructuredData(menuData);

export const metadata: Metadata = createPageMetadata({
  title: 'Menu | Manna Bakery',
  description:
    'Explore Manna Bakery’s current breakfast, lunch, coffee, tea, and house-made favorites.',
  path: '/menu',
});

export default function MenuPage() {
  return (
    <>
      <StructuredData data={menuStructuredData} />
      <MenuExperience menuData={menuData} source="static" />
    </>
  );
}
