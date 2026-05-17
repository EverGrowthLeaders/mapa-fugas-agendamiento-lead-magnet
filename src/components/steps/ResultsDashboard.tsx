import { useState } from 'react';
import type {
  DiagnosticAnswers,
  DiagnosticResult,
  DiagnosticSummary,
  LeadUserData,
} from '../../types/diagnostic';
import {
  automationTierCopy,
  bucketLabels,
  concernCopy,
  disclaimer,
  primaryLeakCopy,
} from '../../data/results';
import { automationAreas } from '../../data/questions';
import { LeakMap } from '../LeakMap';
import { LeadCaptureModal } from '../LeadCaptureModal';

interface Props {
  result: DiagnosticResult;
  answers: DiagnosticAnswers;
  onRestart: () => void;
}

export function ResultsDashboard({ result, answers, onRestart }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  void answers;

  const primary = primaryLeakCopy[result.primaryLeak];
  const tier = automationTierCopy[result.automationTier];
  const concern = result.mainConcern ? concernCopy[result.mainConcern] : null;

  const selectedAreaLabels = result.selectedAutomationAreas
    .map((id) => automationAreas.find((a) => a.value === id)?.label)
    .filter((v): v is string => Boolean(v));

  const criticalCount = Object.values(result.bucketScores).filter(
    (b) => b.level === 'high' || b.level === 'critical',
  ).length;

  function handleSubmit(userData: LeadUserData) {
    const summary: DiagnosticSummary = {
      userData,
      overallScore: result.overallScore,
      primaryLeak: result.primaryLeak,
      bucketScores: result.bucketScores,
      automationReadinessShare: result.automationReadinessShare,
      selectedAutomationAreas: result.selectedAutomationAreas,
      mainConcern: result.mainConcern,
      recommendation: primary.recommendation,
      disclaimer,
    };
    // Connect here with CRM, webhook or email tool.
    console.log('[diagnosticSummary]', summary);
  }

  return (
    <div className="space-y-5">
      {/* ── Header card ─────────────────────────────────── */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">
          Resultado del diagnóstico
        </span>
        <h2 className="mt-2 text-xl font-semibold leading-tight text-ink-900 sm:text-2xl">
          Tu principal fuga parece estar en:{' '}
          <span className="text-accent-700">
            {bucketLabels[result.primaryLeak]}
          </span>
        </h2>

        {/* Score blocks: 2 cols on mobile so they fit; 3 cols on md+ */}
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          <ScoreBlock
            label="Riesgo de fuga"
            value={`${result.overallScore}`}
            suffix="/100"
            tone={
              result.overallScore <= 30
                ? 'good'
                : result.overallScore <= 60
                  ? 'mid'
                  : result.overallScore <= 80
                    ? 'high'
                    : 'crit'
            }
          />
          <ScoreBlock
            label="Áreas críticas"
            value={`${criticalCount}`}
            suffix=" / 7"
            tone="neutral"
          />
          {/* Full-width on mobile 2-col grid (spans both columns), normal on md+ */}
          <div className="col-span-2 md:col-span-1">
            <ScoreBlock
              label="Margen opt."
              value={`${result.automationReadinessShare}`}
              suffix="%"
              tone="neutral"
            />
          </div>
        </div>
      </div>

      {/* ── Mapa de fugas ──────────────────────────────── */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
          Mapa de fugas
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          La barra principal aparece destacada con un borde azul.
        </p>
        <div className="mt-4">
          <LeakMap
            bucketScores={result.bucketScores}
            primaryLeak={result.primaryLeak}
          />
        </div>
      </div>

      {/* ── Diagnóstico principal ─────────────────────── */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
          Diagnóstico principal
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          {primary.headline}
        </p>
        <div className="mt-4 rounded-xl bg-accent-50/60 p-4 ring-1 ring-inset ring-accent-100">
          <div className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 20 20"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 4v2m0 8v2M4 10h2m8 0h2m-2.93-4.07-1.41 1.41m-4.24 4.24-1.41 1.41m0-7.07 1.41 1.41m4.24 4.24 1.41 1.41"
              />
            </svg>
            <p className="text-sm font-medium text-accent-800">
              {primary.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* ── Zona de optimización ─────────────────────── */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
          Parte del proceso que tendría más sentido optimizar
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
          Según tus respuestas, no parece necesario tocarlo todo. La oportunidad
          está en liberar la parte repetitiva y dejar al equipo en las
          conversaciones donde más valor aporta.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-100 bg-ink-50/60 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              Tipo de optimización
            </span>
            <div className="mt-1.5 text-base font-semibold text-ink-900">
              {tier.title}
            </div>
            <p className="mt-2 text-sm text-ink-600">{tier.body}</p>
          </div>
          <div className="rounded-xl border border-ink-100 bg-ink-50/60 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              Margen estimado
            </span>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-ink-900">
                {result.automationReadinessShare}
              </span>
              <span className="text-sm text-ink-500">% del primer contacto</span>
            </div>
            <p className="mt-2 text-sm text-ink-600">
              Estimación propia sobre cuánto podría liberarse sin perder calidad.
            </p>
          </div>
        </div>

        {selectedAreaLabels.length > 0 && (
          <div className="mt-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              Áreas repetitivas que identificaste
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedAreaLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-700 ring-1 ring-inset ring-ink-200"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Preocupación personalizada ────────────────── */}
      {concern && (
        <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-8">
          <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
            Sobre tu principal preocupación
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
            {concern}
          </p>
        </div>
      )}

      {/* ── Disclaimer ───────────────────────────────── */}
      <p className="px-1 text-xs text-ink-400">{disclaimer}</p>

      {/* ── CTAs sticky ──────────────────────────────── */}
      <div
        className="sticky bottom-0 -mx-4 border-t border-ink-100 bg-ink-50/95 px-4 backdrop-blur sticky-cta-pad sm:relative sm:mx-0 sm:rounded-2xl sm:border sm:bg-white sm:py-5 sm:[padding-bottom:1.25rem]"
      >
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onRestart}
            className="min-h-[44px] rounded-xl border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 transition hover:bg-ink-50 active:scale-[0.98] focus-ring sm:min-h-0 sm:py-2.5"
          >
            Rehacer diagnóstico
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="min-h-[44px] rounded-xl bg-accent-600 px-4 text-sm font-semibold text-white transition hover:bg-accent-700 active:scale-[0.98] focus-ring sm:min-h-0 sm:py-2.5"
          >
            Descargar mi mapa de fugas
          </button>
        </div>
      </div>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

interface ScoreBlockProps {
  label: string;
  value: string;
  suffix?: string;
  tone: 'good' | 'mid' | 'high' | 'crit' | 'neutral';
}

function ScoreBlock({ label, value, suffix, tone }: ScoreBlockProps) {
  const toneClasses: Record<ScoreBlockProps['tone'], string> = {
    good: 'text-emerald-700',
    mid: 'text-amber-700',
    high: 'text-orange-700',
    crit: 'text-rose-700',
    neutral: 'text-ink-900',
  };
  return (
    <div className="h-full rounded-xl border border-ink-100 bg-ink-50/60 p-3.5 sm:p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-0.5">
        <span className={`text-2xl font-semibold sm:text-3xl ${toneClasses[tone]}`}>
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-ink-500 sm:text-base">{suffix}</span>
        )}
      </div>
    </div>
  );
}
