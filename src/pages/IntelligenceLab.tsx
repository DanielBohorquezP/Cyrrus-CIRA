import { IA_HERO_MEDIA } from "@/lib/service-media";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { TransparentHeader } from "@/components/layout/transparent-header";
import { splitHeroTitle } from "@/components/layout/service-child-page";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceClosing } from "@/components/sections/service-closing";

import { Footer } from "@/components/sections/footer";
import { CardGrid } from "@/components/ui/card-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { FaqSection } from "@/components/sections/faq-section";
import { IncludedGrid } from "@/components/sections/included-grid";
import { RelatedServices } from "@/components/sections/related-services";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";

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
interface Item {
  title: string;
  description: string;
}
interface Guide extends Item {
  slug: string;
}

const phasePaths: Record<string, string> = {
  construir: "/servicios/estrategia",
  identificar: "/servicios/seleccion-de-soluciones",
  realizar: "/servicios/gerencia-de-proyectos",
  adoptar: "/servicios/gestion-del-cambio",
};

export default function IntelligenceLab() {
  const { t } = useTranslation("intelligence-lab");
  const { t: tc } = useTranslation();
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const pillars = (t("hub.pillars.items", { returnObjects: true }) as Pillar[]).map((p) => ({
    ...p,
    href: `${prefix}/servicios/inteligencia-artificial/${p.hrefSlug}`,
  }));
  const phaseLinks = (t("hub.transversal.phases", { returnObjects: true }) as PhaseLink[]).map((p) => ({
    ...p,
    href: `${prefix}${phasePaths[p.hash]}`,
  }));
  const faqs = t("hub.faq.items", { returnObjects: true }) as Faq[];
  const answerItems = t("hub.respuesta.items", { returnObjects: true }) as Item[];
  const guides = (t("hub.guides.items", { returnObjects: true }) as Guide[]).map((g) => ({
    href: `${prefix}/perspectivas/${g.slug}`,
    title: g.title,
    description: g.description,
  }));

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const pagePath = `${prefix}/servicios/inteligencia-artificial`;

  usePageMeta({
    title: t("hub.meta.title"),
    description: t("hub.meta.description"),
    alternatePath: lang === "en" ? "/servicios/inteligencia-artificial" : "/en/servicios/inteligencia-artificial",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Corporate artificial intelligence governance" : "Gobierno de inteligencia artificial corporativo",
        name: "Cyrrus Intelligence Lab",
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
          { "@type": "ListItem", position: 2, name: "Cyrrus Intelligence Lab", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <TransparentHeader />
      <main id="contenido">
      <ServiceHero
        eyebrow={t("hub.hero.eyebrow")}
        {...splitHeroTitle(t("hub.hero.title"))}
        description={t("hub.hero.description")}
        breadcrumbs={[
          { label: lang === "en" ? "Home" : "Inicio", href: lang === "en" ? "/en" : "/" },
          { label: t("hub.hero.eyebrow") },
        ]}
        image={IA_HERO_MEDIA.image}
        video={IA_HERO_MEDIA.video}
      >
        <ContactCtaButton variant="light" label={tc("cta.agendarConversacion")} prefill={{ servicio: "ia" }} />
      </ServiceHero>

      {/* Answer-first block: what AI consulting is, in the searcher's words */}
      <IncludedGrid
        className="bg-mist"
        eyebrow={t("hub.respuesta.eyebrow")}
        title={t("hub.respuesta.title")}
        description={t("hub.respuesta.description")}
        items={answerItems}
      />

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

      <RelatedServices
        className="bg-background"
        eyebrow={t("hub.guides.eyebrow")}
        title={t("hub.guides.title")}
        items={guides}
      />

      <FaqSection eyebrow={t("hub.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} className="bg-mist" />

      <ServiceClosing eyebrow={t("hub.pillars.eyebrow")} items={pillars} ctaLabel={tc("cta.agendarConversacion")} />
      </main>
      <Footer />
    </>
  );
}
