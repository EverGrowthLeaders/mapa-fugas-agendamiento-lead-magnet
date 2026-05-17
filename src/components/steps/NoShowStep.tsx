import type { DiagnosticAnswers } from '../../types/diagnostic';
import { QuestionCard } from '../QuestionCard';
import { RadioCardGroup } from '../RadioCardGroup';
import { SliderInput } from '../SliderInput';
import {
  intentBoostOptions,
  noShowFlowOptions,
  reminderOptions,
} from '../../data/questions';
import { StepHeader } from './StepHeader';

interface Props {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
}

export function NoShowStep({ answers, update }: Props) {
  return (
    <div className="space-y-5">
      <StepHeader
        eyebrow="Paso 3"
        title="Seguimiento y no-show"
        description="No sirve de mucho llenar el calendario si las personas no aparecen o llegan sin intención real."
      />

      <QuestionCard
        index={9}
        title="¿Qué porcentaje aproximado de citas no aparece?"
        helper="Aproximado, según una semana o mes normal."
      >
        <SliderInput
          min={0}
          max={60}
          value={answers.q9 ?? 25}
          onChange={(v) => update({ q9: v })}
          unit="%"
          marks={[
            { value: 0, label: '0%' },
            { value: 20, label: '20%' },
            { value: 40, label: '40%' },
            { value: 60, label: '60%' },
          ]}
        />
      </QuestionCard>

      <QuestionCard
        index={10}
        title="Después de agendar, ¿qué sistema de recordatorios tienes?"
      >
        <RadioCardGroup
          name="q10"
          options={reminderOptions}
          value={answers.q10}
          onChange={(v) => update({ q10: v as DiagnosticAnswers['q10'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={11}
        title="Entre el agendamiento y la llamada, ¿el lead recibe algo que eleve su intención de compra?"
      >
        <RadioCardGroup
          name="q11"
          options={intentBoostOptions}
          value={answers.q11}
          onChange={(v) => update({ q11: v as DiagnosticAnswers['q11'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={12}
        title="Cuando alguien no aparece, ¿qué ocurre?"
      >
        <RadioCardGroup
          name="q12"
          options={noShowFlowOptions}
          value={answers.q12}
          onChange={(v) => update({ q12: v as DiagnosticAnswers['q12'] })}
        />
      </QuestionCard>
    </div>
  );
}

export function isNoShowComplete(a: DiagnosticAnswers): boolean {
  return (
    typeof a.q9 === 'number' &&
    Boolean(a.q10) &&
    Boolean(a.q11) &&
    Boolean(a.q12)
  );
}
