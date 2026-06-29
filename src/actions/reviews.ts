'use server';

import type { ActionResult } from './shared';
import type { Review } from '@/types';
import { createSupabaseServerClient, createSupabaseAdminClient, mapReviewRecord } from '@/lib/supabase';
import { isBuildPhase } from '@/lib/supabase/utils';
import { reviewSchema } from '@/lib/validators/review';
import { revalidatePath } from 'next/cache';

export async function getAllReviews(): Promise<Review[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('review_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to load reviews: ${error.message}`);
  return (data ?? []).map(mapReviewRecord);
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_featured', true)
    .order('review_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to load featured reviews: ${error.message}`);
  return (data ?? []).map(mapReviewRecord);
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('review_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to load product reviews: ${error.message}`);
  return (data ?? []).map(mapReviewRecord);
}

export async function getAdminReviewById(id: string): Promise<Review | null> {
  if (isBuildPhase()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`Failed to load review: ${error.message}`);
  return data ? mapReviewRecord(data) : null;
}

export async function createReview(data: unknown): Promise<ActionResult> {
  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('reviews').insert({
    reviewer_name: input.reviewerName,
    review_text: input.reviewText,
    rating: input.rating ?? null,
    product_id: input.productId ?? null,
    reviewer_image: input.reviewerImage ?? null,
    review_image: input.reviewImage ?? null,
    platform: input.platform ?? 'whatsapp',
    is_featured: input.isFeatured ?? false,
    review_date: input.reviewDate ?? null,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}

export async function updateReview(id: string, data: unknown): Promise<ActionResult> {
  const parsed = reviewSchema.partial().safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const input = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('reviews')
    .update({
      ...(input.reviewerName !== undefined && { reviewer_name: input.reviewerName }),
      ...(input.reviewText !== undefined && { review_text: input.reviewText }),
      ...(input.rating !== undefined && { rating: input.rating }),
      ...(input.productId !== undefined && { product_id: input.productId }),
      ...(input.reviewerImage !== undefined && { reviewer_image: input.reviewerImage }),
      ...(input.reviewImage !== undefined && { review_image: input.reviewImage }),
      ...(input.platform !== undefined && { platform: input.platform }),
      ...(input.isFeatured !== undefined && { is_featured: input.isFeatured }),
      ...(input.reviewDate !== undefined && { review_date: input.reviewDate }),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}

export async function deleteReview(id: string): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}

export async function toggleReviewFeatured(id: string): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { data: current, error: fetchError } = await supabase
    .from('reviews')
    .select('is_featured')
    .eq('id', id)
    .single();
  if (fetchError) return { success: false, error: fetchError.message };

  const { error } = await supabase
    .from('reviews')
    .update({ is_featured: !current.is_featured })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}
