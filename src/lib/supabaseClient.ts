import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// When env vars are missing (e.g. local checkout without a .env), the app
// still renders using the static seed data in src/data — it just can't
// read/write live content. This keeps `npm run dev` working out of the box.
export const supabase = isSupabaseConfigured ? createClient(url!, anonKey!) : null;
