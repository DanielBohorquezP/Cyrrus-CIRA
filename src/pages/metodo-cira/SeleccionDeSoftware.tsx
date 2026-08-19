import {
  Boxes,
  Building2,
  Cpu,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { productImages, softwareHubImage, type ProductSlug } from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-de-software";
import { Img } from "@/components/ui/img";

interface CategoryItem {
  slug: string;
  title: string;
  description: string;
  linkLabel: string;
}
interface EvalItem {
  title: string;
  description: string;
}
interface Fase {
  letra: string;
  titulo: string;
  descripcion: string;
}
interface Faq {
  question: string;
  answer: string;
}

const evaluamosIcons = [Target, Cpu, DollarSign, TrendingUp, Building2, Users];

export default function SeleccionDeSoftware() {
  const { t } = useTranslation("seleccion-de-software");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const categorias = (t("categorias.items", { returnObjects: true }) as CategoryItem[]).map((c) => ({
    ...c,
    href: `${prefix}/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${c.slug}`,
    image: productImages[c.slug as ProductSlug],
  }));
  const evaluamos = (t("evaluamos.items", { returnObjects: true }) as EvalItem[]).map((item, i) => ({
    ...item,
    icon: evaluamosIcons[i],
  }));
  const fases = t("metodo.fases", { returnObjects: true }) as Fase[];
  const problemaBullets = t("problema.bullets", { returnObjects: true }) as string[];
  const costoBullets = t("costo.bullets", { returnObjects: true }) as string[];
  const preguntaSteps = t("preguntaCorrecta.steps", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const pagePath = `${selectionPath}/seleccion-de-software`;

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en"
      ? "/metodo-cira/seleccion-de-soluciones/seleccion-de-software"
      : "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Enterprise software selection" : "Selección de software empresarial",
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
        image={{ src: softwareHubImage, alt: t("hero.title") }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
          <Link
            to={`${prefix}/metodo-cira`}
            className="text-sm font-semibold text-white/80 underline-offset-4 hover:underline"
          >
            {t("hero.ctaSecondaryLabel")}
          </Link>
        </div>
      </PageHero>

      {/* 02 — El problema */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="block text-base font-bold uppercase tracking-wider text-blue">
              {t("problema.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("problema.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("problema.intro")}
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {problemaBullets.map((item) => (
              <RevealItem
                key={item}
                className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-navy/80"
              >
                {item}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10 max-w-3xl border-l-2 border-cyan pl-6">
            <p className="text-lg font-semibold leading-snug text-navy">
              {t("problema.punch")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — El costo de equivocarse */}
      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("costo.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("costo.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {costoBullets.map((item) => (
              <RevealItem
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <span className="text-sm leading-relaxed text-navy/80">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-lg font-semibold leading-snug text-navy">
              {t("costo.punch")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — La pregunta correcta */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("preguntaCorrecta.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("preguntaCorrecta.title")}
            </h2>
            <p className="mt-8 text-lg text-navy/40 line-through">
              {t("preguntaCorrecta.notQuestion")}
            </p>
            <p className="mt-3 text-2xl font-semibold text-navy">
              {t("preguntaCorrecta.realQuestion")}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {preguntaSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-semibold text-navy">
                  {step}
                </span>
                {i < preguntaSteps.length - 1 && (
                  <span className="text-blue" aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 05 — Nuestra solución: aquí, y solo aquí, se explica el Método CIRA completo */}
      <AnimatedNavyBackground id="metodo" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan">
              {t("metodo.eyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t("metodo.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              {t("metodo.intro")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fases.map((fase) => (
              <RevealItem
                key={fase.letra}
                className="rounded-2xl border border-white/10 bg-white/5 p-7"
              >
                <span className="text-4xl font-extrabold tracking-tight text-cyan">
                  {fase.letra}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{fase.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{fase.descripcion}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </AnimatedNavyBackground>

      {/* 06 — Qué seleccionamos: enlaces a las 4 subpáginas de producto */}
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("categorias.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("categorias.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((item) => (
              <RevealItem key={item.slug}>
                <Link
                  to={item.href}
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,background-color] duration-150 ease-out hover:border-navy hover:bg-white"
                >
                  <Img
                    src={item.image.image}
                    alt=""
                    width={320}
                    height={160}
                    style={{ objectPosition: item.image.imagePosition ?? "center" }}
                    className="h-28 w-full object-cover"
                    sizes="(min-width: 1024px) 264px, (min-width: 640px) 45vw, calc(100vw - 3rem)"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{item.description}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-blue group-hover:underline">
                      {`${item.linkLabel} →`}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 07 — Cómo evaluamos */}
      <IncludedGrid
        eyebrow={t("evaluamos.eyebrow")}
        title={t("evaluamos.title")}
        items={evaluamos}
      />

      {/* Cierre — 100% agnósticos */}
      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <Boxes className="mx-auto h-8 w-8 text-blue" />
            <p className="mt-6 border-l-2 border-cyan pl-6 text-left text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {`"${t("closingQuote")}"`}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <ContactCtaButton label={t("hero.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
