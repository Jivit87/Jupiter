'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '@/hooks/use-search';
import { getProducts } from '@/actions/products';
import type { Product } from '@/types';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';

type SearchOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const { debouncedValue, bind } = useSearch({ delay: 400 });
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    getProducts({ search: debouncedValue, limit: 6 })
      .then(({ products }) => setResults(products))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedValue]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} title="Search products">
      <div className="space-y-4">
        <Input
          autoFocus
          placeholder="Search by name, material, or category…"
          className="rounded-sm border border-[#E5E7EB] bg-white focus-visible:border-black focus-visible:ring-0 text-black px-4 py-3"
          {...bind}
        />

        {loading && (
          <p className="text-center text-sm text-text-muted">Searching…</p>
        )}

        {!loading && debouncedValue && results.length === 0 && (
          <p className="text-center text-sm text-text-muted">
            No results for &ldquo;{debouncedValue}&rdquo;
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-2">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/shop/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 rounded-sm border border-[#E5E7EB] bg-white p-3 hover:border-black transition-colors"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-[#F9FAFB] border border-[#E5E7EB]">
                    {product.images?.[0] && (
                      <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-black text-sm">{product.name}</p>
                    <p className="text-xs text-text-muted">
                      {product.category?.name ?? 'Handmade'} ·{' '}
                      {typeof product.price === 'number' ? formatPrice(product.price) : 'Price on request'}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!debouncedValue && (
          <p className="text-center text-sm text-text-muted">
            Type to search the collection…
          </p>
        )}
      </div>
    </Drawer>
  );
}
