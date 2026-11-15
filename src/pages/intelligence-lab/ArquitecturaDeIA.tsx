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

export default function ArquitecturaDeIA() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();

  const included = t("arquitectura.included.items", { returnObjects: true }) as Item[];
  const faqs = t("arquitectura.faq.items", { returnObjects: true }) as Faq[];
  const body = t("arquitectura.body", { returnObjects: true }) as string[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/arquitectura-de-ia" : "/intelligence-lab/arquitectura-de-ia";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Intelligence Lab", href: hubPath },
    { label: t("arquitectura.hero.title") },
  ];
  const gobiernoPath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  const automatizacionesPath = lang === "en"
    ? "/en/intelligence-lab/automatizaciones-desarrollo"
    : "/intelligence-lab/automatizaciones-desarrollo";
  const erpPath = lang === "en"
    ? "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp";
  const relatedPaths = [gobiernoPath, automatizacionesPath, erpPath];
  const relatedItems = (t("arquitectura.related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));

  usePageMeta({
    title: t("arquitectura.meta.title"),
    description: t("arquitectura.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/arquitectura-de-ia" : "/en/intelligence-lab/arquitectura-de-ia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("arquitectura.serviceDescription"),
        name: t("arquitectura.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("arquitectura.meta.description"),
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
        title={t("arquitectura.hero.title")}
        description={t("arquitectura.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224006.jpg",
          alt: "Pantalla de trabajo con modelos de IA y datos conectados en Cyrrus",
        }}
      >
        <ContactCtaButton variant="light" />
      </PageHero>

      <IncludedGrid
        eyebrow={t("arquitectura.included.eyebrow")}
        title={t("arquitectura.included.title")}
        items={included}
        numbered
      />

      <ServiceBody
        paragraphs={body}
        imageSide="left"
        image={{
          src: "/assets/decoracion/1785866223775.jpg",
          alt: "Escritorio con monitores mostrando la plataforma de Cyrrus",
        }}
      />

      <RelatedServices
        className="bg-background"
        eyebrow={t("arquitectura.related.eyebrow")}
        title={t("arquitectura.related.title")}
        items={relatedItems}
      />

      <FaqSection eyebrow={t("arquitectura.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} className="bg-mist" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
