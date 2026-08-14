import { Bot, Timer, Coins, LogIn, LogOut } from 'lucide-react';
import { SectionTitle, Card, CardHeader } from '../components/Card';
import { PriorityBadge, StatusBadge, SeverityBadge } from '../components/Badge';
import { TBDTag, ListOrTBD } from '../components/TBDTag';
import { FlowSteps } from '../components/FlowSteps';
import { claraFlowSteps, claraControlCenterFunctions, claraPendingFields } from '../data/initiatives';
import { useInitiativesRemote } from '../data/remote/useInitiativesRemote';
import { useRisksRemote } from '../data/remote/useRisksRemote';

export function ClaraCommandCenter() {
  const { initiatives } = useInitiativesRemote();
  const { risks } = useRisksRemote();
  const clara = initiatives.find((i) => i.id === 'RD-001');
  const claraRisks = risks.filter((r) => r.initiativeId === 'RD-001');

  if (!clara) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle subtitle="Virtual meeting agent — LiveAvatar + Recall.ai + RAG.">Clara Command Center</SectionTitle>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={clara.priority} />
          <StatusBadge status={clara.status} />
        </div>
      </div>

      <Card className="bg-[#0B0A07] text-[#F6F7F5]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#C7FFDF]/10 p-3"><Bot size={22} className="text-[#C7FFDF]" /></div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Target Delivery</div>
              <div className="text-lg font-bold">{clara.targetDate}</div>
            </div>
          </div>
          <div className="h-10 w-px bg-[#F6F7F5]/10" />
          <div>
            <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Sponsor</div>
            <div className="text-sm font-semibold">{clara.sponsor} — Director de Solutions &amp; Customer Success</div>
          </div>
          <div className="h-10 w-px bg-[#F6F7F5]/10" />
          <div>
            <div className="text-xs uppercase tracking-wide text-[#F6F7F5]/50">Client Context</div>
            <div className="text-sm font-semibold">Kick-off with Corbeta</div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="What Clara Does" subtitle="Agent description" />
        <p className="text-sm leading-relaxed text-[#0B0A07]/75">
          Clara is a virtual agent built using LiveAvatar, Recall.ai, and RAG. The agent joins video calls
          through Recall.ai. Inside the call: a participant asks a question, Clara receives it, consults a
          defined RAG context, generates a response, and interacts within the call using an avatar.
        </p>
      </Card>

      <Card>
        <CardHeader title="Functional Flow" subtitle="End to end, inside a call" />
        <div className="overflow-x-auto pb-1">
          <FlowSteps steps={claraFlowSteps} />
        </div>
      </Card>

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Delivery & Team" />
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-[#0B0A07]/45">Product Lead</dt><dd>{clara.productLead}</dd>
            <dt className="text-[#0B0A07]/45">Tech Lead</dt><dd><TBDTag /></dd>
            <dt className="text-[#0B0A07]/45">R&D Team</dt><dd>{clara.team.join(', ')}</dd>
            <dt className="text-[#0B0A07]/45">Start Date</dt><dd><TBDTag /></dd>
            <dt className="text-[#0B0A07]/45">Target Date</dt><dd className="font-semibold">{clara.targetDate}</dd>
            <dt className="text-[#0B0A07]/45">Repository</dt><dd>{clara.repo}</dd>
          </dl>
        </Card>

        <Card>
          <CardHeader title="Repository & Docs" subtitle="Links to be populated as they become available" />
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-dashed border-[#0B0A07]/15 px-3 py-2">
              <span className="text-[#0B0A07]/60">Repo (GitHub, pre-migration)</span>
              <TBDTag label="Link pending" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-[#0B0A07]/15 px-3 py-2">
              <span className="text-[#0B0A07]/60">README</span>
              <TBDTag />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-[#0B0A07]/15 px-3 py-2">
              <span className="text-[#0B0A07]/60">Demo</span>
              <TBDTag />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#0B0A07]/45">
            {clara.repoPlatform}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Missing Definition of Ready Fields" subtitle="Visible gaps — not invented" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {claraPendingFields.map((f) => (
            <div key={f.field} className="flex items-center justify-between rounded-xl border border-dashed border-[#F2545B]/40 bg-[#F2545B]/5 px-4 py-3">
              <span className="text-sm font-medium text-[#0B0A07]">{f.field}</span>
              <TBDTag label={f.note.startsWith('Needs') ? 'Needs Definition' : 'TBD'} title={f.note} />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Milestones" />
          <ul className="space-y-3">
            {clara.milestones.map((m) => (
              <li key={m.id} className="flex items-center justify-between rounded-xl border border-[#0B0A07]/8 px-4 py-3">
                <span className="text-sm font-medium text-[#0B0A07]">{m.label}</span>
                <span className="text-sm font-semibold text-[#0B0A07]/70">{m.date}{m.proposed && ' (Proposed)'}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Risks" />
          <div className="space-y-3">
            {claraRisks.map((r) => (
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

      <Card>
        <CardHeader title="Reusable Components & Known Limitations" subtitle="Populated at closure" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">Reusable Components</div>
            <ListOrTBD value={clara.reusableComponents} />
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">Known Limitations</div>
            <ListOrTBD value={clara.knownLimitations} />
          </div>
        </div>
      </Card>
    </div>
  );
}
