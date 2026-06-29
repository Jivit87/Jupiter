'use client';

import { useCallback, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Product } from '@/types';
import type { Category } from '@/types';
import { getProducts } from '@/actions/products';
import { ProductCardReal } from './product-card-real';
import { InfiniteScroll } from './infinite-scroll';
import { ProductCardSkeleton } from './product-card-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Drawer } from '@/components/ui/drawer';

const SORT_OPTIONS = [
  { value: '', label: 'Newest first' },
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'alpha', label: 'A–Z' },
] as const;

const STOCK_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'in_stock', label: 'In stock' },
  { value: 'made_to_order', label: 'Made to order' },
  { value: 'out_of_stock', label: 'Out of stock' },
] as const;

type ShopClientProps = {
  initialProducts: Product[];
  total: number;
  categories: Category[];
  initialParams: {
    category?: string;
    search?: string;
    sort?: string;
    stock_status?: string;
    is_customizable?: string;
  };
};

export function ShopClient({ initialProducts, total, categories, initialParams }: ShopClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState(initialProducts);
  const [count] = useState(total);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCategory = initialParams.category ?? '';
  const activeSort = initialParams.sort ?? '';
  const activeStock = initialParams.stock_status ?? '';
  const activeCustomizable = initialParams.is_customizable === 'true';

  const buildParams = (overrides: Record<string, string>) => {
    const base: Record<string, string> = {
      ...(activeCategory && { category: activeCategory }),
      ...(activeSort && { sort: activeSort }),
      ...(activeStock && { stock_status: activeStock }),
      ...(activeCustomizable && { is_customizable: 'true' }),
    };
    const merged = { ...base, ...overrides };
    const p = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
    return p.toString();
  };

  const setParam = (key: string, value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${buildParams({ [key]: value })}`);
    });
  };

  const loadMore = useCallback(async () => {
    if (loading || products.length >= count) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await getProducts({
        category: activeCategory || undefined,
        sort: activeSort as 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha' | undefined,
        stock_status: activeStock || undefined,
        is_customizable: activeCustomizable || undefined,
        page: nextPage,
      });
      setProducts((prev) => [...prev, ...result.products]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }, [loading, products.length, count, page, activeCategory, activeSort, activeStock, activeCustomizable]);

  const hasMore = products.length < count;
  const activeFilterCount = [activeStock, activeCustomizable].filter(Boolean).length;

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="The collection"
        description={`${count} handmade piece${count !== 1 ? 's' : ''} from Nepal`}
      />

      <Section spacing="sm">
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setParam('category', '')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!activeCategory ? 'bg-primary text-starlight' : 'border border-border bg-background text-text-primary hover:border-primary'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setParam('category', cat.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === cat.slug ? 'bg-primary text-starlight' : 'border border-border bg-background text-text-primary hover:border-primary'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Sort</label>
          <select
            id="sort"
            value={activeSort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className={`ml-auto flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${activeFilterCount > 0 ? 'border-brand bg-brand/10 text-brand' : 'border-border bg-background text-text-primary hover:border-primary'}`}
          >
            Filters{activeFilterCount > 0 && <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] text-white">{activeFilterCount}</span>}
          </button>
        </div>
      </Section>

      <Drawer open={filterOpen} onOpenChange={setFilterOpen} title="Filter products">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Stock status</p>
            <div className="flex flex-wrap gap-2">
              {STOCK_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setParam('stock_status', opt.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeStock === opt.value ? 'bg-primary text-starlight' : 'border border-border bg-background text-text-primary hover:border-primary'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Type</p>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <span className="text-sm font-medium text-primary">Customizable only</span>
              <button
                type="button"
                role="switch"
                aria-checked={activeCustomizable}
                onClick={() => setParam('is_customizable', activeCustomizable ? '' : 'true')}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${activeCustomizable ? 'bg-brand' : 'bg-border'}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${activeCustomizable ? 'translate-x-5' : ''}`} />
              </button>
            </label>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                startTransition(() => {
                  const p = new URLSearchParams();
                  if (activeCategory) p.set('category', activeCategory);
                  if (activeSort) p.set('sort', activeSort);
                  router.push(`${pathname}?${p.toString()}`);
                });
                setFilterOpen(false);
              }}
              className="w-full rounded-xl border border-border py-2 text-sm text-text-muted hover:border-red-300 hover:text-red-500 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </Drawer>

      <Section spacing="md">
        {isPending ? (
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-4 break-inside-avoid"><ProductCardSkeleton /></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-heading text-3xl text-primary">No products found</p>
            <p className="mt-2 text-sm text-text-muted">Try a different category or remove filters.</p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {products.map((product) => (
              <div key={product.id} className="mb-4 break-inside-avoid">
                <ProductCardReal product={product} />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <InfiniteScroll onLoadMore={loadMore} enabled={!loading}>
            {loading && (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            )}
          </InfiniteScroll>
        )}
      </Section>
    </>
  );
}
