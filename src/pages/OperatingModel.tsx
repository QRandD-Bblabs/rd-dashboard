import { SectionTitle, Card, CardHeader } from '../components/Card';
import { FlowSteps } from '../components/FlowSteps';
import {
  operatingPrinciples,
  intakeFlow,
  intakeOutcomes,
  pathANewSolution,
  pathAOutcomes,
  pathBExistingSolution,
  roles,
  centralizationStrategy,
  repositoryStrategy,
  weeklyReviewAgenda,
  weeklyReviewCommitments,
} from '../data/operatingModel';
import { Badge } from '../components/Badge';
import { TBDTag } from '../components/TBDTag';

export function OperatingModel() {
  return (
    <div className="space-y-8">
      <SectionTitle subtitle="How R&D selects, runs, and closes work — and where the weekly review happens.">
        Operating Model
      </SectionTitle>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {operatingPrinciples.map((p, i) => (
          <Card key={p.id} className="!p-5">
            <div className="mb-2 text-xs font-bold text-[#0B0A07]/35">{String(i + 1).padStart(2, '0')}</div>
            <div className="text-sm font-bold text-[#0B0A07]">{p.title}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-[#0B0A07]/60">{p.description}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="R&D Flow" subtitle="From customer conversation to prioritized work" />
        <div className="space-y-4 overflow-x-auto pb-1">
          <FlowSteps steps={intakeFlow} />
          <div className="flex flex-wrap gap-2 pl-1">
            {intakeOutcomes.map((o) => <Badge key={o} tone="obsidian">{o}</Badge>)}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Path A — New Solution" />
          <div className="overflow-x-auto pb-1"><FlowSteps steps={pathANewSolution} tone="compact" /></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {pathAOutcomes.map((o) => <Badge key={o} tone="green">{o}</Badge>)}
          </div>
        </Card>
        <Card>
          <CardHeader title="Path B — Existing Solution" />
          <div className="overflow-x-auto pb-1"><FlowSteps steps={pathBExistingSolution} tone="compact" /></div>
          <p className="mt-3 text-xs text-[#0B0A07]/50">Skips full development flow when only configuration or light adjustment is needed.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title={roles.productLead.title} subtitle={roles.productLead.name} />
          <ul className="list-disc space-y-1 pl-4 text-sm text-[#0B0A07]/70">
            {roles.productLead.responsibilities.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Card>
        <Card className="border-2 border-dashed border-[#F2545B]/40">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#0B0A07]">{roles.techLead.title}</h3>
              <p className="mt-0.5 text-sm text-[#0B0A07]/55">Operational gap — not auto-assigned</p>
            </div>
            <TBDTag label="Unfilled" />
          </div>
          <ul className="list-disc space-y-1 pl-4 text-sm text-[#0B0A07]/70">
            {roles.techLead.responsibilities.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Weekly R&D Review" subtitle="Agenda used in the recurring team review" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weeklyReviewAgenda.map((a) => (
            <div key={a.id} className="rounded-xl border border-[#0B0A07]/8 p-4">
              <div className="text-sm font-bold text-[#0B0A07]">{a.title}</div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[#0B0A07]/60">
                {a.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0B0A07]/45">Commitments (Action — Owner — Due Date)</div>
          {weeklyReviewCommitments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-4 py-6 text-center text-xs text-[#0B0A07]/40">
              No commitments logged yet — captured live during each weekly review.
            </div>
          ) : (
            <ul className="space-y-2 text-sm">
              {weeklyReviewCommitments.map((c) => (
                <li key={c.id} className="flex justify-between rounded-lg border border-[#0B0A07]/8 px-3 py-2">
                  <span>{c.action}</span>
                  <span className="text-[#0B0A07]/50">{c.owner} — {c.dueDate}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader title="Centralization Strategy" subtitle="One tool for knowledge, one for engineering" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="text-sm font-bold text-[#0B0A07]">SharePoint — {centralizationStrategy.sharepoint.label}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {centralizationStrategy.sharepoint.contains.map((c) => <Badge key={c}>{c}</Badge>)}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#0B0A07]">Azure DevOps — {centralizationStrategy.azureDevOps.label}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {centralizationStrategy.azureDevOps.usedFor.map((c) => <Badge key={c}>{c}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Repository Strategy" />
        <div className="space-y-3">
          {repositoryStrategy.map((r) => (
            <div key={r.initiative} className="rounded-xl border border-[#0B0A07]/8 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#0B0A07]">{r.initiative}</span>
                <Badge tone="obsidian">{r.code}</Badge>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#0B0A07]/60">{r.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
