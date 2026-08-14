import { SectionTitle, Card, CardHeader } from '../components/Card';
import { knowledgeCategories, acceleratorCatalog, acceleratorNote } from '../data/knowledge';
import { mentalModel } from '../data/operatingModel';
import { ArrowRight } from 'lucide-react';

const groups: (typeof acceleratorCatalog)[number]['group'][] = ['Application', 'AI', 'Data', 'Platform', 'QA', 'Security'];

export function KnowledgeAccelerator() {
  return (
    <div className="space-y-8">
      <SectionTitle subtitle="The goal is not more documentation. The goal is reusable intelligence.">
        Knowledge &amp; Accelerator
      </SectionTitle>

      <Card className="bg-[#0B0A07] text-[#F6F7F5]">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {mentalModel.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-[#C7FFDF]/12 px-3 py-1 text-[#C7FFDF]">{step}</span>
              {i < mentalModel.length - 1 && <ArrowRight size={14} className="text-[#F6F7F5]/30" />}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#F6F7F5]/50">
          People Knowledge → Shared Systems → Playbooks → Reusable Capability. Every project must turn raw
          experience into reusable organizational capability.
        </p>
      </Card>

      <div>
        <CardHeader title="Knowledge Base" subtitle="Categories in the SharePoint Knowledge Base" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {knowledgeCategories.map((c) => (
            <Card key={c.id} className="!p-4">
              <div className="text-sm font-semibold text-[#0B0A07]">{c.name}</div>
              <p className="mt-1 text-xs text-[#0B0A07]/55">{c.description}</p>
              <div className="mt-3 text-xs font-semibold text-[#0B0A07]/40">{c.itemCount} items logged</div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <CardHeader title="Accelerator Catalog" subtitle={acceleratorNote} />
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g}>
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0B0A07]/45">{g}</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {acceleratorCatalog.filter((a) => a.group === g).map((a) => (
                  <Card key={a.id} className="!p-4">
                    <div className="text-sm font-semibold text-[#0B0A07]">{a.name}</div>
                    <p className="mt-1 text-xs text-[#0B0A07]/55">{a.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
