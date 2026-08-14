import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'risk_id', label: 'Risk ID (e.g. RISK-005)', type: 'text', required: true },
  { key: 'risk', label: 'Risk', type: 'text', required: true },
  { key: 'severity', label: 'Severity', type: 'select', options: ['Low', 'Medium', 'Medium / High', 'High'] },
  { key: 'initiative_id', label: 'Initiative ID (e.g. RD-001)', type: 'text' },
  { key: 'owner', label: 'Owner', type: 'text' },
  { key: 'mitigation', label: 'Mitigation', type: 'textarea' },
  { key: 'due_date', label: 'Due Date', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['Open', 'Mitigating', 'Closed'] },
  { key: 'impact', label: 'Impact (one per line)', type: 'array' },
];

export function AdminRisks() {
  return (
    <AdminCrudPage
      table="risks"
      idField="risk_id"
      title="Risks"
      subtitle="Add, edit, or close risks shown on the public Risks & Decisions view."
      fields={fields}
      displayTitle={(r) => String(r.risk)}
      displaySubtitle={(r) => `${String(r.severity)} · ${String(r.status)}`}
    />
  );
}
