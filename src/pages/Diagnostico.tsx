import { CheckCircle2, ClipboardCheck, MessagesSquare, Scale } from "lucide-react";
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
const sessionIcons = [MessagesSquare, Scale, ClipboardCheck];

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

        <section className="w-full bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-12">
            <Reveal className="md:col-span-5">
              <span className="block text-base font-bold uppercase tracking-wider text-blue">{t("who.eyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{t("who.title")}</h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <ul className="space-y-4">
                {whoItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-navy">{t("who.notTitle")}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray">{t("who.notText")}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="max-w-2xl">
              <span className="block text-base font-bold uppercase tracking-wider text-blue">{t("session.eyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{t("session.title")}</h2>
            </Reveal>
            <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {sessionSteps.map((step, i) => {
                const Icon = sessionIcons[i];
                return (
                  <RevealItem key={step.title} className="rounded-2xl border border-border bg-card p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                      <Icon className="h-5 w-5 text-cyan" />
                    </div>
                    <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-blue">
                      {step.time}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-navy">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-gray">{step.description}</p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-12">
            <Reveal className="md:col-span-5">
              <span className="block text-base font-bold uppercase tracking-wider text-blue">{t("take.eyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{t("take.title")}</h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <ul className="space-y-4">
                {takeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="max-w-2xl">
              <span className="block text-base font-bold uppercase tracking-wider text-blue">{t("how.eyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{t("how.title")}</h2>
            </Reveal>
            <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {howSteps.map((step, i) => (
                <RevealItem key={step.title} className="rounded-2xl border border-border bg-card p-7">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray">{step.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-10">
              <p className="text-base leading-relaxed text-gray">
                {`${t("how.toolText")} `}<Link
                  to={langPath("/herramientas/test-preparacion-erp", lang)}
                  className="text-navy underline underline-offset-2"
                >
                  {t("how.toolLink")}
                </Link>
                .
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
