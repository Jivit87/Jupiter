'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/use-wishlist';

type ProductCardRealProps = {
  product: Product;
};

export function ProductCardReal({ product }: ProductCardRealProps) {
  const firstImage = product.images?.[0];

  const price = typeof product.price === 'number' ? formatPrice(product.price) : null;

  const { items, toggleItem } = useWishlist();
  const wishlisted = items.some((item) => item.id === product.id);

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price ?? 0,
      images: product.images ?? [],
    });
  }

  return (
    <Link href={`/shop/${product.slug}`} className="block relative group bg-white border border-[#E5E7EB] rounded-sm p-3 transition-colors hover:border-black flex flex-col h-full">
      <div className="relative rounded-sm overflow-hidden aspect-[4/5] mb-4 border border-[#E5E7EB]">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#F9FAFB]" />
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-all duration-300 pointer-events-none" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 pointer-events-none z-10">
          {product.isNew && <Badge tone="amber">New</Badge>}
          {product.isBestseller && <Badge tone="black">Bestseller</Badge>}
          {product.stockStatus === 'out_of_stock' && <Badge tone="gray">Sold out</Badge>}
          {product.stockStatus === 'made_to_order' && <Badge tone="outline">Made to order</Badge>}
        </div>
        
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-black z-20 cursor-pointer transition-all duration-200 hover:border-black hover:scale-110 shadow-sm"
        >
          <i className={wishlisted ? "ri-heart-fill text-red-500 text-base" : "ri-heart-line text-base hover:text-red-500"}></i>
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <div className="text-[10px] text-[#4B5563] tracking-[0.06em] mb-1.5 uppercase font-body">
          {product.category?.name ?? 'Handmade'}
        </div>
        
        <h3 className="text-sm font-medium font-body mb-2 text-black leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto text-sm text-[#4B5563] font-body flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E7EB]">
          <span className="font-medium text-black">{price ?? 'Price on request'}</span>
          {product.isCustomizable ? <Badge tone="outline">Customizable</Badge> : null}
        </div>
      </div>
    </Link>
  );
}
