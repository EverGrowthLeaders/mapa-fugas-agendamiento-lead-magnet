interface Mark {
  value: number;
  label: string;
}

interface SliderInputProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  marks?: Mark[];
}

export function SliderInput({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '%',
  marks,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-4 sm:p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-ink-500">Valor estimado</span>
        <span className="text-2xl font-semibold text-ink-900">
          {value}
          <span className="ml-0.5 text-base text-ink-500">{unit}</span>
        </span>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ ['--val' as string]: `${pct}%` }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />

        {/* Marks: absolutely positioned so they never overflow the track */}
        {marks && marks.length > 0 && (
          <div className="relative mt-2 h-4">
            {marks.map((m) => {
              const pos = ((m.value - min) / (max - min)) * 100;
              const isFirst = m.value === min;
              const isLast = m.value === max;
              return (
                <span
                  key={m.value}
                  className="absolute top-0 text-[10px] leading-none text-ink-400 sm:text-[11px]"
                  style={{
                    left: isLast ? 'auto' : `${pos}%`,
                    right: isLast ? '0' : 'auto',
                    transform: isFirst || isLast ? 'none' : 'translateX(-50%)',
                  }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
