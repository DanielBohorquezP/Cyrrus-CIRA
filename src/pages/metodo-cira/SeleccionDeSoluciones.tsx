import {
  BarChart3,
  CheckCircle2,
  Cpu,
  Gauge,
  Leaf,
  ListChecks,
  Scale,
  Settings2,
  Target,
  Wrench,
} from "lucide-react";
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
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

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

const criteriaIcons = [Target, Cpu, Scale, Leaf];
const benefitIcons = [Gauge, ListChecks, Settings2, BarChart3, Wrench, Leaf];

export default function SeleccionDeSoluciones() {
  const { t } = useTranslation("seleccion-soluciones");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const criteria = (t("criteria.items", { returnObjects: true }) as CriteriaItem[]).map((c, i) => ({
    ...c,
    icon: criteriaIcons[i],
  }));
  const benefits = (t("benefits.items", { returnObjects: true }) as BenefitItem[]).map((b, i) => ({
    ...b,
    icon: benefitIcons[i],
  }));
  const categories = (t("categories.items", { returnObjects: true }) as CategoryItem[]).map((c) => ({
    ...c,
    href: `${prefix}/metodo-cira/seleccion-de-soluciones/${c.slug}`,
    image: solutionCategoryImages[c.slug],
  }));
  const services = t("services.items", { returnObjects: true }) as string[];
  const process = t("process.steps", { returnObjects: true }) as ProcessStep[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = `${prefix}/metodo-cira/seleccion-de-soluciones`;

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
          { "@type": "ListItem", position: 2, name: lang === "en" ? "CIRA Method" : "Método CIRA", item: `${siteUrl}${methodPath}` },
          { "@type": "ListItem", position: 3, name: t("hero.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="block text-base font-bold uppercase tracking-wider text-blue">
              {t("intro.kicker")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("intro.pullQuote")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
            {/* h-64 md:h-auto + relative/absolute image: with a plain md:h-full
                image, the grid row's auto height was set by the image's own
                tall intrinsic aspect ratio (not by the text column), so the
                photo dictated a row far taller than the text and cropped to
                mostly floor. Taking the image out of flow (absolute) removes
                its intrinsic-size contribution to the row, so the row is
                sized by the text column and the photo just fills whatever
                height that turns out to be. */}
            <Reveal
              delay={0.1}
              className="relative h-64 overflow-hidden rounded-2xl shadow-sm md:col-span-5 md:h-auto"
            >
              <img
                src="/assets/decoracion/Presentacion-BEC-jackson.webp"
                alt="Jackson Bohórquez, fundador de Cyrrus, presentando la metodología de evaluación de proveedores"
                width={470}
                height={730}
                loading="lazy"
                // object-top: this photo is a tall portrait crop with
                // Jackson's face right at the top. Once the row's height
                // followed the (shorter) text column, object-cover's default
                // center position cropped in below his face, showing only
                // his body. Anchoring to the top keeps the face in frame at
                // any row height.
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-7">
              <p className="text-lg leading-relaxed text-gray">
                {t("intro.description")}
              </p>
              <ul className="mt-8 space-y-4">
                {(t("intro.bullets", { returnObjects: true }) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ContactCtaButton label={t("intro.ctaLabel")} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("criteria.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("criteria.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map((item, index) => {
              const Icon = item.icon;
              return (
                <RevealItem
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray">{item.description}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="block text-base font-bold uppercase tracking-wider text-blue">
              {t("reto.eyebrow")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("reto.pullQuote")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-8">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-gray">
                {t("reto.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="text-base font-bold uppercase tracking-wider text-blue">
                {t("reto.solutionTitle")}
              </h3>
              <ul className="mt-6 space-y-4">
                {(t("reto.bullets", { returnObjects: true }) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <IncludedGrid
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("categories.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("categories.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((s) => (
              <RevealItem key={s.href} >
                <Link
                  to={s.href}
                  className="block h-full overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,background-color] duration-150 ease-out hover:border-navy hover:bg-white"
                >
                  <img
                    src={s.image}
                    alt=""
                    width={400}
                    height={160}
                    loading="lazy"
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-navy">{s.label}</h3>
                    <p className="mt-2 text-base leading-relaxed text-gray">{s.note}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("services.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("services.title")}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
            {services.map((service, index) => (
              <div key={service} className="flex items-center gap-6 py-5">
                <span className="text-sm font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-navy">{service}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("process.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("process.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <RevealItem
                key={step.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-cyan">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
