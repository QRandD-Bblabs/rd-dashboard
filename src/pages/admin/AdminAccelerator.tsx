import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'item_id', label: 'Item ID (e.g. ai-eval)', type: 'text', required: true },
  { key: 'group_name', label: 'Group', type: 'select', options: ['Application', 'AI', 'Data', 'Platform', 'QA', 'Security'] },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export function AdminAccelerator() {
  return (
    <AdminCrudPage
      table="accelerator_items"
      idField="item_id"
      title="Accelerator Catalog"
      subtitle="Reusable components catalog, grouped by area."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => String(r.group_name)}
    />
  );
}
