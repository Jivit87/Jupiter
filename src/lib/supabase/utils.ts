import { getServerEnv } from '@/lib/env';

export function isBuildPhase() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

export function assertSupabaseConfigured() {
  const env = getServerEnv();

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side Supabase access.');
  }
}

export function getSupabaseProjectUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required for Supabase access.');
  }

  return url;
}
