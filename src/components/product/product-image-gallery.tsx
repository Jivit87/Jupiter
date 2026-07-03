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
        {all[active] ? (
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
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">No image</p>
          </div>
        )}
      </div>

      {(all.length > 1 || videoUrl) && (
        <div className="mt-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {all.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-colors',
                i === active ? 'border-black border-2' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
              )}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
          {videoUrl && (
            <span className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-sm border border-[#E5E7EB] bg-white text-[10px] uppercase tracking-[0.2em] text-black">
              Video
            </span>
          )}
        </div>
      )}
    </div>
  );
}
