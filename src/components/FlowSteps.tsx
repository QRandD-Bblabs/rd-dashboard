import { ArrowRight } from 'lucide-react';

export function FlowSteps({ steps, tone = 'default' }: { steps: string[]; tone?: 'default' | 'compact' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`rounded-xl border border-[#0B0A07]/10 bg-[#F6F7F5] font-medium text-[#0B0A07] ${
              tone === 'compact' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
            }`}
          >
            {step}
          </div>
          {i < steps.length - 1 && <ArrowRight size={16} className="shrink-0 text-[#0B0A07]/25" />}
        </div>
      ))}
    </div>
  );
}
