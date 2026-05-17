export interface RadioOption {
  value: string;
  label: string;
  helper?: string;
}

export interface CheckboxOption {
  value: string;
  label: string;
}

export const channelOptions: CheckboxOption[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'calls', label: 'Llamadas' },
  { value: 'forms', label: 'Formularios web' },
  { value: 'meta', label: 'Meta Ads' },
  { value: 'google', label: 'Google Ads' },
  { value: 'portals', label: 'Portales / directorios' },
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Instagram / LinkedIn' },
  { value: 'oldDb', label: 'Bases de datos antiguas' },
  { value: 'other', label: 'Otros' },
];

export const qualificationCriteria: CheckboxOption[] = [
  { value: 'pain', label: 'Necesidad o dolor principal' },
  { value: 'urgency', label: 'Urgencia' },
  { value: 'budget', label: 'Presupuesto o capacidad económica' },
  { value: 'location', label: 'Zona o ubicación (si aplica)' },
  { value: 'service', label: 'Tipo de servicio o propiedad (si aplica)' },
  { value: 'reason', label: 'Motivo por el que solicita información' },
  { value: 'timing', label: 'Plazo de decisión' },
  { value: 'decisionMaker', label: 'Persona decisora' },
  { value: 'none', label: 'Ninguna de las anteriores' },
];

export const automationAreas: CheckboxOption[] = [
  { value: 'firstReply', label: 'Primera respuesta al lead' },
  { value: 'initialCall', label: 'Llamada inicial de cualificación' },
  { value: 'followUpWa', label: 'WhatsApps de seguimiento' },
  { value: 'reminders', label: 'Recordatorios antes de la cita' },
  { value: 'noShowRecovery', label: 'Recuperación de no-shows' },
  { value: 'crmLogging', label: 'Registro en CRM' },
  { value: 'briefingPrep', label: 'Preparación del briefing para el comercial' },
  { value: 'reactivation', label: 'Reactivación de leads antiguos' },
  { value: 'none', label: 'Ninguna, todo requiere atención humana' },
];

export const leadsVolumeOptions: RadioOption[] = [
  { value: 'A', label: 'Menos de 50' },
  { value: 'B', label: 'Entre 50 y 150' },
  { value: 'C', label: 'Entre 151 y 400' },
  { value: 'D', label: 'Más de 400' },
];

export const responseSpeedOptions: RadioOption[] = [
  { value: 'A', label: 'Menos de 5 minutos' },
  { value: 'B', label: 'Entre 5 y 30 minutos' },
  { value: 'C', label: 'Entre 30 minutos y 3 horas' },
  { value: 'D', label: 'Más de 3 horas o al día siguiente' },
  { value: 'E', label: 'Depende mucho del día o del equipo' },
];

export const offHoursOptions: RadioOption[] = [
  {
    value: 'A',
    label: 'Se atienden de forma automática o quedan bien gestionados',
  },
  { value: 'B', label: 'Se responden al día siguiente' },
  { value: 'C', label: 'Se acumulan en WhatsApp, email o CRM' },
  { value: 'D', label: 'No tenemos claro qué pasa con ellos' },
];

export const filterOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, siempre y con criterios claros' },
  { value: 'B', label: 'Sí, pero depende de quién lo atienda' },
  { value: 'C', label: 'A veces, de forma manual' },
  { value: 'D', label: 'No, casi todos llegan al equipo' },
];

export const noiseOptions: RadioOption[] = [
  { value: 'A', label: 'Muy poca' },
  { value: 'B', label: 'Algo, pero es manejable' },
  { value: 'C', label: 'Bastante' },
  { value: 'D', label: 'Demasiada, consume mucho tiempo' },
];

export const documentationOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, está documentado' },
  { value: 'B', label: 'Más o menos, pero no está documentado' },
  { value: 'C', label: 'Depende del comercial' },
  { value: 'D', label: 'No, se decide sobre la marcha' },
];

export const reminderOptions: RadioOption[] = [
  { value: 'A', label: 'Recordatorios multicanal con contenido de valor' },
  { value: 'B', label: 'Recordatorio automático básico' },
  { value: 'C', label: 'Recordatorio manual del equipo' },
  { value: 'D', label: 'No hay sistema claro' },
];

export const intentBoostOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, contenido o recurso personalizado según su caso' },
  { value: 'B', label: 'Sí, pero es genérico' },
  { value: 'C', label: 'A veces, si alguien del equipo se acuerda' },
  { value: 'D', label: 'No, solo espera a la llamada' },
];

export const noShowFlowOptions: RadioOption[] = [
  { value: 'A', label: 'Entra en una secuencia clara de recuperación' },
  { value: 'B', label: 'Se le escribe manualmente' },
  { value: 'C', label: 'Depende del comercial' },
  { value: 'D', label: 'Normalmente se pierde' },
];

export const briefingOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, con dolor, urgencia, objeciones y contexto' },
  { value: 'B', label: 'Sí, pero muy básico' },
  { value: 'C', label: 'Tiene que revisar notas o conversaciones' },
  { value: 'D', label: 'No, llega casi a ciegas' },
];

export const recordKeepingOptions: RadioOption[] = [
  { value: 'A', label: 'En CRM o base de datos centralizada' },
  { value: 'B', label: 'En parte en CRM y parte en WhatsApp o notas' },
  { value: 'C', label: 'Principalmente en WhatsApp o conversaciones sueltas' },
  { value: 'D', label: 'No queda bien registrada' },
];

export const reasonsKnownOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, con estados y motivos claros' },
  { value: 'B', label: 'A veces, revisando manualmente' },
  { value: 'C', label: 'Depende de lo que apunte el comercial' },
  { value: 'D', label: 'No lo sabemos con claridad' },
];

export const scriptOptions: RadioOption[] = [
  { value: 'A', label: 'Sí, está documentado y se revisa' },
  { value: 'B', label: 'Sí, pero cada uno lo adapta mucho' },
  { value: 'C', label: 'Hay ideas generales, no un sistema' },
  { value: 'D', label: 'Cada comercial lo hace a su manera' },
];

export const concernOptions: RadioOption[] = [
  { value: 'A', label: 'Perder trato humano' },
  { value: 'B', label: 'Que la IA responda mal' },
  { value: 'C', label: 'Que no se integre con mi CRM' },
  { value: 'D', label: 'Que el equipo no lo use' },
  { value: 'E', label: 'No saber si compensa' },
  { value: 'F', label: 'No me preocupa especialmente' },
];
