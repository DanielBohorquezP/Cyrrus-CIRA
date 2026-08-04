export interface SolutionEntry {
  slug: string;
  label: string;
  eyebrow: string;
  intro: string;
  body: string[];
}

export const solutions: SolutionEntry[] = [
  {
    slug: "tecnologias-maduras",
    label: "Tecnologías Maduras",
    eyebrow: "Selección de Soluciones — Tecnologías Maduras",
    intro:
      "Elegir por moda o por lo que vende el proveedor de turno es el error más costoso en transformación digital. Nuestra consultoría de selección de tecnologías maduras (ERP, CRM, HCM, aplicaciones de negocio, BI) parte de sus procesos reales, no de una demo bonita.",
    body: [
      "Evaluamos proveedores de forma 100% agnóstica: definimos primero los requerimientos del negocio, después comparamos opciones con criterios objetivos y medibles — funcionalidad, costo total de propiedad, escalabilidad y ajuste cultural.",
      "El resultado: la solución correcta seleccionada en semanas, no en meses, con el riesgo de una mala decisión tecnológica minimizado desde el inicio.",
    ],
  },
  {
    slug: "tecnologias-avanzadas",
    label: "Tecnologías Avanzadas",
    eyebrow: "Selección de Soluciones — Tecnologías Avanzadas",
    intro:
      "Automatizaciones, inteligencia artificial, blockchain, RPA y analítica avanzada solo generan valor cuando responden a un caso de uso de negocio real, no a la novedad tecnológica del momento.",
    body: [
      "Evaluamos su nivel de madurez de datos y procesos antes de recomendar cualquier plataforma, y comparamos opciones con criterios objetivos de escalabilidad, integración y retorno esperado — sin sesgo hacia ninguna marca.",
      "Acompañamos la decisión hasta la implementación, conectada con Cyrrus Intelligence Lab y nuestra gestión del cambio para asegurar adopción real por parte de los equipos.",
    ],
  },
  {
    slug: "infraestructura-tecnologica",
    label: "Infraestructura Tecnológica",
    eyebrow: "Selección de Soluciones — Infraestructura Tecnológica",
    intro:
      "La infraestructura empresarial — ciberseguridad, redes, nube, conectividad, continuidad y respaldo — no se resuelve comprando la herramienta más cara del mercado, sino la que responde a su nivel real de riesgo y arquitectura.",
    body: [
      "Evaluamos su exposición actual y arquitectura vigente, y seleccionamos las soluciones de infraestructura que corresponden a su madurez y presupuesto reales, integradas al resto de su ecosistema de TI.",
      "Trabajamos de la mano con Cyrrus Intelligence Lab cuando la solución requiere gobierno de datos o de IA como parte del control de riesgo.",
    ],
  },
];

export function getSolutionBySlug(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug);
}
