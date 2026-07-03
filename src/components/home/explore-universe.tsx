'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

const CATEGORIES = [
  { name: 'Wire Jewelry', slug: 'wire-jewelry', image: '/products/img7.jpg' },
  { name: 'Home Decor', slug: 'home-decor', image: '/products/img10.jpg' },
  { name: 'Mandala Art', slug: 'mandala-art', image: '/products/img8.jpg' },
  { name: 'Custom Gifts', slug: 'custom-gifts', image: '/products/img9.jpg' },
  { name: 'Keychains', slug: 'keychains', image: '/products/img11.jpg' },
  { name: 'Wire Rings', slug: 'rings', image: '/products/img1.jpg' },
  { name: 'Dried Bouquets', slug: 'dried-bouquets', image: '/products/img5.jpg' },
  { name: 'Moon Lamps', slug: 'moon-lamps', image: '/products/img21.png' },
] as const;

export function ExploreUniverse() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-[#E5E7EB]" id="collections">
      <div className="text-center px-4 sm:px-6 mb-8 animate-on-scroll">
        <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#6B7280]">
          Shop by Collection
        </span>
        <h2 className="font-display text-3xl sm:text-4xl mt-3 text-black leading-tight tracking-tight">
          Find What Speaks to You
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-12 mb-8 sm:mb-12 animate-on-scroll">
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/products/img1.jpg"
            alt="Handcrafted wire rings — find what speaks to you"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-[75%_center] sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 text-white">
            <p className="text-sm font-medium tracking-wide opacity-90">Gracefully Handmade</p>
            <p className="text-lg sm:text-xl font-display mt-1">Every piece tells a story</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 animate-on-scroll">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-8 z-10 w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-black shadow-sm transition-all duration-200 hover:border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <i className="ri-arrow-left-line"></i>
        </button>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-6 sm:px-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-4 flex-shrink-0 group snap-start animate-on-scroll"
              style={{ animationDelay: `${0.1 + (i * 0.1)}s` }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-100 bg-amber-50/50 transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400 group-hover:shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="128px"
                  className="object-cover object-center transition-transform duration-500"
                />
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-black mb-1">{cat.name}</div>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-[#6B7280] group-hover:text-amber-700 transition-colors flex items-center justify-center gap-1">
                  Explore <i className="ri-arrow-right-s-line"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-8 z-10 w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-black shadow-sm transition-all duration-200 hover:border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </section>
  );
}
