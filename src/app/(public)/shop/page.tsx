import type { Metadata } from 'next';
import { getProducts, getAllProductSlugs } from '@/actions/products';
import { getCategories } from '@/actions/categories';
import { getCatalogCategories } from '@/lib/catalog';
import { ShopClient } from '@/components/shop/shop-client';
import { buildMetadata } from '@/lib/seo';
import { isBuildPhase } from '@/lib/supabase/utils';
import type { Product, Category } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'Shop | Jupiter — Handmade in Nepal',
  description: 'Browse our complete collection of handmade jewelry, art, and gifts from Nepal.',
  path: '/shop',
});

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string; search?: string; page?: string; stock_status?: string; is_customizable?: string }> }) {
  const search = await searchParams;

  let products: Product[] = [];
  let total = 0;
  let categories: Category[] = [];

  if (!isBuildPhase()) {
    const [{ products: prods, total: tot }, cats] = await Promise.all([
      getProducts({
        category: search.category || undefined,
        sort: search.sort as 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha' | undefined,
        search: search.search,
        page: parseInt(search.page ?? '1', 10),
        limit: 16,
        stock_status: search.stock_status,
        is_customizable: search.is_customizable === 'true',
      }),
      getCategories().catch(() => []),
    ]);
    products = prods;
    total = tot;
    categories = cats;
  }

  const catalogCategories = getCatalogCategories(categories);

  return (
    <ShopClient
      initialProducts={products}
      total={total}
      categories={catalogCategories}
      initialParams={{
        category: search.category,
        sort: search.sort as 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha' | undefined,
        stock_status: search.stock_status,
        is_customizable: search.is_customizable,
      }}
    />
  );
}