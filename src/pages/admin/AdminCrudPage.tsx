import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Card, SectionTitle, CardHeader } from '../../components/Card';
import { useTable } from '../../data/remote/useTable';
import { insertRow, updateRow, deleteRow } from '../../data/remote/api';

export type FieldType = 'text' | 'textarea' | 'array' | 'select';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
}

interface AdminCrudPageProps {
  table: string;
  idField: string;
  title: string;
  subtitle: string;
  fields: FieldConfig[];
  displayTitle: (row: Record<string, unknown>) => string;
  displaySubtitle?: (row: Record<string, unknown>) => string;
}

type FormState = Record<string, string>;

function rowToForm(fields: FieldConfig[], row?: Record<string, unknown>): FormState {
  const form: FormState = {};
  for (const f of fields) {
    const value = row?.[f.key];
    if (f.type === 'array') form[f.key] = Array.isArray(value) ? value.join('\n') : '';
    else form[f.key] = typeof value === 'string' ? value : '';
  }
  return form;
}

function formToPayload(fields: FieldConfig[], form: FormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === 'array') {
      payload[f.key] = form[f.key]
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      payload[f.key] = form[f.key];
    }
  }
  return payload;
}

export function AdminCrudPage({ table, idField, title, subtitle, fields, displayTitle, displaySubtitle }: AdminCrudPageProps) {
  const { rows, loading, error, refetch } = useTable<Record<string, unknown>>(table, idField);
  const [editing, setEditing] = useState<Record<string, unknown> | null | 'new'>(null);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openNew() {
    setForm(rowToForm(fields));
    setSaveError(null);
    setEditing('new');
  }

  function openEdit(row: Record<string, unknown>) {
    setForm(rowToForm(fields, row));
    setSaveError(null);
    setEditing(row);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    const payload = formToPayload(fields, form);
    const result =
      editing === 'new'
        ? await insertRow(table, payload)
        : await updateRow(table, idField, String((editing as Record<string, unknown>)[idField]), payload);
    setSaving(false);
    if (result.error) {
      setSaveError(result.error);
      return;
    }
    setEditing(null);
    refetch();
  }

  async function handleDelete(row: Record<string, unknown>) {
    const id = String(row[idField]);
    setDeletingId(id);
    const result = await deleteRow(table, idField, id);
    setDeletingId(null);
    if (result.error) {
      alert(result.error);
      return;
    }
    refetch();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle subtitle={subtitle}>{title}</SectionTitle>
        <button
          onClick={openNew}
          className="flex items-center gap-1.5 rounded-lg bg-[#0B0A07] px-3.5 py-2 text-sm font-semibold text-white"
        >
          <Plus size={15} /> New
        </button>
      </div>

      {error && <div className="rounded-lg border border-[#F2545B]/30 bg-[#F2545B]/5 px-4 py-3 text-sm text-[#B8232B]">{error}</div>}
      {loading && <div className="text-sm text-[#0B0A07]/50">Loading…</div>}

      <div className="space-y-3">
        {rows.map((row) => (
          <Card key={String(row[idField])} className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-[#0B0A07]/40">{String(row[idField])}</div>
              <div className="text-sm font-bold text-[#0B0A07]">{displayTitle(row)}</div>
              {displaySubtitle && <div className="mt-0.5 text-xs text-[#0B0A07]/55">{displaySubtitle(row)}</div>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => openEdit(row)} className="rounded-lg border border-[#0B0A07]/12 p-2 text-[#0B0A07]/60 hover:bg-[#F6F7F5]">
                <Pencil size={14} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${String(row[idField])}?`)) handleDelete(row);
                }}
                disabled={deletingId === String(row[idField])}
                className="rounded-lg border border-[#F2545B]/25 p-2 text-[#F2545B] hover:bg-[#F2545B]/5 disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Card>
        ))}
        {!loading && rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-4 py-8 text-center text-sm text-[#0B0A07]/40">
            Nothing here yet.
          </div>
        )}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="max-h-[85vh] w-full max-w-lg overflow-y-auto">
            <CardHeader
              title={editing === 'new' ? `New ${title.slice(0, -1) || title}` : `Edit ${String((editing as Record<string, unknown>)[idField])}`}
              action={
                <button onClick={() => setEditing(null)} className="text-[#0B0A07]/40 hover:text-[#0B0A07]">
                  <X size={18} />
                </button>
              }
            />
            <div className="space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-xs font-semibold text-[#0B0A07]/60">{f.label}</label>
                  {f.type === 'textarea' || f.type === 'array' ? (
                    <textarea
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      rows={f.type === 'array' ? 3 : 3}
                      placeholder={f.type === 'array' ? 'One per line' : undefined}
                      className="w-full rounded-lg border border-[#0B0A07]/15 px-3 py-2 text-sm outline-none focus:border-[#0B0A07]/40"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full rounded-lg border border-[#0B0A07]/15 px-3 py-2 text-sm outline-none focus:border-[#0B0A07]/40"
                    >
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      required={f.required}
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full rounded-lg border border-[#0B0A07]/15 px-3 py-2 text-sm outline-none focus:border-[#0B0A07]/40"
                    />
                  )}
                </div>
              ))}
              {saveError && <div className="text-xs font-medium text-[#F2545B]">{saveError}</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditing(null)} className="rounded-lg border border-[#0B0A07]/15 px-4 py-2 text-sm font-medium text-[#0B0A07]/70">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-[#0B0A07] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
