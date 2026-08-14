import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'solution_id', label: 'Solution ID (e.g. SOL-002)', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'vertical', label: 'Vertical', type: 'text' },
  { key: 'problem', label: 'Problem', type: 'textarea' },
  { key: 'capability', label: 'Capability', type: 'textarea' },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['Research', 'Prototype', 'MVP', 'Validated', 'Reusable', 'Productized', 'Deprecated'],
  },
  { key: 'product_owner', label: 'Product Owner', type: 'text' },
  { key: 'technical_owner', label: 'Technical Owner', type: 'text' },
  { key: 'repository', label: 'Repository', type: 'text' },
  { key: 'demo_url', label: 'Demo URL', type: 'text' },
  { key: 'documentation_url', label: 'Documentation URL', type: 'text' },
  { key: 'reuse_level', label: 'Reuse Level', type: 'select', options: ['Full', 'Partial', 'No'] },
  { key: 'reusable_components', label: 'Reusable Components', type: 'array' },
  { key: 'known_limitations', label: 'Known Limitations', type: 'array' },
  { key: 'last_updated', label: 'Last Updated (YYYY-MM-DD)', type: 'text' },
];

export function AdminSolutions() {
  return (
    <AdminCrudPage
      table="solutions"
      idField="solution_id"
      title="Solution Inventory"
      subtitle="Add, edit, or remove entries in the public Solution Inventory."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => `${String(r.vertical)} · ${String(r.status)}`}
    />
  );
}
