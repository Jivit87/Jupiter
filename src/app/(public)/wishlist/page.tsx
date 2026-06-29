import type { Metadata } from 'next';
import { WishlistClient } from '@/components/shop/wishlist-client';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Wishlist | Jupiter — Handmade in Nepal',
  description: 'Your saved handmade pieces from Jupiter.',
  path: '/wishlist',
});

export default function WishlistPage() {
  return <WishlistClient />;
}
