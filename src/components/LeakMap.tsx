import type { BucketKey, BucketResult } from '../types/diagnostic';
import { RiskBar } from './RiskBar';

interface LeakMapProps {
  bucketScores: Record<BucketKey, BucketResult>;
  primaryLeak: BucketKey;
}

// Display order matches the user's narrative flow.
const ORDER: BucketKey[] = [
  'speedToLead',
  'qualification',
  'noShow',
  'followUp',
  'briefing',
  'crmControl',
  'control',
];

export function LeakMap({ bucketScores, primaryLeak }: LeakMapProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {ORDER.map((key) => {
        const b = bucketScores[key];
        const isPrimary = key === primaryLeak;
        return (
          <div
            key={key}
            className={
              isPrimary
                ? 'rounded-xl ring-2 ring-accent-500/60 ring-offset-2 ring-offset-ink-50'
                : ''
            }
          >
            <RiskBar
              label={b.label}
              percentage={b.percentage}
              level={b.level}
            />
          </div>
        );
      })}
    </div>
  );
}
