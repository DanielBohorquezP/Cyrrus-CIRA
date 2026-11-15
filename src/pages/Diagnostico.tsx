import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CardGrid } from "@/components/ui/card-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/diagnostico";

interface Step {
  time?: string;
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}

const SERVICE = "metodo-cira-seleccion-soluciones";

export default function Diagnostico() {
  const { t } = useTranslation("diagnostico");
  const lang = useLang();

  const whoItems = t("who.items", { returnObjects: true }) as string[];
  const sessionSteps = t("session.steps", { returnObjects: true }) as Step[];
  const takeItems = t("take.items", { returnObjects: true }) as string[];
  const howSteps = t("how.steps", { returnObjects: true }) as Step[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://cyrruscs.com";
  const pagePath = langPath("/diagnostico", lang);
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: langPath("/", lang) },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/diagnostico" : "/en/diagnostico",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Diagnostic session" : "Sesión de diagnóstico",
        name: t("hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("meta.description"),
        areaServed: "Worldwide",
        url: `${siteUrl}${pagePath}`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        >
          <ContactCtaButton variant="light" label={t("hero.ctaLabel")} prefill={{ servicio: SERVICE }} />
        </PageHero>

        <section className="section-y w-full bg-background">
          <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-24 gap-y-12">
            <Reveal>
              <Eyebrow>{t("who.eyebrow")}</Eyebrow>
              <h2 className="t-h2 mt-5 text-navy">{t("who.title")}</h2>
            </Reveal>
            <div>
              <RuledBullets items={whoItems} />
              <Reveal delay={0.1}>
                <div className="mt-10 border-t-2 border-navy pt-6">
                  <h3 className="font-heading text-xl font-semibold text-navy">{t("who.notTitle")}</h3>
                  <p className="mt-3 text-[17px] leading-[1.7] text-slate">{t("who.notText")}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-y w-full bg-mist">
          <div className="container-site">
            <SectionHeader eyebrow={t("session.eyebrow")} title={t("session.title")} />
            <RevealGroup
              as="ol"
              className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-16 gap-y-12"
            >
              {sessionSteps.map((step) => (
                <RevealItem as="li" key={step.title} className="border-t-2 border-navy pt-6">
                  {step.time && <Eyebrow as="span">{step.time}</Eyebrow>}
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-navy">{step.title}</h3>
                  <p className="mt-3.5 text-[17px] leading-[1.7] text-slate">{step.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="section-y w-full bg-background">
          <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-24 gap-y-12">
            <Reveal>
              <Eyebrow>{t("take.eyebrow")}</Eyebrow>
              <h2 className="t-h2 mt-5 text-navy">{t("take.title")}</h2>
            </Reveal>
            <RuledBullets items={takeItems} />
          </div>
        </section>

        <section className="section-y w-full bg-mist">
          <div className="container-site">
            <SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />
            <CardGrid className="mt-16" numbered min="sm" items={howSteps} />
            <Reveal delay={0.1} className="mt-14">
              <p className="text-base text-slate">
                {`${t("how.toolText")} `}<Link
                  to={langPath("/herramientas/test-preparacion-erp", lang)}
                  className="font-bold text-blue hover:text-navy"
                >
                  {t("how.toolLink")}
                </Link>
              </p>
              <div className="mt-6">
                <ContactCtaButton label={t("how.ctaLabel")} prefill={{ servicio: SERVICE }} />
              </div>
            </Reveal>
          </div>
        </section>

        <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

        <FinalCta showDiagnostic={false} />
      </main>
      <Footer />
    </>
  );
}
