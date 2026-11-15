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

export default function AutomatizacionesDesarrollo() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();

  const included = t("automatizaciones.included.items", { returnObjects: true }) as Item[];
  const faqs = t("automatizaciones.faq.items", { returnObjects: true }) as Faq[];
  const body = t("automatizaciones.body", { returnObjects: true }) as string[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/automatizaciones-desarrollo" : "/intelligence-lab/automatizaciones-desarrollo";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Intelligence Lab", href: hubPath },
    { label: t("automatizaciones.hero.title") },
  ];
  const gobiernoPath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  const arquitecturaPath = lang === "en" ? "/en/intelligence-lab/arquitectura-de-ia" : "/intelligence-lab/arquitectura-de-ia";
  const pmoPath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";
  const relatedPaths = [gobiernoPath, arquitecturaPath, pmoPath];
  const relatedItems = (t("automatizaciones.related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));

  usePageMeta({
    title: t("automatizaciones.meta.title"),
    description: t("automatizaciones.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/automatizaciones-desarrollo" : "/en/intelligence-lab/automatizaciones-desarrollo",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("automatizaciones.serviceDescription"),
        name: t("automatizaciones.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("automatizaciones.meta.description"),
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
        title={t("automatizaciones.hero.title")}
        description={t("automatizaciones.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224326.jpg",
          alt: "Escritorio de trabajo con monitores y branding de Cyrrus",
        }}
      >
        <ContactCtaButton variant="light" />
      </PageHero>

      <IncludedGrid
        eyebrow={t("automatizaciones.included.eyebrow")}
        title={t("automatizaciones.included.title")}
        items={included}
        numbered
      />

      <ServiceBody
        paragraphs={body}
        imageSide="right"
        image={{
          src: "/assets/decoracion/1785866223667.jpg",
          alt: "Escritorio con monitores mostrando la plataforma de Cyrrus",
        }}
      />

      <RelatedServices
        className="bg-background"
        eyebrow={t("automatizaciones.related.eyebrow")}
        title={t("automatizaciones.related.title")}
        items={relatedItems}
      />

      <FaqSection eyebrow={t("automatizaciones.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} className="bg-mist" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
