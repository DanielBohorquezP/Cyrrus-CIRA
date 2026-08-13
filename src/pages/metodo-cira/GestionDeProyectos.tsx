import {
  CheckCircle2,
  ClipboardCheck,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

interface Item {
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}

const differentiatorIcons = [Layers, ShieldCheck, Users, ClipboardCheck];
const benefitIcons = [Layers, ShieldCheck, Users, ClipboardCheck, Sparkles];

export default function GestionDeProyectos() {
  const { t } = useTranslation("gestion-proyectos");
  const lang = useLang();

  const differentiators = (t("differentiators.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: differentiatorIcons[i],
  }));
  const benefits = (t("benefits.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: benefitIcons[i],
  }));
  const services = t("services.items", { returnObjects: true }) as string[];
  const achievements = t("achievements.items", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = lang === "en" ? "/en/metodo-cira/gestion-de-proyectos" : "/metodo-cira/gestion-de-proyectos";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/gestion-de-proyectos" : "/en/metodo-cira/gestion-de-proyectos",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Project management and implementation" : "Gerencia de proyectos e implementación",
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
            <span className="block text-sm font-semibold uppercase tracking-wider text-blue">
              {t("intro.kicker")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("intro.pullQuote")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
            <Reveal delay={0.1} className="md:col-span-5">
              <img
                src="/assets/decoracion/IMG_20200313_092713184.jpg"
                alt="Consultor de Cyrrus presentando metodología de gerencia de proyectos"
                width={640}
                height={427}
                loading="lazy"
                className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-full"
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
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("differentiators.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("differentiators.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("differentiators.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{item.description}</p>
                </motion.div>
              );
            })}
            <motion.div variants={staggerItem} className="overflow-hidden rounded-2xl sm:col-span-2">
              <img
                src="/assets/decoracion/IMG_20230228_091017.jpg"
                alt="Presentación de gerencia de proyectos de Cyrrus"
                width={640}
                height={220}
                loading="lazy"
                className="h-full min-h-[180px] w-full object-cover"
              />
            </motion.div>
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("differentiators.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("reto.eyebrow")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("reto.pullQuote")}
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray">
              {t("reto.description")}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue">
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
      </section>

      <IncludedGrid
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
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

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("achievements.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("achievements.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {achievements.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <span className="text-base leading-relaxed text-navy/80">{item}</span>
              </motion.div>
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
