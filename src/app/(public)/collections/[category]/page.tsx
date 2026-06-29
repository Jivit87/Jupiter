import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getCategories, getAllCategorySlugs } from '@/actions/categories';
import { ShopClient } from '@/components/shop/shop-client';
import { getCatalogCategories, getCatalogCategoryBySlug } from '@/lib/catalog';
import { readProducts, type ProductSortOption } from '@/lib/product-queries';
import { buildMetadata } from '@/lib/seo';

type CollectionPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs();
    if (slugs.length > 0) return slugs.map((slug) => ({ category: slug }));
  } catch {
    // fall through to static
  }
  return getCatalogCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  const fallback = getCatalogCategoryBySlug(undefined, category);
  const name = cat?.name ?? fallback?.name ?? 'Collection';
  const desc = cat?.description ?? fallback?.description ?? '';
  return buildMetadata({ title: `${name} | Jupiter — Handmade in Nepal`, description: desc, path: `/collections/${category}` });
}

const VALID_SORTS: ProductSortOption[] = ['newest', 'featured', 'price_asc', 'price_desc', 'alpha'];

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { category } = await params;
  const { sort } = await searchParams;

  const sortOption = VALID_SORTS.includes(sort as ProductSortOption) ? (sort as ProductSortOption) : undefined;

  const [{ products, total }, categories] = await Promise.all([
    readProducts({ category, sort: sortOption }).catch(() => ({ products: [], total: 0 })),
    getCategories().catch(() => []),
  ]);
  const catalogCategories = getCatalogCategories(categories);

  const categoryExists =
    catalogCategories.some((c) => c.slug === category);
  if (!categoryExists) notFound();

  return (
    <ShopClient
      initialProducts={products}
      total={total}
      categories={catalogCategories}
      initialParams={{ category, sort }}
    />
  );
}
