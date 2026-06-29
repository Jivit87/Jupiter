'use server';

import type { ActionResult } from './shared';
import { createSupabaseServerClient, createSupabaseAdminClient, mapCustomOrderRecord } from '@/lib/supabase';
import { isBuildPhase } from '@/lib/supabase/utils';
import { revalidatePath } from 'next/cache';

export async function getCustomOrderRequests() {
  if (isBuildPhase()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('custom_order_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to load custom order requests: ${error.message}`);
  return (data ?? []).map(mapCustomOrderRecord);
}

export async function createCustomOrderRequest(data: {
  description: string;
  occasion?: string;
  forWhom?: string;
  budgetRange?: string;
  deadline?: string;
  materials?: string[];
  referenceUrl?: string;
  customerName?: string;
  customerPhone?: string;
}): Promise<ActionResult> {
  if (!data.description?.trim()) return { success: false, error: 'Description is required.' };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('custom_order_requests').insert({
    description: data.description,
    occasion: data.occasion ?? null,
    for_whom: data.forWhom ?? null,
    budget_range: data.budgetRange ?? null,
    deadline: data.deadline ?? null,
    materials: data.materials ?? null,
    reference_url: data.referenceUrl ?? null,
    customer_name: data.customerName ?? null,
    customer_phone: data.customerPhone ?? null,
    status: 'pending',
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateCustomOrderRequestStatus(
  id: string,
  status: 'pending' | 'in_progress' | 'completed' | 'declined',
  adminNotes?: string
): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('custom_order_requests')
    .update({
      status,
      ...(adminNotes !== undefined && { admin_notes: adminNotes }),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/custom-orders');
  return { success: true };
}

export async function updateCustomOrderRequestNotes(id: string, adminNotes?: string): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('custom_order_requests')
    .update({ admin_notes: adminNotes ?? null })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/custom-orders');
  return { success: true };
}
