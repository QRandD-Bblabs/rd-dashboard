import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Users, CalendarClock, ListChecks } from 'lucide-react';
import { SectionTitle, Card, CardHeader } from '../components/Card';
import { KpiCard } from '../components/Kpi';
import { PriorityBadge, StatusBadge, SeverityBadge } from '../components/Badge';
import { TBDTag } from '../components/TBDTag';
import { people } from '../data/people';
import { missionStatement, missionStatementEn } from '../data/operatingModel';
import { useInitiativesRemote } from '../data/remote/useInitiativesRemote';
import { useRisksRemote } from '../data/remote/useRisksRemote';

export function ExecutiveOverview() {
  const { initiatives } = useInitiativesRemote();
  const { risks } = useRisksRemote();
  const clara = initiatives.find((i) => i.id === 'RD-001') ?? initiatives[0];
  const next = initiatives.find((i) => i.id === 'RET-001') ?? initiatives[1];
  const activeCount = initiatives.filter((i) => i.status === 'Active').length;
  const p0Count = initiatives.filter((i) => i.priority === 'P0').length;
  const teamCount = people.filter((p) => p.role === 'R&D Team').length;
  const openRisks = risks.filter((r) => r.status === 'Open');

  if (!clara || !next) return null;

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle subtitle="Everything leadership needs to know in under 30 seconds — no status meeting required.">
          Executive Overview
        </SectionTitle>
        <Card className="border-[#0B0A07]/8 bg-[#0B0A07] text-[#F6F7F5]">
          <p className="text-sm leading-relaxed text-[#C7FFDF]">“{missionStatement}”</p>
          <p className="mt-1 text-xs leading-relaxed text-[#F6F7F5]/50">{missionStatementEn}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <KpiCard label="Active Initiatives" value={activeCount} icon={<ListChecks size={16} />} />
        <KpiCard label="Active P0" value={p0Count} icon={<AlertTriangle size={16} />} tone="critical" />
        <KpiCard label="R&D Team" value={teamCount} icon={<Users size={16} />} hint="María, Fabián, Luis" />
        <KpiCard label="Current Team Focus" value="Clara" hint="100% of team capacity" />
        <KpiCard label="Next Delivery" value="26 Aug 2026" icon={<CalendarClock size={16} />} hint="Clara — Corbeta kick-off" />
        <KpiCard label="Tech Lead" value={<TBDTag />} tone="critical" hint="Unfilled — RISK-001" />
        <KpiCard label="Next Initiative" value="Retail Inventory" hint="Shaping / Discovery" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="P0 Initiative — Clara"
            subtitle="What R&D is doing right now"
            action={
              <Link to={`/initiative/${clara.id}`} className="flex items-center gap-1 text-sm font-semibold text-[#0B0A07] hover:underline">
                Initiative Detail <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={clara.priority} />
            <StatusBadge status={clara.status} />
            <span className="text-sm text-[#0B0A07]/60">Target: {clara.targetDate}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#0B0A07]/70">{clara.architectureSummary}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/40">Sponsor</div>
              <div className="mt-1">{clara.sponsor}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/40">Product Lead</div>
              <div className="mt-1">{clara.productLead}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/40">Tech Lead</div>
              <div className="mt-1"><TBDTag /></div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/40">Team</div>
              <div className="mt-1">{clara.team.join(', ')}</div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Current Risks"
            subtitle={`${openRisks.length} open`}
            action={
              <Link to={`/initiative/${clara.id}`} className="flex items-center gap-1 text-sm font-semibold text-[#0B0A07] hover:underline">
                Details <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="space-y-3">
            {openRisks.map((r) => (
              <div key={r.id} className="rounded-xl border border-[#0B0A07]/8 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#0B0A07]/50">{r.id}</span>
                  <SeverityBadge severity={r.severity} />
                </div>
                <div className="mt-1 text-sm font-medium text-[#0B0A07]">{r.risk}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Next Initiative"
            subtitle="What comes after Clara"
            action={
              <Link to={`/initiative/${next.id}`} className="flex items-center gap-1 text-sm font-semibold text-[#0B0A07] hover:underline">
                Details <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="text-sm font-semibold text-[#0B0A07]">{next.name}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <PriorityBadge priority={next.priority} />
            <StatusBadge status={next.status} />
          </div>
          <p className="mt-3 text-sm text-[#0B0A07]/60">{next.pain}</p>
        </Card>

        <Card>
          <CardHeader title="Decisions Needed" subtitle="Blocking or high-priority" />
          <ul className="space-y-2 text-sm text-[#0B0A07]/75">
            <li className="flex gap-2"><AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#F2545B]" /> Assign a Clara Tech Lead.</li>
            <li className="flex gap-2"><AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#F2545B]" /> Define Clara success metric &amp; acceptance criteria before 26 Aug.</li>
            <li className="flex gap-2"><AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#F2545B]" /> Confirm repository centralization plan post-delivery.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
