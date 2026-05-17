interface IntroStepProps {
  onStart: () => void;
}

const benefits = [
  'Detecta fugas invisibles en tu proceso comercial.',
  'Prioriza qué parte revisar primero.',
  'Distingue entre problema de leads y problema de seguimiento.',
  'Obtén un mapa visual de tu sistema de agendamiento.',
];

export function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Diagnóstico · 3 minutos
      </div>
      <h1 className="mt-4 text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
        ¿Dónde se están escapando tus citas comerciales?
      </h1>
      <p className="mt-3 text-[15px] text-ink-600 sm:text-base">
        Responde este diagnóstico rápido y descubre si tu principal fuga está
        antes de agendar, durante la cualificación, después de la cita o en la
        preparación de la llamada.
      </p>
      <p className="mt-2 text-sm text-ink-500">
        No necesitas datos exactos. Responde según lo que ocurre en una semana
        normal.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800 focus-ring sm:w-auto"
      >
        Empezar diagnóstico
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 10h12m0 0-4-4m4 4-4 4"
          />
        </svg>
      </button>

      <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 text-emerald-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3 6 2 2 4-4"
                />
              </svg>
            </span>
            <span className="text-sm text-ink-700">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
