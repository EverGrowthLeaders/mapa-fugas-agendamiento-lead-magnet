import { useEffect, useState } from 'react';
import type { DiagnosticAnswers } from '../types/diagnostic';
import { useDiagnosticScoring } from '../hooks/useDiagnosticScoring';
import { ProgressBar } from './ProgressBar';
import { IntroStep } from './steps/IntroStep';
import {
  SpeedToLeadStep,
  isSpeedToLeadComplete,
} from './steps/SpeedToLeadStep';
import {
  QualificationStep,
  isQualificationComplete,
} from './steps/QualificationStep';
import { NoShowStep, isNoShowComplete } from './steps/NoShowStep';
import {
  CommercialInfoStep,
  isCommercialInfoComplete,
} from './steps/CommercialInfoStep';
import {
  AutomationStep,
  isAutomationComplete,
} from './steps/AutomationStep';
import { ResultsDashboard } from './steps/ResultsDashboard';

type Stage = 'intro' | 1 | 2 | 3 | 4 | 5 | 'results';

const TOTAL_QUESTION_STEPS = 5;

export function DiagnosticWizard() {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const result = useDiagnosticScoring(answers);

  function update(patch: Partial<DiagnosticAnswers>) {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }

  function reset() {
    setAnswers({});
    setStage('intro');
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const stepComplete = (() => {
    switch (stage) {
      case 1: return isSpeedToLeadComplete(answers);
      case 2: return isQualificationComplete(answers);
      case 3: return isNoShowComplete(answers);
      case 4: return isCommercialInfoComplete(answers);
      case 5: return isAutomationComplete(answers);
      default: return true;
    }
  })();

  function goNext() {
    if (stage === 'intro') return setStage(1);
    if (stage === 5) return setStage('results');
    if (typeof stage === 'number') setStage((stage + 1) as Stage);
  }

  function goBack() {
    if (stage === 1) return setStage('intro');
    if (stage === 'results') return setStage(5);
    if (typeof stage === 'number') setStage((stage - 1) as Stage);
  }

  if (stage === 'intro') {
    return (
      <Shell>
        <IntroStep onStart={() => setStage(1)} />
      </Shell>
    );
  }

  if (stage === 'results') {
    return (
      <Shell wide>
        <ResultsDashboard result={result} answers={answers} onRestart={reset} />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mb-5">
        <ProgressBar current={stage} total={TOTAL_QUESTION_STEPS} />
      </div>

      {stage === 1 && <SpeedToLeadStep answers={answers} update={update} />}
      {stage === 2 && <QualificationStep answers={answers} update={update} />}
      {stage === 3 && <NoShowStep answers={answers} update={update} />}
      {stage === 4 && <CommercialInfoStep answers={answers} update={update} />}
      {stage === 5 && <AutomationStep answers={answers} update={update} />}

      <NavBar
        onBack={goBack}
        onNext={goNext}
        nextLabel={stage === 5 ? 'Ver resultado' : 'Continuar'}
        canContinue={stepComplete}
      />
    </Shell>
  );
}

interface ShellProps {
  children: React.ReactNode;
  wide?: boolean;
}

function Shell({ children, wide }: ShellProps) {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-8 sm:px-6 sm:pt-12">
        <header className="mb-6 flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white">
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
                d="M3 17l5-5 4 4 5-7"
              />
            </svg>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold text-ink-900">
              Mapa de Fugas de Agendamiento
            </div>
            {!wide && (
              <div className="text-xs text-ink-500">Diagnóstico en 3 minutos</div>
            )}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

interface NavBarProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  canContinue: boolean;
}

function NavBar({ onBack, onNext, nextLabel, canContinue }: NavBarProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t border-ink-100 bg-ink-50/95 px-4 backdrop-blur sticky-nav-pad sm:relative sm:mx-0 sm:rounded-2xl sm:border sm:border-ink-100 sm:bg-white sm:py-4 sm:shadow-card sm:[padding-bottom:1rem]">
      <div className="flex items-center justify-between gap-3">
        {/* Back button: 44 px min tap target */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 transition hover:bg-ink-50 active:scale-[0.98] focus-ring"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10H4m0 0 4-4m-4 4 4 4" />
          </svg>
          Atrás
        </button>

        {/* Next button: primary action */}
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-ink-900 px-5 text-sm font-semibold text-white transition hover:bg-ink-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-300 focus-ring"
        >
          {nextLabel}
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h12m0 0-4-4m4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
