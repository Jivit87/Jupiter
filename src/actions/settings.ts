'use server';

import type { ActionResult } from './shared';
import { createSupabaseServerClient, createSupabaseAdminClient, mapSiteSettingRecord } from '@/lib/supabase';
import { isBuildPhase } from '@/lib/supabase/utils';
import { revalidatePath } from 'next/cache';

export async function getSiteSettings(): Promise<Record<string, unknown>> {
  if (isBuildPhase()) {
    return {};
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('site_settings').select('*').order('key');

  if (error) throw new Error(`Failed to load site settings: ${error.message}`);
  return Object.fromEntries(
    (data ?? []).map((record) => {
      const setting = mapSiteSettingRecord(record);
      return [setting.key, setting.value];
    })
  );
}

export async function updateSiteSetting(key: string, value: unknown): Promise<ActionResult> {
  if (!key?.trim()) return { success: false, error: 'Key is required.' };

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value: value as never }, { onConflict: 'key' });

  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}

export async function updateSiteSettings(settings: Record<string, unknown>): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value: value as never }));

  const { error } = await supabase
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' });

  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}
