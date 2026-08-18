import {
  BarChart3,
  Bot,
  Bug,
  FileQuestion,
  FileText,
  Link2,
  SearchX,
  Sparkles,
  Stethoscope,
  Target,
  TrendingDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
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
import "@/i18n/ns/presencia-digital";
import { Img } from "@/components/ui/img";

interface Problem {
  title: string;
  description: string;
}
interface Included {
  title: string;
  description: string;
}
interface Step {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Stat {
  value: string;
  label: string;
}

const problemIcons = [SearchX, Bot, TrendingDown, FileQuestion, Bug];
const includedIcons = [Stethoscope, Target, FileText, Sparkles, Link2, BarChart3];

export default function Seo() {
  const { t } = useTranslation("presencia-digital");
  const lang = useLang();

  const problems = (t("seo.diagnostico.problems", { returnObjects: true }) as Problem[]).map((p, i) => ({
    ...p,
    icon: problemIcons[i],
  }));
  const included = (t("seo.included.items", { returnObjects: true }) as Included[]).map((it, i) => ({
    ...it,
    icon: includedIcons[i],
  }));
  const steps = t("seo.proceso.steps", { returnObjects: true }) as Step[];
  const services = t("seo.services.items", { returnObjects: true }) as string[];
  const faqs = t("seo.faq.items", { returnObjects: true }) as Faq[];
  const stats = t("seo.whyCyrrus.stats", { returnObjects: true }) as Stat[];

  const siteUrl = "https://www.cyrruscs.com";
  const pagePath = lang === "en" ? "/en/presencia-digital/seo" : "/presencia-digital/seo";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/presencia-digital" : "/presencia-digital";

  usePageMeta({
    title: t("seo.meta.title"),
    description: t("seo.meta.description"),
    alternatePath: lang === "en" ? "/presencia-digital/seo" : "/en/presencia-digital/seo",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("seo.serviceDescription"),
        name: t("seo.hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("seo.meta.description"),
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
          { "@type": "ListItem", position: 2, name: "Cyrrus Presencia Digital", item: `${siteUrl}${hubPath}` },
          { "@type": "ListItem", position: 3, name: t("seo.hero.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={t("seo.hero.eyebrow")}
        title={t("seo.hero.title")}
        description={t("seo.hero.description")}
        image={{
          src: "/assets/decoracion/IMG_20230302_112825.jpg",
          alt: "Consultores de Cyrrus revisando resultados de posicionamiento en buscadores",
        }}
      >
        <ContactCtaButton variant="light" label={t("seo.hero.ctaLabel")} />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="block text-base font-bold uppercase tracking-wider text-blue">
              {t("seo.intro.kicker")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("seo.intro.pullQuote")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
            <Reveal
              delay={0.1}
              className="relative h-64 overflow-hidden rounded-2xl shadow-sm md:col-span-5 md:h-auto"
            >
              <Img
                src="/assets/decoracion/Cyrrus%20panel.jpg"
                alt="Analista de Cyrrus revisando métricas de visibilidad en buscadores"
                width={1600}
                height={720}
                      className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 1152px) 528px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
              />
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-7">
              <p className="text-lg leading-relaxed text-gray">
                {t("seo.intro.description")}
              </p>
              <ul className="mt-8 space-y-4">
                {(t("seo.intro.bullets", { returnObjects: true }) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Target className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("seo.diagnostico.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("seo.diagnostico.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("seo.diagnostico.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <RevealItem
                  key={problem.title}
                  className="flex gap-5 rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-navy">
                      {problem.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray">
                      {problem.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("seo.hero.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <AnimatedNavyBackground className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-wider text-cyan">
              {t("seo.whyCyrrus.eyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t("seo.whyCyrrus.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              {t("seo.whyCyrrus.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <RevealItem key={stat.value} className="px-4">
                <dd className="bg-gradient-to-br from-cyan to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                  {stat.value}
                </dd>
                <span className="mt-3 block text-base leading-relaxed text-white/70">
                  {stat.label}
                </span>
                <span className="mx-auto mt-4 block h-[3px] w-9 rounded-full bg-cyan" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </AnimatedNavyBackground>

      <IncludedGrid
        eyebrow={t("seo.included.eyebrow")}
        title={t("seo.included.title")}
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <span className="text-base font-bold uppercase tracking-wider text-blue">
                {t("seo.proceso.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {t("seo.proceso.title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray">
                {t("seo.proceso.description")}
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative h-64 overflow-hidden rounded-2xl shadow-sm md:col-span-5 md:h-auto md:min-h-[220px]"
            >
              <Img
                src="/assets/decoracion/IMG_20230228_082632.jpg"
                alt="Equipo de Cyrrus definiendo la estrategia de contenido y palabras clave"
                width={720}
                height={1600}
                      className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 1152px) 528px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
              />
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <RevealItem
                key={step.title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("seo.hero.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("seo.services.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("seo.services.title")}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
            {services.map((service, index) => (
              <div
                key={service}
                className="flex items-center gap-6 py-5"
              >
                <span className="text-sm font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-navy">{service}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow={t("seo.faq.eyebrow")} title={t("seo.faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
