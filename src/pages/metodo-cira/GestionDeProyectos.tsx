import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceDefinition } from "@/components/sections/service-definition";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
import { RelatedServices } from "@/components/sections/related-services";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SecondaryButton } from "@/components/ui/border-button";
import { Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/gestion-proyectos";

interface Item {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}


export default function GestionDeProyectos() {
  const { t } = useTranslation("gestion-proyectos");
  const lang = useLang();

  const differentiators = t("differentiators.items", { returnObjects: true }) as Item[];
  const benefits = t("benefits.items", { returnObjects: true }) as Item[];
  const services = t("services.items", { returnObjects: true }) as ScopeItem[];
  const achievements = t("achievements.items", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];
  const erpPath = lang === "en"
    ? "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp";
  const changePath = lang === "en" ? "/en/metodo-cira/gestion-del-cambio" : "/metodo-cira/gestion-del-cambio";
  const automationPath = lang === "en"
    ? "/en/intelligence-lab/automatizaciones-desarrollo"
    : "/intelligence-lab/automatizaciones-desarrollo";
  const relatedPaths = [erpPath, changePath, automationPath];
  const relatedItems = (t("related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));
  const articlePath = lang === "en"
    ? "/en/perspectivas/gerencia-de-proyectos-cuando-contratar-una-pmo-externa"
    : "/perspectivas/gerencia-de-proyectos-cuando-contratar-una-pmo-externa";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/gestion-de-proyectos" : "/en/metodo-cira/gestion-de-proyectos",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Project management services" : "Gerencia de proyectos",
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

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/IMG_20200313_092713184.jpg",
          alt: "Consultor de Cyrrus presentando metodología de gerencia de proyectos",
        }}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
        <SecondaryButton asChild>
          <Link to={methodPath}>{t("intro.methodLinkLabel")}</Link>
        </SecondaryButton>
      </PageHero>

      <ServiceIntro
        eyebrow={t("intro.kicker")}
        quote={t("intro.pullQuote")}
        description={t("intro.description")}
        bullets={t("intro.bullets", { returnObjects: true }) as string[]}
      >
        <p>
          {`${t("intro.methodLinkText")} `}<Link to={methodPath} className="font-bold text-blue hover:text-navy">
            {t("intro.methodLinkLabel")}
          </Link>
        </p>
        <p>
          {`${t("intro.articleLinkText")} `}<Link to={articlePath} className="font-bold text-blue hover:text-navy">
            {t("intro.articleLinkLabel")}
          </Link>
        </p>
      </ServiceIntro>

      <ServiceDefinition
        eyebrow={t("definicion.eyebrow")}
        title={t("definicion.title")}
        description={t("definicion.description")}
      />

      <IncludedGrid
        eyebrow={t("differentiators.eyebrow")}
        title={t("differentiators.title")}
        description={t("differentiators.description")}
        items={differentiators}
        numbered
        image={{
          src: "/assets/decoracion/IMG_20230228_091017.jpg",
          alt: "Presentación de gerencia de proyectos de Cyrrus",
        }}
      />

      <ServiceIntro
        className="bg-mist"
        eyebrow={t("reto.eyebrow")}
        quote={t("reto.pullQuote")}
        description={t("reto.description")}
        bulletsTitle={t("reto.solutionTitle")}
        bullets={t("reto.bullets", { returnObjects: true }) as string[]}
      />

      <ServiceLead
        eyebrow={t("lead.eyebrow")}
        title={t("lead.title")}
        bio={t("lead.bio")}
        className="bg-background"
      />

      <IncludedGrid
        className="bg-mist"
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <ServiceScope
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        description={t("services.description")}
        items={services}
        className="bg-background"
      />

      <section className="section-y w-full bg-mist">
        <div className="container-site">
          <Reveal>
            <Eyebrow>{t("achievements.eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{t("achievements.title")}</h2>
          </Reveal>
          <RuledBullets items={achievements} columns={2} className="mt-14" />
        </div>
      </section>

      <RelatedServices
        className="bg-background"
        eyebrow={t("related.eyebrow")}
        title={t("related.title")}
        items={relatedItems}
      />

      <Testimonials />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
