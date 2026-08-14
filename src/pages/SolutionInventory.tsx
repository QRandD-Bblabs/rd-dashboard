import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SectionTitle, Card } from '../components/Card';
import { ReuseLevelBadge, Badge } from '../components/Badge';
import { ValueOrTBD, ListOrTBD } from '../components/TBDTag';
import { solutionInventoryNote } from '../data/solutionInventory';
import { useSolutions } from '../data/remote/useSolutions';

export function SolutionInventory() {
  const [query, setQuery] = useState('');
  const { solutions, loading } = useSolutions();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return solutions;
    return solutions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.problem.toLowerCase().includes(q) ||
        s.capability.toLowerCase().includes(q) ||
        s.vertical.toLowerCase().includes(q)
    );
  }, [query, solutions]);

  return (
    <div className="space-y-6">
      <SectionTitle subtitle="Do we already have something that solves this? Check here before building anything new.">
        Solution Inventory
      </SectionTitle>

      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#0B0A07]/35" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, problem, capability, vertical…"
          className="w-full rounded-xl border border-[#0B0A07]/12 bg-white py-2.5 pr-4 pl-9 text-sm outline-none focus:border-[#0B0A07]/30"
        />
      </div>

      {loading && <div className="text-sm text-[#0B0A07]/45">Loading…</div>}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#0B0A07]/40">{s.id} · {s.vertical}</div>
                <div className="text-base font-bold text-[#0B0A07]">{s.name}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge tone="obsidian">{s.status}</Badge>
                <ReuseLevelBadge level={s.reuseLevel} />
              </div>
            </div>
            <p className="mt-3 text-sm text-[#0B0A07]/70"><strong className="text-[#0B0A07]">Problem:</strong> {s.problem}</p>
            <p className="mt-1 text-sm text-[#0B0A07]/70"><strong className="text-[#0B0A07]">Capability:</strong> {s.capability}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-[#0B0A07]/40">Product Owner</div><ValueOrTBD value={s.productOwner} /></div>
              <div><div className="text-xs text-[#0B0A07]/40">Technical Owner</div><ValueOrTBD value={s.technicalOwner} /></div>
              <div><div className="text-xs text-[#0B0A07]/40">Repository</div><ValueOrTBD value={s.repository} /></div>
              <div><div className="text-xs text-[#0B0A07]/40">Documentation</div><ValueOrTBD value={s.documentationUrl} /></div>
            </div>
            <div className="mt-4">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">Reusable Components</div>
              <ListOrTBD value={s.reusableComponents} />
            </div>
            <div className="mt-3 text-xs text-[#0B0A07]/40">Last updated {s.lastUpdated}</div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="lg:col-span-2 text-center text-sm text-[#0B0A07]/50">No matching solutions found.</Card>
        )}
      </div>

      <p className="text-xs text-[#0B0A07]/45">{solutionInventoryNote}</p>
    </div>
  );
}
