import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseProjectUrl } from './utils';

export async function createSupabaseServerClient() {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!anonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required for the server Supabase client.');
  }

  const cookieStore = await cookies();

  return createServerClient(getSupabaseProjectUrl(), anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
