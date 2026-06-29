'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toggleWishlistItem, isWishlisted } from '@/lib/wishlist';

type ProductCardRealProps = {
  product: Product;
};

export function ProductCardReal({ product }: ProductCardRealProps) {
  const firstImage = product.images?.[0];
  const secondImage = product.images?.[1];
  const price =
    typeof product.price === 'number' ? formatPrice(product.price) : null;

  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.id));
  }, [product.id]);

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlistItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: product.images,
    });
    setWishlisted((prev) => !prev);
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:ring-brand/40 hover:shadow-card"
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-earthy-cosmos">
        {firstImage ? (
          <>
            <Image
              src={firstImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 group-hover:scale-[1.04] ${secondImage ? 'group-hover:opacity-0' : ''}`}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8d8c4] to-[#f0e8d8]" />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isNew && <Badge tone="brand">New</Badge>}
          {product.isBestseller && <Badge tone="copper">Bestseller</Badge>}
          {product.stockStatus === 'out_of_stock' && <Badge tone="outline">Sold out</Badge>}
          {product.stockStatus === 'made_to_order' && <Badge tone="sage">Made to order</Badge>}
        </div>

        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
            wishlisted
              ? 'bg-brand text-starlight'
              : 'bg-starlight/80 text-text-muted opacity-0 group-hover:opacity-100 hover:bg-starlight hover:text-brand'
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card info */}
      <div className="space-y-1.5 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          {product.category?.name ?? 'Handmade'}
        </p>
        <h3 className="font-heading text-lg leading-snug text-primary line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-brand">
          {price ?? <span className="font-normal text-text-muted">Price on request</span>}
        </p>
      </div>
    </Link>
  );
}
