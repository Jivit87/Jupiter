'use client';

import { useEffect, useState } from 'react';
import type { WishlistItem } from '@/lib/wishlist';
import {
  WISHLIST_STORAGE_KEY,
  addWishlistItem,
  readWishlist,
  removeWishlistItem,
  toggleWishlistItem,
} from '@/lib/wishlist';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readWishlist());
    setReady(true);

    const handleUpdate = () => {
      setItems(readWishlist());
    };

    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  function sync(nextItems: WishlistItem[]) {
    setItems(nextItems);
  }

  function addItem(item: WishlistItem) {
    sync(addWishlistItem(item));
  }

  function removeItem(id: string) {
    sync(removeWishlistItem(id));
  }

  function toggleItem(item: WishlistItem) {
    sync(toggleWishlistItem(item));
  }

  function clear() {
    sync([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
  }

  return {
    items,
    count: items.length,
    ready,
    addItem,
    removeItem,
    toggleItem,
    clear,
    isEmpty: items.length === 0,
  };
}
