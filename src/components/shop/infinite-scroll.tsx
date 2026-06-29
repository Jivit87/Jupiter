'use client';

import type { ReactNode } from 'react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

type InfiniteScrollProps = {
  onLoadMore: () => void | Promise<void>;
  enabled?: boolean;
  children?: ReactNode;
};

export function InfiniteScroll({ onLoadMore, enabled = true, children }: InfiniteScrollProps) {
  const { ref } = useInfiniteScroll({
    enabled,
    onIntersect: onLoadMore,
  });

  return (
    <div ref={ref}>
      {children ?? (
        <div className="py-6 text-center text-sm text-text-muted">Load-more sentinel shell</div>
      )}
    </div>
  );
}
