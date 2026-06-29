import type { Category } from '@/types';
import { categories as staticCategories } from '@/config/categories';

type CatalogCategory = Category & {
  emoji: string;
};

export function getCatalogCategories(categories?: Category[] | null): CatalogCategory[] {
  const liveCategories = categories ?? [];
  const liveBySlug = new Map(liveCategories.map((category) => [category.slug, category]));
  const seen = new Set<string>();

  const merged = staticCategories.map((entry, index) => {
    const live = liveBySlug.get(entry.slug);
    seen.add(entry.slug);

    return {
      id: live?.id ?? entry.slug,
      name: live?.name ?? entry.name,
      slug: entry.slug,
      description: live?.description ?? entry.description,
      imageUrl: live?.imageUrl ?? null,
      sortOrder: live?.sortOrder ?? index,
      isActive: live?.isActive ?? true,
      createdAt: live?.createdAt,
      updatedAt: live?.updatedAt,
      emoji: entry.emoji,
    };
  });

  const extras = liveCategories
    .filter((category) => !seen.has(category.slug))
    .map((category) => ({
      ...category,
      emoji: '🌿',
    }));

  return [...merged, ...extras];
}

export function getCatalogCategoryBySlug(categories: Category[] | null | undefined, slug: string): CatalogCategory | null {
  return getCatalogCategories(categories).find((category) => category.slug === slug) ?? null;
}
