import type { DiagnosticAnswers } from '../../types/diagnostic';
import { QuestionCard } from '../QuestionCard';
import { RadioCardGroup } from '../RadioCardGroup';
import { MultiSelectCards } from '../MultiSelectCards';
import {
  channelOptions,
  leadsVolumeOptions,
  offHoursOptions,
  responseSpeedOptions,
} from '../../data/questions';
import { StepHeader } from './StepHeader';

interface Props {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
}

export function SpeedToLeadStep({ answers, update }: Props) {
  return (
    <div className="space-y-5">
      <StepHeader
        eyebrow="Paso 1"
        title="Entrada y velocidad de respuesta"
        description="Primero vamos a revisar qué pasa desde que entra el lead hasta que alguien lo atiende."
      />

      <QuestionCard
        index={1}
        title="¿Cuántos leads recibes aproximadamente al mes?"
        helper="Usamos este dato solo para contextualizar el diagnóstico."
      >
        <RadioCardGroup
          name="q1"
          options={leadsVolumeOptions}
          value={answers.q1}
          onChange={(v) => update({ q1: v as DiagnosticAnswers['q1'] })}
          columns={2}
        />
      </QuestionCard>

      <QuestionCard
        index={2}
        title="Cuando entra un lead, ¿cuánto tarda normalmente alguien en responder?"
      >
        <RadioCardGroup
          name="q2"
          options={responseSpeedOptions}
          value={answers.q2}
          onChange={(v) => update({ q2: v as DiagnosticAnswers['q2'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={3}
        title="¿Qué ocurre con los leads que entran fuera de horario?"
      >
        <RadioCardGroup
          name="q3"
          options={offHoursOptions}
          value={answers.q3}
          onChange={(v) => update({ q3: v as DiagnosticAnswers['q3'] })}
        />
      </QuestionCard>

      <QuestionCard
        index={4}
        title="¿Cuántos canales de entrada tienes activos?"
        helper="Cuantos más canales hay, más importante es tener una primera capa de control."
      >
        <MultiSelectCards
          options={channelOptions}
          value={answers.q4 ?? []}
          onChange={(next) => update({ q4: next })}
          columns={2}
        />
      </QuestionCard>
    </div>
  );
}

export function isSpeedToLeadComplete(a: DiagnosticAnswers): boolean {
  return Boolean(a.q1 && a.q2 && a.q3 && a.q4 && a.q4.length > 0);
}
