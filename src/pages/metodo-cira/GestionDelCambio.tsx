import {
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Users,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { PageFeatureImage } from "@/components/sections/page-feature-image";
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

const pillarIcons = [Users, MessageSquare, GraduationCap, HeartHandshake];
const benefitIcons = [HeartHandshake, Users, MessageSquare, HeartHandshake, GraduationCap, CheckCircle2];

export default function GestionDelCambio() {
  const { t } = useTranslation("gestion-cambio");
  const lang = useLang();

  const pillars = (t("pillars.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: pillarIcons[i],
  }));
  const benefits = (t("benefits.items", { returnObjects: true }) as Item[]).map((it, i) => ({
    ...it,
    icon: benefitIcons[i],
  }));
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const pagePath = lang === "en" ? "/en/metodo-cira/gestion-del-cambio" : "/metodo-cira/gestion-del-cambio";
  const academyPath = lang === "en" ? "/en/leadership-academy" : "/leadership-academy";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/gestion-del-cambio" : "/en/metodo-cira/gestion-del-cambio",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Organizational change management" : "Gestión del cambio organizacional",
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
                src="/assets/decoracion/evento-jackson-moderador.jpeg"
                alt="Jackson Bohórquez moderando panel sobre liderazgo y gestión del cambio"
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
              <p className="mt-6 text-base leading-relaxed text-gray">
                {t("intro.academyLinkText")}{" "}
                <Link to={academyPath} className="text-navy underline underline-offset-2">
                  {t("intro.academyLinkLabel")}
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("pillars.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("pillars.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("pillars.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, index) => {
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
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("pillars.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="block text-sm font-semibold uppercase tracking-wider text-blue">
              {t("distinctive.eyebrow")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("distinctive.pullQuote")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-8">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-gray">
                {t("distinctive.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue">
                {t("distinctive.solutionTitle")}
              </h3>
              <ul className="mt-6 space-y-4">
                {(t("distinctive.bullets", { returnObjects: true }) as string[]).map((item) => (
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

      <PageFeatureImage
        src="/assets/decoracion/Trabajo.jpg"
        alt="Consultor de Cyrrus trabajando en un plan de adopción del cambio"
        caption={t("featureImage.caption")}
      />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
