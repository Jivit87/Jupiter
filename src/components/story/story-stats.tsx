'use client';

import { useEffect, useRef, useState, useCallback } from 'react';


type Stat = {
  value: string;
  label: string;
};

export function StoryStats({ stats }: { stats: readonly Stat[] }) {
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
      // Only auto-scroll on mobile (where clientWidth is less than scrollWidth)
      if (scrollRef.current && scrollRef.current.clientWidth < scrollRef.current.scrollWidth) {
        const nextIndex = (activeIndex + 1) % stats.length;
        scrollToIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, stats.length, scrollToIndex]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-sm bg-black text-white shadow-xl group">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row md:grid md:grid-cols-3 md:divide-x overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="w-full md:w-auto shrink-0 snap-center flex flex-col items-center justify-center gap-2 py-16 px-12 md:p-12 border-r border-white/10 last:border-0 md:border-0">
            <span className="font-display text-5xl text-white">{value}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-gray-400 text-center">{label}</span>
          </div>
        ))}
      </div>
      
      {/* Mobile Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none md:hidden">
        <button 
          onClick={() => scrollToIndex((activeIndex - 1 + stats.length) % stats.length)} 
          className="pointer-events-auto h-12 w-12 rounded-full flex items-center justify-center text-white/50 active:text-white transition-colors"
        >
          <i className="ri-arrow-left-s-line text-3xl"></i>
        </button>
        <button 
          onClick={() => scrollToIndex((activeIndex + 1) % stats.length)} 
          className="pointer-events-auto h-12 w-12 rounded-full flex items-center justify-center text-white/50 active:text-white transition-colors"
        >
          <i className="ri-arrow-right-s-line text-3xl"></i>
        </button>
      </div>
    </div>
  );
}
