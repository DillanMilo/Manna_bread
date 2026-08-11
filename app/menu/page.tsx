import { MenuExperience } from '@/components/sections/MenuExperience';
import { menuData } from '@/lib/menuData';
import { createPageMetadata } from '@/lib/seo';
import { createMenuStructuredData, serializeStructuredData } from '@/lib/structuredData';

const menuStructuredData = createMenuStructuredData(menuData);

export const metadata = createPageMetadata(
  'Menu',
  'Explore Manna Bakery’s current breakfast, lunch, coffee, tea, and house-made favorites.',
  '/menu',
);

export default function MenuPage() {
  return (
    <>
      <script
        id="manna-menu-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(menuStructuredData) }}
      />
      <MenuExperience menuData={menuData} source="static" />
    </>
  );
}
