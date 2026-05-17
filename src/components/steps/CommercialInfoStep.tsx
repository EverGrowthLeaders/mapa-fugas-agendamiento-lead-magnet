import type { DiagnosticAnswers } from '../../types/diagnostic';
import { QuestionCard } from '../QuestionCard';
import { RadioCardGroup } from '../RadioCardGroup';
import {
  briefingOptions,
  reasonsKnownOptions,
  recordKeepingOptions,
  scriptOptions,
} from '../../data/questions';
import { StepHeader } from './StepHeader';

interface Props {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
}

export function CommercialInfoStep({ answers, update }: Props) {
  return (
    <div className="space-y-5">
      <StepHeader
        eyebrow="Paso 4"
        title="Información comercial y control"
        description="Ahora revisamos si el comercial llega a la llamada con contexto o si tiene que descubrirlo todo en directo."
      />

      <QuestionCard
        index={13}
        title="Antes de una llamada, ¿el comercial recibe un resumen claro del lead?"
      >
        <RadioCardGroup
          name="q13"
          options={briefingOptions}
          value={answers.q13}
          onChange={(v) => update({ q13: v as DiagnosticAnswers['q13'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={14}
        title="¿Dónde queda registrada la conversación previa con el lead?"
      >
        <RadioCardGroup
          name="q14"
          options={recordKeepingOptions}
          value={answers.q14}
          onChange={(v) => update({ q14: v as DiagnosticAnswers['q14'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={15}
        title="¿Puedes saber por qué un lead no agendó, no apareció o no compró?"
      >
        <RadioCardGroup
          name="q15"
          options={reasonsKnownOptions}
          value={answers.q15}
          onChange={(v) => update({ q15: v as DiagnosticAnswers['q15'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={16}
        title="¿El equipo comercial sigue un guion o criterio común?"
      >
        <RadioCardGroup
          name="q16"
          options={scriptOptions}
          value={answers.q16}
          onChange={(v) => update({ q16: v as DiagnosticAnswers['q16'] })}
        />
      </QuestionCard>
    </div>
  );
}

export function isCommercialInfoComplete(a: DiagnosticAnswers): boolean {
  return Boolean(a.q13 && a.q14 && a.q15 && a.q16);
}
