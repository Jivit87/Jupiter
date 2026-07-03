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

const SORT_OPTIONS = [
  { value: '', label: 'Newest first' },
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'alpha', label: 'A–Z' },
] as const;

const STOCK_OPTIONS = [
  { value: '', label: 'All Stock' },
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

  const activeCategory = initialParams.category || '';
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
  const activeFilterCount = [activeCategory, activeStock, activeSort, activeCustomizable ? 'true' : ''].filter(Boolean).length;

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="The collection"
        description={`${count} handmade piece${count !== 1 ? 's' : ''} from Nepal`}
      />

      <Section spacing="sm">
        {/* Unified Filter Bar */}
        <div className="border-b border-[#E5E7EB] pb-4 mb-8">
          <div className="flex items-center gap-3 overflow-x-auto snap-x md:flex-wrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563] mr-2 shrink-0">Filters</span>
            
            <select
              value={activeCategory}
              onChange={(e) => setParam('category', e.target.value)}
              className="shrink-0 rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 min-h-[44px] text-[12px] uppercase tracking-[0.1em] text-black focus:outline-none focus:border-black cursor-pointer shadow-sm hover:bg-[#F9FAFB] snap-start"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            <select
              value={activeStock}
              onChange={(e) => setParam('stock_status', e.target.value)}
              className="shrink-0 rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 min-h-[44px] text-[12px] uppercase tracking-[0.1em] text-black focus:outline-none focus:border-black cursor-pointer shadow-sm hover:bg-[#F9FAFB] snap-start"
            >
              {STOCK_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={activeSort}
              onChange={(e) => setParam('sort', e.target.value)}
              className="shrink-0 rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 min-h-[44px] text-[12px] uppercase tracking-[0.1em] text-black focus:outline-none focus:border-black cursor-pointer shadow-sm hover:bg-[#F9FAFB] snap-start"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <label className="shrink-0 flex cursor-pointer items-center gap-2 rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 min-h-[44px] shadow-sm hover:bg-[#F9FAFB] snap-start">
              <span className="text-[12px] uppercase tracking-[0.1em] text-black">Customizable</span>
              <button
                type="button"
                role="switch"
                aria-checked={activeCustomizable}
                onClick={() => setParam('is_customizable', activeCustomizable ? '' : 'true')}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${activeCustomizable ? 'bg-black' : 'bg-gray-200'}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${activeCustomizable ? 'translate-x-4' : ''}`} />
              </button>
            </label>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  startTransition(() => {
                    router.push(pathname);
                  });
                }}
                className="shrink-0 ml-2 min-h-[44px] px-3 flex items-center justify-center text-[11px] uppercase tracking-[0.1em] text-red-500 hover:underline snap-start"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {isPending ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center border border-[#E5E7EB] rounded-sm bg-[#F9FAFB]">
            <p className="font-heading text-3xl text-black">No products found</p>
            <p className="mt-2 text-sm text-[#4B5563]">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCardReal key={product.id} product={product} />
            ))}
          </div>
        )}

        {hasMore && (
          <InfiniteScroll onLoadMore={loadMore} enabled={!loading}>
            {loading && (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
              </div>
            )}
          </InfiniteScroll>
        )}
      </Section>
    </>
  );
}
