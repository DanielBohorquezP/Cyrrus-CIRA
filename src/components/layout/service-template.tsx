import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TransparentHeader } from "@/components/layout/transparent-header";
import { ServiceHero, type HeroVideo } from "@/components/sections/service-hero";
import { PhotoCards } from "@/components/sections/photo-cards";
import { DefinitionRefs, type DefinitionRef } from "@/components/sections/definition-refs";
import { SpotlightBlock, type SpotlightContent } from "@/components/sections/spotlight-block";
import { StepsSticky } from "@/components/sections/steps-sticky";
import { AuthorityBand } from "@/components/sections/authority-band";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { RelatedServices, type RelatedItem } from "@/components/sections/related-services";
import { ServiceBody } from "@/components/sections/service-body";
import { FaqSection, type FaqItem } from "@/components/sections/faq-section";
import { ServiceClosing } from "@/components/sections/service-closing";
import { Footer } from "@/components/sections/footer";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { SecondaryButton } from "@/components/ui/border-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Reveal } from "@/components/ui/reveal";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import type { CardItem } from "@/components/ui/card-grid";
import type { NumberedItem } from "@/components/ui/numbered-list";
import type { Stat } from "@/components/ui/dark-stat-band";

/**
 * Everything the single service-page template renders. Each block is optional
 * except the hero, the FAQ and the related services: a page that has no data
 * for a block simply leaves it out instead of showing an empty or invented one.
 */
export interface ServiceContent {
  hero: {
    eyebrow: string;
    /** The H1 text before the subtitle. */
    title: string;
    subtitle?: string;
    description: string;
    ctaLabel: string;
    link?: { href: string; label: string };
  };
  breadcrumbs: BreadcrumbItem[];
  media: { image: { src: string; alt: string; position?: string }; video?: HeroVideo };

  queHacemos?: {
    /** Overrides the shared "Qué hacemos" label. */
    eyebrow?: string;
    quote: string;
    emphasis?: string;
    intro?: string;
    cards: CardItem[];
    bullets?: string[];
    /** Link lines under the intro paragraph. */
    links?: ReactNode;
  };
  queEs?: {
    title: string;
    body: string;
    /** "¿Para qué sirve …?" row, shown before the references. */
    uses?: { label: string; items: DefinitionRef[] };
    refsLabel?: string;
    refs: DefinitionRef[];
    /** Optional link shown under the references. */
    link?: { href: string; label: string };
  };
  comoLoHacemos?: { id?: string; title: string; intro?: string; steps: NumberedItem[] };
  /** Extra sections specific to one service, between "Cómo lo hacemos" and "Por qué Cyrrus". */
  spotlights?: SpotlightContent[];
  autoridad?: { title: string; body: string; stats: Stat[]; image?: { src: string; alt: string } };
  beneficios?: { title: string; intro?: string; items: CardItem[] };

  /** Long-form SEO copy. Collapsed under "Qué es" when that block exists, otherwise shown beside a photo. */
  body?: { paragraphs: string[]; image: { src: string; alt: string } };
  /** One "Lea también…" line with a link, shown right under the body copy. */
  article?: { text: string; label: string; href: string };
  /** A single cited figure, for pages that have one but no "Por qué Cyrrus" band. */
  stat?: { value: string; description: string; source: string };
  /** Cyrrus's closing statement, set large on a mist band before the FAQ. */
  closingQuote?: string;
  guides?: { eyebrow: string; title: string; items: RelatedItem[] };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  related: { eyebrow: string; title: string; items: RelatedItem[] };
}

/** Service + FAQPage + BreadcrumbList, identical on every service page. */
export function buildServiceJsonLd(opts: {
  siteUrl: string;
  pagePath: string;
  serviceType: string;
  name: string;
  description: string;
  faqs: FaqItem[];
  breadcrumbs: BreadcrumbItem[];
}) {
  const { siteUrl, pagePath, serviceType, name, description, faqs, breadcrumbs } = opts;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}${pagePath}#service`,
      serviceType,
      name,
      provider: { "@id": `${siteUrl}/#organization` },
      description,
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
      itemListElement: breadcrumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        item: `${siteUrl}${item.href ?? pagePath}`,
      })),
    },
  ];
}

/**
 * The one layout every service page uses, in this order: hero (photo or video,
 * transparent menu) → qué hacemos → qué es → cómo lo hacemos → autoridad →
 * beneficios → preguntas frecuentes → cierre con servicios relacionados.
 *
 * It renders the same tree on the server (prerender) and on the client, so it
 * hydrates instead of rebuilding — see the hydration rules in CLAUDE.md.
 */
