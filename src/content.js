// Synthetic, non-personal, fixed educational content. No real user data.

export const UI_TEXT = {
  en: {
    appName: 'CALMA-SEG',
    tagline: 'Safe Support with WebMCP',
    heroDesc:
      'A bilingual demonstration of prewritten psychoeducational exercises and general human-support information, discoverable by people and by browser agents through WebMCP.',
    demoNotice: 'Educational demo — not a clinical or emergency service.',
    langLabel: 'Language',
    finderHeading: 'Find an exercise',
    categoryLabel: 'Category',
    maxMinutesLabel: 'Maximum duration (minutes)',
    categories: { all: 'All', grounding: 'Grounding', breathing: 'Breathing', focus: 'Focus' },
    exercisesHeading: 'Exercises',
    viewButton: 'View exercise',
    selectedHeading: 'Selected exercise',
    selectedEmpty: 'No exercise selected yet. Choose one above, or ask a browser agent to show one.',
    stepsHeading: 'Steps',
    durationLabel: 'Approximate duration',
    safetyNoteLabel: 'Safety note',
    supportHeading: 'Human support options',
    urgencyLabel: 'Urgency',
    urgencies: { routine: 'Routine', soon: 'Soon', immediate: 'Immediate' },
    supportButton: 'Show options',
    supportEmpty: 'Choose an urgency level to see general support options.',
    safetyHeading: 'Safety and privacy',
    agentHeading: 'Agent activity',
    agentEmpty: 'No agent tool has been invoked yet.',
    lastTool: 'Last tool invoked',
    plainSummary: 'Plain-language summary',
    statusHeading: 'WebMCP status',
    statusUnavailable: 'WebMCP is not available in this browser. The manual interface remains available.',
    statusError: 'WebMCP tool registration could not complete. The manual interface remains available.',
    statusSuccessIntro: 'WebMCP connected. Registered tools:',
    footer: 'Hackathon prototype using synthetic educational content.',
  },
  es: {
    appName: 'CALMA-SEG',
    tagline: 'Apoyo seguro con WebMCP',
    heroDesc:
      'Una demostración bilingüe de ejercicios psicoeducativos predefinidos e información general de apoyo humano, disponible para personas y para agentes de navegador mediante WebMCP.',
    demoNotice: 'Demostración educativa — no es un servicio clínico ni de emergencia.',
    langLabel: 'Idioma',
    finderHeading: 'Buscar un ejercicio',
    categoryLabel: 'Categoría',
    maxMinutesLabel: 'Duración máxima (minutos)',
    categories: { all: 'Todas', grounding: 'Anclaje', breathing: 'Respiración', focus: 'Enfoque' },
    exercisesHeading: 'Ejercicios',
    viewButton: 'Ver ejercicio',
    selectedHeading: 'Ejercicio seleccionado',
    selectedEmpty: 'Aún no hay un ejercicio seleccionado. Elige uno arriba, o pide a un agente que muestre uno.',
    stepsHeading: 'Pasos',
    durationLabel: 'Duración aproximada',
    safetyNoteLabel: 'Nota de seguridad',
    supportHeading: 'Opciones de apoyo humano',
    urgencyLabel: 'Urgencia',
    urgencies: { routine: 'Rutinaria', soon: 'Pronto', immediate: 'Inmediata' },
    supportButton: 'Mostrar opciones',
    supportEmpty: 'Elige un nivel de urgencia para ver opciones generales de apoyo.',
    safetyHeading: 'Seguridad y privacidad',
    agentHeading: 'Actividad del agente',
    agentEmpty: 'Ninguna herramienta de agente ha sido invocada todavía.',
    lastTool: 'Última herramienta invocada',
    plainSummary: 'Resumen en lenguaje sencillo',
    statusHeading: 'Estado de WebMCP',
    statusUnavailable: 'WebMCP no está disponible en este navegador. La interfaz manual sigue disponible.',
    statusError: 'No se pudo completar el registro de herramientas WebMCP. La interfaz manual sigue disponible.',
    statusSuccessIntro: 'WebMCP conectado. Herramientas registradas:',
    footer: 'Prototipo de hackathon con contenido educativo sintético.',
  },
};

