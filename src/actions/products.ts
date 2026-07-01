'use server';

import type { ActionResult } from './shared';
import type { Product } from '@/types';
import { createSupabaseAdminClient, mapProductRecord } from '@/lib/supabase';
import { readAllProductSlugs, readFeaturedProducts, readNewArrivals, readProductBySlug, readProducts, readRelatedProducts } from '@/lib/product-queries';
import { isBuildPhase } from '@/lib/supabase/utils';
import { productSchema } from '@/lib/validators/product';
import { generateSlug } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

const WITH_CATEGORY = '*, categories(id,name,slug)';

export async function getProducts(params?: {
  category?: string;
  search?: string;
  sort?: 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha';
  page?: number;
  limit?: number;
  stock_status?: string;
  is_customizable?: boolean;
}): Promise<{ products: Product[]; total: number }> {
  return readProducts(params);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return readProductBySlug(slug);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return readFeaturedProducts(limit);
}

export async function getNewArrivals(limit = 6): Promise<Product[]> {
  return readNewArrivals(limit);
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  return readRelatedProducts(productId, categoryId, limit);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return readAllProductSlugs();
}

// ── Admin mutations ──────────────────────────────────────────────────────────

export async function createProduct(data: unknown): Promise<ActionResult<{ productId: string }>> {
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const slug = input.slug || generateSlug(input.name);

  const supabase = createSupabaseAdminClient();
  const { data: created, error } = await supabase
    .from('products')
    .insert({
      name: input.name,
      slug,
      price: input.price ?? null,
      category_id: input.categoryId ?? null,
      description: input.description ?? null,
      material: input.material ?? null,
      dimensions: input.dimensions ?? null,
      weight: input.weight ?? null,
      colors: input.colors ?? null,
      stock_status: input.stockStatus ?? 'in_stock',
      images: input.images ?? null,
      video_url: input.videoUrl ?? null,
      sku: input.sku ?? null,
      handmade_time: input.handmadeTime ?? null,
      is_customizable: input.isCustomizable ?? false,
      is_featured: input.isFeatured ?? false,
      is_new: input.isNew ?? false,
      is_bestseller: input.isBestseller ?? false,
      is_published: input.isPublished ?? false,
      meta_title: input.metaTitle ?? null,
      meta_description: input.metaDescription ?? null,
    })
    .select('id')
    .single();

  if (error) return { success: false, error: error.message };
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true, data: { productId: created.id } };
}

export async function updateProduct(id: string, data: unknown): Promise<ActionResult> {
  const parsed = productSchema.partial().safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('products')
    .update({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.categoryId !== undefined && { category_id: input.categoryId }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.material !== undefined && { material: input.material }),
      ...(input.dimensions !== undefined && { dimensions: input.dimensions }),
      ...(input.weight !== undefined && { weight: input.weight }),
      ...(input.colors !== undefined && { colors: input.colors }),
      ...(input.stockStatus !== undefined && { stock_status: input.stockStatus }),
      ...(input.images !== undefined && { images: input.images }),
      ...(input.videoUrl !== undefined && { video_url: input.videoUrl }),
      ...(input.sku !== undefined && { sku: input.sku }),
      ...(input.handmadeTime !== undefined && { handmade_time: input.handmadeTime }),
      ...(input.isCustomizable !== undefined && { is_customizable: input.isCustomizable }),
      ...(input.isFeatured !== undefined && { is_featured: input.isFeatured }),
      ...(input.isNew !== undefined && { is_new: input.isNew }),
      ...(input.isBestseller !== undefined && { is_bestseller: input.isBestseller }),
      ...(input.isPublished !== undefined && { is_published: input.isPublished }),
      ...(input.metaTitle !== undefined && { meta_title: input.metaTitle }),
      ...(input.metaDescription !== undefined && { meta_description: input.metaDescription }),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true };
}

export async function toggleProductPublished(id: string, published: boolean): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('products')
    .update({ is_published: published })
    .eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true };
}

export async function duplicateProduct(id: string): Promise<ActionResult<{ newProductId: string }>> {
  const supabase = createSupabaseAdminClient();
  const { data: original, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !original) return { success: false, error: fetchError?.message ?? 'Product not found' };

  const newSlug = `${original.slug}-copy-${Date.now()}`;
  const { data: created, error } = await supabase
    .from('products')
    .insert({ ...original, id: undefined, slug: newSlug, is_published: false, sku: null })
    .select('id')
    .single();

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true, data: { newProductId: created.id } };
}

export async function getAdminProducts(): Promise<Product[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapProductRecord);
}

export async function getAdminProductById(id: string): Promise<Product | null> {
  if (isBuildPhase()) {
    return null;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('products')
    .select(WITH_CATEGORY)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapProductRecord(data) : null;
}
