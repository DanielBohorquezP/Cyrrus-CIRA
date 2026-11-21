import { IA_HERO_MEDIA } from "@/lib/service-media";
import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

export default createServiceChildPage({
  ns: "intelligence-lab",
  key: "arquitectura",
  path: "/servicios/inteligencia-artificial/arquitectura-de-ia",
  parent: { path: "/servicios/inteligencia-artificial", label: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" } },
  group: "ia",
  eyebrow: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" },
  heroVideo: { ...IA_HERO_MEDIA.video, poster: IA_HERO_MEDIA.image.src },
  heroImage: {
    src: "/assets/decoracion/1785866224006.jpg",
    alt: "Pantalla de trabajo con modelos de IA y datos conectados en Cyrrus",
  },
  bodyImage: {
    src: "/assets/decoracion/1785866223775.jpg",
    alt: "Escritorio con monitores mostrando la plataforma de Cyrrus",
  },
  relatedPaths: [
    "/servicios/inteligencia-artificial/gobierno-de-ia",
    "/servicios/inteligencia-artificial/automatizacion-y-agentes-ia",
    "/servicios/seleccion-de-soluciones/seleccion-de-software/erp",
  ],
});