export function ServiceTemplate({
  content,
  extras,
  extrasEndTone = "white",
}: {
  content: ServiceContent;
  /** Page-specific sections that have no slot in the template (scope tables,
   *  role cards, a lead bio, testimonials…). Rendered after the benefits. */
  extras?: ReactNode;
  /** Background of the last extra section, so the light sections after it keep alternating. */
  extrasEndTone?: "white" | "mist";
}) {
  const { t } = useTranslation();
  const { hero, queHacemos, queEs, comoLoHacemos, autoridad, beneficios, body, guides, faq, related } = content;

  const article = content.article ? (
    <p className="mt-10 text-base text-slate">
      {content.article.text ? `${content.article.text} ` : null}<Link to={content.article.href} className="font-bold text-blue hover:text-navy">
        {content.article.label}
      </Link>
    </p>
  ) : null;

  // Light sections after the benefits alternate white / mist so no two touch.
  let lastTone: "white" | "mist" = extras ? extrasEndTone : "white";
  const nextTone = () => {
    lastTone = lastTone === "white" ? "mist" : "white";
    return lastTone === "mist" ? "bg-mist" : "bg-background";
  };
  const quoteTone = content.closingQuote ? nextTone() : undefined;
  const guidesTone = guides && guides.items.length > 0 ? nextTone() : undefined;
  const faqTone = nextTone();

  return (
    <>
      <TransparentHeader />
      <main id="contenido">
        <ServiceHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          breadcrumbs={content.breadcrumbs}
          image={content.media.image}
          video={content.media.video}
        >
          <ContactCtaButton variant="light" label={hero.ctaLabel} />
          {hero.link && (
            <SecondaryButton asChild>
              <Link to={hero.link.href}>{hero.link.label}</Link>
            </SecondaryButton>
          )}
        </ServiceHero>

<div data-block="que-hacemos" className="contents">
        {queHacemos && (
          <PhotoCards
            eyebrow={queHacemos.eyebrow ?? t("service.queHacemos")}
            quote={queHacemos.quote}
            emphasis={queHacemos.emphasis}
            intro={queHacemos.intro}
            cards={queHacemos.cards}
            bullets={queHacemos.bullets}
          >
            {queHacemos.links}
          </PhotoCards>
        )}
        </div>

        <div data-block="que-es" className="contents">
        {queEs ? (
          <DefinitionRefs
            eyebrow={t("service.queEs")}
            title={queEs.title}
            body={queEs.body}
            uses={queEs.uses}
            refsLabel={queEs.refsLabel ?? (queEs.uses ? t("service.refsDefault") : undefined)}
            refs={queEs.refs}
          >
            {body && body.paragraphs.length > 0 && (
              // Native <details>: the full copy stays in the DOM (and in the
              // prerendered HTML) for crawlers, and needs no state to hydrate.
              <details className="group mt-16 border-t border-navy">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {t("service.detailSummary")}
                  <span aria-hidden="true" className="text-2xl leading-none font-light text-blue group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden text-2xl leading-none font-light text-blue group-open:inline">
                    −
                  </span>
                </summary>
                <div className="max-w-3xl space-y-6 pb-4">
                  {body.paragraphs.map((p) => (
                    <p key={p} className="t-lead text-slate">
                      {p}
                    </p>
                  ))}
                </div>
              </details>
            )}
            {queEs.link && (
              <p className="mt-10 text-base text-slate">
                <Link to={queEs.link.href} className="font-bold text-blue hover:text-navy">
                  {queEs.link.label}
                </Link>
              </p>
            )}
            {article}
          </DefinitionRefs>
        ) : (
          body && (
            <ServiceBody paragraphs={body.paragraphs} imageSide="left" image={body.image}>
              {article}
            </ServiceBody>
          )
        )}
        </div>

        <div data-block="como" className="contents">
        {comoLoHacemos && (
          <StepsSticky
            id={comoLoHacemos.id}
            eyebrow={t("service.comoLoHacemos")}
            title={comoLoHacemos.title}
            intro={comoLoHacemos.intro}
            steps={comoLoHacemos.steps}
          />
        )}
        </div>

        {content.spotlights?.map((block, i) => (
          <SpotlightBlock key={block.title} block={block} tone={i % 2 === 0 ? "mist" : "white"} />
        ))}

        <div data-block="autoridad" className="contents">
        {autoridad && (
          <AuthorityBand
            eyebrow={t("service.autoridad")}
            title={autoridad.title}
            body={autoridad.body}
            stats={autoridad.stats}
            image={autoridad.image}
          />
        )}
        </div>

        <div data-block="beneficios" className="contents">
        {beneficios && (
          <BenefitsGrid
            eyebrow={t("service.beneficios")}
            title={beneficios.title}
            intro={beneficios.intro}
            items={beneficios.items}
          />
        )}
        </div>

                {extras}

        {!autoridad && content.stat && (
          <AnimatedNavyBackground className="section-y">
            <Reveal className="container-site text-center text-white">
              <p className="font-heading text-[clamp(72px,10vw,120px)] leading-none font-light tracking-[-0.04em]">
                {content.stat.value}
              </p>
              <p className="t-lead mx-auto mt-6 max-w-2xl text-white/85">{content.stat.description}</p>
              <span className="mt-4 block font-heading text-xs font-medium tracking-[0.12em] text-white/60 uppercase">
                {content.stat.source}
              </span>
            </Reveal>
          </AnimatedNavyBackground>
        )}

        {content.closingQuote && (
          <section className={`section-y w-full ${quoteTone}`}>
            <Reveal className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
              <blockquote className="m-0 font-heading text-[clamp(26px,3vw,40px)] leading-[1.3] font-light tracking-[-0.02em] text-pretty text-navy">
                {`“${content.closingQuote}”`}
              </blockquote>
            </Reveal>
          </section>
        )}

        {guides && guides.items.length > 0 && (
          <RelatedServices className={guidesTone} eyebrow={guides.eyebrow} title={guides.title} items={guides.items} />
        )}

        <FaqSection eyebrow={faq.eyebrow} title={faq.title} faqs={faq.items} className={faqTone} />

        <ServiceClosing eyebrow={related.eyebrow} items={related.items} ctaLabel={hero.ctaLabel} />
      </main>
      <Footer />
    </>
  );
}
