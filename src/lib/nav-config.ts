import type { TFunction } from "i18next";
import type { Lang } from "@/lib/language";

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

/**
 * Builds the nav tree for the given language. Only Home ("/") and Método
 * CIRA ("/metodo-cira") currently have an English page, so in "en" mode
 * those two links point into /en/... while every other link (no translated
 * page yet) still points at its Spanish page — only the label changes.
 */
export function getNavItems(t: TFunction, lang: Lang): NavItem[] {
  return [
    {
      label: t("nav.metodoCira", { ns: "common" }),
      href: lang === "en" ? "/en/metodo-cira" : "/metodo-cira",
      children: [
        {
          label: t("nav.estrategia", { ns: "common" }),
          href: "/metodo-cira/planeacion-estrategica",
          description: t("nav.estrategiaDesc", { ns: "common" }),
        },
        {
          label: t("nav.seleccionSoluciones", { ns: "common" }),
          href: "/metodo-cira/seleccion-de-soluciones",
          description: t("nav.seleccionSolucionesDesc", { ns: "common" }),
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
          label: t("nav.gerenciaProyectos", { ns: "common" }),
          href: "/metodo-cira/gestion-de-proyectos",
          description: t("nav.gerenciaProyectosDesc", { ns: "common" }),
        },
        {
          label: t("nav.gestionCambio", { ns: "common" }),
          href: "/metodo-cira/gestion-del-cambio",
          description: t("nav.gestionCambioDesc", { ns: "common" }),
        },
      ],
    },
    {
      label: t("nav.intelligenceLab", { ns: "common" }),
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
      label: t("nav.leadershipAcademy", { ns: "common" }),
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
      label: t("nav.experiencia", { ns: "common" }),
      href: "/experiencia",
    },
    {
      label: t("nav.quienesSomos", { ns: "common" }),
      href: "/quienes-somos",
    },
    {
      label: t("nav.perspectivas", { ns: "common" }),
      href: "/perspectivas",
    },
  ];
}
