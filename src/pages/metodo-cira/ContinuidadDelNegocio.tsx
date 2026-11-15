import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/estrategia";

export default createServiceChildPage({
  ns: "estrategia",
  key: "continuidad",
  path: "/metodo-cira/estrategia/continuidad-del-negocio",
  parent: { path: "/metodo-cira/estrategia", label: { es: "Estrategia", en: "Strategy" } },
  eyebrow: { es: "Método CIRA — Construir", en: "CIRA Method — Construct" },
  heroImage: {
    src: "/assets/decoracion/IMG_20230302_112825.jpg",
    alt: "Equipo de Cyrrus revisando un plan de continuidad del negocio en una sala de reuniones",
  },
  bodyImage: {
    src: "/assets/decoracion/IMG_20240822_085440_710.jpg",
    alt: "Consultor de Cyrrus explicando un análisis de impacto en el negocio",
  },
  relatedPaths: [
    "/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica",
    "/metodo-cira/seleccion-de-soluciones/ciberseguridad",
    "/leadership-academy/continuidad-de-negocio-drp",
    "/metodo-cira/gestion-de-proyectos",
  ],
  articleSlug: "plan-de-continuidad-del-negocio-que-es-bia-rto-rpo",
});
