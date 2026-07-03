'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Review } from '@/types';

const FALLBACK_REVIEWS = [
  {
    stars: 5,
    quote: 'The spiral pendant is even more beautiful in person. You can feel the care that went into making it.',
    name: 'Sanjana Bhatt',
    loc: 'Kathmandu',
    initials: 'SB',
    image: 'https://unavatar.io/instagram/s__anjanabhatt',
    link: 'https://www.instagram.com/s__anjanabhatt/?hl=en'
  },
  {
    stars: 5,
    quote: 'Ordered a custom gift for my sister — the WhatsApp process was so easy and personal. Will order again.',
    name: 'Bimmaya',
    loc: 'Pokhara',
    initials: 'B',
    image: 'https://unavatar.io/instagram/binidimdung',
    link: 'https://www.instagram.com/binidimdung/?hl=en'
  },
  {
    stars: 5,
    quote: 'My moon lamp glows exactly like the photos. Genuinely feels like a piece of art, not just a product.',
    name: 'Jivit Rana',
    loc: 'Lalitpur',
    initials: 'JR',
    image: 'https://unavatar.io/instagram/jivitrana',
    link: 'https://www.instagram.com/jivitrana/?hl=en'
  },
] as const;

export function WallOfLove({ reviews = [] }: { reviews?: Review[] }) {
  const displayData = reviews.length > 0 ? reviews.map(r => ({
    stars: r.rating || 5,
    quote: r.reviewText,
    name: r.reviewerName,
    loc: r.location || 'Verified Customer',
    initials: r.reviewerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
    image: r.reviewerImage || '',
    link: r.instagramUrl || '#'
  })) : FALLBACK_REVIEWS;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && scrollRef.current.clientWidth < scrollRef.current.scrollWidth) {
        const nextIndex = (activeIndex + 1) % displayData.length;
        scrollToIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex, displayData.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-0 md:px-12 bg-[#F9FAFB] border-b border-[#E5E7EB]">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 px-6 md:px-0">
        <span className="inline-block text-[11px] font-semibold tracking-widest text-[#6B7280] uppercase mb-4">
          Wall of Love
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-black leading-tight tracking-tight">
          {"What They're Saying"}
        </h2>
      </div>

      <div className="relative group max-w-7xl mx-auto">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-3 md:gap-8 snap-x snap-mandatory pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayData.map((r, idx) => (
            <div
              key={`${r.name}-${idx}`}
              className="w-full shrink-0 snap-center px-6 md:px-0 md:w-auto h-full flex"
            >
              <div className="w-full bg-white border border-[#E5E7EB] border-t-4 border-t-amber-400 rounded-sm p-8 hover:border-amber-400 transition-all duration-300 relative flex flex-col shadow-sm hover:shadow-md h-full">
                <div
                  className="absolute top-4 right-6 font-display text-7xl text-amber-50 select-none pointer-events-none group-hover:text-amber-100 transition-colors"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-amber-400 text-sm drop-shadow-sm"></i>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-[#4B5563] mb-8 relative z-10 flex-grow">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="block shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E5E7EB] bg-[#F9FAFB]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        e.currentTarget.nextElementSibling?.classList.add('flex');
                      }}
                    />
                    <div
                      className="w-12 h-12 rounded-full hidden items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] text-black text-xs font-bold tracking-wider"
                      aria-hidden="true"
                    >
                      {r.initials}
                    </div>
                  </a>
                  <div>
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black leading-snug hover:underline decoration-black/20 underline-offset-4">
                      {r.name}
                    </a>
                    <div className="text-xs text-[#6B7280] mt-0.5">{r.loc}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-2 pointer-events-none md:hidden z-20">
          <button 
            onClick={() => scrollToIndex((activeIndex - 1 + displayData.length) % displayData.length)} 
            className="pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center bg-white/80 shadow-sm border border-[#E5E7EB] text-black/50 active:text-black transition-colors"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>
          <button 
            onClick={() => scrollToIndex((activeIndex + 1) % displayData.length)} 
            className="pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center bg-white/80 shadow-sm border border-[#E5E7EB] text-black/50 active:text-black transition-colors"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>
        </div>
      </div>

    </section>
  );
}
