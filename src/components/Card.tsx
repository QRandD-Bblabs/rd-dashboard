import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export function Card({
  children,
  className = '',
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={twMerge(
        'rounded-2xl border border-[#0B0A07]/8 bg-white shadow-sm',
        padded ? 'p-5 sm:p-6' : '',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-[#0B0A07]">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-[#0B0A07]/55">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-bold tracking-tight text-[#0B0A07] sm:text-2xl">{children}</h2>
      {subtitle && <p className="mt-1 text-sm text-[#0B0A07]/55">{subtitle}</p>}
    </div>
  );
}
