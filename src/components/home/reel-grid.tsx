'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ReelItem = {
  shortcode:       string;
  url:             string;
  thumbnailUrl:    string;
  thumbnailWidth:  number;
  thumbnailHeight: number;
  title:           string;
};

type CardLayout = {
  top:    number;
  left:   number;
  w:      number;
  h:      number;
  rotate: number;
  z:      number;
};

const LAYOUTS: CardLayout[] = [
  { top:  60, left:   0, w: 196, h: 280, rotate: 0, z: 2 },
  { top:  10, left: 210, w: 210, h: 310, rotate: 0, z: 3 },
  { top:   0, left: 435, w: 210, h: 420, rotate: 0, z: 4 },
  { top:  10, left: 660, w: 210, h: 310, rotate: 0, z: 3 },
  { top:  60, left: 885, w: 196, h: 280, rotate: 0, z: 2 },
];

function ReelCard({ reel, layout }: { reel: ReelItem; layout: CardLayout }) {
  const [hovered, setHovered] = useState(false);
  const caption = reel.title.split('\n')[0] ?? '';

  return (
    <Link
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch: ${caption}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: layout.top,
        left: layout.left,
        width: layout.w,
        height: layout.h,
        zIndex: hovered ? 10 : layout.z,
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'block',
        backgroundColor: '#000',
        border: '1px solid #E5E7EB',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        boxShadow: hovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Image
        src={reel.thumbnailUrl}
        alt={caption}
        fill
        sizes="(max-width: 768px) 50vw, 300px"
        style={{
          objectFit: 'cover',
          objectPosition: 'center top',
          transition: 'transform 500ms ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 text-white text-[10px] font-bold tracking-widest uppercase rounded-sm">
        <i className="ri-play-line"></i> Reel
      </div>

      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/40 text-white transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-80'}`}>
          <i className="ri-play-fill text-xl ml-1"></i>
        </div>
      </div>

      <div className={`absolute left-0 right-0 bottom-0 z-20 p-4 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
        <p className="text-white text-xs leading-relaxed line-clamp-2 drop-shadow-md mb-2">
          {caption}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-white/80 tracking-widest uppercase font-semibold">
          <i className="ri-instagram-line"></i> Watch
        </div>
      </div>
    </Link>
  );
}

export function ReelGrid({ reels, handle, profileUrl }: { reels: ReelItem[]; handle: string; profileUrl: string }) {
  const slots = LAYOUTS.slice(0, 5);

  return (
    <section className="bg-white py-24 px-6 sm:px-12 border-b border-[#E5E7EB]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-instagram-line text-sm"></i> @{handle}
        </Link>

        <h2 className="font-display text-4xl sm:text-5xl text-black leading-tight tracking-tight mb-4">
          Follow Our Journey
        </h2>
        <p className="text-sm text-[#4B5563]">
          Watch us craft, pack and share joy — one reel at a time.
        </p>
      </div>

      {reels.length > 0 ? (
        <>
          <div className="hidden md:block relative w-[1081px] h-[420px] mx-auto mb-16">
            {slots.map((layout, i) => {
              const reel = reels[i % reels.length];
              return <ReelCard key={`${reel.shortcode}-${i}`} reel={reel} layout={layout} />;
            })}
          </div>

          <div className="md:hidden grid grid-cols-2 gap-4 mb-10 px-2">
            {slots.slice(0, 4).map((layout, i) => {
              const reel = reels[i % reels.length];
              return (
                <Link
                  key={`mobile-${reel.shortcode}-${i}`}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-sm overflow-hidden aspect-[9/16] bg-black border border-[#E5E7EB]"
                >
                  <Image
                    src={reel.thumbnailUrl}
                    alt={reel.title.split('\n')[0] ?? ''}
                    fill
                    sizes="50vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-75">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/40 text-white">
                      <i className="ri-play-fill text-lg ml-0.5"></i>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-sm text-[#6B7280]">
          Visit <Link href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-black border-b border-black">@{handle}</Link> on Instagram.
        </div>
      )}

      <div className="text-center">
        <Link
          href={`${profileUrl}reels/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-black text-black px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-black hover:text-white transition-colors"
        >
          <i className="ri-instagram-line text-sm"></i> See All Reels
        </Link>
      </div>
    </section>
  );
}
