import { IA_HERO_MEDIA } from "@/lib/service-media";
import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

export default createServiceChildPage({
  ns: "intelligence-lab",
  key: "estrategiaIa",
  path: "/intelligence-lab/estrategia-de-ia",
  parent: { path: "/intelligence-lab", label: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" } },
  group: "ia",
  eyebrow: { es: "Cyrrus Intelligence Lab", en: "Cyrrus Intelligence Lab" },
  heroVideo: { ...IA_HERO_MEDIA.video, poster: IA_HERO_MEDIA.image.src },
  heroImage: {
    src: "/assets/decoracion/1785866223529.jpg",
    alt: "Directivos y consultor de Cyrrus definiendo una hoja de ruta de inteligencia artificial",
  },
  bodyImage: {
    src: "/assets/decoracion/1785872413166.jpg",
    alt: "Sesión de trabajo sobre casos de uso de IA en una empresa",
  },
  relatedPaths: [
    "/intelligence-lab/gobierno-de-ia",
    "/intelligence-lab/arquitectura-de-ia",
    "/intelligence-lab/automatizaciones-desarrollo",
    "/metodo-cira/estrategia/estrategia-de-ti",
  ],
  articleSlug: "que-es-gobernanza-de-ia-y-que-marcos-usar",
});
