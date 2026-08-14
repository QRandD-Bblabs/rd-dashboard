import { useMemo } from 'react';
import { useTable } from './useTable';
import type { OpportunityRow } from './dbTypes';
import type { Opportunity, OpportunityFamily, OpportunityPipelineStatus } from '../types';
import { opportunities as staticOpportunities } from '../opportunities';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapRow(r: OpportunityRow): Opportunity {
  return {
    id: r.opportunity_id,
    name: r.name,
    family: r.family as OpportunityFamily,
    problemPattern: r.problem_pattern,
    potentialMvp: r.potential_mvp,
    recommendedEntry: r.recommended_entry,
    pipelineStatus: r.pipeline_status as OpportunityPipelineStatus,
  };
}

export function useOpportunitiesRemote() {
  const { rows, loading, error, refetch } = useTable<OpportunityRow>('opportunities', 'opportunity_id');

  const opportunities = useMemo(() => {
    if (!isSupabaseConfigured) return staticOpportunities;
    return rows.map(mapRow);
  }, [rows]);

  return { opportunities, loading, error, refetch, raw: rows };
}
