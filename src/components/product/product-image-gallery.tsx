'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
    <Card className={cn('overflow-hidden', className)}>
      <div className="relative aspect-square overflow-hidden bg-earthy-cosmos">
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
          <div className="absolute inset-0 grid place-items-center bg-earthy-cosmos">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">No image</p>
          </div>
        )}
      </div>

      {(all.length > 1 || videoUrl) && (
        <div className="flex gap-2 overflow-x-auto border-t border-border bg-background p-3">
          {all.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border transition-colors',
                i === active ? 'border-brand' : 'border-border hover:border-text-muted'
              )}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
          {videoUrl && (
            <span className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-brand/10 text-[10px] uppercase tracking-[0.2em] text-brand">
              Video
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
