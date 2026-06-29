'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { WishlistButton } from './wishlist-button';

export function WishlistNavButton({ className }: { className?: string }) {
  const { count } = useWishlist();
  return <WishlistButton count={count} className={className} />;
}
