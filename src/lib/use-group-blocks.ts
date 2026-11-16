import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language";
import type { ServiceContent } from "@/components/layout/service-template";
import type { FaqItem } from "@/components/sections/faq-section";

/**
 * The service groups of the site. Pages inside one group share the method and
 * the "Por qué Cyrrus" block of their parent service, so every service page
 * ends up with the same sections even when it has no copy of its own for one.
 */
export type ServiceGroup = "estrategia" | "soluciones" | "proyectos" | "cambio" | "ia" | "digital";

const AUTHORITY_IMAGE: Record<ServiceGroup, { src: string; alt: string }> = {
  estrategia: { src: "/assets/decoracion/Evento mesas.jpg", alt: "" },
  soluciones: { src: "/assets/decoracion/evento-panel-universidad-bolivar.jpeg", alt: "" },
  proyectos: { src: "/assets/decoracion/IMG_20230228_091017.jpg", alt: "" },
  cambio: { src: "/assets/decoracion/Trabajo.jpg", alt: "" },
  ia: { src: "/assets/decoracion/Cyrrus panel.jpg", alt: "" },
  digital: { src: "/assets/decoracion/IMG_20230228_082627.jpg", alt: "" },
};

interface AuthorityJson {
  title: string;
  body?: string;
  description?: string;
  stats: { value: string; label: string }[];
}

type Blocks = Pick<ServiceContent, "autoridad">;

/**
 * "Por qué Cyrrus" for a group, read from copy that is already on the site.
 * A page's own block wins over this; this only fills the gap. ("Cómo lo hacemos"
 * is never inherited: every service page writes its own steps, framed around its
 * client's problem and what the client receives.)
 *
 * The namespaces it reads (`estrategia`, `seleccion-soluciones`,
 * `gestion-proyectos`, `gestion-cambio`, `intelligence-lab`) have to be
 * registered by the route that calls it; a missing one simply yields no block.
 */
export function useGroupBlocks(group?: ServiceGroup): Blocks {
  const { i18n } = useTranslation();
  const lang = useLang();
  if (!group) return {};

  const tx = (ns: string) => i18n.getFixedT(lang, ns);
  const has = (ns: string, key: string) => i18n.exists(key, { ns, lng: lang });

  let raw: AuthorityJson | undefined;
  const read = (ns: string, key: string) => (has(ns, key) ? (tx(ns)(key, { returnObjects: true }) as AuthorityJson) : undefined);
  if (group === "estrategia") raw = read("estrategia", "whyCeos");
  else if (group === "soluciones") raw = read("seleccion-soluciones", "detail.entries.tecnologias-avanzadas.autoridad");
  else if (group === "proyectos") raw = read("gestion-proyectos", "autoridad");
  else if (group === "cambio") raw = read("gestion-cambio", "autoridad");
  else if (group === "ia") raw = read("intelligence-lab", "hub.autoridad");

  const autoridad: Blocks["autoridad"] = raw
    ? { title: raw.title, body: raw.body ?? raw.description ?? "", stats: raw.stats, image: AUTHORITY_IMAGE[group] }
    : undefined;

  return { autoridad };
}

/** "Qué es": the page's own "¿Qué es …?" FAQ, used when it has no dedicated definition block. */
export function definitionFromFaq(faqs: FaqItem[]): ServiceContent["queEs"] {
  const hit = faqs.find((f) => /^¿?\s*(qué|what)\s+(es|son|hace|is|are|does)\b/i.test(f.question));
  return hit ? { title: hit.question, body: hit.answer, refs: [] } : undefined;
}
