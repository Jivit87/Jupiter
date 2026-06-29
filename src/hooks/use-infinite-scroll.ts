'use client';

import { useEffect, useRef, useState } from 'react';

type UseInfiniteScrollOptions = {
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  onIntersect: () => void | Promise<void>;
};

export function useInfiniteScroll({
  enabled = true,
  rootMargin = '200px',
  threshold = 0,
  onIntersect,
}: UseInfiniteScrollOptions) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) {
          void onIntersect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect, rootMargin, threshold]);

  return {
    ref,
    isIntersecting,
  };
}
