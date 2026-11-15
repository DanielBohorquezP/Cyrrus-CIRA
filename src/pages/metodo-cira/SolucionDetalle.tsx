import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { solutionDetailImages, solutionSlugs } from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RelatedServices } from "@/components/sections/related-services";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { CardGrid } from "@/components/ui/card-grid";
import { SecondaryButton } from "@/components/ui/border-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-soluciones";

interface DetailEntry {
  label: string;
  eyebrow: string;
  /** Optional H1 override; falls back to "Selection consulting for <label>". */
  h1?: string;
  intro: string;
  /** Optional answer-first block rendered right under the hero. */
  answer?: { eyebrow: string; title: string; body: string; items: { title: string; description: string }[] };
  /** Optional links to published guides (perspectivas slugs). */
  guides?: { eyebrow: string; title: string; items: { slug: string; title: string; description: string }[] };
  stat?: { value: string; description: string; source: string };
  items: { title: string; description: string }[];
  /** Optional long-form paragraphs rendered under the items grid. */
  body?: string[];
  related: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
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
  const lang = useLang();
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
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteUrl}${pagePath}#service`,
              serviceType: `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`,
              name: entry.label,
              provider: { "@id": `${siteUrl}/#organization` },
              description: meta?.description,
              areaServed: "Worldwide",
              url: `${siteUrl}${pagePath}`,
              mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": `${siteUrl}${pagePath}#faq`,
              mainEntity: entry.faq.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: lang === "en" ? "CIRA Method" : "Método CIRA", item: `${siteUrl}${methodPath}` },
                { "@type": "ListItem", position: 3, name: t("hero.title", { defaultValue: "" }) || (lang === "en" ? "Solution Selection" : "Selección de Soluciones"), item: `${siteUrl}${selectionPath}` },
                { "@type": "ListItem", position: 4, name: entry.label, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!entry || !slug || !assets) return <Navigate to={`${prefix}/metodo-cira/seleccion-de-soluciones`} replace />;

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    {
      label: t("hero.title", { defaultValue: "" }) || (lang === "en" ? "Solution Selection" : "Selección de Soluciones"),
      href: selectionPath,
    },
    { label: entry.label },
  ];

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={entry.eyebrow}
        title={entry.h1 ?? `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`}
        description={entry.intro}
        breadcrumbs={breadcrumbItems}
        image={{ src: assets.image, alt: entry.label, position: assets.imagePosition }}
      >
        <ContactCtaButton variant="light" label={t("detail.ctaLabel")} />
        <SecondaryButton asChild>
          <Link to={methodPath}>{t("detail.methodLinkLabel")}</Link>
        </SecondaryButton>
      </PageHero>

      {entry.answer && (
        <IncludedGrid
          className="bg-mist"
          eyebrow={entry.answer.eyebrow}
          title={entry.answer.title}
          description={entry.answer.body}
          items={entry.answer.items}
        />
      )}

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("detail.whatWeHelp")} title={entry.label} />
          <CardGrid
            className="mt-16"
            numbered
            items={entry.items}
          />

          {entry.body && entry.body.length > 0 && (
            <Reveal className="mt-16 max-w-3xl space-y-6">
              {entry.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="t-lead text-slate">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          )}

          <Reveal className="mt-10">
            <p className="text-base text-slate">
              {`${t("detail.methodLinkText")} `}<Link to={methodPath} className="font-bold text-blue hover:text-navy">
                {t("detail.methodLinkLabel")}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {entry.stat && (
        <AnimatedNavyBackground className="section-y">
          <Reveal className="container-site text-center text-white">
            <p className="font-heading text-[clamp(72px,10vw,120px)] font-light leading-none tracking-[-0.04em]">
              {entry.stat.value}
            </p>
            <p className="t-lead mx-auto mt-6 max-w-2xl text-white/85">{entry.stat.description}</p>
            <span className="mt-4 block font-heading text-xs font-medium uppercase tracking-[0.12em] text-white/60">
              {entry.stat.source}
            </span>
          </Reveal>
        </AnimatedNavyBackground>
      )}

      <section className="section-y w-full bg-mist">
        <Reveal className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
          <blockquote className="m-0 font-heading text-[clamp(26px,3vw,40px)] font-light leading-[1.3] tracking-[-0.02em] text-pretty text-navy">
            {`“${t("closingQuote")}”`}
          </blockquote>
        </Reveal>
      </section>

      <RelatedServices
        eyebrow={t("detail.relatedEyebrow")}
        title={t("detail.relatedTitle")}
        items={entry.related.flatMap((item, i) => {
          const href = relatedPaths?.[i];
          return href ? [{ ...item, href }] : [];
        })}
        className="bg-background"
      />

      {entry.guides && (
        <RelatedServices
          className="bg-mist"
          eyebrow={entry.guides.eyebrow}
          title={entry.guides.title}
          items={entry.guides.items.map((g) => ({
            href: `${prefix}/perspectivas/${g.slug}`,
            title: g.title,
            description: g.description,
          }))}
        />
      )}

      <FaqSection
        eyebrow={entry.label}
        title={t("detail.faqTitle")}
        faqs={entry.faq}
        className={entry.guides ? "bg-background" : "bg-mist"}
      />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
