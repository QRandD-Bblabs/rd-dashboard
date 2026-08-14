import { useMemo } from 'react';
import { useTable } from './useTable';
import type { SolutionRow } from './dbTypes';
import type { SolutionInventoryItem, ReuseLevel, SolutionStatus } from '../types';
import { solutionInventory as staticSolutions } from '../solutionInventory';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapRow(r: SolutionRow): SolutionInventoryItem {
  return {
    id: r.solution_id,
    name: r.name,
    vertical: r.vertical,
    problem: r.problem,
    capability: r.capability,
    status: r.status as SolutionStatus,
    productOwner: r.product_owner,
    technicalOwner: r.technical_owner,
    repository: r.repository,
    demoUrl: r.demo_url,
    documentationUrl: r.documentation_url,
    reuseLevel: r.reuse_level as ReuseLevel,
    reusableComponents: r.reusable_components,
    knownLimitations: r.known_limitations,
    lastUpdated: r.last_updated,
  };
}

export function useSolutions() {
  const { rows, loading, error, refetch } = useTable<SolutionRow>('solutions', 'solution_id');

  const solutions = useMemo(() => {
    if (!isSupabaseConfigured) return staticSolutions;
    return rows.map(mapRow);
  }, [rows]);

  return { solutions, loading, error, refetch, raw: rows };
}
