import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Workflow, Bot, Gauge } from "lucide-react";

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

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/automatizaciones-desarrollo" : "/intelligence-lab/automatizaciones-desarrollo";

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
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
          { "@type": "ListItem", position: 2, name: "Cyrrus Intelligence Lab", item: `${siteUrl}${hubPath}` },
          { "@type": "ListItem", position: 3, name: t("automatizaciones.hero.title"), item: `${siteUrl}${pagePath}` },
        ],
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
            <img
              src="/assets/decoracion/1785866223667.jpg"
              alt="Escritorio con monitores mostrando la plataforma de Cyrrus"
              width={480}
              height={560}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover md:h-full"
            />
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow={t("automatizaciones.faq.eyebrow")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
