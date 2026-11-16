import type { HeroVideo } from "@/components/sections/service-hero";

/**
 * Shared media of the service-page template.
 *
 * The hero video is a silent, ~10s loop re-encoded from the design
 * file (h264 mp4, 0.2-0.7MB each, 1024px). Its poster is also the first paint: the
 * video is only mounted after hydration (see ServiceHero).
 */
export const SERVICE_HERO_VIDEO: HeroVideo = {
  mp4: "/assets/video/hero-servicio.mp4",
};

export const SERVICE_HERO_POSTER = { src: "/assets/decoracion/hero-servicio.jpg" };

/**
 * Photos for "Qué hacemos" cards (and the authority band) when a page does not
 * pick its own. Existing files in public/assets/decoracion.
 */
export const CARD_IMAGE_POOL = [
  "/assets/decoracion/Cyrrus panel.jpg",
  "/assets/decoracion/IMG_20230228_083642.jpg",
  "/assets/decoracion/Portada.jpg",
  "/assets/decoracion/Cascosss.jpg",
  "/assets/decoracion/IMG_20230302_112825.jpg",
  "/assets/decoracion/IMG_20230227_164810.jpg",
  "/assets/decoracion/IMG_20200313_092604173.jpg",
  "/assets/decoracion/IMG_20200313_092701647.jpg",
];

/** Hero media of the whole "Selección de soluciones" group (hub, software, products, advanced tech, infrastructure, cybersecurity). */
export const SOLUCIONES_HERO_MEDIA = {
  image: { src: "/assets/decoracion/hero-seleccion-soluciones.jpg", alt: "" },
  video: { mp4: "/assets/video/seleccion-soluciones.mp4" },
};

/** Hero media of the whole Intelligence Lab group (hub and its five service pages). */
export const IA_HERO_MEDIA = {
  image: { src: "/assets/decoracion/hero-inteligencia-artificial.jpg", alt: "" },
  video: { mp4: "/assets/video/inteligencia-artificial.mp4" },
};
