import { useParams, Link } from 'react-router-dom';
import { Bot, Timer, Coins, LogIn, LogOut, ArrowLeft } from 'lucide-react';
import { SectionTitle, Card, CardHeader } from '../components/Card';
import { PriorityBadge, StatusBadge, SeverityBadge } from '../components/Badge';
import { TBDTag, ListOrTBD } from '../components/TBDTag';
import { FlowSteps } from '../components/FlowSteps';
import { claraFlowSteps, claraControlCenterFunctions, claraPendingFields } from '../data/initiatives';
import { useInitiativesRemote } from '../data/remote/useInitiativesRemote';
import { useRisksRemote } from '../data/remote/useRisksRemote';
import { isTBD } from '../data/types';

function isMissing(value: string | string[] | undefined): boolean {
  if (!value) return true;
  if (typeof value === 'string') return isTBD(value);
  return value.length === 0;
}

export function InitiativeDetail() {
  const { id } = useParams<{ id: string }>();
  const { initiatives } = useInitiativesRemote();
  const { risks } = useRisksRemote();
  const initiative = initiatives.find((i) => i.id === id);

  if (!initiative) {
    return (
      <div className="space-y-4">
        <SectionTitle>Initiative not found</SectionTitle>
        <Link to="/portfolio" className="text-sm font-semibold text-[#0B0A07] hover:underline">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  const isClara = initiative.id === 'RD-001';
  const initiativeRisks = risks.filter((r) => r.initiativeId === initiative.id);
  const flowSteps = isClara
    ? claraFlowSteps
    : initiative.architectureSummary?.includes('→')
      ? initiative.architectureSummary.split('→').map((s) => s.trim())
      : null;

  const missingFields: { label: string; value: string | string[] | undefined; note?: string }[] = [
    { label: 'Success Metric', value: initiative.successMetric },
    { label: 'Technical Lead', value: initiative.techLead },
    { label: 'Explicit Scope', value: initiative.inScope },
    { label: 'Explicit Out of Scope', value: initiative.outOfScope },
    { label: 'Acceptance Criteria', value: initiative.acceptanceCriteria },
    { label: 'Known Limitations', value: initiative.knownLimitations },
    { label: 'Reusable Components', value: initiative.reusableComponents },
  ].filter((f) => isMissing(f.value));

  return (
    <div className="space-y-6">
      <Link to="/portfolio" className="flex items-center gap-1.5 text-sm font-medium text-[#0B0A07]/50 hover:text-[#0B0A07]">
        <ArrowLeft size={14} /> Back to Portfolio
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle subtitle={`${initiative.vertical} · ${initiative.origin}`}>{initiative.name}</SectionTitle>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={initiative.priority} />
          <StatusBadge status={initiative.status} />
        </div>
      </div>

      <Card className="bg-[#0B0A07] text-[#F6F7F5]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#C7FFDF]/10 p-3">
              <Bot size={22} className="text-[#C7FFDF]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Target Delivery</div>
              <div className="text-lg font-bold">{initiative.targetDate}</div>
            </div>
          </div>
          <div className="h-10 w-px bg-[#F6F7F5]/10" />
          <div>
            <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Sponsor</div>
            <div className="text-sm font-semibold">{initiative.sponsor}</div>
          </div>
          {initiative.businessImpact && (
            <>
              <div className="h-10 w-px bg-[#F6F7F5]/10" />
              <div>
                <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Context</div>
                <div className="max-w-md text-sm font-semibold">{initiative.businessImpact}</div>
              </div>
            </>
          )}
        </div>
      </Card>

      {(initiative.currentProcess || initiative.pain) && (
        <Card>
          <CardHeader title="Overview" subtitle="What this initiative is" />
          {initiative.currentProcess && <p className="text-sm leading-relaxed text-[#0B0A07]/75">{initiative.currentProcess}</p>}
          {initiative.pain && (
            <p className="mt-2 text-sm leading-relaxed text-[#0B0A07]/75">
              <strong className="text-[#0B0A07]">Core question: </strong>
              {initiative.pain}
            </p>
          )}
        </Card>
      )}

      {flowSteps && (
        <Card>
          <CardHeader title="Flow" subtitle="End to end" />
          <div className="overflow-x-auto pb-1">
            <FlowSteps steps={flowSteps} />
          </div>
        </Card>
      )}

      {isClara && (
        <Card>
          <CardHeader title="Control Center" subtitle="Confirmed operator functions" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: LogIn, label: claraControlCenterFunctions[0] },
              { icon: LogOut, label: claraControlCenterFunctions[1] },
              { icon: Timer, label: claraControlCenterFunctions[2] },
              { icon: Coins, label: claraControlCenterFunctions[3] },
            ].map((f, idx) => (
              <div key={idx} className="rounded-xl border border-[#0B0A07]/8 p-4 text-center">
                <f.icon size={20} className="mx-auto text-[#0B0A07]/60" />
                <div className="mt-2 text-xs font-medium text-[#0B0A07]/75">{f.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#0B0A07]/45">Live usage-time and token-consumption metrics will populate here once connected to the Clara Control Center API.</p>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Delivery & Team" />
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-[#0B0A07]/45">Product Lead</dt>
            <dd>{initiative.productLead}</dd>
            <dt className="text-[#0B0A07]/45">Tech Lead</dt>
            <dd>{isTBD(initiative.techLead as string) ? <TBDTag /> : initiative.techLead}</dd>
            <dt className="text-[#0B0A07]/45">R&D Team</dt>
            <dd>{initiative.team.length ? initiative.team.join(', ') : <TBDTag label="Not yet allocated" />}</dd>
            <dt className="text-[#0B0A07]/45">Start Date</dt>
            <dd>{isTBD(initiative.startDate as string) ? <TBDTag /> : initiative.startDate}</dd>
            <dt className="text-[#0B0A07]/45">Target Date</dt>
            <dd className="font-semibold">{initiative.targetDate}</dd>
            <dt className="text-[#0B0A07]/45">Repository</dt>
            <dd>{isTBD(initiative.repo as string) ? <TBDTag /> : initiative.repo}</dd>
          </dl>
        </Card>

        <Card>
          <CardHeader title="Capacity" subtitle="Where the team's time is going" />
          <p className="text-sm leading-relaxed text-[#0B0A07]/75">{initiative.capacityNote || 'No capacity note recorded.'}</p>
          {initiative.repoPlatform && <p className="mt-3 text-xs text-[#0B0A07]/45">{initiative.repoPlatform}</p>}
        </Card>
      </div>

      {missingFields.length > 0 && (
        <Card>
          <CardHeader title="Missing Definition of Ready Fields" subtitle="Visible gaps — not invented" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {isClara
              ? claraPendingFields.map((f) => (
                  <div key={f.field} className="flex items-center justify-between rounded-xl border border-dashed border-[#F2545B]/40 bg-[#F2545B]/5 px-4 py-3">
                    <span className="text-sm font-medium text-[#0B0A07]">{f.field}</span>
                    <TBDTag label={f.note.startsWith('Needs') ? 'Needs Definition' : 'TBD'} title={f.note} />
                  </div>
                ))
              : missingFields.map((f) => (
                  <div key={f.label} className="flex items-center justify-between rounded-xl border border-dashed border-[#F2545B]/40 bg-[#F2545B]/5 px-4 py-3">
                    <span className="text-sm font-medium text-[#0B0A07]">{f.label}</span>
                    <TBDTag />
                  </div>
                ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Milestones" />
          {initiative.milestones.length ? (
            <ul className="space-y-3">
              {initiative.milestones.map((m) => (
                <li key={m.id} className="flex items-center justify-between rounded-xl border border-[#0B0A07]/8 px-4 py-3">
                  <span className="text-sm font-medium text-[#0B0A07]">{m.label}</span>
                  <span className="text-sm font-semibold text-[#0B0A07]/70">
                    {m.date}
                    {m.proposed && ' (Proposed)'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-4 py-6 text-center text-xs text-[#0B0A07]/40">
              No milestones set yet.
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Risks" />
          {initiativeRisks.length ? (
            <div className="space-y-3">
              {initiativeRisks.map((r) => (
                <div key={r.id} className="rounded-xl border border-[#0B0A07]/8 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#0B0A07]/50">{r.id}</span>
                    <SeverityBadge severity={r.severity} />
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#0B0A07]">{r.risk}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-4 py-6 text-center text-xs text-[#0B0A07]/40">
              No risks logged for this initiative.
            </div>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader title="Reusable Components & Known Limitations" subtitle="Populated at closure" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">Reusable Components</div>
            <ListOrTBD value={initiative.reusableComponents} />
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">Known Limitations</div>
            <ListOrTBD value={initiative.knownLimitations} />
          </div>
        </div>
      </Card>
    </div>
  );
}
