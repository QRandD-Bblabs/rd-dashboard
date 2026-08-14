import { useMemo } from 'react';
import { useTable } from './useTable';
import type { CapacityRow } from './dbTypes';
import type { CapacityAllocation } from '../types';
import { capacity as staticCapacity } from '../people';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapRow(r: CapacityRow): CapacityAllocation {
  return {
    personId: r.person_id,
    name: r.name,
    currentInitiativeId: r.current_initiative_id,
    currentInitiativeName: r.current_initiative_name,
    allocationNote: r.allocation_note,
  };
}

export function useCapacityRemote() {
  const { rows, loading, error, refetch } = useTable<CapacityRow>('capacity', 'person_id');

  const capacity = useMemo(() => {
    if (!isSupabaseConfigured) return staticCapacity;
    return rows.map(mapRow);
  }, [rows]);

  return { capacity, loading, error, refetch, raw: rows };
}
