import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseProjectUrl } from './utils';

export function createSupabaseBrowserClient() {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!anonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required for the browser Supabase client.');
  }

  return createBrowserClient(getSupabaseProjectUrl(), anonKey);
}
