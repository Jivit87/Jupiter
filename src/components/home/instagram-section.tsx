'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function InstagramSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[360px] md:min-h-[540px] border-b border-[#E5E7EB]" id="story">
      {/* Left side text */}
      <div className="bg-black text-white px-5 sm:px-16 py-10 sm:py-20 flex flex-col justify-center relative overflow-hidden">
        
        <span className="inline-block text-[11px] font-semibold tracking-widest text-[#9CA3AF] uppercase mb-3 sm:mb-6">
          Our Story
        </span>

        <h2 className="text-3xl sm:text-5xl leading-tight font-display text-white mb-3 sm:mb-6 tracking-tight">
          Crafted with Purpose.<br />
          Inspired by <span className="italic text-[#9CA3AF]">Everything.</span>
        </h2>

        <p className="text-sm leading-relaxed text-[#D1D5DB] max-w-md mb-6 sm:mb-10">
          Every piece from Jupiter is a reflection of our journey, our roots, and our deep connection with the universe and nature. Thank you for being part of our story.
        </p>

        <Link
          href="/our-story"
          className="w-fit flex items-center justify-center gap-2 pb-1 border-b border-white text-xs font-semibold tracking-widest uppercase hover:text-[#9CA3AF] hover:border-[#9CA3AF] transition-colors"
        >
          Discover Our Story <i className="ri-arrow-right-line text-sm"></i>
        </Link>

        <div className="mt-8 sm:mt-16 flex items-center gap-3">
          <i className="ri-heart-2-fill text-[#9CA3AF]"></i>
          <span className="font-sans text-sm text-[#9CA3AF] font-medium tracking-wide">With love, Jupiter Team</span>
        </div>
      </div>

      {/* Right side video frame */}
      <div className="relative overflow-hidden flex items-center justify-center w-full aspect-video md:aspect-auto bg-[#F9FAFB] md:h-full">
        {!isPlaying ? (
          <>
            <Image 
              src="/story/12.jpg"
              alt="Jupiter story video poster"
              fill
              className="object-cover scale-100 sm:scale-125"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md bg-black/40 group-hover:bg-black/60 transition-colors">
                <i className="ri-play-fill text-white text-2xl ml-1"></i>
              </div>
            </div>
          </>
        ) : (
          <iframe
            src="https://drive.google.com/file/d/1mGn1uFM8kvkO_Q3LJiaZB--hsJGxR1OY/preview?autoplay=1"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
            title="Our Story — Jupiter"
          />
        )}
      </div>
    </section>
  );
}
