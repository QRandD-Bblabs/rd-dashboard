import { useMemo } from 'react';
import { useTable } from './useTable';
import type { RoadmapItemRow } from './dbTypes';
import type { RoadmapItem } from '../roadmap';
import { roadmapNow, roadmapNext, roadmapLater, roadmapExplore } from '../roadmap';
import { retailRoadmap as staticRetailRoadmap } from '../initiatives';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapRow(r: RoadmapItemRow): RoadmapItem {
  return { id: r.item_id, label: r.label, detail: r.detail || undefined };
}

function byHorizon(rows: RoadmapItemRow[], horizon: string): RoadmapItem[] {
  return rows
    .filter((r) => r.horizon === horizon)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(mapRow);
}

export function useRoadmapRemote() {
  const { rows, loading, error, refetch } = useTable<RoadmapItemRow>('roadmap_items', 'sort_order');

  const data = useMemo(() => {
    if (!isSupabaseConfigured) {
      return {
        now: roadmapNow,
        next: roadmapNext,
        later: roadmapLater,
        explore: roadmapExplore,
        retailPhases: staticRetailRoadmap,
      };
    }
    return {
      now: byHorizon(rows, 'NOW'),
      next: byHorizon(rows, 'NEXT'),
      later: byHorizon(rows, 'LATER'),
      explore: byHorizon(rows, 'EXPLORE'),
      retailPhases: rows
        .filter((r) => r.horizon === 'RETAIL_PHASE')
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((r) => ({ id: r.item_id, label: r.label, state: r.detail })),
    };
  }, [rows]);

  return { ...data, loading, error, refetch, raw: rows };
}
