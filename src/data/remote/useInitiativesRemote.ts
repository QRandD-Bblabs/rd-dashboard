import { useMemo } from 'react';
import { useTable } from './useTable';
import type { InitiativeRow } from './dbTypes';
import type { Initiative, Priority, Stage, InitiativeStatus, TBD } from '../types';
import { initiatives as staticInitiatives } from '../initiatives';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

/**
 * Initiatives carry a lot of rich, hand-written brief content (architecture
 * summary, milestones, scope, learnings…) that stays in src/data/initiatives.ts.
 * Only the fast-moving status fields are editable from the admin panel and
 * come from Supabase; this hook overlays those on top of the static brief.
 */
export function useInitiativesRemote() {
  const { rows, loading, error, refetch } = useTable<InitiativeRow>('initiatives', 'initiative_id');

  const initiatives = useMemo<Initiative[]>(() => {
    if (!isSupabaseConfigured) return staticInitiatives;
    const overrides = new Map(rows.map((r) => [r.initiative_id, r]));
    return staticInitiatives.map((initiative) => {
      const o = overrides.get(initiative.id);
      if (!o) return initiative;
      return {
        ...initiative,
        name: o.name,
        vertical: o.vertical,
        priority: o.priority as Priority,
        stage: o.stage as Stage,
        status: o.status as InitiativeStatus,
        sponsor: (o.sponsor || 'TBD') as string | TBD,
        productLead: (o.product_lead || 'TBD') as string | TBD,
        techLead: (o.tech_lead || 'TBD') as string | TBD,
        team: o.team,
        targetDate: (o.target_date || 'TBD') as string | TBD,
        capacityNote: o.capacity_note,
      };
    });
  }, [rows]);

  return { initiatives, loading, error, refetch, raw: rows };
}
