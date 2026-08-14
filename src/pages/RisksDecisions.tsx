import { SectionTitle, Card, CardHeader } from '../components/Card';
import { SeverityBadge } from '../components/Badge';
import { ValueOrTBD } from '../components/TBDTag';
import { risks, decisions } from '../data/risks';
import { initiatives } from '../data/initiatives';

export function RisksDecisions() {
  const initiativeName = (id: string) => initiatives.find((i) => i.id === id)?.name ?? id;

  return (
    <div className="space-y-8">
      <SectionTitle subtitle="What's blocking or threatening delivery, and what's been decided.">Risks &amp; Decisions</SectionTitle>

      <div>
        <CardHeader title="Current Risks" subtitle={`${risks.length} tracked`} />
        <div className="space-y-4">
          {risks.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-[#0B0A07]/40">{r.id} · {initiativeName(r.initiativeId)}</div>
                  <div className="text-base font-bold text-[#0B0A07]">{r.risk}</div>
                </div>
                <SeverityBadge severity={r.severity} />
              </div>
              {r.impact && (
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[#0B0A07]/70">
                  {r.impact.map((im, i) => <li key={i}>{im}</li>)}
                </ul>
              )}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div><div className="text-xs text-[#0B0A07]/40">Owner</div><ValueOrTBD value={r.owner} /></div>
                <div><div className="text-xs text-[#0B0A07]/40">Mitigation</div><ValueOrTBD value={r.mitigation} /></div>
                <div><div className="text-xs text-[#0B0A07]/40">Due Date</div><ValueOrTBD value={r.dueDate} /></div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <CardHeader title="Decision Log" subtitle="Recorded product & technical decisions" />
        {decisions.length === 0 ? (
          <Card className="text-center text-sm text-[#0B0A07]/50">
            No decisions logged yet. Decisions will appear here as they're made in weekly R&D reviews.
          </Card>
        ) : (
          <Card padded={false} className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#0B0A07]/8 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Initiative</th>
                  <th className="px-5 py-3">Decision</th>
                  <th className="px-5 py-3">Why</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Impact</th>
                </tr>
              </thead>
              <tbody>
                {decisions.map((d) => (
                  <tr key={d.id} className="border-b border-[#0B0A07]/6 last:border-0">
                    <td className="px-5 py-4">{d.date}</td>
                    <td className="px-5 py-4">{initiativeName(d.initiativeId)}</td>
                    <td className="px-5 py-4 font-medium text-[#0B0A07]">{d.decision}</td>
                    <td className="px-5 py-4 text-[#0B0A07]/60">{d.why}</td>
                    <td className="px-5 py-4">{d.owner}</td>
                    <td className="px-5 py-4 text-[#0B0A07]/60">{d.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
