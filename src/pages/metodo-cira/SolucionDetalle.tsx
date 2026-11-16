import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { solutionCategoryImages, solutionDetailImages, solutionSlugs } from "@/lib/solutions-icons";
import { useGroupBlocks } from "@/lib/use-group-blocks";
import { CARD_IMAGE_POOL, SOLUCIONES_HERO_MEDIA } from "@/lib/service-media";
import { ServiceTemplate, buildServiceJsonLd, type ServiceContent } from "@/components/layout/service-template";
import { splitHeroTitle } from "@/components/layout/service-child-page";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-soluciones";

interface Item {
  title: string;
  description: string;
}

interface DetailEntry {
  label: string;
  eyebrow: string;
  /** Optional H1 override; falls back to "Selection consulting for <label>". */
  h1?: string;
  intro: string;
  /** Optional answer-first block rendered right under the hero. */
  answer?: { eyebrow: string; title: string; body: string; items: Item[] };
  /** Optional links to published guides (perspectivas slugs). */
  guides?: { eyebrow: string; title: string; items: { slug: string; title: string; description: string }[] };
  stat?: { value: string; description: string; source: string };
  items: Item[];
  /** Optional long-form paragraphs rendered under the items grid. */
  body?: string[];
  related: Item[];
  faq: { question: string; answer: string }[];
  // Blocks of the service-page template. Each one is optional: when it is
  // missing, the older keys above fill in (items → cards, answer → "Qué es").
  queHacemos?: {
    quote: string;
    emphasis?: string;
    intro?: string;
    cards?: { title: string; text: string; image?: string; alt?: string }[];
  };
  queEs?: { title: string; body: string; refsLabel?: string; refs: Item[] };
  comoLoHacemos?: { title: string; intro?: string; steps: Item[] };
  autoridad?: { title: string; body: string; stats: { value: string; label: string }[] };
  beneficios?: { title: string; intro?: string; items: Item[] };
  usos?: { title: string; items: Item[] };
}

const relatedPathsBySlug: Record<string, string[]> = {
  "tecnologias-avanzadas": [
    "/intelligence-lab/gobierno-de-ia",
    "/intelligence-lab/automatizaciones-desarrollo",
    "/metodo-cira/gestion-del-cambio",
  ],
  "infraestructura-tecnologica": [
    "/intelligence-lab/arquitectura-de-ia",
    "/metodo-cira/gestion-de-proyectos",
    "/metodo-cira/gestion-del-cambio",
    "/leadership-academy/iso-27001",
    "/leadership-academy/continuidad-de-negocio-drp",
    "/metodo-cira/seleccion-de-soluciones/ciberseguridad",
    "/metodo-cira/estrategia/continuidad-del-negocio",
  ],
  ciberseguridad: [
    "/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica",
    "/metodo-cira/estrategia/continuidad-del-negocio",
    "/metodo-cira/gestion-de-proyectos",
    "/leadership-academy/iso-27001",
  ],
};

