import type { RadioOption } from '../data/questions';

interface RadioCardGroupProps {
  name: string;
  options: RadioOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}

export function RadioCardGroup({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: RadioCardGroupProps) {
  const grid = columns === 2 ? 'sm:grid-cols-2' : '';
  return (
    <div
      role="radiogroup"
      className={`grid grid-cols-1 gap-2.5 ${grid}`}
      aria-label={name}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={[
              'group relative flex items-start gap-3 rounded-xl border bg-white px-4 py-3.5 text-left transition-all duration-150 focus-ring',
              selected
                ? 'border-accent-500 bg-accent-50/50 shadow-[0_0_0_3px_rgba(79,70,229,0.08)]'
                : 'border-ink-200 hover:border-ink-300 hover:bg-ink-50',
            ].join(' ')}
          >
            <span
              className={[
                'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                selected
                  ? 'border-accent-500 bg-accent-500'
                  : 'border-ink-300 bg-white group-hover:border-ink-400',
              ].join(' ')}
              aria-hidden
            >
              {selected && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </span>
            <span className="text-sm leading-snug text-ink-800 sm:text-[15px]">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
