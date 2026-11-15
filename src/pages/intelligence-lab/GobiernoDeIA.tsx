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
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

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

export default function GobiernoDeIA() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const answerItems = t("gobierno.respuesta.items", { returnObjects: true }) as Item[];
  const guides = (t("gobierno.guides.items", { returnObjects: true }) as Guide[]).map((g) => ({
    href: `${prefix}/perspectivas/${g.slug}`,
    title: g.title,
    description: g.description,
  }));
  const included = t("gobierno.included.items", { returnObjects: true }) as Item[];
  const faqs = t("gobierno.faq.items", { returnObjects: true }) as Faq[];
  const body = t("gobierno.body", { returnObjects: true }) as string[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Intelligence Lab", href: hubPath },
    { label: t("gobierno.hero.title") },
  ];
  const relatedArticlePath = lang === "en"
    ? "/en/perspectivas/gobierno-de-ia-corporativo-en-la-empresa"
    : "/perspectivas/gobierno-de-ia-corporativo-en-la-empresa";
  const arquitecturaPath = lang === "en" ? "/en/intelligence-lab/arquitectura-de-ia" : "/intelligence-lab/arquitectura-de-ia";
  const automatizacionesPath = lang === "en"
    ? "/en/intelligence-lab/automatizaciones-desarrollo"
    : "/intelligence-lab/automatizaciones-desarrollo";
  const changePath = lang === "en" ? "/en/metodo-cira/gestion-del-cambio" : "/metodo-cira/gestion-del-cambio";
  const dataGovPath = lang === "en" ? "/en/intelligence-lab/gobierno-de-datos" : "/intelligence-lab/gobierno-de-datos";
  const relatedPaths = [arquitecturaPath, automatizacionesPath, changePath, dataGovPath];
  const relatedItems = (t("gobierno.related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));

  usePageMeta({
    title: t("gobierno.meta.title"),
    description: t("gobierno.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/gobierno-de-ia" : "/en/intelligence-lab/gobierno-de-ia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("gobierno.serviceDescription"),
        name: t("gobierno.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("gobierno.meta.description"),
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
        eyebrow="Cyrrus Intelligence Lab"
        title={t("gobierno.hero.title")}
        description={t("gobierno.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224151.jpg",
          alt: "Consultor de Cyrrus con notebook frente a pantallas de trabajo",
        }}
      >
        <ContactCtaButton variant="light" />
      </PageHero>

      {/* Answer-first block: what AI governance is and the public frameworks behind it */}
      <IncludedGrid
        className="bg-mist"
        eyebrow={t("gobierno.respuesta.eyebrow")}
        title={t("gobierno.respuesta.title")}
        description={t("gobierno.respuesta.body")}
        items={answerItems}
      />

      <IncludedGrid
        eyebrow={t("gobierno.included.eyebrow")}
        title={t("gobierno.included.title")}
        items={included}
        numbered
      />

      <ServiceBody
        paragraphs={body}
        imageSide="left"
        image={{
          src: "/assets/decoracion/IMG_20230228_083642.jpg",
          alt: "Consultor de Cyrrus trabajando en políticas y controles de datos",
        }}
      >
        <p>
          {`${t("gobierno.articleLinkText")} `}<Link to={relatedArticlePath} className="font-bold text-blue hover:text-navy">
            {t("gobierno.articleLinkLabel")}
          </Link>
        </p>
      </ServiceBody>

      <RelatedServices
        className="bg-background"
        eyebrow={t("gobierno.related.eyebrow")}
        title={t("gobierno.related.title")}
        items={relatedItems}
      />

      <RelatedServices
        className="bg-mist"
        eyebrow={t("gobierno.guides.eyebrow")}
        title={t("gobierno.guides.title")}
        items={guides}
      />

      <FaqSection eyebrow={t("gobierno.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} className="bg-background" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
