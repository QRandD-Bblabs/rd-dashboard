import type { ReactNode } from 'react';
import { Card } from './Card';

export function KpiCard({
  label,
  value,
  hint,
  icon,
  tone = 'default',
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: 'default' | 'critical' | 'good';
}) {
  const valueColor =
    tone === 'critical' ? 'text-[#F2545B]' : tone === 'good' ? 'text-[#4C6B00]' : 'text-[#0B0A07]';
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[#0B0A07]/50">
        <span className="text-xs font-semibold tracking-wide uppercase">{label}</span>
        {icon}
      </div>
      <div className={`text-2xl font-bold tracking-tight sm:text-3xl ${valueColor}`}>{value}</div>
      {hint && <div className="text-xs text-[#0B0A07]/45">{hint}</div>}
    </Card>
  );
}
