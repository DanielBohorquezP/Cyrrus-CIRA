import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGroupBlocks } from "@/lib/use-group-blocks";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { bulletCards, splitHeroTitle, splitQuote } from "@/components/layout/service-child-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { IncludedGrid } from "@/components/sections/included-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { Reveal } from "@/components/ui/reveal";
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
  const groupBlocks = useGroupBlocks("proyectos");

  const differentiators = t("differentiators.items", { returnObjects: true }) as Item[];
  const benefits = t("benefits.items", { returnObjects: true }) as Item[];
  const services = t("services.items", { returnObjects: true }) as ScopeItem[];
  const achievements = t("achievements.items", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = lang === "en" ? "/en/servicios/gerencia-de-proyectos" : "/servicios/gerencia-de-proyectos";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];
  const erpPath = lang === "en"
    ? "/en/servicios/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/servicios/seleccion-de-soluciones/seleccion-de-software/erp";
  const changePath = lang === "en" ? "/en/servicios/gestion-del-cambio" : "/servicios/gestion-del-cambio";
  const automationPath = lang === "en"
    ? "/en/servicios/inteligencia-artificial/automatizacion-y-agentes-ia"
    : "/servicios/inteligencia-artificial/automatizacion-y-agentes-ia";
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
    alternatePath: lang === "en" ? "/servicios/gerencia-de-proyectos" : "/en/servicios/gerencia-de-proyectos",
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

  const heroTitle = splitHeroTitle(t("hero.title"));
  const content: ServiceContent = {
    area: "proyectos",
    hero: {
      eyebrow: t("hero.eyebrow"),
      ...heroTitle,
      description: t("hero.description"),
      ctaLabel: t("hero.ctaLabel"),
      link: { href: methodPath, label: t("intro.methodLinkLabel") },
    },
    breadcrumbs: [...breadcrumbItems.slice(0, -1), { label: heroTitle.title }],
    media: {
      image: { src: "/assets/decoracion/hero-gerencia-proyectos.jpg", alt: "" },
      video: { mp4: "/assets/video/gerencia-proyectos.mp4" },
    },
    queHacemos: {
      eyebrow: t("intro.kicker"),
      ...splitQuote(t("intro.pullQuote")),
      intro: t("intro.description"),
      cards: bulletCards(
        t("intro.bulletTitles", { returnObjects: true }) as string[],
        t("intro.bullets", { returnObjects: true }) as string[],
        0,
      ),
      links: (
        <>
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
          <IncludedGrid
            className="bg-mist"
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
            className="bg-background"
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
            className="bg-mist"
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

          <Testimonials className="bg-background" />
        </>
      }
    />
  );
}
