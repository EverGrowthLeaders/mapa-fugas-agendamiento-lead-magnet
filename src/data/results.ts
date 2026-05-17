import type { BucketKey, ConcernKey } from '../types/diagnostic';

export const bucketLabels: Record<BucketKey, string> = {
  speedToLead: 'Velocidad de respuesta',
  qualification: 'Cualificación y filtro',
  noShow: 'No-show',
  followUp: 'Seguimiento',
  briefing: 'Briefing comercial',
  crmControl: 'CRM y control',
  control: 'Orden de canales',
};

export const bucketShortLabels: Record<BucketKey, string> = {
  speedToLead: 'Velocidad de respuesta',
  qualification: 'Cualificación y filtro',
  noShow: 'No-show',
  followUp: 'Seguimiento',
  briefing: 'Briefing comercial',
  crmControl: 'CRM y control',
  control: 'Orden de canales',
};

export const primaryLeakCopy: Record<
  BucketKey,
  { headline: string; recommendation: string }
> = {
  speedToLead: {
    headline:
      'Tu fuga principal parece estar al inicio del proceso. Los leads entran, pero no siempre reciben una respuesta suficientemente rápida o consistente. En high ticket, esto puede hacer que parte de la demanda se enfríe antes de hablar con un humano.',
    recommendation:
      'Prioridad recomendada: revisar el primer contacto, los leads fuera de horario y la velocidad de cualificación.',
  },
  qualification: {
    headline:
      'Tu fuga principal parece estar en el filtro. El equipo está dedicando demasiada energía a conversaciones que no siempre tienen encaje real. El problema no es solo vender más, sino evitar que los curiosos consuman la capacidad comercial.',
    recommendation:
      'Prioridad recomendada: definir criterios claros de cualificación antes de que el lead llegue al comercial.',
  },
  noShow: {
    headline:
      'Tu fuga principal parece estar después de agendar. El calendario puede estar lleno, pero una parte de las oportunidades no aparece o llega con poca intención. Ahí el problema no es captar más leads, sino proteger mejor las citas ya generadas.',
    recommendation:
      'Prioridad recomendada: reforzar recordatorios, nutrición previa y recuperación de citas no presentadas.',
  },
  followUp: {
    headline:
      'Tu fuga principal parece estar en el seguimiento. Muchos leads no deciden en la primera interacción, y si el follow-up depende solo de memoria o disciplina manual, parte de las oportunidades se pierden por el camino.',
    recommendation:
      'Prioridad recomendada: crear una lógica clara de seguimiento según estado, interés y momento del lead.',
  },
  briefing: {
    headline:
      'Tu fuga principal parece estar en la calidad de las llamadas. El comercial llega con poco contexto y tiene que descubrir demasiado durante la conversación. Eso hace que cada llamada dependa más de la improvisación que del sistema.',
    recommendation:
      'Prioridad recomendada: preparar un briefing previo con dolor, urgencia, objeciones probables y mejor ángulo comercial.',
  },
  crmControl: {
    headline:
      'Tu fuga principal parece estar en el control del proceso. Si la información queda repartida entre WhatsApp, notas, llamadas y CRM, es difícil saber qué está pasando realmente con los leads.',
    recommendation:
      'Prioridad recomendada: centralizar estados, conversaciones y motivos de pérdida para tomar mejores decisiones.',
  },
  control: {
    headline:
      'Tu fuga principal parece venir del crecimiento desordenado de canales. Cuantos más puntos de entrada tienes, más fácil es que se pierda trazabilidad si no existe una primera capa de organización.',
    recommendation:
      'Prioridad recomendada: ordenar los canales de entrada y definir qué debe pasar con cada lead desde el primer minuto.',
  },
};

export const concernCopy: Record<ConcernKey, string> = {
  A: 'Automatizar no debería significar eliminar el trato humano. En procesos high ticket, la idea es que la tecnología prepare mejor la conversación para que el humano entre cuando más valor aporta.',
  B: 'El riesgo no suele estar en usar tecnología, sino en usarla sin criterio comercial. Por eso antes de automatizar conviene mapear guiones, criterios y puntos de fricción.',
  C: 'La integración importa, pero el primer paso es saber qué información debe registrarse y qué estados necesita ver el equipo.',
  D: 'Una solución útil no debería añadir trabajo al equipo. Debería reducir conversaciones repetitivas y entregar mejor contexto comercial.',
  E: 'Antes de valorar inversión, conviene saber dónde está la fuga: tiempo operativo, citas no presentadas, leads sin filtrar o llamadas sin contexto.',
  F: 'Buen punto de partida. El siguiente paso sería revisar qué parte del proceso puede mejorarse sin afectar la calidad comercial.',
};

export const automationTierCopy: Record<
  'selective' | 'partial' | 'relevant' | 'broad',
  { title: string; body: string }
> = {
  selective: {
    title: 'Automatización muy selectiva',
    body: 'Tu proceso parece requerir mucho criterio humano. Aun así, podrías empezar por recordatorios, registro de información o preparación de briefings.',
  },
  partial: {
    title: 'Automatización parcial',
    body: 'Podría tener sentido automatizar primeras respuestas, seguimiento básico y recopilación de información, manteniendo al equipo humano en las decisiones comerciales importantes.',
  },
  relevant: {
    title: 'Automatización relevante',
    body: 'Hay una parte importante del proceso que parece repetitiva. Podría reforzarse cualificación inicial, follow-up, recordatorios y preparación de llamadas.',
  },
  broad: {
    title: 'Automatización amplia',
    body: 'Tu proceso parece tener suficiente volumen y repetición como para reforzar una parte amplia del primer contacto, siempre con control humano en puntos críticos.',
  },
};

export const disclaimer =
  'Este diagnóstico es una estimación orientativa basada en tus respuestas. No representa una promesa de resultados ni sustituye una auditoría completa del proceso comercial.';
