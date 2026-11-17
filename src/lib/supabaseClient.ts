import { createClient, SupabaseClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function createJoussourSupabaseClient(customUrl?: string, customKey?: string): SupabaseClient | null {
  const url = (customUrl || envUrl || '').trim();
  const key = (customKey || envKey || '').trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: true }
  });
}
