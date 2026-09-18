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
import { Database, Link2, TrendingUp, ShieldCheck, Bot, Boxes } from "lucide-react";
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

const icons = [Database, Link2, TrendingUp];

export default function ArquitecturaDeIA() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();

  const included = (t("arquitectura.included.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: icons[i],
  }));
  const faqs = t("arquitectura.faq.items", { returnObjects: true }) as Faq[];
  const body = t("arquitectura.body", { returnObjects: true }) as string[];
  const relatedItems = (t("arquitectura.related.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: [ShieldCheck, Bot, Boxes][i],
  }));

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/arquitectura-de-ia" : "/intelligence-lab/arquitectura-de-ia";
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Cyrrus Intelligence Lab", href: hubPath },
    { label: t("arquitectura.hero.title") },
  ];
  const gobiernoPath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";
  const automatizacionesPath = lang === "en"
    ? "/en/intelligence-lab/automatizaciones-desarrollo"
    : "/intelligence-lab/automatizaciones-desarrollo";
  const erpPath = lang === "en"
    ? "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp";
  const relatedPaths = [gobiernoPath, automatizacionesPath, erpPath];

  usePageMeta({
    title: t("arquitectura.meta.title"),
    description: t("arquitectura.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/arquitectura-de-ia" : "/en/intelligence-lab/arquitectura-de-ia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("arquitectura.serviceDescription"),
        name: t("arquitectura.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("arquitectura.meta.description"),
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
        title={t("arquitectura.hero.title")}
        description={t("arquitectura.hero.description")}
        breadcrumbs={breadcrumbItems}
        image={{
          src: "/assets/decoracion/1785866224006.jpg",
          alt: "Pantalla de trabajo con modelos de IA y datos conectados en Cyrrus",
        }}
      />

      <IncludedGrid
        eyebrow={t("arquitectura.included.eyebrow")}
        title={t("arquitectura.included.title")}
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <Img
              src="/assets/decoracion/1785866223775.jpg"
              alt="Escritorio con monitores mostrando la plataforma de Cyrrus"
              width={480}
              height={560}
                  className="h-64 w-full rounded-2xl object-cover md:h-full"
              sizes="(min-width: 1152px) 528px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-gray md:col-span-7">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("arquitectura.related.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("arquitectura.related.title")}
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

      <FaqSection eyebrow={t("arquitectura.faq.eyebrow")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
