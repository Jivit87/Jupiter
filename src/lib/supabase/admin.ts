import { createClient } from '@supabase/supabase-js';
import { getSupabaseProjectUrl } from './utils';

export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for the admin Supabase client.');
  }

  return createClient(getSupabaseProjectUrl(), serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
