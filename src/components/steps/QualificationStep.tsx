import type { DiagnosticAnswers } from '../../types/diagnostic';
import { QuestionCard } from '../QuestionCard';
import { RadioCardGroup } from '../RadioCardGroup';
import { MultiSelectCards } from '../MultiSelectCards';
import {
  documentationOptions,
  filterOptions,
  noiseOptions,
  qualificationCriteria,
} from '../../data/questions';
import { StepHeader } from './StepHeader';

interface Props {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
}

export function QualificationStep({ answers, update }: Props) {
  return (
    <div className="space-y-5">
      <StepHeader
        eyebrow="Paso 2"
        title="Cualificación y filtro"
        description="Ahora revisamos si tu equipo está hablando con oportunidades reales o con ruido comercial."
      />

      <QuestionCard
        index={5}
        title="Antes de que un comercial intervenga, ¿se filtra si el lead cumple requisitos mínimos?"
      >
        <RadioCardGroup
          name="q5"
          options={filterOptions}
          value={answers.q5}
          onChange={(v) => update({ q5: v as DiagnosticAnswers['q5'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={6}
        title='¿Cuánta "morralla" o curiosos dirías que recibe tu equipo?'
      >
        <RadioCardGroup
          name="q6"
          options={noiseOptions}
          value={answers.q6}
          onChange={(v) => update({ q6: v as DiagnosticAnswers['q6'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={7}
        title="¿Qué información mínima tiene el equipo antes de decidir si merece la pena agendar?"
        helper="Marca todo lo que normalmente conoce antes de agendar."
      >
        <MultiSelectCards
          options={qualificationCriteria}
          value={answers.q7 ?? []}
          onChange={(next) => update({ q7: next })}
          exclusiveValue="none"
          columns={2}
        />
      </QuestionCard>

      <QuestionCard
        index={8}
        title="¿El equipo sabe claramente a quién agendar, a quién derivar y a quién descartar?"
      >
        <RadioCardGroup
          name="q8"
          options={documentationOptions}
          value={answers.q8}
          onChange={(v) => update({ q8: v as DiagnosticAnswers['q8'] })}
        />
      </QuestionCard>
    </div>
  );
}

export function isQualificationComplete(a: DiagnosticAnswers): boolean {
  return Boolean(a.q5 && a.q6 && a.q7 && a.q7.length > 0 && a.q8);
}
