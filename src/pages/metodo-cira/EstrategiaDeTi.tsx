import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/estrategia";

export default createServiceChildPage({
  ns: "estrategia",
  key: "estrategiaTi",
  path: "/servicios/estrategia/estrategia-de-ti",
  parent: { path: "/servicios/estrategia", label: { es: "Estrategia", en: "Strategy" } },
  group: "estrategia",
  eyebrow: { es: "Método CIRA — Construir", en: "CIRA Method — Construct" },
  heroVideo: true,
  heroImage: {
    src: "/assets/decoracion/IMG_20230228_082627.jpg",
    alt: "Consultor de Cyrrus revisando la arquitectura tecnológica objetivo con un directivo",
  },
  bodyImage: {
    src: "/assets/decoracion/IMG_20200313_092604173.jpg",
    alt: "Sesión de trabajo de estrategia de TI con el equipo directivo",
  },
  relatedPaths: [
    "/servicios/estrategia",
    "/servicios/seleccion-de-soluciones",
    "/servicios/inteligencia-artificial/arquitectura-de-ia",
    "/servicios/gerencia-de-proyectos",
  ],
  articleSlug: "estrategia-de-ti-que-es-y-que-incluye",
});
