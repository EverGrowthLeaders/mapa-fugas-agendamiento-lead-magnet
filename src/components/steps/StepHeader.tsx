interface StepHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function StepHeader({ eyebrow, title, description }: StepHeaderProps) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">
        {eyebrow}
      </span>
      <h2 className="mt-1.5 text-xl font-semibold text-ink-900 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm text-ink-500 sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}
