import type { DiagnosticAnswers } from '../../types/diagnostic';
import { QuestionCard } from '../QuestionCard';
import { RadioCardGroup } from '../RadioCardGroup';
import { MultiSelectCards } from '../MultiSelectCards';
import { SliderInput } from '../SliderInput';
import {
  automationAreas,
  concernOptions,
} from '../../data/questions';
import { StepHeader } from './StepHeader';

interface Props {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
}

export function AutomationStep({ answers, update }: Props) {
  return (
    <div className="space-y-5">
      <StepHeader
        eyebrow="Paso 5"
        title="¿Qué parte tendría sentido optimizar?"
        description="En procesos high ticket, lo inteligente no suele ser optimizarlo todo. Es liberar la parte repetitiva y dejar al humano donde más valor aporta."
      />

      <QuestionCard
        index={17}
        title="¿Qué partes de tu proceso son más repetitivas hoy?"
        helper="Marca todo lo que ocurra de forma recurrente."
      >
        <MultiSelectCards
          options={automationAreas}
          value={answers.q17 ?? []}
          onChange={(next) => update({ q17: next })}
          exclusiveValue="none"
          columns={2}
        />
      </QuestionCard>

      <QuestionCard
        index={18}
        title="¿Qué porcentaje del primer contacto crees que podría liberarse sin perder calidad?"
        helper="Estimación según tu propio criterio comercial."
      >
        <SliderInput
          min={0}
          max={100}
          value={answers.q18 ?? 50}
          onChange={(v) => update({ q18: v })}
          unit="%"
          marks={[
            { value: 0, label: 'Nada' },
            { value: 25, label: 'Simples' },
            { value: 50, label: 'Repetitivo' },
            { value: 75, label: 'Mayoría' },
            { value: 100, label: 'Todo' },
          ]}
        />
      </QuestionCard>

      <QuestionCard
        index={19}
        title="¿Qué te preocuparía más al optimizar el proceso?"
      >
        <RadioCardGroup
          name="q19"
          options={concernOptions}
          value={answers.q19}
          onChange={(v) => update({ q19: v as DiagnosticAnswers['q19'] })}
          columns={2}
        />
      </QuestionCard>
    </div>
  );
}

export function isAutomationComplete(a: DiagnosticAnswers): boolean {
  return (
    Array.isArray(a.q17) &&
    a.q17.length > 0 &&
    typeof a.q18 === 'number' &&
    Boolean(a.q19)
  );
}
