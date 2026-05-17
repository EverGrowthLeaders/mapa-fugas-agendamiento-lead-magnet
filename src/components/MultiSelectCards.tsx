import type { CheckboxOption } from '../data/questions';

interface MultiSelectCardsProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (next: string[]) => void;
  exclusiveValue?: string;
  columns?: 1 | 2 | 3;
}

export function MultiSelectCards({
  options,
  value,
  onChange,
  exclusiveValue,
  columns = 2,
}: MultiSelectCardsProps) {
  const grid =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : columns === 2
        ? 'sm:grid-cols-2'
        : '';

  function toggle(optValue: string) {
    const isExclusive = exclusiveValue && optValue === exclusiveValue;
    if (isExclusive) {
      if (value.includes(optValue)) {
        onChange([]);
      } else {
        onChange([optValue]);
      }
      return;
    }
    let next: string[];
    if (value.includes(optValue)) {
      next = value.filter((v) => v !== optValue);
    } else {
      next = [...value, optValue];
    }
    if (exclusiveValue) {
      next = next.filter((v) => v !== exclusiveValue);
    }
    onChange(next);
  }

  return (
    <div className={`grid grid-cols-1 gap-2.5 ${grid}`}>
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(opt.value)}
            className={[
              'group flex items-start gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-all duration-150 focus-ring',
              selected
                ? 'border-accent-500 bg-accent-50/50 shadow-[0_0_0_3px_rgba(79,70,229,0.08)]'
                : 'border-ink-200 hover:border-ink-300 hover:bg-ink-50',
            ].join(' ')}
          >
            <span
              className={[
                'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                selected
                  ? 'border-accent-500 bg-accent-500'
                  : 'border-ink-300 bg-white group-hover:border-ink-400',
              ].join(' ')}
              aria-hidden
            >
              {selected && (
                <svg
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10.5 8.5 14 15 7"
                  />
                </svg>
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
