import type { RiskLevel } from '../types/diagnostic';

interface RiskBarProps {
  label: string;
  percentage: number;
  level: RiskLevel;
}

const levelStyles: Record<
  RiskLevel,
  { bar: string; pill: string; label: string }
> = {
  controlled: {
    bar: 'bg-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    label: 'Controlado',
  },
  moderate: {
    bar: 'bg-amber-400',
    pill: 'bg-amber-50 text-amber-700 ring-amber-100',
    label: 'Moderado',
  },
  high: {
    bar: 'bg-orange-500',
    pill: 'bg-orange-50 text-orange-700 ring-orange-100',
    label: 'Alto',
  },
  critical: {
    bar: 'bg-rose-500',
    pill: 'bg-rose-50 text-rose-700 ring-rose-100',
    label: 'Crítico',
  },
};

export function RiskBar({ label, percentage, level }: RiskBarProps) {
  const s = levelStyles[level];
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink-800">{label}</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${s.pill}`}
        >
          {s.label}
          <span className="text-ink-500 font-normal">· {percentage}%</span>
        </span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${s.bar}`}
          style={{ width: `${Math.max(percentage, 4)}%` }}
        />
      </div>
    </div>
  );
}
