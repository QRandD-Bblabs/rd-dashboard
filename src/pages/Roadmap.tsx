import { SectionTitle, Card, CardHeader } from '../components/Card';
import { roadmapNow, roadmapNext, roadmapLater, roadmapExplore, roadmapExploreNote } from '../data/roadmap';
import { retailRoadmap } from '../data/initiatives';
import { TBDTag } from '../components/TBDTag';

const columns: { title: string; subtitle: string; items: { id: string; label: string; detail?: string }[]; accent: string }[] = [
  { title: 'NOW', subtitle: 'Active, consuming capacity', items: roadmapNow, accent: 'border-t-[#F2545B]' },
  { title: 'NEXT', subtitle: 'Shaping / Discovery', items: roadmapNext, accent: 'border-t-[#91BFE5]' },
  { title: 'LATER', subtitle: 'Sequenced, not scheduled', items: roadmapLater, accent: 'border-t-[#B9C9E9]' },
  { title: 'EXPLORE', subtitle: 'Research topics, not initiatives', items: roadmapExplore, accent: 'border-t-[#0B0A07]/20' },
];

export function Roadmap() {
  return (
    <div className="space-y-8">
      <SectionTitle subtitle="Four horizons — what's active, what's shaping, what's sequenced, what's still research.">Roadmap</SectionTitle>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <Card key={col.title} className={`border-t-4 ${col.accent}`}>
            <div className="mb-4">
              <div className="text-sm font-bold tracking-wide text-[#0B0A07]">{col.title}</div>
              <div className="text-xs text-[#0B0A07]/45">{col.subtitle}</div>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#0B0A07]/8 bg-[#F6F7F5] px-3 py-2.5">
                  <div className="text-sm font-semibold text-[#0B0A07]">{item.label}</div>
                  {item.detail && <div className="mt-0.5 text-xs text-[#0B0A07]/55">{item.detail}</div>}
                </div>
              ))}
            </div>
            {col.title === 'EXPLORE' && <p className="mt-3 text-xs text-[#0B0A07]/40">{roadmapExploreNote}</p>}
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Retail Operations — Phased Roadmap" subtitle="Progressive build, not a full ERP/WMS" />
        <div className="flex flex-wrap items-center gap-2">
          {retailRoadmap.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-2">
              <div className="rounded-xl border border-[#0B0A07]/10 bg-[#F6F7F5] px-3.5 py-2 text-sm">
                <div className="font-medium text-[#0B0A07]">{phase.label}</div>
                <div className="text-xs text-[#0B0A07]/45">{phase.state}</div>
              </div>
              {i < retailRoadmap.length - 1 && <span className="text-[#0B0A07]/25">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[#0B0A07]/60">
          Delivery dates for Phase 1: <TBDTag />
        </div>
      </Card>
    </div>
  );
}
