import type { Product } from '@/types';
import { createSupabaseServerClient, mapProductRecord } from '@/lib/supabase';
import { isBuildPhase } from '@/lib/supabase/utils';

const WITH_CATEGORY = '*, categories(id,name,slug)';
type SupabaseClientType = Awaited<ReturnType<typeof createSupabaseServerClient>>;
type ProductQuery = ReturnType<SupabaseClientType['from']>;

export type ProductSortOption = 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha';

export type ProductReadParams = {
  category?: string;
  search?: string;
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  stock_status?: string;
  is_customizable?: boolean;
};

async function resolveCategoryId(categorySlug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to resolve category: ${error.message}`);
  }

  return data?.id ?? null;
}

function applySort(query: ProductQuery, sort?: ProductSortOption) {
  switch (sort) {
    case 'featured':
      return query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
    case 'price_asc':
      return query.order('price', { ascending: true, nullsFirst: false });
    case 'price_desc':
      return query.order('price', { ascending: false, nullsFirst: true });
    case 'alpha':
      return query.order('name', { ascending: true });
    default:
      return query.order('created_at', { ascending: false });
  }
}

export async function readProducts(params?: ProductReadParams): Promise<{ products: Product[]; total: number }> {
  if (isBuildPhase()) {
    return { products: [], total: 0 };
  }

  const supabase = await createSupabaseServerClient();
  const limit = params?.limit ?? 12;
  const page = params?.page ?? 1;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('products')
    .select(WITH_CATEGORY, { count: 'exact' })
    .eq('is_published', true);

  if (params?.category) {
    const categoryId = await resolveCategoryId(params.category);
    if (!categoryId) {
      return { products: [], total: 0 };
    }
    query = query.eq('category_id', categoryId);
  }

  if (params?.search) {
    query = query.textSearch('search_vector', params.search, { type: 'websearch' });
  }

  if (params?.stock_status) {
    query = query.eq('stock_status', params.stock_status);
  }

  if (params?.is_customizable) {
    query = query.eq('is_customizable', true);
  }

  query = applySort(query, params?.sort);

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to load products: ${error.message}`);
  }

  return {
    products: (data ?? []).map(mapProductRecord),
    total: count ?? 0,
  };
}

export async function readProductBySlug(slug: string): Promise<Product | null> {
  if (isBuildPhase()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load product: ${error.message}`);
  }

  return data ? mapProductRecord(data) : null;
}

export async function readFeaturedProducts(limit = 6): Promise<Product[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load featured products: ${error.message}`);
  }

  return (data ?? []).map(mapProductRecord);
}

export async function readNewArrivals(limit = 6): Promise<Product[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .eq('is_published', true)
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load new arrivals: ${error.message}`);
  }

  return (data ?? []).map(mapProductRecord);
}

export async function readRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .neq('id', productId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load related products: ${error.message}`);
  }

  return (data ?? []).map(mapProductRecord);
}

export async function readAllProductSlugs(): Promise<string[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('is_published', true);

  if (error) {
    throw new Error(`Failed to load product slugs: ${error.message}`);
  }

  return (data ?? []).map((record) => record.slug);
}
