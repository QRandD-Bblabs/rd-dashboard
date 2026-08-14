// Row shapes as they exist in Supabase (snake_case, matches supabase/schema.sql).

export interface SolutionRow {
  id: string;
  solution_id: string;
  name: string;
  vertical: string;
  problem: string;
  capability: string;
  status: string;
  product_owner: string;
  technical_owner: string;
  repository: string;
  demo_url: string;
  documentation_url: string;
  reuse_level: string;
  reusable_components: string[];
  known_limitations: string[];
  last_updated: string;
  created_at?: string;
  updated_at?: string;
}

export interface InitiativeRow {
  id: string;
  initiative_id: string;
  name: string;
  vertical: string;
  priority: string;
  stage: string;
  status: string;
  sponsor: string;
  product_lead: string;
  tech_lead: string;
  team: string[];
  target_date: string;
  capacity_note: string;
  updated_at?: string;
}

export interface RiskRow {
  id: string;
  risk_id: string;
  risk: string;
  severity: string;
  initiative_id: string;
  owner: string;
  mitigation: string;
  due_date: string;
  status: string;
  impact: string[];
  updated_at?: string;
}

export interface CapacityRow {
  id: string;
  person_id: string;
  name: string;
  current_initiative_id: string;
  current_initiative_name: string;
  allocation_note: string;
  updated_at?: string;
}

export interface OpportunityRow {
  id: string;
  opportunity_id: string;
  name: string;
  family: string;
  problem_pattern: string;
  potential_mvp: string[];
  recommended_entry: string;
  pipeline_status: string;
  updated_at?: string;
}

export interface RoadmapItemRow {
  id: string;
  item_id: string;
  horizon: string;
  label: string;
  detail: string;
  sort_order: number;
}

export interface KnowledgeCategoryRow {
  id: string;
  category_id: string;
  name: string;
  description: string;
  item_count: number;
}

export interface AcceleratorItemRow {
  id: string;
  item_id: string;
  group_name: string;
  name: string;
  description: string;
}
