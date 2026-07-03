'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

function FootItem({ icon, title, text }: {
  icon:  React.ReactNode;
  title: string;
  text:  React.ReactNode;
}) {
  return (
    <div className="w-full md:w-auto shrink-0 snap-center flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-8 sm:p-8 md:border-r border-[#E5E7EB] last:border-0">
      <div className="w-8 h-8 shrink-0 text-black mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-black mb-1 tracking-wide uppercase">
          {title}
        </h4>
        <p className="text-xs text-[#4B5563] leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

export function HowToOrderFeatures() {
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
        const nextIndex = (activeIndex + 1) % 3;
        scrollToIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative border border-[#E5E7EB] rounded-sm group overflow-hidden bg-white">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <FootItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              width="32" height="32">
              <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z"/>
              <path d="M9 12 l2 2 l4 -5"/>
            </svg>
          }
          title="SAFE & SECURE"
          text={<>Your data and conversations<br/>are always protected.</>}
        />
        <FootItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              width="32" height="32">
              <path d="M3 13 c2 3 6 4 8 2 l7 -6 c1 -1 2.6 -0.6 2 1 c-0.4 1 -1.4 2 -2.4 2.8 l-4.6 3.7"/>
              <path d="M13 14 l3 -2.4 c1 -0.8 2.4 -0.3 2 1 c-0.3 1 -1.2 1.8 -2.1 2.4 L11 18.5 c-1.4 1 -3 1 -4.4 -0.1 L3 15.8"/>
              <path d="M8.5 6.5 C7 5 4.5 5.3 4.5 8 c0 2.3 3 4.3 4.5 5.4 C10.5 12.3 13.5 10.3 13.5 8 c0 -2.7 -2.5 -3 -4 -1.5 Z"/>
            </svg>
          }
          title="MADE WITH CARE"
          text={<>Every piece is handmade<br/>with love and attention.</>}
        />
        <FootItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              width="32" height="32">
              <path d="M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z"/>
              <circle cx="12" cy="9.5" r="2.5"/>
            </svg>
          }
          title="DELIVERED TO YOU"
          text={<>Pan-Nepal delivery,<br/>straight to your doorstep.</>}
        />
      </div>

      {/* Mobile Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none md:hidden">
        <button 
          onClick={() => scrollToIndex((activeIndex - 1 + 3) % 3)} 
          className="pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center text-black/30 active:text-black transition-colors"
        >
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </button>
        <button 
          onClick={() => scrollToIndex((activeIndex + 1) % 3)} 
          className="pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center text-black/30 active:text-black transition-colors"
        >
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
