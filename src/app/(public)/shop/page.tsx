import type { Metadata } from 'next';
import { getCategories } from '@/actions/categories';
import { ShopClient } from '@/components/shop/shop-client';
import { buildMetadata } from '@/lib/seo';
import { getCatalogCategories } from '@/lib/catalog';
import { readProducts, type ProductSortOption } from '@/lib/product-queries';

export const metadata: Metadata = buildMetadata({
  title: 'Shop | Jupiter — Handmade in Nepal',
  description: "Browse Jupiter's full collection of handmade jewelry, art, lamps, and gifts made in Nepal.",
  path: '/shop',
});

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    stock_status?: string;
    is_customizable?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const [{ products, total }, categories] = await Promise.all([
    readProducts({
      category: params.category,
      search: params.search,
      sort: params.sort as ProductSortOption | undefined,
      stock_status: params.stock_status,
      is_customizable: params.is_customizable === 'true',
    }).catch(() => ({ products: [], total: 0 })),
    getCategories().catch(() => []),
  ]);
  const catalogCategories = getCatalogCategories(categories);

  return (
    <ShopClient
      initialProducts={products}
      total={total}
      categories={catalogCategories}
      initialParams={params}
    />
  );
}
