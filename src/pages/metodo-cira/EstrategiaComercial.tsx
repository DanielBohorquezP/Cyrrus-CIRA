import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/estrategia";

export default createServiceChildPage({
  ns: "estrategia",
  key: "estrategiaComercial",
  path: "/metodo-cira/estrategia/estrategia-comercial",
  parent: { path: "/metodo-cira/estrategia", label: { es: "Estrategia", en: "Strategy" } },
  group: "estrategia",
  eyebrow: { es: "Método CIRA — Construir", en: "CIRA Method — Construct" },
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
    "/metodo-cira/estrategia",
    "/metodo-cira/estrategia/estrategia-de-ti",
    "/metodo-cira/estrategia/continuidad-del-negocio",
    "/metodo-cira/gestion-del-cambio",
  ],
});
