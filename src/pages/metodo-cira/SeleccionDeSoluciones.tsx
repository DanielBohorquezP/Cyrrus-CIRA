import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { solutionCategoryImages } from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceIntro } from "@/components/sections/service-intro";
import { RelatedServices } from "@/components/sections/related-services";
import { CardGrid } from "@/components/ui/card-grid";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SecondaryButton } from "@/components/ui/border-button";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
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
          alt: "Sesión de trabajo con un equipo en un salón de capacitación",
          position: "50% 50%",
        }}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
        <SecondaryButton asChild>
          <Link to={methodPath}>{t("intro.methodLinkLabel")}</Link>
        </SecondaryButton>
      </PageHero>

      {/* Answer-first block: what technology consulting is, in the searcher's words */}
      <IncludedGrid
        className="bg-mist"
        eyebrow={t("respuesta.eyebrow")}
        title={t("respuesta.title")}
        description={t("respuesta.body")}
        items={answerItems}
      />

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
        <div className="pt-3">
          <ContactCtaButton label={t("intro.ctaLabel")} />
        </div>
      </ServiceIntro>

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

      <IncludedGrid
        className="bg-mist"
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <section className="section-y w-full bg-background">
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

      <section className="section-y w-full bg-mist">
        <div className="container-site">
          <SectionHeader eyebrow={t("services.eyebrow")} title={t("services.title")} />
          <RuledBullets items={services} numbered columns={2} className="mt-14" />
        </div>
      </section>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("process.eyebrow")} title={t("process.title")} />
          <CardGrid className="mt-16" numbered min="sm" items={process} />
        </div>
      </section>

      <RelatedServices
        className="bg-mist"
        eyebrow={t("related.eyebrow")}
        title={t("related.title")}
        items={relatedItems}
      />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
