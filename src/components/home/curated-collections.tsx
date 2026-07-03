'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export function CuratedCollections({ products = [] }: { products?: Product[] }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-12 bg-[#F9FAFB] border-b border-[#E5E7EB]" id="shop">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end max-w-7xl mx-auto mb-8 sm:mb-12 gap-4 animate-on-scroll">
        <div>
          <span className="flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase text-[#6B7280] font-semibold">
            Handpicked for You
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl leading-[1.1] mt-3 text-black tracking-tight">
            Featured Creations
          </h2>
        </div>
        <Link
          href={siteConfig.links.shop}
          className="text-xs font-semibold tracking-widest uppercase text-black flex items-center gap-2 pb-1 border-b border-black hover:text-[#6B7280] hover:border-[#6B7280] transition-colors duration-200"
        >
          View All Products <i className="ri-arrow-right-line text-sm"></i>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {products.map((p, index) => {
          const firstImage = p.images?.[0] || '/products/img1.jpg';
          const priceStr = typeof p.price === 'number' ? formatPrice(p.price) : 'Price on Request';
          const categoryName = p.category?.name ?? 'Uncategorized';

          return (
            <div key={p.slug} className="relative group cursor-pointer animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-white border border-[#E5E7EB] rounded-sm group-hover:border-black transition-colors duration-300">
                <Image
                  src={firstImage}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1160px) 20vw, 220px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <button
                  className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] z-10 transition-all duration-200 hover:bg-black hover:border-black hover:text-white"
                  aria-label={`Add ${p.name} to wishlist`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="ri-heart-3-line text-sm"></i>
                </button>
              </div>

              <div className="text-[10px] text-[#6B7280] tracking-wider mb-1 uppercase font-semibold">{categoryName}</div>
              <h3 className="text-sm font-medium mb-1 text-black leading-tight truncate">{p.name}</h3>
              <div className="text-sm text-[#4B5563]">{priceStr}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
