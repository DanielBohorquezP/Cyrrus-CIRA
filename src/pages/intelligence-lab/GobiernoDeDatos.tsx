import { IA_HERO_MEDIA } from "@/lib/service-media";
import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

export default createServiceChildPage({
  ns: "intelligence-lab",
  key: "gobiernoDatos",
  path: "/intelligence-lab/gobierno-de-datos",
  parent: { path: "/intelligence-lab", label: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" } },
  group: "ia",
  eyebrow: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" },
  heroVideo: { ...IA_HERO_MEDIA.video, poster: IA_HERO_MEDIA.image.src },
  heroImage: {
    src: "/assets/decoracion/1785866224006.jpg",
    alt: "Consultor de Cyrrus revisando tableros de datos con un equipo directivo",
  },
  bodyImage: {
    src: "/assets/decoracion/IMG_20230228_083642.jpg",
    alt: "Consultor de Cyrrus trabajando en políticas y controles de datos",
  },
  relatedPaths: [
    "/intelligence-lab/gobierno-de-ia",
    "/intelligence-lab/arquitectura-de-ia",
    "/leadership-academy/gobierno-de-datos-para-ejecutivos",
    "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/crm",
  ],
  articleSlug: "gobernanza-y-deduplicacion-de-datos-en-el-crm",
});
