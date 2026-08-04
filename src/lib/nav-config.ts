export interface NavChild {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  comingSoon?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  {
    label: "Método CIRA",
    href: "/metodo-cira",
    children: [
      {
        label: "Planeación Estratégica",
        href: "/metodo-cira/planeacion-estrategica",
        description: "Diagnóstico y hoja de ruta de negocio",
      },
      {
        label: "Selección de Soluciones",
        href: "/metodo-cira/seleccion-de-soluciones",
        description: "Elegimos la tecnología correcta, sin sesgo",
        children: [
          {
            label: "Tecnologías Maduras",
            href: "/metodo-cira/seleccion-de-soluciones/tecnologias-maduras",
            description: "ERP, CRM, HCM...",
          },
          {
            label: "Tecnologías Avanzadas",
            href: "/metodo-cira/seleccion-de-soluciones/tecnologias-avanzadas",
            description: "Automatizaciones, Inteligencia Artificial, Blockchain...",
          },
          {
            label: "Infraestructura Tecnológica",
            href: "/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica",
            description: "Ciberseguridad, Redes, Nube, Conectividad...",
          },
        ],
      },
      {
        label: "Gerencia de Proyectos",
        href: "/metodo-cira/gestion-de-proyectos",
        description: "PMO externo desde el kickoff hasta el go-live",
      },
      {
        label: "Gestión del Cambio",
        href: "/metodo-cira/gestion-del-cambio",
        description: "Adopción real por parte de su equipo",
      },
    ],
  },
  {
    label: "Cyrrus Intelligence Lab",
    href: "/intelligence-lab",
    children: [
      {
        label: "Automatización y Agentes IA",
        href: "/intelligence-lab/automatizaciones-desarrollo",
        description: "Automatización con propósito, no desarrollo por defecto",
      },
      {
        label: "Arquitectura de IA",
        href: "/intelligence-lab/arquitectura-de-ia",
        description: "Modelos, datos y sistemas conectados sin caos",
      },
      {
        label: "Gobierno de IA",
        href: "/intelligence-lab/gobierno-de-ia",
        description: "Políticas y controles claros sobre el uso de IA",
      },
    ],
  },
  {
    label: "Leadership Academy",
    href: "/leadership-academy",
    children: [
      {
        label: "Taller de IA para Directivos",
        href: "/leadership-academy/ia-para-directivos",
        description: "IA aplicada a la toma de decisiones",
        comingSoon: true,
      },
      {
        label: "Innovación Empresarial",
        href: "/leadership-academy/innovacion-empresarial",
        description: "Cultura e iniciativas de innovación",
        comingSoon: true,
      },
      {
        label: "ISO 27001 para Empresas",
        href: "/leadership-academy/iso-27001",
        description: "Gestión de seguridad de la información",
        comingSoon: true,
      },
      {
        label: "Continuidad de Negocio (DRP)",
        href: "/leadership-academy/continuidad-de-negocio-drp",
        description: "Planes de recuperación ante desastres",
        comingSoon: true,
      },
      {
        label: "Gestión del Cambio para Líderes",
        href: "/leadership-academy/gestion-del-cambio-para-lideres",
        description: "Liderar la adopción del cambio",
        comingSoon: true,
      },
      {
        label: "Gobierno de Datos para Ejecutivos",
        href: "/leadership-academy/gobierno-de-datos-para-ejecutivos",
        description: "Datos confiables para decidir mejor",
        comingSoon: true,
      },
      {
        label: "Liderazgo Digital y Toma de Decisiones",
        href: "/leadership-academy/liderazgo-digital-y-toma-de-decisiones",
        description: "Decisiones informadas por datos e IA",
        comingSoon: true,
      },
    ],
  },
  {
    label: "Experiencia",
    href: "/experiencia",
  },
  {
    label: "Quiénes Somos",
    href: "/quienes-somos",
  },
  {
    label: "Perspectivas",
    href: "/perspectivas",
  },
];
