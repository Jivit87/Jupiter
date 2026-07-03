'use client';

import type { Product } from '@/types';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';

type ProductWishlistButtonProps = {
  product: Pick<Product, 'id' | 'name' | 'slug' | 'price' | 'images'>;
  className?: string;
};

export function ProductWishlistButton({ product, className }: ProductWishlistButtonProps) {
  const { items, toggleItem } = useWishlist();
  const isSaved = items.some((item) => item.id === product.id);

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      aria-pressed={isSaved}
      onClick={() =>
        toggleItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          images: product.images,
        })
      }
    >
      {isSaved ? (
        <><i className="ri-heart-fill text-lg -ml-1 text-red-500"></i> Saved</>
      ) : (
        <><i className="ri-heart-line text-lg -ml-1"></i> Save</>
      )}
    </Button>
  );
}
