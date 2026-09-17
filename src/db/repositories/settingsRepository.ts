import { useLiveQuery } from 'dexie-react-hooks';
import { db, DEFAULT_USER_SETTINGS, DEFAULT_CATEGORIES } from '../schema';
import type { UserSettings, CustomCategory } from '../../types/finance';

/**
 * Fallback tombstone category to safely handle deleted or missing categories
 * without breaking historical expense ledger rendering.
 */
export const FALLBACK_CATEGORY: CustomCategory = {
  id: 'archived',
  nameEn: 'Archived Category',
  nameAr: 'تصنيف سابق',
  iconName: 'Tag',
  isArchived: true
};

/**
 * Direct async retrieval of user settings.
 */
export async function getUserSettings(): Promise<UserSettings> {
  const settings = await db.settings.get('current');
  return settings ?? DEFAULT_USER_SETTINGS;
}

/**
 * Reactive hook subscribing to live user settings.
 */
export function useUserSettings(): UserSettings {
  const settings = useLiveQuery(
    () => db.settings.get('current'),
    [],
    DEFAULT_USER_SETTINGS
  );
  return settings ?? DEFAULT_USER_SETTINGS;
}

/**
 * Updates user settings partially or creates if missing.
 */
export async function updateUserSettings(partial: Partial<UserSettings>): Promise<void> {
  const current = await getUserSettings();
  await db.settings.put({
    ...current,
    ...partial,
    id: 'current'
  });
}

/**
 * Direct async retrieval of all non-archived categories.
 */
export async function getCategories(): Promise<CustomCategory[]> {
  const list = await db.categories.toArray();
  return list.filter((c) => !c.isArchived);
}

/**
 * Reactive hook subscribing to active (non-archived) categories.
 */
export function useCategories(): CustomCategory[] {
  const categories = useLiveQuery(
    () => db.categories.toArray().then((cats) => cats.filter((c) => !c.isArchived)),
    [],
    DEFAULT_CATEGORIES
  );
  return categories ?? DEFAULT_CATEGORIES;
}

/**
 * Adds a new custom category.
 */
export async function addCategory(
  category: Omit<CustomCategory, 'id'> & { id?: string }
): Promise<string> {
  const id =
    category.id ||
    `cat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: CustomCategory = {
    ...category,
    id,
    isCustom: true,
    isArchived: false
  };
  await db.categories.put(record);
  return id;
}

/**
 * Updates an existing category partially.
 */
export async function updateCategory(
  id: string,
  partial: Partial<CustomCategory>
): Promise<void> {
  await db.categories.update(id, partial);
}

/**
 * Soft-deletes / archives a category to preserve historical references.
 */
export async function deleteCategory(id: string): Promise<void> {
  await db.categories.update(id, { isArchived: true });
}

/**
 * Reactive hook returning a map of category id -> CustomCategory.
 * Includes archived categories so historical expenses render cleanly.
 */
export function useCategoryMap(): Record<string, CustomCategory> {
  const allCategories = useLiveQuery(
    () => db.categories.toArray(),
    [],
    DEFAULT_CATEGORIES
  );
  const categories = allCategories ?? DEFAULT_CATEGORIES;
  const map: Record<string, CustomCategory> = {};
  for (const cat of categories) {
    map[cat.id] = cat;
  }
  return map;
}

/**
 * Resolves category from map with graceful fallback for unmapped/historical categories.
 */
export function resolveCategory(
  categoryId: string,
  categoryMap: Record<string, CustomCategory>
): CustomCategory {
  if (categoryMap[categoryId]) {
    return categoryMap[categoryId];
  }
  return {
    ...FALLBACK_CATEGORY,
    id: categoryId,
    nameEn: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    nameAr: categoryId
  };
}
