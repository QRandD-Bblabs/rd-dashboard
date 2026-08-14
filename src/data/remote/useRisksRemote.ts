import { useMemo } from 'react';
import { useTable } from './useTable';
import type { RiskRow } from './dbTypes';
import type { Risk, RiskSeverity, RiskStatus } from '../types';
import { risks as staticRisks } from '../risks';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapRow(r: RiskRow): Risk {
  return {
    id: r.risk_id,
    risk: r.risk,
    severity: r.severity as RiskSeverity,
    initiativeId: r.initiative_id,
    owner: r.owner,
    mitigation: r.mitigation,
    dueDate: r.due_date,
    status: r.status as RiskStatus,
    impact: r.impact,
  };
}

export function useRisksRemote() {
  const { rows, loading, error, refetch } = useTable<RiskRow>('risks', 'risk_id');

  const risks = useMemo(() => {
    if (!isSupabaseConfigured) return staticRisks;
    return rows.map(mapRow);
  }, [rows]);

  return { risks, loading, error, refetch, raw: rows };
}
