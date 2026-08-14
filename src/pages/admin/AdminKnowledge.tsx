import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'category_id', label: 'Category ID (e.g. security)', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'item_count', label: 'Item Count (number)', type: 'text' },
];

export function AdminKnowledge() {
  return (
    <AdminCrudPage
      table="knowledge_categories"
      idField="category_id"
      title="Knowledge Base Categories"
      subtitle="Categories used to organize the Knowledge Base."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => `${String(r.item_count)} items`}
    />
  );
}
