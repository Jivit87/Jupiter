import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ScrollMarqueeProps = {
  children: ReactNode;
  className?: string;
  speedClassName?: string;
};

export function ScrollMarquee({ children, className, speedClassName }: ScrollMarqueeProps) {
  return (
    <div className={cn('overflow-hidden', className)} aria-label="Scrolling marquee">
      <div className={cn('flex w-max items-center gap-10 whitespace-nowrap', speedClassName, 'animate-marquee')}>
        <div className="flex items-center gap-10 pr-10">{children}</div>
        <div aria-hidden className="flex items-center gap-10 pr-10">
          {children}
        </div>
      </div>
    </div>
  );
}
