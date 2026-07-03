'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ProductImageGalleryProps = {
  images?: ReadonlyArray<string> | null;
  videoUrl?: string | null;
  alt: string;
  className?: string;
};

export function ProductImageGallery({ images, videoUrl, alt, className }: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);
  const all = images ?? [];

  return (
    <div className={cn('relative', className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F9FAFB] rounded-sm border border-[#E5E7EB]">
        {active === all.length && videoUrl ? (
          <div className="absolute inset-0 h-full w-full bg-white overflow-hidden">
            {videoUrl.includes('instagram.com') ? (
              <iframe
                src={(function() {
                  try {
                    const u = new URL(videoUrl);
                    u.search = '';
                    if (!u.pathname.endsWith('/embed') && !u.pathname.endsWith('/embed/')) {
                      u.pathname = u.pathname.replace(/\/$/, '') + '/embed/';
                    }
                    return u.toString();
                  } catch {
                    return videoUrl;
                  }
                })()}
                className="absolute inset-0 h-full w-full border-0"
                scrolling="no"
                allow="encrypted-media"
              />
            ) : (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        ) : all[active] ? (
          <Image
            src={all[active]!}
            alt={`${alt} — image ${active + 1}`}
            fill
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#F9FAFB]">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">No media</p>
          </div>
        )}
      </div>

      {(all.length > 1 || videoUrl) && (
        <div className="mt-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {all.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-colors snap-start',
                i === active ? 'border-black border-2' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
              )}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
          {videoUrl && (
            <button
              onClick={() => setActive(all.length)}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-colors flex items-center justify-center snap-start',
                active === all.length ? 'border-black border-2' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
              )}
            >
              {all[0] ? (
                <>
                  <Image src={all[0]} alt="Video Thumbnail" fill sizes="80px" className="object-cover opacity-40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-[#F9FAFB]/20" />
                  <i className="ri-play-circle-fill text-2xl z-10 text-black drop-shadow-sm"></i>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 bg-white h-full w-full">
                  <i className="ri-play-circle-line text-xl"></i>
                  <span className="text-[9px] uppercase tracking-[0.2em]">Video</span>
                </div>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
