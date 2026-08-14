import { useMemo } from 'react';
import { useTable } from './useTable';
import type { KnowledgeCategoryRow, AcceleratorItemRow } from './dbTypes';
import type { KnowledgeCategory, AcceleratorItem } from '../types';
import { knowledgeCategories as staticCategories, acceleratorCatalog as staticAccelerator } from '../knowledge';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

function mapCategory(r: KnowledgeCategoryRow): KnowledgeCategory {
  return { id: r.category_id, name: r.name, description: r.description, itemCount: r.item_count };
}

function mapAccelerator(r: AcceleratorItemRow): AcceleratorItem {
  return { id: r.item_id, group: r.group_name as AcceleratorItem['group'], name: r.name, description: r.description };
}

export function useKnowledgeCategoriesRemote() {
  const { rows, loading, error, refetch } = useTable<KnowledgeCategoryRow>('knowledge_categories', 'category_id');
  const categories = useMemo(() => (isSupabaseConfigured ? rows.map(mapCategory) : staticCategories), [rows]);
  return { categories, loading, error, refetch, raw: rows };
}

export function useAcceleratorRemote() {
  const { rows, loading, error, refetch } = useTable<AcceleratorItemRow>('accelerator_items', 'item_id');
  const items = useMemo(() => (isSupabaseConfigured ? rows.map(mapAccelerator) : staticAccelerator), [rows]);
  return { items, loading, error, refetch, raw: rows };
}
