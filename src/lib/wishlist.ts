import type { ProductSummary } from '@/types';

export const WISHLIST_STORAGE_KEY = 'jupiter:wishlist';

export type WishlistItem = Pick<ProductSummary, 'id' | 'name' | 'slug' | 'price' | 'images'>;

function getStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function parseWishlist(raw: string | null): WishlistItem[] {
  if (!raw) {
    return [];
  }

  try {
    const value = JSON.parse(raw) as unknown;

    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((item): item is WishlistItem => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      const candidate = item as Partial<WishlistItem>;

      return (
        typeof candidate.id === 'string' &&
        typeof candidate.name === 'string' &&
        typeof candidate.slug === 'string' &&
        (candidate.price === null || typeof candidate.price === 'number' || candidate.price === undefined)
      );
    });
  } catch {
    return [];
  }
}

export function readWishlist(): WishlistItem[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  return parseWishlist(storage.getItem(WISHLIST_STORAGE_KEY));
}

export function writeWishlist(items: WishlistItem[]) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wishlist-updated'));
  }
}

export function addWishlistItem(item: WishlistItem): WishlistItem[] {
  const current = readWishlist();
  const exists = current.some((entry) => entry.id === item.id);
  const next = exists ? current : [item, ...current];

  writeWishlist(next);
  return next;
}

export function removeWishlistItem(id: string): WishlistItem[] {
  const next = readWishlist().filter((item) => item.id !== id);
  writeWishlist(next);
  return next;
}

export function toggleWishlistItem(item: WishlistItem): WishlistItem[] {
  const current = readWishlist();
  const exists = current.some((entry) => entry.id === item.id);
  const next = exists ? current.filter((entry) => entry.id !== item.id) : [item, ...current];

  writeWishlist(next);
  return next;
}

export function isWishlisted(id: string): boolean {
  return readWishlist().some((item) => item.id === id);
}