export const EXERCISES = [
  {
    id: 'five_senses_grounding',
    category: 'grounding',
    minutes: 5,
    title: { en: 'Five senses grounding', es: 'Anclaje con los cinco sentidos' },
    description: {
      en: 'A gentle noticing exercise using sight, sound, touch, smell, and taste to help orient attention to the present moment.',
      es: 'Un ejercicio suave de observación que usa vista, oído, tacto, olfato y gusto para ayudar a orientar la atención al momento presente.',
    },
    steps: {
      en: [
        'Sit or stand comfortably.',
        'Name 5 things you can see around you.',
        'Name 4 things you can hear.',
        'Name 3 things you can feel touching your body.',
        'Name 2 things you can smell (or would expect to smell).',
        'Name 1 thing you can taste (or would expect to taste).',
      ],
      es: [
        'Siéntate o ponte de pie con comodidad.',
        'Nombra 5 cosas que puedas ver a tu alrededor.',
        'Nombra 4 cosas que puedas oír.',
        'Nombra 3 cosas que puedas sentir tocando tu cuerpo.',
        'Nombra 2 cosas que puedas oler (o que esperarías oler).',
        'Nombra 1 cosa que puedas saborear (o que esperarías saborear).',
      ],
    },
    safetyNote: {
      en: 'This exercise is a general attention-focusing activity. It does not diagnose or treat any condition.',
      es: 'Este ejercicio es una actividad general para enfocar la atención. No diagnostica ni trata ninguna afección.',
    },
  },
  {
    id: 'paced_breathing',
    category: 'breathing',
    minutes: 3,
    title: { en: 'Paced breathing', es: 'Respiración pausada' },
    description: {
      en: 'A slow-count breathing pattern that some people find calming as a brief pause.',
      es: 'Un patrón de respiración de conteo lento que algunas personas encuentran calmante como pausa breve.',
    },
    steps: {
      en: [
        'Sit comfortably with your feet on the floor.',
        'Breathe in gently through your nose for a count of 4.',
        'Hold briefly for a count of 2.',
        'Breathe out slowly through your mouth for a count of 6.',
        'Repeat for a few rounds at your own pace.',
      ],
      es: [
        'Siéntate cómodamente con los pies apoyados en el suelo.',
        'Inhala suavemente por la nariz contando hasta 4.',
        'Sostén brevemente contando hasta 2.',
        'Exhala despacio por la boca contando hasta 6.',
        'Repite varias rondas a tu propio ritmo.',
      ],
    },
    safetyNote: {
      en: 'Stop and return to normal breathing if you feel discomfort, dizziness, or lightheadedness. This exercise does not treat any medical or breathing condition.',
      es: 'Detente y vuelve a tu respiración normal si sientes molestia, mareo o aturdimiento. Este ejercicio no trata ninguna condición médica o respiratoria.',
    },
  },
  {
    id: 'orienting_pause',
    category: 'focus',
    minutes: 2,
    title: { en: 'Orienting pause', es: 'Pausa de orientación' },
    description: {
      en: 'A brief pause to notice your surroundings and settle attention before continuing an activity.',
      es: 'Una breve pausa para notar tu entorno y asentar la atención antes de continuar una actividad.',
    },
    steps: {
      en: [
        'Pause what you are doing for a moment.',
        'Notice the surface you are sitting or standing on.',
        'Look around and silently name the room or space you are in.',
        'Take one slow breath.',
        'Continue your activity when ready.',
      ],
      es: [
        'Pausa lo que estás haciendo por un momento.',
        'Nota la superficie en la que estás sentado o de pie.',
        'Mira alrededor y nombra en silencio la habitación o el espacio en el que estás.',
        'Toma una respiración lenta.',
        'Continúa tu actividad cuando estés listo.',
      ],
    },
    safetyNote: {
      en: 'This is a general focusing activity, not a treatment for any condition.',
      es: 'Esta es una actividad general de enfoque, no un tratamiento para ninguna condición.',
    },
  },
  {
    id: 'next_small_step',
    category: 'focus',
    minutes: 4,
    title: { en: 'Next small step', es: 'Siguiente paso pequeño' },
    description: {
      en: 'A structured way to identify one small, manageable next action when a task feels overwhelming.',
      es: 'Una forma estructurada de identificar una siguiente acción pequeña y manejable cuando una tarea se siente abrumadora.',
    },
    steps: {
      en: [
        'Write or say out loud the task you are considering.',
        'Ask: what is the smallest possible first step?',
        'Set a short, specific time to attempt only that step.',
        'Notice that you do not need to plan the whole task right now.',
        'When ready, begin only the small step.',
      ],
      es: [
        'Escribe o di en voz alta la tarea que estás considerando.',
        'Pregúntate: ¿cuál es el primer paso más pequeño posible?',
        'Define un tiempo breve y específico para intentar solo ese paso.',
        'Nota que no necesitas planear toda la tarea ahora mismo.',
        'Cuando estés listo, comienza solo con el paso pequeño.',
      ],
    },
    safetyNote: {
      en: 'This is a general planning activity and does not address any diagnosis.',
      es: 'Esta es una actividad general de planificación y no aborda ningún diagnóstico.',
    },
  },
];

