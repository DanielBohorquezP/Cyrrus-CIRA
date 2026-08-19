import { useParams, Navigate, Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Cpu,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { productIcons, productImages, productSlugs, type ProductSlug } from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { Testimonials } from "@/components/sections/testimonials";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-productos";
import "@/i18n/ns/seleccion-de-software";

interface DolorItem {
  title: string;
  description: string;
}
interface Dolor {
  eyebrow: string;
  title: string;
  items: DolorItem[];
  narrativa: string;
}
interface ProblemaReal {
  eyebrow: string;
  title: string;
  body: string;
  punch: string;
}
interface Solucion {
  eyebrow: string;
  title: string;
  linkLabel: string;
  steps: string[];
}
interface EvalItem {
  title: string;
  description: string;
}
interface Evaluamos {
  eyebrow: string;
  title: string;
  items: EvalItem[];
}
interface Entregables {
  eyebrow: string;
  title: string;
  items: string[];
  closingQuote?: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Meta {
  title: string;
  description: string;
}
interface Hero {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
}

const evaluamosIcons = [Target, Cpu, DollarSign, TrendingUp, Building2, Users];

export default function SeleccionProducto() {
  const { producto } = useParams();
  const { t } = useTranslation(["seleccion-productos", "seleccion-de-software"]);
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const slug = productSlugs.find((s) => s === producto);

  const meta = slug ? (t(`${slug}.meta`, { ns: "seleccion-productos", returnObjects: true }) as Meta) : undefined;
  const hero = slug ? (t(`${slug}.hero`, { ns: "seleccion-productos", returnObjects: true }) as Hero) : undefined;
  const dolor = slug ? (t(`${slug}.dolor`, { ns: "seleccion-productos", returnObjects: true }) as Dolor) : undefined;
  const problemaReal = slug ? (t(`${slug}.problemaReal`, { ns: "seleccion-productos", returnObjects: true }) as ProblemaReal) : undefined;
  const solucion = slug ? (t(`${slug}.solucion`, { ns: "seleccion-productos", returnObjects: true }) as Solucion) : undefined;
  const evaluamos = slug ? (t(`${slug}.evaluamos`, { ns: "seleccion-productos", returnObjects: true }) as Evaluamos) : undefined;
  const entregables = slug ? (t(`${slug}.entregables`, { ns: "seleccion-productos", returnObjects: true }) as Entregables) : undefined;
  const faqs = slug ? (t(`${slug}.faq`, { ns: "seleccion-productos", returnObjects: true }) as Faq[]) : undefined;

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const softwarePath = `${selectionPath}/seleccion-de-software`;
  const pagePath = `${softwarePath}/${slug}`;

  usePageMeta({
    title: meta?.title ?? "",
    description: meta?.description ?? "",
    alternatePath: slug
      ? lang === "en"
        ? `/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${slug}`
        : `/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${slug}`
      : undefined,
    jsonLd:
      hero && slug && faqs
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteUrl}${pagePath}#service`,
              serviceType: `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${slug.toUpperCase()}`,
              name: hero.title,
              provider: { "@id": `${siteUrl}/#organization` },
              description: meta?.description,
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
                { "@type": "ListItem", position: 3, name: lang === "en" ? "Solution Selection" : "Selección de Soluciones", item: `${siteUrl}${selectionPath}` },
                { "@type": "ListItem", position: 4, name: lang === "en" ? "Software Selection" : "Selección de Software", item: `${siteUrl}${softwarePath}` },
                { "@type": "ListItem", position: 5, name: slug.toUpperCase(), item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!slug || !hero || !dolor || !problemaReal || !solucion || !evaluamos || !entregables || !faqs) {
    return <Navigate to={`${prefix}/metodo-cira/seleccion-de-soluciones/seleccion-de-software`} replace />;
  }

  const Icon = productIcons[slug as ProductSlug];
  const image = productImages[slug as ProductSlug];
  const evaluamosItems = evaluamos.items.map((item, i) => ({ ...item, icon: evaluamosIcons[i] }));

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={{ src: image.image, alt: hero.title }}
      >
        <ContactCtaButton variant="light" label={hero.ctaLabel} />
      </PageHero>

      <TrustBar />

      {/* 01 — Dolor */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {dolor.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {dolor.title}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dolor.items.map((item) => (
              <RevealItem
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <div>
                  <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10 max-w-3xl border-l-2 border-cyan pl-6">
            <p className="text-lg font-semibold leading-snug text-navy">{dolor.narrativa}</p>
          </Reveal>
        </div>
      </section>

      {/* 02 — El problema real */}
      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {problemaReal.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {problemaReal.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {problemaReal.body}
            </p>
            <p className="mt-6 text-xl font-semibold text-navy">
              {problemaReal.punch}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — Lo que hacemos / Nuestra solución */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {solucion.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {solucion.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {solucion.steps.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-semibold text-navy">
                  {step}
                </span>
                {i < solucion.steps.length - 1 && (
                  <span className="text-blue" aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <Link
              to={`${prefix}/metodo-cira/seleccion-de-soluciones/seleccion-de-software#metodo`}
              className="text-sm font-semibold text-blue underline-offset-4 hover:underline"
            >
              {`${solucion.linkLabel} →`}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 04 — Evaluación */}
      <IncludedGrid eyebrow={evaluamos.eyebrow} title={evaluamos.title} items={evaluamosItems} />

      {/* 05 — Entregables / Resultado */}
      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {entregables.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {entregables.title}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entregables.items.map((item) => (
              <RevealItem
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <span className="text-sm font-medium text-navy/80">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          {entregables.closingQuote && (
            <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
              <p className="text-lg font-semibold leading-snug text-navy">
                {entregables.closingQuote}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15} className="mt-12 text-center">
            <ContactCtaButton label={hero.ctaLabel} />
          </Reveal>
        </div>
      </section>

      {/* Por qué Cyrrus — 100% agnósticos */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <Icon className="mx-auto h-8 w-8 text-blue" />
            <p className="mt-6 border-l-2 border-cyan pl-6 text-left text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {`"${t("closingQuote", { ns: "seleccion-de-software" })}"`}
            </p>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <FaqSection eyebrow={hero.eyebrow} title={lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
