import { MenuExperience } from '@/components/sections/MenuExperience';
import { menuData } from '@/lib/menuData';
import { createPageMetadata } from '@/lib/seo';
import { createMenuStructuredData, serializeStructuredData } from '@/lib/structuredData';

const menuStructuredData = createMenuStructuredData(menuData);

export const metadata = createPageMetadata(
  'Bakery & Cafe Menu in Tomball',
  'Pull up a chair at Manna Bakery in Tomball for breakfast, lunch and coffee: kolaches, Liège waffles, scratch bread sandwiches, soups and bottomless drip.',
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
