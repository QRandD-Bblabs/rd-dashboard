import { useState } from 'react';
import { SectionTitle, Card } from '../components/Card';
import { Badge, StatusBadge } from '../components/Badge';
import { opportunities } from '../data/opportunities';
import type { OpportunityPipelineStatus } from '../data/types';
import { LayoutGrid, List } from 'lucide-react';

const columns: OpportunityPipelineStatus[] = ['New', 'Needs Validation', 'Discovery', 'Spike', 'Ready', 'Paused', 'Rejected'];

export function OpportunityPipeline() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle subtitle="Customer-derived opportunities. None are approved for development — every one needs Intake / Review first.">
          Opportunity Pipeline
        </SectionTitle>
        <div className="flex gap-1 rounded-xl border border-[#0B0A07]/10 bg-white p-1">
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${view === 'kanban' ? 'bg-[#0B0A07] text-white' : 'text-[#0B0A07]/60'}`}
          >
            <LayoutGrid size={14} /> Kanban
          </button>
          <button
            onClick={() => setView('table')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${view === 'table' ? 'bg-[#0B0A07] text-white' : 'text-[#0B0A07]/60'}`}
          >
            <List size={14} /> Table
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((col) => {
            const items = opportunities.filter((o) => o.pipelineStatus === col);
            return (
              <div key={col} className="w-72 shrink-0">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#0B0A07]/50">{col}</span>
                  <span className="text-xs text-[#0B0A07]/35">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.map((o) => (
                    <Card key={o.id} className="!p-4">
                      <div className="mb-1 text-xs font-semibold text-[#0B0A07]/40">{o.id}</div>
                      <div className="text-sm font-semibold text-[#0B0A07]">{o.name}</div>
                      <div className="mt-1 text-xs text-[#0B0A07]/55">{o.family}</div>
                      <p className="mt-2 text-xs leading-relaxed text-[#0B0A07]/60">{o.problemPattern}</p>
                      <div className="mt-3">
                        <Badge tone="obsidian">{o.recommendedEntry}</Badge>
                      </div>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-3 py-6 text-center text-xs text-[#0B0A07]/35">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card padded={false} className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#0B0A07]/8 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Opportunity</th>
                <th className="px-5 py-3">Family</th>
                <th className="px-5 py-3">Problem Pattern</th>
                <th className="px-5 py-3">Recommended Entry</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((o) => (
                <tr key={o.id} className="border-b border-[#0B0A07]/6 last:border-0 hover:bg-[#F6F7F5]">
                  <td className="px-5 py-4 text-[#0B0A07]/50">{o.id}</td>
                  <td className="px-5 py-4 font-semibold text-[#0B0A07]">{o.name}</td>
                  <td className="px-5 py-4 text-[#0B0A07]/70">{o.family}</td>
                  <td className="px-5 py-4 max-w-xs text-[#0B0A07]/60">{o.problemPattern}</td>
                  <td className="px-5 py-4"><Badge tone="obsidian">{o.recommendedEntry}</Badge></td>
                  <td className="px-5 py-4"><StatusBadge status={o.pipelineStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
