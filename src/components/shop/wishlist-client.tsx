'use client';

import Link from 'next/link';
import { useWishlist } from '@/hooks/use-wishlist';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ProductCardReal } from '@/components/shop/product-card-real';
import type { Product } from '@/types';

export function WishlistClient() {
  const { items, isEmpty, ready } = useWishlist();

  return (
    <>
      <PageHeader
        eyebrow="Wishlist"
        title="Saved pieces"
        description={ready ? (isEmpty ? 'Your wishlist is empty.' : `${items.length} saved piece${items.length !== 1 ? 's' : ''}`) : ''}
      />
      <Section spacing="md">
        {!ready ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-sm bg-[#F9FAFB] border border-[#E5E7EB]" />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="py-20 text-center">
            <p className="font-heading text-[clamp(1.75rem,3vw+1rem,2.25rem)] text-black">Nothing saved yet</p>
            <p className="mt-2 text-sm text-text-muted">Tap the heart on any product to save it here.</p>
            <div className="mt-6">
              <Button asChild variant="primary" className="w-full sm:w-auto min-h-[44px]">
                <Link href="/shop">Browse the shop</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <ProductCardReal key={item.id} product={item as unknown as Product} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
