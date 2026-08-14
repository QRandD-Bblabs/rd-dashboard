import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'opportunity_id', label: 'Opportunity ID (e.g. OPP-011)', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'family', label: 'Family', type: 'text' },
  { key: 'problem_pattern', label: 'Problem Pattern', type: 'textarea' },
  { key: 'potential_mvp', label: 'Potential MVP (one per line)', type: 'array' },
  { key: 'recommended_entry', label: 'Recommended Entry', type: 'text' },
  {
    key: 'pipeline_status',
    label: 'Pipeline Status',
    type: 'select',
    options: ['New', 'Needs Validation', 'Discovery', 'Spike', 'Ready', 'Paused', 'Rejected'],
  },
];

export function AdminOpportunities() {
  return (
    <AdminCrudPage
      table="opportunities"
      idField="opportunity_id"
      title="Opportunities"
      subtitle="Customer-derived opportunity backlog."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => `${String(r.family)} · ${String(r.pipeline_status)}`}
    />
  );
}
