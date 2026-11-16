import { IA_HERO_MEDIA } from "@/lib/service-media";
import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

export default createServiceChildPage({
  ns: "intelligence-lab",
  key: "gobierno",
  path: "/intelligence-lab/gobierno-de-ia",
  parent: { path: "/intelligence-lab", label: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" } },
  group: "ia",
  eyebrow: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" },
  heroVideo: { ...IA_HERO_MEDIA.video, poster: IA_HERO_MEDIA.image.src },
  heroImage: {
    src: "/assets/decoracion/1785866224151.jpg",
    alt: "Consultor de Cyrrus con notebook frente a pantallas de trabajo",
  },
  bodyImage: {
    src: "/assets/decoracion/IMG_20230228_083642.jpg",
    alt: "Consultor de Cyrrus trabajando en políticas y controles de datos",
  },
  cardImages: [
    "/assets/decoracion/Cyrrus panel.jpg",
    "/assets/decoracion/IMG_20230228_083642.jpg",
    "/assets/decoracion/Portada.jpg",
  ],
  authorityImage: {
    src: "/assets/decoracion/Evento mesas.jpg",
    alt: "Mesas de trabajo en un evento de Cyrrus",
  },
  relatedPaths: [
    "/intelligence-lab/arquitectura-de-ia",
    "/intelligence-lab/automatizaciones-desarrollo",
    "/metodo-cira/gestion-del-cambio",
    "/intelligence-lab/gobierno-de-datos",
  ],
  articleSlug: "gobierno-de-ia-corporativo-en-la-empresa",
});
