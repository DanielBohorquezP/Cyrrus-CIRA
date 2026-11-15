import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { CardGrid } from "@/components/ui/card-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { FaqSection } from "@/components/sections/faq-section";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/presencia-digital";

interface Pillar {
  title: string;
  description: string;
  hrefSlug: string;
}
interface PhaseLink {
  phase: string;
  hash: string;
  note: string;
}
interface Faq {
  question: string;
  answer: string;
}

// Each CIRA phase has its own service page; /metodo-cira has no #phase anchors.
const phasePaths: Record<string, string> = {
  construir: "/metodo-cira/estrategia",
  identificar: "/metodo-cira/seleccion-de-soluciones",
  realizar: "/metodo-cira/gestion-de-proyectos",
  adoptar: "/metodo-cira/gestion-del-cambio",
};

export default function PresenciaDigital() {
  const { t } = useTranslation("presencia-digital");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const pillars = (t("hub.pillars.items", { returnObjects: true }) as Pillar[]).map((p) => ({
    ...p,
    href: `${prefix}/presencia-digital/${p.hrefSlug}`,
  }));
  const phaseLinks = (t("hub.transversal.phases", { returnObjects: true }) as PhaseLink[]).map((p) => ({
    ...p,
    href: `${prefix}${phasePaths[p.hash] ?? "/metodo-cira"}`,
  }));
  const faqs = t("hub.faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const pagePath = `${prefix}/presencia-digital`;

  usePageMeta({
    title: t("hub.meta.title"),
    description: t("hub.meta.description"),
    alternatePath: lang === "en" ? "/presencia-digital" : "/en/presencia-digital",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("hub.serviceDescription"),
        name: "Cyrrus Presencia Digital",
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("hub.serviceDescription"),
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
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
          { "@type": "ListItem", position: 2, name: "Cyrrus Presencia Digital", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={t("hub.hero.eyebrow")}
        title={t("hub.hero.title")}
        description={t("hub.hero.description")}
      >
        <ContactCtaButton variant="light" label={t("hub.hero.ctaLabel")} />
      </PageHero>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("hub.pillars.eyebrow")}
            title={t("hub.pillars.title")}
            description={t("hub.pillars.description")}
          />
          <CardGrid
            className="mt-16"
            numbered
            items={pillars.map((pillar) => ({
              title: pillar.title,
              description: pillar.description,
              href: pillar.href,
              linkLabel: t("hub.pillars.verMas"),
            }))}
          />
        </div>
      </section>

      <section className="section-y w-full bg-mist">
        <div className="container-site">
          <SectionHeader eyebrow={t("hub.transversal.eyebrow")} title={t("hub.transversal.title")} />
          <CardGrid
            className="mt-16"
            min="sm"
            items={phaseLinks.map((item) => ({
              title: item.phase,
              description: item.note,
              href: item.href,
            }))}
          />
        </div>
      </section>

      <FaqSection eyebrow={t("hub.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
