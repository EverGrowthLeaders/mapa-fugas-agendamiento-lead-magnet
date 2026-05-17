import type { ReactNode } from 'react';

interface QuestionCardProps {
  index: number;
  title: string;
  helper?: string;
  children: ReactNode;
}

export function QuestionCard({ index, title, helper, children }: QuestionCardProps) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-semibold text-accent-700">
          {index}
        </span>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
            {title}
          </h3>
          {helper && (
            <p className="mt-1 text-sm text-ink-500">{helper}</p>
          )}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
