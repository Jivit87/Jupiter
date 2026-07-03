import type { MetadataRoute } from 'next';
import { routeConstants } from '@/lib/route-constants';
import { getAllCategorySlugs } from '@/actions/categories';
import { getAllProductSlugs } from '@/actions/products';
import { getCatalogCategories } from '@/lib/catalog';

const staticRoutes = [
  routeConstants.home,
  routeConstants.shop,
  routeConstants.custom,
  routeConstants.story,
  routeConstants.craft,
  routeConstants.reviews,
  routeConstants.careGuide,
  routeConstants.faq,
  routeConstants.giftGuide,
  routeConstants.madeInNepal,
  routeConstants.contact,
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jupiterhandmade.com';

  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs().catch(() => [] as string[]),
    getAllCategorySlugs().catch(() => [] as string[]),
  ]);
  const catalogCategorySlugs = categorySlugs.length > 0 ? categorySlugs : getCatalogCategories().map((category) => category.slug);

  const staticEntries = staticRoutes.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    changeFrequency: (path === '/' ? 'daily' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: path === '/' ? 1 : 0.7,
  }));

  const collectionEntries = catalogCategorySlugs.map((slug) => ({
    url: new URL(`/collections/${slug}`, baseUrl).toString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productEntries = productSlugs.map((slug) => ({
    url: new URL(`/shop/${slug}`, baseUrl).toString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