export default function SolucionDetalle() {
  const { solucion } = useParams();
  const { t } = useTranslation("seleccion-soluciones");
  const { t: tc } = useTranslation();
  const lang = useLang();
  const groupBlocks = useGroupBlocks("soluciones");
  const prefix = lang === "en" ? "/en" : "";

  const slug = solutionSlugs.find((s) => s === solucion);
  const entry = slug ? (t(`detail.entries.${slug}`, { returnObjects: true }) as DetailEntry) : undefined;
  const meta = slug ? (t(`detailMeta.${slug}`, { returnObjects: true }) as { title: string; description: string }) : undefined;
  const assets = slug ? solutionDetailImages[slug] : undefined;
  const relatedPaths = slug ? relatedPathsBySlug[slug]?.map((p) => `${prefix}${p}`) : undefined;

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const pagePath = `${selectionPath}/${slug}`;
  const selectionLabel =
    t("hero.title", { defaultValue: "" }) || (lang === "en" ? "Solution Selection" : "Selección de Soluciones");

  const fullTitle = entry
    ? (entry.h1 ?? `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`)
    : "";
  const hero = splitHeroTitle(fullTitle);

  usePageMeta({
    title: meta?.title ?? (lang === "en" ? "Solution Selection | Cyrrus" : "Selección de Soluciones | Cyrrus"),
    description: meta?.description ?? "",
    alternatePath: slug
      ? lang === "en"
        ? `/metodo-cira/seleccion-de-soluciones/${slug}`
        : `/en/metodo-cira/seleccion-de-soluciones/${slug}`
      : undefined,
    jsonLd:
      entry && slug
        ? buildServiceJsonLd({
            siteUrl,
            pagePath,
            serviceType: `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`,
            name: entry.label,
            description: meta?.description ?? "",
            faqs: entry.faq,
            breadcrumbs: [
              { label: lang === "en" ? "Home" : "Inicio", href: homePath },
              { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
              { label: selectionLabel, href: selectionPath },
              { label: entry.label, href: pagePath },
            ],
          })
        : undefined,
  });

  if (!entry || !slug || !assets) return <Navigate to={`${prefix}/metodo-cira/seleccion-de-soluciones`} replace />;

  // Qué hacemos: the explicit block, else the "what we help select" items.
  const rawCards: { title: string; text: string; image?: string; alt?: string }[] =
    entry.queHacemos?.cards ?? entry.items.map((it) => ({ title: it.title, text: it.description }));
  const queHacemos: ServiceContent["queHacemos"] = rawCards.length
    ? {
        quote: entry.queHacemos?.quote ?? t("detail.whatWeHelp"),
        emphasis: entry.queHacemos?.emphasis,
        intro: entry.queHacemos?.intro,
        cards: rawCards.slice(0, 4).map((c, i) => ({
          title: c.title,
          description: c.text,
          image: {
            src: c.image ?? CARD_IMAGE_POOL[i % CARD_IMAGE_POOL.length],
            alt: c.alt ?? c.title,
          },
        })),
      }
    : undefined;

  const baseQueEs =
    entry.queEs ??
    (entry.answer
      ? { title: entry.answer.title, body: entry.answer.body, refs: entry.answer.items }
      : undefined);
  const queEs = baseQueEs && entry.usos ? { ...baseQueEs, uses: { label: entry.usos.title, items: entry.usos.items } } : baseQueEs;

  const content: ServiceContent = {
    hero: {
      eyebrow: entry.eyebrow,
      title: hero.title,
      subtitle: hero.subtitle,
      description: entry.intro,
      ctaLabel: t("detail.ctaLabel"),
      link: { href: methodPath, label: tc("service.methodLink") },
    },
    breadcrumbs: [
      { label: lang === "en" ? "Home" : "Inicio", href: homePath },
      { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
      // The H1-sized label in `hero.title` is far too long for a trail; the
      // structured data above still uses it.
      { label: lang === "en" ? "Solution Selection" : "Selección de Soluciones", href: selectionPath },
      { label: hero.title },
    ],
    media: SOLUCIONES_HERO_MEDIA,
    queHacemos,
    queEs,
    comoLoHacemos: entry.comoLoHacemos,
    autoridad: entry.autoridad?.stats?.length
      ? {
          ...entry.autoridad,
          image: { src: "/assets/decoracion/evento-panel-universidad-bolivar.jpeg", alt: "Panel de expertos en un evento de Cyrrus" },
        }
      : groupBlocks.autoridad,
    beneficios: entry.beneficios,
    body: entry.body?.length
      ? { paragraphs: entry.body, image: { src: solutionCategoryImages[slug], alt: entry.label } }
      : undefined,
    article: { text: t("detail.methodLinkText"), label: t("detail.methodLinkLabel"), href: methodPath },
    stat: entry.stat,
    closingQuote: t("closingQuote"),
    guides: entry.guides
      ? {
          eyebrow: entry.guides.eyebrow,
          title: entry.guides.title,
          items: entry.guides.items.map((g) => ({
            href: `${prefix}/perspectivas/${g.slug}`,
            title: g.title,
            description: g.description,
          })),
        }
      : undefined,
    faq: { eyebrow: entry.label, title: t("detail.faqTitle"), items: entry.faq },
    related: {
      eyebrow: t("detail.relatedEyebrow"),
      title: t("detail.relatedTitle"),
      items: entry.related.flatMap((item, i) => {
        const href = relatedPaths?.[i];
        return href ? [{ ...item, href }] : [];
      }),
    },
  };

  return <ServiceTemplate content={content} />;
}
