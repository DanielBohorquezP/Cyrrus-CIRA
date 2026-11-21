import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { useTranslation } from "react-i18next";
import { useGroupBlocks } from "@/lib/use-group-blocks";
import { SOLUCIONES_HERO_MEDIA } from "@/lib/service-media";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { splitHeroTitle } from "@/components/layout/service-child-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { productImages, type ProductSlug } from "@/lib/solutions-icons";
import { IncludedGrid } from "@/components/sections/included-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-de-software";
import "@/i18n/ns/seleccion-soluciones";

interface CategoryItem {
  slug: string;
  title: string;
  description: string;
  linkLabel: string;
}
interface EvalItem {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Guide extends EvalItem {
  slug: string;
}


export default function SeleccionDeSoftware() {
  const { t } = useTranslation("seleccion-de-software");
  const lang = useLang();
  const groupBlocks = useGroupBlocks("soluciones");
  const prefix = lang === "en" ? "/en" : "";

  const categorias = (t("categorias.items", { returnObjects: true }) as CategoryItem[]).map((c) => ({
    ...c,
    href: `${prefix}/servicios/seleccion-de-soluciones/seleccion-de-software/${c.slug}`,
    image: productImages[c.slug as ProductSlug],
  }));
  const evaluamos = t("evaluamos.items", { returnObjects: true }) as EvalItem[];
  const problemaBullets = t("problema.bullets", { returnObjects: true }) as string[];
  const costoBullets = t("costo.bullets", { returnObjects: true }) as string[];
  const preguntaSteps = t("preguntaCorrecta.steps", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];
  const answerItems = t("respuesta.items", { returnObjects: true }) as EvalItem[];
  const guides = (t("guides.items", { returnObjects: true }) as Guide[]).map((g) => ({
    href: `${prefix}/perspectivas/${g.slug}`,
    title: g.title,
    description: g.description,
  }));

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/servicios/seleccion-de-soluciones`;
  const pagePath = `${selectionPath}/seleccion-de-software`;
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en"
      ? "/servicios/seleccion-de-soluciones/seleccion-de-software"
      : "/en/servicios/seleccion-de-soluciones/seleccion-de-software",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Enterprise software selection" : "Selección de software empresarial",
        name: t("hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("meta.description"),
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

  const heroTitle = splitHeroTitle(t("hero.title"));
  const content: ServiceContent = {
    area: "seleccion-soluciones",
    hero: {
      eyebrow: t("hero.eyebrow"),
      ...heroTitle,
      description: t("hero.description"),
      ctaLabel: t("hero.ctaLabel"),
      link: { href: `${prefix}/metodo-cira`, label: t("hero.ctaSecondaryLabel") },
    },
    breadcrumbs: [...breadcrumbItems.slice(0, -1), { label: heroTitle.title }],
    media: SOLUCIONES_HERO_MEDIA,
    queHacemos: {
      quote: t("categorias.title"),
      cards: categorias.map((c) => ({
        title: c.title,
        description: c.description,
        href: c.href,
        linkLabel: c.linkLabel,
        image: { src: c.image.image, alt: c.title, position: c.image.imagePosition },
      })),
    },
    queEs: {
      title: t("respuesta.title"),
      body: t("respuesta.body"),
      refs: answerItems,
      uses: { label: t("usos.title"), items: t("usos.items", { returnObjects: true }) as EvalItem[] },
    },
    comoLoHacemos: t("comoLoHacemos", { returnObjects: true }) as ServiceContent["comoLoHacemos"],
    autoridad: groupBlocks.autoridad,
    beneficios: t("beneficios", { returnObjects: true }) as { title: string; intro?: string; items: EvalItem[] },
    faq: { eyebrow: t("faq.eyebrow"), title: t("faq.title"), items: faqs },
    // This page has no "related services" list; the closing band links to its guides.
    related: { eyebrow: t("guides.eyebrow"), title: t("guides.title"), items: guides },
  };

  return (
    <ServiceTemplate
      content={content}
      extrasEndTone="white"
      extras={
        <>
          {/* 02 — El problema */}
          <section className="section-y w-full bg-background">
            <div className="container-site">
              <SectionHeader eyebrow={t("problema.eyebrow")} title={t("problema.title")} description={t("problema.intro")} />
              <RuledBullets items={problemaBullets} columns={2} className="mt-14" />
              <Reveal>
                <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
                  {t("problema.punch")}
                </p>
              </Reveal>
            </div>
          </section>

          {/* 03 — El costo de equivocarse */}
          <section className="section-y w-full bg-mist">
            <div className="container-site">
              <SectionHeader eyebrow={t("costo.eyebrow")} title={t("costo.title")} />
              <RuledBullets items={costoBullets} columns={2} className="mt-14" />
              <Reveal>
                <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
                  {t("costo.punch")}
                </p>
              </Reveal>
            </div>
          </section>

          {/* 04 — La pregunta correcta */}
          <section className="section-y w-full bg-background">
            <div className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
              <Reveal>
                <Eyebrow>{t("preguntaCorrecta.eyebrow")}</Eyebrow>
                <h2 className="t-h2 mt-5 text-navy">{t("preguntaCorrecta.title")}</h2>
                <p className="mt-10 text-lg text-slate/60 line-through">{t("preguntaCorrecta.notQuestion")}</p>
                <p className="mt-3 font-heading text-[clamp(24px,2.6vw,34px)] font-light leading-[1.3] tracking-[-0.01em] text-navy">
                  {t("preguntaCorrecta.realQuestion")}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-12 font-heading text-base font-medium text-navy">{preguntaSteps.join(" → ")}</p>
              </Reveal>
            </div>
          </section>

          {/* 07 — Cómo evaluamos */}
          <IncludedGrid
            className="bg-mist"
            eyebrow={t("evaluamos.eyebrow")}
            title={t("evaluamos.title")}
            items={evaluamos}
            numbered
          />

          {/* Cierre — 100% agnósticos */}
          <section className="section-y w-full bg-background">
            <Reveal className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
              <blockquote className="m-0 font-heading text-[clamp(26px,3vw,40px)] font-light leading-[1.3] tracking-[-0.02em] text-pretty text-navy">
                {`"${t("closingQuote")}"`}
              </blockquote>
              <div className="mt-10 flex justify-center">
                <ContactCtaButton label={t("hero.ctaLabel")} />
              </div>
            </Reveal>
          </section>
        </>
      }
    />
  );
}
