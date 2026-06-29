'use server';

import type { ActionResult } from './shared';
import type { Category } from '@/types';
import { createSupabaseServerClient, createSupabaseAdminClient, mapCategoryRecord } from '@/lib/supabase';
import { isBuildPhase } from '@/lib/supabase/utils';
import { categorySchema } from '@/lib/validators/category';
import { revalidatePath } from 'next/cache';

export async function getCategories(): Promise<Category[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return (data ?? []).map(mapCategoryRecord);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isBuildPhase()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw new Error(`Failed to load category: ${error.message}`);
  return data ? mapCategoryRecord(data) : null;
}

export async function getAllCategorySlugs(): Promise<string[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('slug')
    .eq('is_active', true);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.slug);
}

export async function getAdminCategories(): Promise<Category[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapCategoryRecord);
}

export async function createCategory(data: unknown): Promise<ActionResult> {
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('categories').insert({
    name: input.name,
    slug: input.slug,
    description: input.description ?? null,
    image_url: input.imageUrl ?? null,
    sort_order: input.sortOrder ?? 0,
    is_active: input.isActive ?? true,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/collections');
  return { success: true };
}

export async function updateCategory(id: string, data: unknown): Promise<ActionResult> {
  const parsed = categorySchema.partial().safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('categories')
    .update({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.imageUrl !== undefined && { image_url: input.imageUrl }),
      ...(input.sortOrder !== undefined && { sort_order: input.sortOrder }),
      ...(input.isActive !== undefined && { is_active: input.isActive }),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/collections');
  return { success: true };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/collections');
  return { success: true };
}

export async function reorderCategories(orderedIds: string[]): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from('categories').update({ sort_order: index }).eq('id', id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) return { success: false, error: failed.error.message };
  revalidatePath('/');
  revalidatePath('/collections');
  return { success: true };
}
