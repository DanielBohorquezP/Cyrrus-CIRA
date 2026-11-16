import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SOLUCIONES_HERO_MEDIA } from "@/lib/service-media";
import { useGroupBlocks } from "@/lib/use-group-blocks";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { bulletCards, splitHeroTitle, splitQuote } from "@/components/layout/service-child-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { solutionCategoryImages } from "@/lib/solutions-icons";
import { IncludedGrid } from "@/components/sections/included-grid";
import { ServiceIntro } from "@/components/sections/service-intro";
import { CardGrid } from "@/components/ui/card-grid";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-soluciones";

interface CriteriaItem {
  title: string;
  description: string;
}
interface BenefitItem {
  title: string;
  description: string;
}
interface CategoryItem {
  slug: string;
  label: string;
  note: string;
}
interface ProcessStep {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}


export default function SeleccionDeSoluciones() {
  const { t } = useTranslation("seleccion-soluciones");
  const lang = useLang();
  const groupBlocks = useGroupBlocks("soluciones");
  const prefix = lang === "en" ? "/en" : "";

  const criteria = t("criteria.items", { returnObjects: true }) as CriteriaItem[];
  const benefits = t("benefits.items", { returnObjects: true }) as BenefitItem[];
  const categories = (t("categories.items", { returnObjects: true }) as CategoryItem[]).map((c) => ({
    ...c,
    href: `${prefix}/metodo-cira/seleccion-de-soluciones/${c.slug}`,
    image: solutionCategoryImages[c.slug],
  }));
  const services = t("services.items", { returnObjects: true }) as string[];
  const process = t("process.steps", { returnObjects: true }) as ProcessStep[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const estrategiaPath = `${prefix}/metodo-cira/estrategia`;
  const pmoPath = `${prefix}/metodo-cira/gestion-de-proyectos`;
  const changePath = `${prefix}/metodo-cira/gestion-del-cambio`;
  // The 3 Castillos case is the published proof of an infrastructure, ERP and CRM selection.
  const casePath = `${prefix}/experiencia/3-castillos`;
  const relatedPaths = [estrategiaPath, pmoPath, changePath, casePath];
  const answerItems = t("respuesta.items", { returnObjects: true }) as CriteriaItem[];
  const relatedItems = (t("related.items", { returnObjects: true }) as BenefitItem[]).map((it, i) => ({
    ...it,
    href: relatedPaths[i],
  }));
  const pagePath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/seleccion-de-soluciones" : "/en/metodo-cira/seleccion-de-soluciones",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Enterprise solution selection" : "Selección de soluciones empresariales",
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
    media: SOLUCIONES_HERO_MEDIA,
    queHacemos: {
      eyebrow: t("intro.kicker"),
      ...splitQuote(t("intro.pullQuote")),
      intro: t("intro.description"),
      cards: bulletCards(
        t("intro.bulletTitles", { returnObjects: true }) as string[],
        t("intro.bullets", { returnObjects: true }) as string[],
        2,
      ),
      links: (
        <>
          <p>
            {`${t("intro.methodLinkText")} `}<Link to={methodPath} className="font-bold text-blue hover:text-navy">
              {t("intro.methodLinkLabel")}
            </Link>
          </p>
        </>
      ),
    },
    queEs: {
      title: t("respuesta.title"),
      body: t("respuesta.body"),
      refs: answerItems,
      uses: { label: t("usos.title"), items: t("usos.items", { returnObjects: true }) as BenefitItem[] },
    },
    comoLoHacemos: { title: t("process.title"), steps: process },
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
            eyebrow={t("criteria.eyebrow")}
            title={t("criteria.title")}
            items={criteria}
            numbered
          />

          <ServiceIntro
            eyebrow={t("reto.eyebrow")}
            quote={t("reto.pullQuote")}
            description={t("reto.description")}
            bulletsTitle={t("reto.solutionTitle")}
            bullets={t("reto.bullets", { returnObjects: true }) as string[]}
          />

          <section className="section-y w-full bg-mist">
            <div className="container-site">
              <SectionHeader eyebrow={t("categories.eyebrow")} title={t("categories.title")} />
              <CardGrid
                className="mt-16"
                items={categories.map((c) => ({
                  title: c.label,
                  description: c.note,
                  href: c.href,
                  image: { src: c.image, alt: "" },
                }))}
              />
            </div>
          </section>

          <section className="section-y w-full bg-background">
            <div className="container-site">
              <SectionHeader eyebrow={t("services.eyebrow")} title={t("services.title")} />
              <RuledBullets items={services} numbered columns={2} className="mt-14" />
            </div>
          </section>
        </>
      }
    />
  );
}
