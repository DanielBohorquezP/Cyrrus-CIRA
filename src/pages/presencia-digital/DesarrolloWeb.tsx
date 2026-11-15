import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { ServiceIntro } from "@/components/sections/service-intro";
import { RelatedServices } from "@/components/sections/related-services";
import { DarkStatBand } from "@/components/ui/dark-stat-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NumberedList } from "@/components/ui/numbered-list";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/presencia-digital";

interface Problem {
  title: string;
  description: string;
}
interface Included {
  title: string;
  description: string;
}
interface Step {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Stat {
  value: string;
  label: string;
}


export default function DesarrolloWeb() {
  const { t } = useTranslation("presencia-digital");
  const lang = useLang();

  const problems = t("desarrolloWeb.diagnostico.problems", { returnObjects: true }) as Problem[];
  const included = t("desarrolloWeb.included.items", { returnObjects: true }) as Included[];
  const steps = t("desarrolloWeb.proceso.steps", { returnObjects: true }) as Step[];
  const services = t("desarrolloWeb.services.items", { returnObjects: true }) as string[];
  const faqs = t("desarrolloWeb.faq.items", { returnObjects: true }) as Faq[];
  const stats = t("desarrolloWeb.whyCyrrus.stats", { returnObjects: true }) as Stat[];

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/presencia-digital/desarrollo-web" : "/presencia-digital/desarrollo-web";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/presencia-digital" : "/presencia-digital";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Presencia Digital", href: hubPath },
    { label: t("desarrolloWeb.hero.title") },
  ];

  usePageMeta({
    title: t("desarrolloWeb.meta.title"),
    description: t("desarrolloWeb.meta.description"),
    alternatePath: lang === "en" ? "/presencia-digital/desarrollo-web" : "/en/presencia-digital/desarrollo-web",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("desarrolloWeb.serviceDescription"),
        name: t("desarrolloWeb.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("desarrolloWeb.meta.description"),
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
        eyebrow={t("desarrolloWeb.hero.eyebrow")}
        title={t("desarrolloWeb.hero.title")}
        description={t("desarrolloWeb.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224151.jpg",
          alt: "Equipo de Cyrrus trabajando en el desarrollo de un sitio corporativo",
        }}
      >
        <ContactCtaButton variant="light" label={t("desarrolloWeb.hero.ctaLabel")} />
      </PageHero>

      <ServiceIntro
        eyebrow={t("desarrolloWeb.intro.kicker")}
        quote={t("desarrolloWeb.intro.pullQuote")}
        description={t("desarrolloWeb.intro.description")}
        bullets={t("desarrolloWeb.intro.bullets", { returnObjects: true }) as string[]}
        image={{
          src: "/assets/decoracion/IMG_20230705_122802.jpg",
          alt: "Diseñador de Cyrrus revisando la arquitectura de un sitio web corporativo",
        }}
      />

      <section className="section-y w-full bg-mist">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-24 gap-y-14">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>{t("desarrolloWeb.diagnostico.eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{t("desarrolloWeb.diagnostico.title")}</h2>
            <p className="mt-6 text-lg leading-[1.7] text-pretty text-slate">{t("desarrolloWeb.diagnostico.description")}</p>
          </Reveal>
          <NumberedList items={problems} />
        </div>
      </section>

      <DarkStatBand
        eyebrow={t("desarrolloWeb.whyCyrrus.eyebrow")}
        title={t("desarrolloWeb.whyCyrrus.title")}
        description={t("desarrolloWeb.whyCyrrus.description")}
        stats={stats}
      />

      <IncludedGrid
        eyebrow={t("desarrolloWeb.included.eyebrow")}
        title={t("desarrolloWeb.included.title")}
        items={included}
        numbered
      />

      <IncludedGrid
        className="bg-mist"
        eyebrow={t("desarrolloWeb.proceso.eyebrow")}
        title={t("desarrolloWeb.proceso.title")}
        description={t("desarrolloWeb.proceso.description")}
        items={steps}
        numbered
        image={{
          src: "/assets/decoracion/IMG_20230228_082627.jpg",
          alt: "Consultor de Cyrrus capacitando al equipo de un cliente para operar su sitio web",
          position: "50% 71%",
        }}
      />

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("desarrolloWeb.services.eyebrow")} title={t("desarrolloWeb.services.title")} />
          <RuledBullets items={services} numbered columns={2} className="mt-14" />
        </div>
      </section>

      <RelatedServices
        className="bg-mist"
        eyebrow={lang === "en" ? "Related solutions" : "Soluciones relacionadas"}
        title={lang === "en" ? "Presencia Digital also includes" : "Presencia Digital también incluye"}
        items={[
          {
            href: hubPath,
            title: lang === "en" ? "Cyrrus Digital Presence" : "Cyrrus Presencia Digital",
            description: lang === "en" ? "See overview" : "Ver panorama",
          },
          {
            href: lang === "en" ? "/en/presencia-digital/seo" : "/presencia-digital/seo",
            title: t("seo.hero.title"),
            description: lang === "en" ? "See SEO" : "Ver SEO",
          },
        ]}
      />

      <FaqSection eyebrow={t("desarrolloWeb.faq.eyebrow")} title={t("desarrolloWeb.faq.title")} faqs={faqs} />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
