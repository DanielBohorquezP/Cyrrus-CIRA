export interface WorkshopEntry {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  body: string[];
}

export const workshops: WorkshopEntry[] = [
  {
    slug: "ia-para-directivos",
    title: "Taller de IA para directivos",
    eyebrow: "Leadership Academy",
    intro:
      "El comité aprueba o rechaza iniciativas de IA por instinto, no por criterio, porque nadie ha traducido los conceptos técnicos a preguntas que el liderazgo pueda evaluar.",
    body: [
      "Un taller práctico para que directivos entiendan qué preguntar, qué validar y qué riesgos evaluar antes de aprobar cualquier iniciativa de IA — sin necesidad de formación técnica previa.",
      "Se conecta directamente con el gobierno de IA corporativo que diseñamos en Cyrrus Intelligence Lab, para que la capacitación del liderazgo y la arquitectura técnica hablen el mismo idioma.",
    ],
  },
  {
    slug: "innovacion-empresarial",
    title: "Taller de innovación empresarial",
    eyebrow: "Leadership Academy",
    intro:
      "Hay presupuesto de innovación y ninguna forma de decidir en qué invertirlo sin perseguir la última tendencia.",
    body: [
      "Trabajamos con el equipo directivo un marco de priorización que evita perseguir tendencias y en cambio conecta cada iniciativa de innovación con impacto medible en el negocio.",
      "El taller se apoya en el mismo enfoque de diagnóstico que usamos en la fase de Planeación Estratégica del método CIRA.",
    ],
  },
  {
    slug: "iso-27001",
    title: "Capacitación ISO 27001 para empresas",
    eyebrow: "Leadership Academy",
    intro:
      "Un cliente grande exige certificación ISO 27001 y nadie en la organización sabe por dónde empezar.",
    body: [
      "Preparamos a los equipos de liderazgo y de TI en los fundamentos de ISO 27001, con foco en cómo aplican directamente al gobierno de datos y de inteligencia artificial de la empresa.",
      "Complementa la evaluación de soluciones de ciberseguridad que hacemos en la fase de Selección de Soluciones del método CIRA.",
    ],
  },
  {
    slug: "continuidad-de-negocio-drp",
    title: "Taller de continuidad de negocio (DRP)",
    eyebrow: "Leadership Academy",
    intro:
      "Nunca han probado qué pasa si el sistema principal cae un lunes a las 9am — y un plan de continuidad que no se prueba no es un plan.",
    body: [
      "Un plan de continuidad de negocio que nunca se ha probado no es un plan. Este taller lleva a los equipos a diseñar y ensayar su plan de recuperación ante desastres (DRP) con escenarios reales.",
      "Ideal para organizaciones que ya migraron o están migrando infraestructura crítica a la nube.",
    ],
  },
  {
    slug: "gestion-del-cambio-para-lideres",
    title: "Gestión del cambio para líderes",
    eyebrow: "Leadership Academy",
    intro:
      "Los mandos medios boicotean en silencio cada iniciativa nueva, y la adopción se cae en cuanto Cyrrus se retira.",
    body: [
      "Formamos a los líderes internos del cliente en las mismas herramientas de gestión del cambio que aplicamos durante un proyecto, para que la adopción se sostenga después de que Cyrrus se retire.",
      "Este taller es la extensión natural de la fase de Adopción del método CIRA hacia el equipo de liderazgo interno.",
    ],
  },
  {
    slug: "gobierno-de-datos-para-ejecutivos",
    title: "Gobierno de datos para ejecutivos",
    eyebrow: "Leadership Academy",
    intro:
      "Cada área defiende su propia versión de la cifra correcta, y las juntas directivas se van en discutir cuál dato es el verdadero.",
    body: [
      "Un taller para que el liderazgo entienda su rol real en el gobierno de datos: qué debe decidir personalmente, qué puede delegar, y con qué controles hacerlo con confianza.",
      "Se conecta con la arquitectura de IA empresarial que definimos en Cyrrus Intelligence Lab.",
    ],
  },
  {
    slug: "liderazgo-digital-y-toma-de-decisiones",
    title: "Liderazgo digital y toma de decisiones",
    eyebrow: "Leadership Academy",
    intro:
      "El comité decide con la misma intuición de hace diez años, ahora aplicada a decisiones de IA y transformación digital.",
    body: [
      "Trabajamos con el equipo directivo las decisiones críticas de ritmo, priorización y calidad que determinan si un proyecto de transformación digital llega a buen puerto.",
      "Un cierre natural para líderes que ya pasaron por los talleres de IA, innovación y gestión del cambio de Leadership Academy.",
    ],
  },
];

export function getWorkshopBySlug(slug: string | undefined) {
  return workshops.find((w) => w.slug === slug);
}
