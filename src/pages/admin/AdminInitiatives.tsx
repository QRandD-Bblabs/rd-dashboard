import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'initiative_id', label: 'Initiative ID (e.g. RD-001)', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'vertical', label: 'Vertical', type: 'text' },
  { key: 'priority', label: 'Priority', type: 'select', options: ['P0', 'P1', 'P2'] },
  {
    key: 'stage',
    label: 'Stage',
    type: 'select',
    options: ['Intake', 'Discovery', 'Technical Spike', 'Shaping / Discovery', 'Build / Delivery', 'Client Review', 'Done'],
  },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Shaping', 'Paused', 'Blocked', 'Done'] },
  { key: 'sponsor', label: 'Sponsor', type: 'text' },
  { key: 'product_lead', label: 'Product Lead', type: 'text' },
  { key: 'tech_lead', label: 'Tech Lead', type: 'text' },
  { key: 'team', label: 'Team (one per line)', type: 'array' },
  { key: 'target_date', label: 'Target Date', type: 'text' },
  { key: 'capacity_note', label: 'Capacity Note', type: 'textarea' },
];

export function AdminInitiatives() {
  return (
    <AdminCrudPage
      table="initiatives"
      idField="initiative_id"
      title="Initiatives"
      subtitle="Status fields shown across the dashboard. Note: only RD-001 (Clara) and RET-001 (Retail) have a full initiative brief page — new IDs added here only appear in the portfolio table and KPIs."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => `${String(r.priority)} · ${String(r.stage)} · ${String(r.status)}`}
    />
  );
}
