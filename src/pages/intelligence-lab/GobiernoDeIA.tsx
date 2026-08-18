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
import { FileCheck, Users, Lock } from "lucide-react";
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

const icons = [FileCheck, Users, Lock];

export default function GobiernoDeIA() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();

  const included = (t("gobierno.included.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: icons[i],
  }));
  const faqs = t("gobierno.faq.items", { returnObjects: true }) as Faq[];
  const body = t("gobierno.body", { returnObjects: true }) as string[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/intelligence-lab" : "/intelligence-lab";
  const pagePath = lang === "en" ? "/en/intelligence-lab/gobierno-de-ia" : "/intelligence-lab/gobierno-de-ia";

  usePageMeta({
    title: t("gobierno.meta.title"),
    description: t("gobierno.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab/gobierno-de-ia" : "/en/intelligence-lab/gobierno-de-ia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("gobierno.serviceDescription"),
        name: t("gobierno.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("gobierno.meta.description"),
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
          { "@type": "ListItem", position: 3, name: t("gobierno.hero.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Cyrrus Intelligence Lab"
        title={t("gobierno.hero.title")}
        description={t("gobierno.hero.description")}
        image={{
          src: "/assets/decoracion/1785866224151.jpg",
          alt: "Consultor de Cyrrus con notebook frente a pantallas de trabajo",
        }}
      />

      <IncludedGrid
        eyebrow={t("gobierno.included.eyebrow")}
        title={t("gobierno.included.title")}
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <Img
              src="/assets/decoracion/IMG_20230228_083642.jpg"
              alt="Consultor de Cyrrus trabajando en políticas y controles de datos"
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

      <FaqSection eyebrow={t("gobierno.faq.eyebrow")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
