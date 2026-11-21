import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/comercial";

// Top-level category, separate from Estrategia and from the CIRA method
// (client decision, 2026-11-20): no parent in the trail, no CIRA link.
export default createServiceChildPage({
  ns: "comercial",
  key: "comercial",
  path: "/servicios/comercial",
  eyebrow: { es: "Comercial", en: "Commercial" },
  heroLink: { path: "/servicios/comercial/plan-de-accion-2027", label: { es: "Ver el Plan de Acción 2027", en: "See the 2027 Action Plan" } },
  heroVideo: true,
  heroImage: {
    src: "/assets/decoracion/estrategia-comercial-niebla.jpg",
    alt: "Camino entre montañas y niebla al amanecer",
  },
  bodyImage: {
    src: "/assets/decoracion/estrategia-comercial-mar.jpg",
    alt: "Costa y mar abierto bajo un cielo despejado",
  },
  relatedPaths: [
    "/servicios/comercial/plan-de-accion-2027",
    "/servicios/estrategia",
    "/servicios/estrategia/estrategia-de-ti",
    "/servicios/estrategia/continuidad-del-negocio",
    "/servicios/gestion-del-cambio",
  ],
});
