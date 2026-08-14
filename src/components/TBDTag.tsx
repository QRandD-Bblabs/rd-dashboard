import { AlertTriangle } from 'lucide-react';
import { isTBD } from '../data/types';

export function TBDTag({ label = 'TBD', title }: { label?: string; title?: string }) {
  return (
    <span
      title={title ?? 'Not yet defined — flagged as a gap, not invented.'}
      className="inline-flex items-center gap-1 rounded-full bg-[#F2545B]/12 px-2.5 py-1 text-xs font-semibold text-[#B8232B] ring-1 ring-dashed ring-[#F2545B]/50"
    >
      <AlertTriangle size={12} strokeWidth={2.5} />
      {label}
    </span>
  );
}

/** Renders a value, or a TBDTag when the value is unset / marked TBD or "Needs Definition". */
export function ValueOrTBD({ value }: { value?: string | null }) {
  if (isTBD(value ?? undefined)) {
    return <TBDTag label={value === 'Needs Definition' ? 'Needs Definition' : 'TBD'} />;
  }
  return <span>{value}</span>;
}

export function ListOrTBD({ value }: { value: string[] | 'TBD' | 'Needs Definition' }) {
  if (typeof value === 'string') {
    return <TBDTag label={value} />;
  }
  if (value.length === 0) {
    return <TBDTag label="Needs Definition" />;
  }
  return (
    <ul className="list-disc space-y-1 pl-4 text-sm text-[#0B0A07]/80">
      {value.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
