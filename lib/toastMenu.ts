import { menuData, type MenuCategory, type MenuItem, type MenuSection } from '@/lib/menuData';

const DEFAULT_TOAST_API_BASE_URL = 'https://ws-api.toasttab.com';
const TOAST_MENU_REVALIDATE_SECONDS = 300;
const TOAST_ONLINE_ORDERING_VISIBILITY = 'TOAST_ONLINE_ORDERING';

type ToastMenuResponse = {
  menus?: ToastMenu[];
};

type ToastVisibility = string[];

type ToastMenu = {
  name?: string | null;
  visibility?: ToastVisibility | null;
  menuGroups?: ToastMenuGroup[] | null;
};

type ToastMenuGroup = {
  name?: string | null;
  description?: string | null;
  visibility?: ToastVisibility | null;
  menuGroups?: ToastMenuGroup[] | null;
  menuItems?: ToastMenuItem[] | null;
};

type ToastMenuItem = {
  name?: string | null;
  description?: string | null;
  guid?: string | null;
  multiLocationId?: string | null;
  visibility?: ToastVisibility | null;
  price?: number | null;
  pricingStrategy?: string | null;
  modifierGroupReferences?: unknown[] | null;
};

type ToastInventoryItem = {
  guid?: string | null;
  multiLocationId?: string | null;
  status?: 'IN_STOCK' | 'OUT_OF_STOCK' | 'QUANTITY' | string | null;
  quantity?: number | null;
};

type ToastAuthenticationResponse = {
  token?: {
    tokenType?: string;
    accessToken?: string;
  };
  status?: string;
};

export type MenuDataSource = 'toast' | 'static';

export type MenuDataResult = {
  source: MenuDataSource;
  categories: MenuCategory[];
  lastSyncedAt?: string;
};

export async function getMenuData(): Promise<MenuDataResult> {
  if (!hasToastConfig()) {
    return {
      source: 'static',
      categories: menuData,
    };
  }

  try {
    const token = await getToastToken();
    const menus = await getToastMenus(token);
    const inventory = await getToastInventory(token);
    const categories = transformToastMenu(menus, inventory);

    return {
      source: categories.length > 0 ? 'toast' : 'static',
      categories: categories.length > 0 ? categories : menuData,
      lastSyncedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Toast menu sync failed. Falling back to static menu.', error);
    return {
      source: 'static',
      categories: menuData,
    };
  }
}

function hasToastConfig() {
  return Boolean(
    process.env.TOAST_CLIENT_ID &&
      process.env.TOAST_CLIENT_SECRET &&
      process.env.TOAST_RESTAURANT_GUID,
  );
}

async function getToastToken() {
  const response = await fetch(`${toastApiBaseUrl()}/authentication/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: process.env.TOAST_CLIENT_ID,
      clientSecret: process.env.TOAST_CLIENT_SECRET,
      userAccessType: 'TOAST_MACHINE_CLIENT',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Toast authentication failed with status ${response.status}`);
  }

  const data = (await response.json()) as ToastAuthenticationResponse;
  const accessToken = data.token?.accessToken;

  if (!accessToken) {
    throw new Error('Toast authentication response did not include an access token');
  }

  return accessToken;
}

async function getToastMenus(token: string) {
  const response = await fetch(`${toastApiBaseUrl()}/menus/v2/menus`, {
    headers: toastHeaders(token),
    next: { revalidate: TOAST_MENU_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Toast menus request failed with status ${response.status}`);
  }

  return (await response.json()) as ToastMenuResponse;
}

async function getToastInventory(token: string) {
  const response = await fetch(`${toastApiBaseUrl()}/stock/v1/inventory`, {
    headers: toastHeaders(token),
    next: { revalidate: TOAST_MENU_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    console.warn(`Toast inventory request failed with status ${response.status}`);
    return [];
  }

  return parseToastInventoryResponse(await response.json());
}

function toastHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Toast-Restaurant-External-ID': process.env.TOAST_RESTAURANT_GUID ?? '',
  };
}

function toastApiBaseUrl() {
  return (process.env.TOAST_API_BASE_URL ?? DEFAULT_TOAST_API_BASE_URL).replace(/\/$/, '');
}

function transformToastMenu(
  menuResponse: ToastMenuResponse,
  inventoryItems: ToastInventoryItem[],
): MenuCategory[] {
  const inventoryById = new Map<string, ToastInventoryItem>();

  inventoryItems.forEach((item) => {
    if (item.guid) inventoryById.set(item.guid, item);
    if (item.multiLocationId) inventoryById.set(item.multiLocationId, item);
  });

  return (menuResponse.menus ?? [])
    .filter(isVisibleOnline)
    .map((menu) => {
      const sections = flattenMenuGroups(menu.menuGroups ?? [], inventoryById);

      return {
        title: menu.name?.trim() || 'Menu',
        sections,
      };
    })
    .filter((category) => category.sections.length > 0);
}

function flattenMenuGroups(
  groups: ToastMenuGroup[],
  inventoryById: Map<string, ToastInventoryItem>,
): MenuSection[] {
  return groups.filter(isVisibleOnline).flatMap((group) => {
    const directItems = (group.menuItems ?? [])
      .filter(isVisibleOnline)
      .map((item) => transformToastItem(item, inventoryById));
    const currentSection =
      directItems.length > 0
        ? [
            {
              title: group.name?.trim() || 'Items',
              items: directItems,
            },
          ]
        : [];

    return [
      ...currentSection,
      ...flattenMenuGroups(group.menuGroups ?? [], inventoryById),
    ];
  });
}

function transformToastItem(
  item: ToastMenuItem,
  inventoryById: Map<string, ToastInventoryItem>,
): MenuItem {
  const inventory =
    (item.guid ? inventoryById.get(item.guid) : undefined) ??
    (item.multiLocationId ? inventoryById.get(item.multiLocationId) : undefined);

  return {
    name: item.name?.trim() || 'Untitled item',
    description: item.description?.trim() || undefined,
    price: {
      display: formatToastPrice(item),
    },
    isOutOfStock: inventory?.status === 'OUT_OF_STOCK',
  };
}

function formatToastPrice(item: ToastMenuItem) {
  if (typeof item.price !== 'number') {
    return '';
  }

  return `$${item.price.toFixed(2)}`;
}

function isVisibleOnline(entity: { visibility?: ToastVisibility | null }) {
  if (!Array.isArray(entity.visibility)) {
    return true;
  }

  return entity.visibility.includes(TOAST_ONLINE_ORDERING_VISIBILITY);
}

function parseToastInventoryResponse(data: unknown): ToastInventoryItem[] {
  if (Array.isArray(data)) {
    return data as ToastInventoryItem[];
  }

  if (!data || typeof data !== 'object') {
    return [];
  }

  const inventoryResponse = data as {
    inventory?: ToastInventoryItem[];
    items?: ToastInventoryItem[];
  };

  return inventoryResponse.inventory ?? inventoryResponse.items ?? [];
}
