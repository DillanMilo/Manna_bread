import { MenuExperience } from '@/components/sections/MenuExperience';
import { getMenuData } from '@/lib/toastMenu';

export const revalidate = 300;

export default async function MenuPage() {
  const { categories, source, lastSyncedAt } = await getMenuData();

  return (
    <MenuExperience
      menuData={categories}
      source={source}
      lastSyncedAt={lastSyncedAt}
    />
  );
}
