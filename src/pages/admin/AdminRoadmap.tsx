import { AdminCrudPage } from './AdminCrudPage';
import type { FieldConfig } from './AdminCrudPage';

const fields: FieldConfig[] = [
  { key: 'item_id', label: 'Item ID (e.g. later-new-thing)', type: 'text', required: true },
  { key: 'horizon', label: 'Horizon', type: 'select', options: ['NOW', 'NEXT', 'LATER', 'EXPLORE', 'RETAIL_PHASE'] },
  { key: 'label', label: 'Label', type: 'text', required: true },
  { key: 'detail', label: 'Detail / State', type: 'text' },
  { key: 'sort_order', label: 'Sort Order (number, lower = first)', type: 'text' },
];

export function AdminRoadmap() {
  return (
    <AdminCrudPage
      table="roadmap_items"
      idField="item_id"
      title="Roadmap"
      subtitle="Now / Next / Later / Explore columns, plus the Retail phased roadmap (horizon = RETAIL_PHASE)."
      fields={fields}
      displayTitle={(r) => String(r.label)}
      displaySubtitle={(r) => String(r.horizon)}
    />
  );
}
