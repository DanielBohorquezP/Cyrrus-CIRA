import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGroupBlocks } from "@/lib/use-group-blocks";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { bulletCards, splitHeroTitle, splitQuote } from "@/components/layout/service-child-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { IncludedGrid } from "@/components/sections/included-grid";
import { PageFeatureImage } from "@/components/sections/page-feature-image";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
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
  const groupBlocks = useGroupBlocks("cambio");

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

  const heroTitle = splitHeroTitle(t("hero.title"));
  const content: ServiceContent = {
    hero: {
      eyebrow: t("hero.eyebrow"),
      ...heroTitle,
      description: t("hero.description"),
      ctaLabel: t("hero.ctaLabel"),
      link: { href: methodPath, label: t("intro.methodLinkLabel") },
    },
    breadcrumbs: [...breadcrumbItems.slice(0, -1), { label: heroTitle.title }],
    media: {
      image: { src: "/assets/decoracion/hero-gestion-cambio.jpg", alt: "" },
      video: { mp4: "/assets/video/gestion-cambio.mp4", webm: "/assets/video/gestion-cambio.webm" },
    },
    queHacemos: {
      eyebrow: t("intro.kicker"),
      ...splitQuote(t("intro.pullQuote")),
      intro: t("intro.description"),
      cards: bulletCards(
        t("intro.bulletTitles", { returnObjects: true }) as string[],
        t("intro.bullets", { returnObjects: true }) as string[],
        1,
      ),
      links: (
        <>
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
        </>
      ),
    },
    queEs: {
      title: t("definicion.title"),
      body: t("definicion.description"),
      refs: [],
      uses: { label: t("usos.title"), items: t("usos.items", { returnObjects: true }) as Item[] },
    },
    comoLoHacemos: t("comoLoHacemos", { returnObjects: true }) as ServiceContent["comoLoHacemos"],
    autoridad: groupBlocks.autoridad,
    beneficios: { title: t("benefits.title"), items: benefits },
    faq: { eyebrow: t("faq.eyebrow"), title: t("faq.title"), items: faqs },
    related: { eyebrow: t("related.eyebrow"), title: t("related.title"), items: relatedItems },
  };

  return (
    <ServiceTemplate
      content={content}
      extrasEndTone="white"
      extras={
        <>
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

          <ServiceLead eyebrow={t("lead.eyebrow")} title={t("lead.title")} bio={t("lead.bio")} className="bg-mist" />

          <PageFeatureImage
            src="/assets/decoracion/Trabajo.jpg"
            alt="Consultor de Cyrrus trabajando en un plan de adopción del cambio"
            caption={t("featureImage.caption")}
          />

          <Testimonials className="bg-background" />
        </>
      }
    />
  );
}
