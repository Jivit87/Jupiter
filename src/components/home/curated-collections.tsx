'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

import type { Product } from '@/types';
import { ProductCardReal } from '@/components/shop/product-card-real';

export function CuratedCollections({ products = [] }: { products?: Product[] }) {
  return (
    <section className="py-10 sm:py-20 px-4 sm:px-12 bg-[#F9FAFB] border-b border-[#E5E7EB]" id="shop">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end max-w-7xl mx-auto mb-6 sm:mb-12 gap-3 sm:gap-4 animate-on-scroll">
        <div>
          <span className="flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase text-[#6B7280] font-semibold">
            Handpicked for You
          </span>
          <h2 className="font-display font-normal text-2xl sm:text-4xl leading-[1.1] mt-3 text-black tracking-tight">
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
        {products.map((p, index) => (
          <div key={p.slug} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProductCardReal product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
