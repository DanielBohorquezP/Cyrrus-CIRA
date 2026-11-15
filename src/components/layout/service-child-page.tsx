import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { RelatedServices } from "@/components/sections/related-services";
import { ServiceBody } from "@/components/sections/service-body";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

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
  heroImage: { src: string; alt: string; position?: string };
  bodyImage: { src: string; alt: string };
  /** Canonical Spanish paths, in the same order as `<key>.related.items`. */
  relatedPaths: string[];
  /** Optional perspectivas slug for the "Lea también" line under the body. */
  articleSlug?: string;
}

/**
 * Builds a second-level service page (a child of Estrategia, Intelligence Lab,
 * etc.) from a config and a JSON subtree shaped like `gobierno` in
 * intelligence-lab.json: meta, serviceDescription, hero, respuesta, included,
 * body, related, optional guides, faq.
 *
 * The markup mirrors GobiernoDeIA.tsx on purpose: every page built from here
 * renders the same tree on the server (prerender) and on the client, so it
 * hydrates instead of rebuilding — see the hydration rules in CLAUDE.md.
 */
export function createServiceChildPage(config: ServiceChildConfig): ComponentType {
  const { ns, key } = config;

  function ServiceChildPage() {
    const { t } = useTranslation(ns);
    const lang = useLang();
    const prefix = lang === "en" ? "/en" : "";
    const k = (sub: string) => `${key}.${sub}`;

    const answerItems = t(k("respuesta.items"), { returnObjects: true }) as Item[];
    const included = t(k("included.items"), { returnObjects: true }) as Item[];
    const body = t(k("body"), { returnObjects: true }) as string[];
    const faqs = t(k("faq.items"), { returnObjects: true }) as Faq[];
    const guidesRaw = t(k("guides.items"), { returnObjects: true, defaultValue: [] }) as Guide[];
    const guides = Array.isArray(guidesRaw)
      ? guidesRaw.map((g) => ({
          href: `${prefix}/perspectivas/${g.slug}`,
          title: g.title,
          description: g.description,
        }))
      : [];
    const relatedItems = (t(k("related.items"), { returnObjects: true }) as Item[]).map((it, i) => ({
      ...it,
      href: `${prefix}${config.relatedPaths[i] ?? config.parent.path}`,
    }));

    const siteUrl = "https://cyrruscs.com";
    const homePath = lang === "en" ? "/en" : "/";
    const parentPath = `${prefix}${config.parent.path}`;
    const pagePath = `${prefix}${config.path}`;
    const breadcrumbItems = [
      { label: lang === "en" ? "Home" : "Inicio", href: homePath },
      { label: config.parent.label[lang], href: parentPath },
      { label: t(k("hero.title")) },
    ];
    const articlePath = config.articleSlug ? `${prefix}/perspectivas/${config.articleSlug}` : null;

    usePageMeta({
      title: t(k("meta.title")),
      description: t(k("meta.description")),
      alternatePath: lang === "en" ? config.path : `/en${config.path}`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${siteUrl}${pagePath}#service`,
          serviceType: t(k("serviceDescription")),
          name: t(k("hero.title")),
          provider: { "@id": `${siteUrl}/#organization` },
          description: t(k("meta.description")),
          areaServed: "Worldwide",
          url: `${siteUrl}${pagePath}`,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteUrl}${pagePath}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: `${siteUrl}${item.href ?? pagePath}`,
          })),
        },
      ],
    });

    return (
      <>
        <SiteHeader />
        <main id="contenido">
          <PageHero
            eyebrow={config.eyebrow[lang]}
            title={t(k("hero.title"))}
            description={t(k("hero.description"))}
            breadcrumbs={breadcrumbItems}
            image={config.heroImage}
          >
            <ContactCtaButton variant="light" />
          </PageHero>

          {/* Answer-first block: what the service is, in the reader's words */}
          <IncludedGrid
            className="bg-mist"
            eyebrow={t(k("respuesta.eyebrow"))}
            title={t(k("respuesta.title"))}
            description={t(k("respuesta.body"))}
            items={answerItems}
          />

          <IncludedGrid
            eyebrow={t(k("included.eyebrow"))}
            title={t(k("included.title"))}
            items={included}
            numbered
          />

          <ServiceBody paragraphs={body} imageSide="left" image={config.bodyImage}>
            {articlePath ? (
              <p>
                {`${t(k("articleLinkText"))} `}<Link to={articlePath} className="font-bold text-blue hover:text-navy">
                  {t(k("articleLinkLabel"))}
                </Link>
              </p>
            ) : null}
          </ServiceBody>

          <RelatedServices
            className="bg-background"
            eyebrow={t(k("related.eyebrow"))}
            title={t(k("related.title"))}
            items={relatedItems}
          />

          {guides.length > 0 ? (
            <RelatedServices
              className="bg-mist"
              eyebrow={t(k("guides.eyebrow"))}
              title={t(k("guides.title"))}
              items={guides}
            />
          ) : null}

          <FaqSection
            eyebrow={t(k("faq.eyebrow"))}
            title={t(k("faq.title"))}
            faqs={faqs}
            className={guides.length > 0 ? "bg-background" : "bg-mist"}
          />

          <FinalCta />
        </main>
        <Footer />
      </>
    );
  }

  return ServiceChildPage;
}
