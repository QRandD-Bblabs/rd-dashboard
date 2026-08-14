import { SectionTitle, Card, CardHeader } from '../components/Card';
import { capacity, capacitySummary } from '../data/people';
import { AlertTriangle } from 'lucide-react';

export function Capacity() {
  return (
    <div className="space-y-6">
      <SectionTitle subtitle="Where the R&D team's time is actually going.">Capacity</SectionTitle>

      <Card className="bg-[#0B0A07] text-[#F6F7F5]">
        <div className="text-2xl font-bold text-[#B2EA36] sm:text-3xl">100%</div>
        <p className="mt-1 text-sm text-[#F6F7F5]/70">{capacitySummary.headline}</p>
        <p className="mt-2 text-xs text-[#F6F7F5]/45">{capacitySummary.note}</p>
      </Card>

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#0B0A07]/8 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">
              <th className="px-5 py-3">Person</th>
              <th className="px-5 py-3">Current Initiative</th>
              <th className="px-5 py-3">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {capacity.map((c) => (
              <tr key={c.personId} className="border-b border-[#0B0A07]/6 last:border-0">
                <td className="px-5 py-4 font-semibold text-[#0B0A07]">{c.name}</td>
                <td className="px-5 py-4 text-[#0B0A07]/70">{c.currentInitiativeName}</td>
                <td className="px-5 py-4 text-[#0B0A07]/70">{c.allocationNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="What this means for the pipeline" />
        <div className="flex gap-3 rounded-xl border border-[#F2545B]/30 bg-[#F2545B]/5 p-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#F2545B]" />
          <p className="text-sm text-[#0B0A07]/75">
            No R&D capacity is currently available for Retail (RET-001) or any Opportunity Backlog item. New
            initiatives cannot start until capacity is freed from Clara or additional headcount is added — this
            is a direct input to prioritization, not an assumption.
          </p>
        </div>
      </Card>
    </div>
  );
}
