import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Workflow, Bot, Gauge, ShieldCheck, Network, ClipboardCheck } from "lucide-react";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/intelligence-lab";
import { Img } from "@/components/ui/img";

interface Item {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}

const icons = [Workflow, Bot, Gauge];

export default function AutomatizacionesDesarrollo() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();

  const included = (t("automatizaciones.included.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: icons[i],
  }));
  const faqs = t("automatizaciones.faq.items", { returnObjects: true }) as Faq[];
  const body = t("automatizaciones.body", { returnObjects: true }) as string[];
  const relatedItems = (t("automatizaciones.related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: [ShieldCheck, Network, ClipboardCheck][i],
  }));

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/automatizaciones-desarrollo" : "/intelligence-lab/automatizaciones-desarrollo";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Intelligence Lab", href: hubPath },
    { label: t("automatizaciones.hero.title") },
  ];
  const gobiernoPath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  const arquitecturaPath = lang === "en" ? "/en/intelligence-lab/arquitectura-de-ia" : "/intelligence-lab/arquitectura-de-ia";
  const pmoPath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";
  const relatedPaths = [gobiernoPath, arquitecturaPath, pmoPath];

  usePageMeta({
    title: t("automatizaciones.meta.title"),
    description: t("automatizaciones.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/automatizaciones-desarrollo" : "/en/intelligence-lab/automatizaciones-desarrollo",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("automatizaciones.serviceDescription"),
        name: t("automatizaciones.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("automatizaciones.meta.description"),
        areaServed: "LATAM",
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
      <PageHero
        eyebrow="Cyrrus Intelligence Lab"
        title={t("automatizaciones.hero.title")}
        description={t("automatizaciones.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224326.jpg",
          alt: "Escritorio de trabajo con monitores y branding de Cyrrus",
        }}
      />

      <IncludedGrid
        eyebrow={t("automatizaciones.included.eyebrow")}
        title={t("automatizaciones.included.title")}
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal delay={0.1} className="order-2 space-y-6 text-lg leading-relaxed text-gray md:order-1 md:col-span-7">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="order-1 md:order-2 md:col-span-5">
            <Img
              src="/assets/decoracion/1785866223667.jpg"
              alt="Escritorio con monitores mostrando la plataforma de Cyrrus"
              width={480}
              height={560}
                  className="h-64 w-full rounded-2xl object-cover md:h-full"
              sizes="(min-width: 1152px) 528px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
            />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("automatizaciones.related.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("automatizaciones.related.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedItems.map((item, i) => {
              const RelatedIcon = item.icon;
              return (
                <RevealItem key={item.title}>
                  <Link
                    to={relatedPaths[i]}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-150 ease-out hover:border-blue hover:shadow-md"
                  >
                    <RelatedIcon className="h-6 w-6 text-blue" />
                    <span className="text-base font-semibold text-navy">{item.title}</span>
                    <span className="text-sm leading-relaxed text-gray">{item.description}</span>
                    <span className="mt-auto text-sm font-semibold text-blue">
                      {`${lang === "en" ? "See more" : "Ver más"} →`}
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <FaqSection eyebrow={t("automatizaciones.faq.eyebrow")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
