import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { ServiceTemplate, buildServiceJsonLd, type ServiceContent } from "@/components/layout/service-template";
import { CARD_IMAGE_POOL, SERVICE_HERO_POSTER, SERVICE_HERO_VIDEO } from "@/lib/service-media";
import type { CardItem } from "@/components/ui/card-grid";
import { definitionFromFaq, useGroupBlocks, type ServiceGroup } from "@/lib/use-group-blocks";
import type { HeroVideo } from "@/components/sections/service-hero";

interface Item {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Guide extends Item {
  slug: string;
}
interface QueHacemosJson {
  quote: string;
  emphasis?: string;
  intro?: string;
  cards?: { title: string; text: string; image?: string; alt?: string; position?: string }[];
}
interface Stat {
  value: string;
  label: string;
}

export interface ServiceChildConfig {
  /** i18n namespace that holds this page's copy. The route file must also
   *  `import "@/i18n/ns/<ns>"` at module scope so the bundle is registered. */
  ns: string;
  /** Top-level key inside the namespace (e.g. "estrategiaTi"). */
  key: string;
  /** Canonical Spanish path; the English page lives at `/en` + path. */
  path: string;
  parent: { path: string; label: { es: string; en: string } };
  eyebrow: { es: string; en: string };
  /** Hero photo. Used as the background when `heroVideo` is off, and as the video's poster otherwise. */
  heroImage: { src: string; alt: string; position?: string };
  /** Loop a hero video over the poster. `true` uses the shared default; an object picks the
   *  section's own files (e.g. `{ mp4: "<file>.mp4", webm: "<file>.webm", poster: "<poster.jpg>" }`). */
  heroVideo?: boolean | (HeroVideo & { poster: string });
  bodyImage: { src: string; alt: string };
  /** One photo per "Qué hacemos" card, in order; missing ones come from the shared pool. */
  cardImages?: string[];
  /** Service group: supplies "Cómo lo hacemos" and "Por qué Cyrrus" when the page has none of its own. */
  group?: ServiceGroup;
  /** Photo behind the "Por qué Cyrrus" band. */
  authorityImage?: { src: string; alt: string };
  /** Canonical Spanish paths, in the same order as `<key>.related.items`. */
  relatedPaths: string[];
  /** Optional perspectivas slug for the "Lea también" line under the body. */
  articleSlug?: string;
}

/**
 * "Short title: subtitle" → the part before the colon is the visible H1 and
 * the part after it is the highlighted line under it. The full string stays
 * the page's name in meta tags and JSON-LD.
 */
export function splitHeroTitle(full: string, subtitle?: string): { title: string; subtitle?: string } {
  if (subtitle) return { title: full, subtitle };
  const i = full.indexOf(": ");
  if (i < 0) return { title: full };
  const rest = full.slice(i + 2).trim();
  return { title: full.slice(0, i), subtitle: rest.charAt(0).toUpperCase() + rest.slice(1) };
}

/** Photo cards from a page's titled intro bullets (title + one sentence + a pool photo). */
export function bulletCards(titles: string[], texts: string[], offset = 0): CardItem[] {
  return texts.map((text, i) => ({
    title: titles[i] ?? "",
    description: text,
    image: { src: CARD_IMAGE_POOL[(i + offset) % CARD_IMAGE_POOL.length], alt: titles[i] ?? "" },
  }));
}

/** "Light lead — bold ending" pull quotes: the part after the first dash is the heavier ending. */
export function splitQuote(full: string): { quote: string; emphasis?: string } {
  const [lead, ...rest] = full.split(" — ");
  return rest.length > 0 ? { quote: `${lead} —`, emphasis: rest.join(" — ") } : { quote: lead };
}

/**
 * Builds a second-level service page (a child of Estrategia, Intelligence Lab,
 * etc.) from a config and a JSON subtree shaped like `gobierno` in
 * intelligence-lab.json: meta, serviceDescription, hero, respuesta, included,
 * body, related, optional guides, faq.
 *
 * The subtree may also carry the template's own blocks — `queHacemos`,
 * `comoLoHacemos`, `autoridad`, `beneficios` (and `hero.subtitle`). When one is
 * missing it is derived from the older keys (`included` → cards, `respuesta` →
 * "Qué es"); a block with nothing to derive from is left out, never invented.
 *
 * Every page built from here renders through `ServiceTemplate`, the single
 * service-page layout.
 */
export function createServiceChildPage(config: ServiceChildConfig): ComponentType {
  const { ns, key } = config;

  function ServiceChildPage() {
    const { t, i18n } = useTranslation(ns);
    const { t: tc } = useTranslation();
    const lang = useLang();
    const groupBlocks = useGroupBlocks(config.group);
    const prefix = lang === "en" ? "/en" : "";
    const k = (sub: string) => `${key}.${sub}`;
    const has = (sub: string) => i18n.exists(k(sub), { ns });
    const list = <T,>(sub: string): T[] => {
      const v = t(k(sub), { returnObjects: true, defaultValue: [] });
      return Array.isArray(v) ? (v as T[]) : [];
    };

    const siteUrl = "https://cyrruscs.com";
    const homePath = lang === "en" ? "/en" : "/";
    const parentPath = `${prefix}${config.parent.path}`;
    const pagePath = `${prefix}${config.path}`;
    const fullTitle = t(k("hero.title"));
    const hero = splitHeroTitle(fullTitle, has("hero.subtitle") ? t(k("hero.subtitle")) : undefined);

    const faqs = list<Faq>("faq.items");
    const relatedItems = list<Item>("related.items").map((it, i) => ({
      ...it,
      href: `${prefix}${config.relatedPaths[i] ?? config.parent.path}`,
    }));
    const guides = list<Guide>("guides.items").map((g) => ({
      href: `${prefix}/perspectivas/${g.slug}`,
      title: g.title,
      description: g.description,
    }));
    const body = list<string>("body");

    // Visible trail uses the short H1; the structured data keeps the full name.
    const trail = (last: string) => [
      { label: lang === "en" ? "Home" : "Inicio", href: homePath },
      { label: config.parent.label[lang], href: parentPath },
      { label: last },
    ];

    usePageMeta({
      title: t(k("meta.title")),
      description: t(k("meta.description")),
      alternatePath: lang === "en" ? config.path : `/en${config.path}`,
      jsonLd: buildServiceJsonLd({
        siteUrl,
        pagePath,
        serviceType: t(k("serviceDescription")),
        name: fullTitle,
        description: t(k("meta.description")),
        faqs,
        breadcrumbs: trail(fullTitle),
      }),
    });

    // --- Qué hacemos: explicit block, else the "included" items as photo cards.
    let queHacemos: ServiceContent["queHacemos"];
    const qhJson = has("queHacemos") ? (t(k("queHacemos"), { returnObjects: true }) as QueHacemosJson) : undefined;
    const includedItems = list<Item>("included.items");
    const rawCards: { title: string; text: string; image?: string; alt?: string; position?: string }[] =
      qhJson?.cards ?? includedItems.map((it) => ({ title: it.title, text: it.description }));
    if (rawCards.length > 0) {
      const cards: CardItem[] = rawCards.slice(0, 4).map((c, i) => ({
        title: c.title,
        description: c.text,
        image: {
          src: c.image ?? config.cardImages?.[i] ?? CARD_IMAGE_POOL[i % CARD_IMAGE_POOL.length],
          alt: c.alt ?? c.title,
          position: c.position,
        },
      }));
      queHacemos = {
        quote: qhJson?.quote ?? t(k("included.title")),
        emphasis: qhJson?.emphasis,
        intro: qhJson?.intro,
        cards,
      };
    }

    // --- Qué es: explicit block, else the answer-first "respuesta" block.
    let queEs: ServiceContent["queEs"];
    if (has("queEs")) {
      queEs = t(k("queEs"), { returnObjects: true }) as ServiceContent["queEs"];
    } else if (has("respuesta")) {
      queEs = {
        title: t(k("respuesta.title")),
        body: t(k("respuesta.body")),
        refsLabel: has("respuesta.refsLabel") ? t(k("respuesta.refsLabel")) : undefined,
        refs: list<Item>("respuesta.items"),
      };
    }

    if (!queEs) queEs = definitionFromFaq(faqs);
    if (queEs && has("usos")) {
      queEs = { ...queEs, uses: { label: t(k("usos.title")), items: list<Item>("usos.items") } };
    }

    const comoLoHacemos = has("comoLoHacemos")
      ? (t(k("comoLoHacemos"), { returnObjects: true }) as ServiceContent["comoLoHacemos"])
      : undefined;
    const beneficios = has("beneficios")
      ? (t(k("beneficios"), { returnObjects: true }) as { title: string; intro?: string; items: Item[] })
      : undefined;
    const autoridadJson = has("autoridad")
      ? (t(k("autoridad"), { returnObjects: true }) as { title: string; body: string; stats: Stat[] })
      : undefined;

    const spotlights = has("spotlights")
      ? (t(k("spotlights"), { returnObjects: true }) as {
          eyebrow: string;
          title: string;
          intro?: string;
          items?: { title: string; description?: string }[];
          note?: string;
          stat?: { value: string; description: string; source: string };
          image?: { src: string; alt: string; position?: string };
        }[]).map((b) => ({ ...b, items: b.items?.map((it) => ({ title: it.title, description: it.description })) }))
      : undefined;

    const articlePath = config.articleSlug ? `${prefix}/perspectivas/${config.articleSlug}` : null;

    const content: ServiceContent = {
      hero: {
        eyebrow: config.eyebrow[lang],
        title: hero.title,
        subtitle: hero.subtitle,
        description: t(k("hero.description")),
        ctaLabel: has("hero.ctaLabel") ? t(k("hero.ctaLabel")) : tc("cta.agendarConversacion"),
        link: { href: `${prefix}/metodo-cira`, label: tc("service.methodLink") },
      },
      breadcrumbs: trail(hero.title),
      media: {
        image: config.heroVideo
          ? { src: typeof config.heroVideo === "object" ? config.heroVideo.poster : SERVICE_HERO_POSTER.src, alt: "" }
          : config.heroImage,
        video:
          typeof config.heroVideo === "object"
            ? { mp4: config.heroVideo.mp4, webm: config.heroVideo.webm }
            : config.heroVideo
              ? SERVICE_HERO_VIDEO
              : undefined,
      },
      queHacemos,
      queEs,
      comoLoHacemos,
      spotlights,
      autoridad:
        autoridadJson && autoridadJson.stats?.length
          ? {
              ...autoridadJson,
              image: config.authorityImage ?? { src: CARD_IMAGE_POOL[0], alt: "" },
            }
          : groupBlocks.autoridad,
      beneficios: beneficios
        ? {
            title: beneficios.title,
            intro: beneficios.intro,
            items: beneficios.items.map((b) => ({ title: b.title, description: b.description })),
          }
        : undefined,
      body: body.length ? { paragraphs: body, image: config.bodyImage } : undefined,
      article:
        articlePath && has("articleLinkText")
          ? { text: t(k("articleLinkText")), label: t(k("articleLinkLabel")), href: articlePath }
          : undefined,
      guides: guides.length
        ? { eyebrow: t(k("guides.eyebrow")), title: t(k("guides.title")), items: guides }
        : undefined,
      faq: {
        eyebrow: t(k("faq.eyebrow")),
        title: has("faq.title") ? t(k("faq.title")) : lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes",
        items: faqs,
      },
      related: { eyebrow: t(k("related.eyebrow")), title: t(k("related.title")), items: relatedItems },
    };

    return <ServiceTemplate content={content} />;
  }

  return ServiceChildPage;
}
