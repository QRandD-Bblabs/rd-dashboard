import { supabase } from '../../lib/supabaseClient';

export async function insertRow<T extends object>(table: string, row: T) {
  if (!supabase) return { error: 'Backend not configured.' };
  const { error } = await supabase.from(table).insert(row);
  return { error: error?.message ?? null };
}

export async function updateRow<T extends object>(table: string, idField: string, idValue: string, row: Partial<T>) {
  if (!supabase) return { error: 'Backend not configured.' };
  const { error } = await supabase.from(table).update(row as never).eq(idField, idValue);
  return { error: error?.message ?? null };
}

export async function deleteRow(table: string, idField: string, idValue: string) {
  if (!supabase) return { error: 'Backend not configured.' };
  const { error } = await supabase.from(table).delete().eq(idField, idValue);
  return { error: error?.message ?? null };
}
