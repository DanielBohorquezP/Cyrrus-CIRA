import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { PageFeatureImage } from "@/components/sections/page-feature-image";
import { FaqSection } from "@/components/sections/faq-section";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceDefinition } from "@/components/sections/service-definition";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
import { RelatedServices } from "@/components/sections/related-services";
import { SecondaryButton } from "@/components/ui/border-button";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/gestion-cambio";

interface Item {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}


export default function GestionDelCambio() {
  const { t } = useTranslation("gestion-cambio");
  const lang = useLang();

  const pillars = t("pillars.items", { returnObjects: true }) as Item[];
  const benefits = t("benefits.items", { returnObjects: true }) as Item[];
  const services = t("services.items", { returnObjects: true }) as ScopeItem[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = lang === "en" ? "/en/metodo-cira/gestion-del-cambio" : "/metodo-cira/gestion-del-cambio";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];
  const academyPath = lang === "en" ? "/en/leadership-academy" : "/leadership-academy";
  const relatedArticlePath = lang === "en"
    ? "/en/perspectivas/por-que-fracasan-los-proyectos-de-transformacion-digital"
    : "/perspectivas/por-que-fracasan-los-proyectos-de-transformacion-digital";
  const guidePath = lang === "en"
    ? "/en/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla"
    : "/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla";
  const erpPath = lang === "en"
    ? "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp";
  const pmoPath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";
  const aiGovernancePath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  // The Morelco case is the published proof of a change-management engagement.
  const morelcoPath = lang === "en" ? "/en/experiencia/morelco" : "/experiencia/morelco";
  const relatedPaths = [erpPath, pmoPath, aiGovernancePath, morelcoPath];
  const relatedItems = (t("related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/gestion-del-cambio" : "/en/metodo-cira/gestion-del-cambio",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Organizational change management services" : "Servicios de gestión del cambio organizacional",
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
          src: "/assets/decoracion/IMG_20230302_112825.jpg",
          alt: "Grupo de personas de un equipo reunidas en una oficina",
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
          {`${t("intro.academyLinkText")} `}<Link to={academyPath} className="font-bold text-blue hover:text-navy">
            {t("intro.academyLinkLabel")}
          </Link>
        </p>
        <p>
          {`${t("intro.articleLinkText")} `}<Link to={relatedArticlePath} className="font-bold text-blue hover:text-navy">
            {t("intro.articleLinkLabel")}
          </Link>
        </p>
        <p>
          {`${t("intro.guideLinkText")} `}<Link to={guidePath} className="font-bold text-blue hover:text-navy">
            {t("intro.guideLinkLabel")}
          </Link>
        </p>
        <p>
          {`${t("intro.methodLinkText")} `}<Link to={methodPath} className="font-bold text-blue hover:text-navy">
            {t("intro.methodLinkLabel")}
          </Link>
        </p>
      </ServiceIntro>

      <ServiceDefinition
        eyebrow={t("definicion.eyebrow")}
        title={t("definicion.title")}
        description={t("definicion.description")}
      />

      <ServiceScope
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        description={t("services.description")}
        items={services}
        className="bg-background"
      />

      <IncludedGrid
        className="bg-mist"
        eyebrow={t("pillars.eyebrow")}
        title={t("pillars.title")}
        description={t("pillars.description")}
        items={pillars}
        numbered
      />

      <ServiceIntro
        eyebrow={t("distinctive.eyebrow")}
        quote={t("distinctive.pullQuote")}
        description={t("distinctive.description")}
        bulletsTitle={t("distinctive.solutionTitle")}
        bullets={t("distinctive.bullets", { returnObjects: true }) as string[]}
      />

      <ServiceLead
        eyebrow={t("lead.eyebrow")}
        title={t("lead.title")}
        bio={t("lead.bio")}
      />

      <IncludedGrid
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <PageFeatureImage
        src="/assets/decoracion/Trabajo.jpg"
        alt="Consultor de Cyrrus trabajando en un plan de adopción del cambio"
        caption={t("featureImage.caption")}
      />

      <RelatedServices
        eyebrow={t("related.eyebrow")}
        title={t("related.title")}
        items={relatedItems}
      />

      <Testimonials className="bg-background" />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} className="bg-mist" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
