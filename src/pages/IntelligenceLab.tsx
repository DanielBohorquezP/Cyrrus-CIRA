import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { FaqSection } from "@/components/sections/faq-section";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Bot, ArrowRight } from "lucide-react";

interface Pillar {
  title: string;
  description: string;
  hrefSlug: string;
}
interface PhaseLink {
  phase: string;
  hash: string;
  note: string;
}
interface Faq {
  question: string;
  answer: string;
}

const pillarIcons = [ShieldCheck, Network, Bot];

export default function IntelligenceLab() {
  const { t } = useTranslation("intelligence-lab");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const pillars = (t("hub.pillars.items", { returnObjects: true }) as Pillar[]).map((p, i) => ({
    ...p,
    icon: pillarIcons[i],
    href: `${prefix}/intelligence-lab/${p.hrefSlug}`,
  }));
  const phaseLinks = (t("hub.transversal.phases", { returnObjects: true }) as PhaseLink[]).map((p) => ({
    ...p,
    href: `${prefix}/metodo-cira#${p.hash}`,
  }));
  const faqs = t("hub.faq.items", { returnObjects: true }) as Faq[];

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const pagePath = `${prefix}/intelligence-lab`;

  usePageMeta({
    title: t("hub.meta.title"),
    description: t("hub.meta.description"),
    alternatePath: lang === "en" ? "/intelligence-lab" : "/en/intelligence-lab",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Corporate artificial intelligence governance" : "Gobierno de inteligencia artificial corporativo",
        name: "Cyrrus Intelligence Lab",
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("hub.serviceDescription"),
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
          { "@type": "ListItem", position: 2, name: "Cyrrus Intelligence Lab", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow={t("hub.hero.eyebrow")}
        title={t("hub.hero.title")}
        description={t("hub.hero.description")}
      >
        <ContactCtaButton variant="light" />
      </IntelligenceLabHero>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("hub.pillars.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("hub.pillars.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray">
              {t("hub.pillars.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={staggerItem}>
                  <Link
                    to={pillar.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-blue/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue">
                      <Icon className="h-6 w-6 text-blue" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-navy">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray">
                      {pillar.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                      {t("hub.pillars.verMas")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <ContactCtaButton />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("hub.transversal.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("hub.transversal.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phaseLinks.map((item) => (
              <motion.a
                key={item.phase}
                href={item.href}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-blue/30"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-blue">
                  {item.phase}
                </span>
                <span className="mt-3 text-base leading-relaxed text-gray">
                  {item.note}
                </span>
              </motion.a>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <ContactCtaButton />
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow={t("hub.faq.eyebrow")} title={t("hub.faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
