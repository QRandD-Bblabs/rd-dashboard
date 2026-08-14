import type { ReactNode } from 'react';

type Tone = 'red' | 'blue' | 'green' | 'teal' | 'purple' | 'amber' | 'gray' | 'obsidian';

const toneClasses: Record<Tone, string> = {
  red: 'bg-[#F2545B]/12 text-[#B8232B] ring-1 ring-[#F2545B]/30',
  blue: 'bg-[#91BFE5]/20 text-[#1F4E7A] ring-1 ring-[#91BFE5]/40',
  green: 'bg-[#B2EA36]/25 text-[#4C6B00] ring-1 ring-[#B2EA36]/40',
  teal: 'bg-teal-500/10 text-teal-700 ring-1 ring-teal-500/30',
  purple: 'bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/30',
  amber: 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/30',
  gray: 'bg-gray-500/10 text-gray-600 ring-1 ring-gray-400/30',
  obsidian: 'bg-[#0B0A07]/8 text-[#0B0A07] ring-1 ring-[#0B0A07]/15',
};

export function Badge({ children, tone = 'gray' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const tone: Tone = priority === 'P0' ? 'red' : priority === 'P1' ? 'blue' : 'gray';
  return <Badge tone={tone}>{priority}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, Tone> = {
    Active: 'blue',
    Shaping: 'teal',
    Paused: 'red',
    Blocked: 'red',
    Done: 'green',
    'Needs Validation': 'amber',
    New: 'gray',
    Discovery: 'teal',
    Spike: 'purple',
    Ready: 'green',
    Rejected: 'gray',
  };
  return <Badge tone={map[status] ?? 'gray'}>{status}</Badge>;
}

export function StageBadge({ stage }: { stage: string }) {
  const map: Record<string, Tone> = {
    'Build / Delivery': 'blue',
    'Shaping / Discovery': 'teal',
    Discovery: 'teal',
    'Technical Spike': 'purple',
    Intake: 'amber',
    'Client Review': 'blue',
    Done: 'green',
  };
  return <Badge tone={map[stage] ?? 'gray'}>{stage}</Badge>;
}

export function ReuseLevelBadge({ level }: { level: string }) {
  const tone: Tone = level === 'Full' ? 'green' : level === 'Partial' ? 'amber' : 'gray';
  return <Badge tone={tone}>{level} reuse</Badge>;
}

export function SeverityBadge({ severity }: { severity: string }) {
  const tone: Tone = severity === 'High' ? 'red' : severity.includes('Medium') ? 'amber' : 'gray';
  return <Badge tone={tone}>{severity}</Badge>;
}
