import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceDefinition } from "@/components/sections/service-definition";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
import { RelatedServices } from "@/components/sections/related-services";
import { Testimonials } from "@/components/sections/testimonials";
import { CardGrid } from "@/components/ui/card-grid";
import { DarkStatBand, type Stat } from "@/components/ui/dark-stat-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NumberedList } from "@/components/ui/numbered-list";
import { SecondaryButton } from "@/components/ui/border-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/estrategia";

interface Item {
  title: string;
  description: string;
}
interface Role {
  letter: string;
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}

// One photo per intro card, in the same order as intro.bullets.
const introImages = [
  "/assets/decoracion/IMG_20230227_164810.jpg",
  "/assets/decoracion/IMG_20200313_092701647.jpg",
  "/assets/decoracion/IMG_20230302_112825.jpg",
];

export default function PlaneacionEstrategica() {
  const { t } = useTranslation("estrategia");
  const lang = useLang();

  const problems = t("diagnostico.problems", { returnObjects: true }) as Item[];
  const benefits = t("benefits.items", { returnObjects: true }) as Item[];
  const cxaas = t("cxaas.roles", { returnObjects: true }) as Role[];
  const services = t("services.items", { returnObjects: true }) as ScopeItem[];
  const uses = t("definicion.uses", { returnObjects: true }) as Item[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];
  const stats = t("whyCeos.stats", { returnObjects: true }) as Stat[];
  const bullets = t("intro.bullets", { returnObjects: true }) as string[];
  const bulletTitles = t("intro.bulletTitles", { returnObjects: true }) as string[];
  const bulletAlts = t("intro.bulletImageAlts", { returnObjects: true }) as string[];
  const [quoteLead, ...quoteRest] = t("intro.pullQuote").split(" — ");

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/metodo-cira/estrategia" : "/metodo-cira/estrategia";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const erpPath = lang === "en"
    ? "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp";
  const pmoPath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";
  const changePath = lang === "en" ? "/en/metodo-cira/gestion-del-cambio" : "/metodo-cira/gestion-del-cambio";
  // The 3 Castillos case is the published proof of a strategy-to-go-live engagement.
  const casePath = lang === "en" ? "/en/experiencia/3-castillos" : "/experiencia/3-castillos";
  const itStrategyPath = lang === "en" ? "/en/metodo-cira/estrategia/estrategia-de-ti" : "/metodo-cira/estrategia/estrategia-de-ti";
  const continuityPath = lang === "en"
    ? "/en/metodo-cira/estrategia/continuidad-del-negocio"
    : "/metodo-cira/estrategia/continuidad-del-negocio";
  const relatedPaths = [erpPath, pmoPath, changePath, casePath, itStrategyPath, continuityPath];
  const relatedItems = (t("related.items", { returnObjects: true }) as Item[]).map((item, i) => ({
    ...item,
    href: relatedPaths[i],
  }));
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: t("hero.eyebrow").split(" — ")[0], href: methodPath },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/estrategia" : "/en/metodo-cira/estrategia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Strategy consulting" : "Consultoría estratégica",
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
          src: "/assets/decoracion/IMG_20230228_091011.webp",
          alt: t("hero.imageAlt"),
          caption: t("hero.imageCaption"),
        }}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
        <SecondaryButton asChild>
          <Link to={methodPath}>{t("intro.methodLinkLabel")}</Link>
        </SecondaryButton>
      </PageHero>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-24 gap-y-14">
            <div>
              <Eyebrow>{t("intro.kicker")}</Eyebrow>
              <blockquote className="mt-7 font-heading text-[clamp(28px,3vw,40px)] font-light leading-[1.3] tracking-[-0.02em] text-pretty text-navy">
                {quoteRest.length > 0 ? (
                  <>
                    {`${quoteLead} — `}
                    <span className="font-semibold">{quoteRest.join(" — ")}</span>
                  </>
                ) : (
                  quoteLead
                )}
              </blockquote>
            </div>
            <div>
              <p className="t-lead text-slate">{t("intro.description")}</p>
              <p className="mt-6 text-base text-slate">
                {`${t("intro.methodLinkText")} `}<Link to={methodPath} className="font-bold text-blue hover:text-navy">
                  {t("intro.methodLinkLabel")}
                </Link>
              </p>
            </div>
          </Reveal>

          <CardGrid
            numbered
            min="sm"
            className="mt-[72px]"
            items={bullets.map((description, i) => ({
              title: bulletTitles[i],
              description,
              image: { src: introImages[i], alt: bulletAlts[i], position: i === 0 ? "50% 30%" : undefined },
            }))}
          />
        </div>
      </section>

      <ServiceDefinition
        eyebrow={t("definicion.eyebrow")}
        title={t("definicion.title")}
        description={t("definicion.description")}
        pointsTitle={t("definicion.usesTitle")}
        points={uses}
        link={{ href: langPath(t("definicion.linkHref"), lang), label: t("definicion.linkLabel") }}
      />

      <section className="section-y w-full bg-background">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-24 gap-y-14">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>{t("diagnostico.eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{t("diagnostico.title")}</h2>
            <p className="mt-6 text-lg leading-[1.7] text-pretty text-slate">{t("diagnostico.description")}</p>
          </Reveal>
          <NumberedList items={problems} />
        </div>
      </section>

      <DarkStatBand
        eyebrow={t("whyCeos.eyebrow")}
        title={t("whyCeos.title")}
        description={t("whyCeos.description")}
        stats={stats}
      />

      <IncludedGrid eyebrow={t("benefits.eyebrow")} title={t("benefits.title")} items={benefits} />

      <ServiceScope
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        description={t("services.description")}
        items={services}
      />

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("cxaas.eyebrow")}
            title={t("cxaas.title")}
            description={t("cxaas.description")}
            align="start"
          />
          <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {cxaas.map((role) => (
              <RevealItem
                key={role.title}
                className="flex min-h-[300px] flex-col rounded-2xl bg-navy px-9 py-10 text-white"
              >
                <span className="font-heading text-[56px] font-semibold leading-none tracking-[-0.03em]">
                  {role.letter}
                </span>
                <h3 className="mt-auto pt-10 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-sky">
                  {role.title}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.65] text-pretty text-white/80">{role.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ServiceLead eyebrow={t("lead.eyebrow")} title={t("lead.title")} bio={t("lead.bio")} />

      <Testimonials className="bg-background" />

      <RelatedServices eyebrow={t("related.eyebrow")} title={t("related.title")} items={relatedItems} />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} className="bg-background" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
