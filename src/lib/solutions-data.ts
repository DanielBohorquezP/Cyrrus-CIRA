import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cloud,
  HeartHandshake,
  Layers3,
  LifeBuoy,
  Link2,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wifi,
  Workflow,
} from "lucide-react";

export interface SolutionItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionStat {
  value: string;
  description: string;
  source: string;
}

export interface SolutionEntry {
  slug: string;
  label: string;
  eyebrow: string;
  intro: string;
  image: string;
  stat?: SolutionStat;
  items: SolutionItem[];
}

export const solutions: SolutionEntry[] = [
  {
    slug: "tecnologias-maduras",
    label: "Tecnologías Maduras",
    eyebrow: "Selección de Soluciones — Tecnologías Maduras",
    intro:
      "Son el corazón operativo de la organización. Permiten estandarizar procesos, fortalecer la operación y crear una base sólida para crecer.",
    image: "/assets/decoracion/1785866223529.jpg",
    stat: {
      value: "+70%",
      description: "de las iniciativas ERP no alcanzan completamente los objetivos del negocio.",
      source: "Gartner",
    },
    items: [
      {
        icon: Boxes,
        title: "ERP",
        description:
          "Integramos los procesos financieros, comerciales, logísticos, productivos y administrativos sobre una plataforma preparada para acompañar el crecimiento del negocio.",
      },
      {
        icon: Users,
        title: "CRM",
        description:
          "Seleccionamos soluciones que fortalecen la relación con los clientes, optimizan el proceso comercial y mejoran la experiencia en cada interacción.",
      },
      {
        icon: UserCog,
        title: "HCM",
        description:
          "Ayudamos a identificar plataformas que potencian la gestión del talento, fortalecen el desarrollo de las personas y acompañan la evolución de la organización.",
      },
      {
        icon: Layers3,
        title: "EAM",
        description:
          "Seleccionamos soluciones para administrar activos físicos, optimizar el mantenimiento y mejorar la confiabilidad operacional.",
      },
    ],
  },
  {
    slug: "tecnologias-avanzadas",
    label: "Tecnologías Avanzadas",
    eyebrow: "Selección de Soluciones — Tecnologías Avanzadas",
    intro:
      "Las nuevas tecnologías solo generan valor cuando responden a una necesidad real del negocio. Nuestro papel consiste en identificar dónde pueden generar el mayor impacto y cuáles son las alternativas más adecuadas para cada organización.",
    image: "/assets/decoracion/1785872413166.jpg",
    items: [
      {
        icon: Sparkles,
        title: "Inteligencia Artificial",
        description:
          "Desde asistentes inteligentes hasta modelos avanzados de analítica, identificamos oportunidades donde la tecnología puede aumentar la productividad, mejorar la toma de decisiones y acelerar la creación de valor.",
      },
      {
        icon: Workflow,
        title: "Automatización",
        description:
          "Seleccionamos plataformas que simplifican procesos, eliminan tareas repetitivas y permiten que las personas dediquen más tiempo a actividades estratégicas.",
      },
      {
        icon: Link2,
        title: "Blockchain",
        description:
          "Evaluamos soluciones para organizaciones que requieren mayores niveles de trazabilidad, confianza e intercambio seguro de información.",
      },
    ],
  },
  {
    slug: "infraestructura-tecnologica",
    label: "Infraestructura Tecnológica",
    eyebrow: "Selección de Soluciones — Infraestructura Tecnológica",
    intro:
      "La infraestructura adecuada crea las condiciones para que el negocio opere con seguridad, disponibilidad y capacidad de crecimiento.",
    image: "/assets/decoracion/IMG_20230227_164308.jpg",
    items: [
      {
        icon: ShieldCheck,
        title: "Ciberseguridad",
        description:
          "Seleccionamos soluciones para proteger la operación mediante arquitecturas modernas de seguridad, protección de identidades, gestión de dispositivos, monitoreo y respuesta ante incidentes.",
      },
      {
        icon: Cloud,
        title: "Cloud",
        description:
          "Acompañamos la selección de arquitecturas Cloud, Híbridas y Multicloud que aporten flexibilidad, escalabilidad y eficiencia a largo plazo.",
      },
      {
        icon: Wifi,
        title: "Conectividad",
        description:
          "Diseñamos y seleccionamos soluciones LAN, WLAN, WAN, SD-WAN e Internet que soporten la operación del negocio con altos niveles de disponibilidad y desempeño.",
      },
      {
        icon: LifeBuoy,
        title: "Continuidad del Negocio",
        description:
          "Ayudamos a definir las capacidades necesarias para proteger la operación mediante estrategias de continuidad, recuperación ante desastres y alta disponibilidad.",
      },
    ],
  },
];

export const solutionsClosingQuote =
  "No ayudamos a nuestros clientes a elegir soluciones tecnológicas, los ayudamos a tomar decisiones que fortalecen y transforman su organización.";

export const solutionsClosingIcon = HeartHandshake;

export function getSolutionBySlug(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug);
}
