import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

/**
 * Generic read hook for a Supabase table, with graceful fallback when the
 * backend isn't configured (local dev without .env, or the static preview).
 * Callers merge `rows` over their static seed data — see src/data usage.
 */
export function useTable<T>(table: string, orderBy: string) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from(table).select('*').order(orderBy);
    if (error) setError(error.message);
    else setRows((data ?? []) as T[]);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { rows, loading, error, refetch };
}