export const SUPPORT_OPTIONS = {
  routine: {
    en: [
      'Consider speaking with a trusted person in your life about how you are feeling.',
      'Consider contacting a licensed mental-health professional to discuss ongoing support.',
      'Consider consulting an appropriate local health service for guidance.',
    ],
    es: [
      'Considera hablar con una persona de confianza sobre cómo te sientes.',
      'Considera contactar a un profesional de salud mental con licencia para conversar sobre apoyo continuo.',
      'Considera consultar un servicio de salud local adecuado para recibir orientación.',
    ],
  },
  soon: {
    en: [
      'Consider reaching out to a trusted person soon to talk about what is happening.',
      'Consider contacting a licensed mental-health professional in the near future.',
      'Consider consulting an appropriate local service if things do not improve.',
    ],
    es: [
      'Considera contactar pronto a una persona de confianza para hablar de lo que está pasando.',
      'Considera contactar a un profesional de salud mental con licencia en un futuro cercano.',
      'Considera consultar un servicio local adecuado si la situación no mejora.',
    ],
  },
  immediate: {
    en: [
      'This demo cannot respond to emergencies.',
      'If you or someone else may be in immediate danger, contact your local emergency services now.',
      'Consider going to the nearest emergency department for immediate in-person support.',
    ],
    es: [
      'Esta demostración no puede responder a emergencias.',
      'Si tú u otra persona podría estar en peligro inmediato, contacta ahora a los servicios de emergencia locales.',
      'Considera ir al departamento de emergencias más cercano para recibir apoyo presencial inmediato.',
    ],
  },
};

export const SAFETY_LIMITS = {
  en: [
    'Educational demonstration only.',
    'No diagnosis or therapy is provided.',
    'No medical or medication advice is provided.',
    'No emergency response capability exists here.',
    'No personal information is collected or stored.',
    'No connection to patient or institutional systems exists.',
    'Human professional support should be used when appropriate.',
  ],
  es: [
    'Es únicamente una demostración educativa.',
    'No se ofrece diagnóstico ni terapia.',
    'No se ofrece consejo médico ni sobre medicamentos.',
    'No existe capacidad de respuesta a emergencias.',
    'No se recopila ni almacena información personal.',
    'No existe conexión con sistemas de pacientes o institucionales.',
    'El apoyo de un profesional humano debe usarse cuando sea apropiado.',
  ],
};
