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
 * Builds the nav tree for the given language. Every page now has an /en
 * counterpart at the same slug, so hrefs are just prefixed for "en".
 */
export function getNavItems(t: TFunction, lang: Lang): NavItem[] {
  const p = (path: string) => (lang === "en" ? `/en${path}` : path);

  return [
    {
      label: t("nav.metodoCira", { ns: "common" }),
      href: p("/metodo-cira"),
      children: [
        {
          label: t("nav.estrategia", { ns: "common" }),
          href: p("/metodo-cira/planeacion-estrategica"),
          description: t("nav.estrategiaDesc", { ns: "common" }),
        },
        {
          label: t("nav.seleccionSoluciones", { ns: "common" }),
          href: p("/metodo-cira/seleccion-de-soluciones"),
          description: t("nav.seleccionSolucionesDesc", { ns: "common" }),
          children: [
            {
              label: t("nav.seleccionSoftware", { ns: "common" }),
              href: p("/metodo-cira/seleccion-de-soluciones/seleccion-de-software"),
              description: t("nav.seleccionSoftwareDesc", { ns: "common" }),
            },
            {
              label: t("nav.tecnologiasAvanzadas", { ns: "common" }),
              href: p("/metodo-cira/seleccion-de-soluciones/tecnologias-avanzadas"),
              description: t("nav.tecnologiasAvanzadasDesc", { ns: "common" }),
            },
            {
              label: t("nav.infraestructuraTecnologica", { ns: "common" }),
              href: p("/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica"),
              description: t("nav.infraestructuraTecnologicaDesc", { ns: "common" }),
            },
          ],
        },
        {
          label: t("nav.gerenciaProyectos", { ns: "common" }),
          href: p("/metodo-cira/gestion-de-proyectos"),
          description: t("nav.gerenciaProyectosDesc", { ns: "common" }),
        },
        {
          label: t("nav.gestionCambio", { ns: "common" }),
          href: p("/metodo-cira/gestion-del-cambio"),
          description: t("nav.gestionCambioDesc", { ns: "common" }),
        },
      ],
    },
    {
      label: t("nav.intelligenceLab", { ns: "common" }),
      href: p("/intelligence-lab"),
      children: [
        {
          label: t("nav.automatizacionAgentes", { ns: "common" }),
          href: p("/intelligence-lab/automatizaciones-desarrollo"),
          description: t("nav.automatizacionAgentesDesc", { ns: "common" }),
        },
        {
          label: t("nav.arquitecturaIA", { ns: "common" }),
          href: p("/intelligence-lab/arquitectura-de-ia"),
          description: t("nav.arquitecturaIADesc", { ns: "common" }),
        },
        {
          label: t("nav.gobiernoIA", { ns: "common" }),
          href: p("/intelligence-lab/gobierno-de-ia"),
          description: t("nav.gobiernoIADesc", { ns: "common" }),
        },
      ],
    },
    {
      label: t("nav.leadershipAcademy", { ns: "common" }),
      href: p("/leadership-academy"),
      children: [
        {
          label: t("nav.tallerIADirectivos", { ns: "common" }),
          href: p("/leadership-academy/ia-para-directivos"),
          description: t("nav.tallerIADirectivosDesc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.innovacionEmpresarial", { ns: "common" }),
          href: p("/leadership-academy/innovacion-empresarial"),
          description: t("nav.innovacionEmpresarialDesc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.iso27001", { ns: "common" }),
          href: p("/leadership-academy/iso-27001"),
          description: t("nav.iso27001Desc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.continuidadNegocio", { ns: "common" }),
          href: p("/leadership-academy/continuidad-de-negocio-drp"),
          description: t("nav.continuidadNegocioDesc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.gestionCambioLideres", { ns: "common" }),
          href: p("/leadership-academy/gestion-del-cambio-para-lideres"),
          description: t("nav.gestionCambioLideresDesc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.gobiernoDatos", { ns: "common" }),
          href: p("/leadership-academy/gobierno-de-datos-para-ejecutivos"),
          description: t("nav.gobiernoDatosDesc", { ns: "common" }),
          comingSoon: true,
        },
        {
          label: t("nav.liderazgoDigital", { ns: "common" }),
          href: p("/leadership-academy/liderazgo-digital-y-toma-de-decisiones"),
          description: t("nav.liderazgoDigitalDesc", { ns: "common" }),
          comingSoon: true,
        },
      ],
    },
    {
      label: t("nav.experiencia", { ns: "common" }),
      href: p("/experiencia"),
    },
    {
      label: t("nav.quienesSomos", { ns: "common" }),
      href: p("/quienes-somos"),
    },
    {
      label: t("nav.perspectivas", { ns: "common" }),
      href: p("/perspectivas"),
    },
  ];
}
