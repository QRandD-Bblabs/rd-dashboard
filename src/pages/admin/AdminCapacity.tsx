import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'person_id', label: 'Person ID (e.g. maria)', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'current_initiative_id', label: 'Current Initiative ID', type: 'text' },
  { key: 'current_initiative_name', label: 'Current Initiative Name', type: 'text' },
  { key: 'allocation_note', label: 'Allocation Note', type: 'textarea' },
];

export function AdminCapacity() {
  return (
    <AdminCrudPage
      table="capacity"
      idField="person_id"
      title="Capacity"
      subtitle="Keep the team's current allocation up to date on the public Capacity view."
      fields={fields}
      displayTitle={(r) => String(r.name)}
      displaySubtitle={(r) => String(r.current_initiative_name)}
    />
  );
}
