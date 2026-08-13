import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { WorkshopOrbit } from "@/components/ui/workshop-orbit";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { ComingSoon } from "@/components/ui/coming-soon";
import { motion } from "framer-motion";
import { workshops as workshopEntries } from "@/lib/workshops-data";
import {
  Brain,
  Rocket,
  ShieldCheck,
  RefreshCw,
  Users2,
  Database,
  Compass,
} from "lucide-react";

const icons: Record<string, typeof Brain> = {
  "ia-para-directivos": Brain,
  "innovacion-empresarial": Rocket,
  "iso-27001": ShieldCheck,
  "continuidad-de-negocio-drp": RefreshCw,
  "gestion-del-cambio-para-lideres": Users2,
  "gobierno-de-datos-para-ejecutivos": Database,
  "liderazgo-digital-y-toma-de-decisiones": Compass,
};

interface WorkshopTranslation {
  title: string;
  shortDescription: string;
}

export default function LeadershipAcademy() {
  const { t } = useTranslation("leadership-academy");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const workshopTranslations = t("workshops", { returnObjects: true }) as Record<string, WorkshopTranslation>;

  const workshops = workshopEntries.map((w) => ({
    icon: icons[w.slug],
    title: workshopTranslations[w.slug].title,
    description: w.intro,
    href: `${prefix}/leadership-academy/${w.slug}`,
  }));

  const orbitWorkshops = workshopEntries.map((w) => ({
    icon: icons[w.slug],
    title: workshopTranslations[w.slug].title,
    description: workshopTranslations[w.slug].shortDescription,
    href: `${prefix}/leadership-academy/${w.slug}`,
  }));

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const pagePath = `${prefix}/leadership-academy`;

  usePageMeta({
    title: t("hub.meta.title"),
    description: t("hub.meta.description"),
    alternatePath: lang === "en" ? "/leadership-academy" : "/en/leadership-academy",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: t("hub.serviceDescription"),
        name: "Leadership Academy",
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("hub.serviceDetail"),
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
          { "@type": "ListItem", position: 2, name: "Leadership Academy", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Leadership Academy"
        title={t("hub.hero.title")}
        description={t("hub.hero.description")}
        showVisual={false}
        visual={<WorkshopOrbit items={orbitWorkshops} className="mx-auto" />}
      >
        <ContactCtaButton variant="light" />
      </IntelligenceLabHero>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("hub.workshopsSection.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("hub.workshopsSection.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((w) => {
              const Icon = w.icon;
              return (
                <motion.div key={w.title} variants={staggerItem}>
                  <ComingSoon className="block h-full">
                    <div className="h-full rounded-2xl border border-border bg-card p-7">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                        <Icon className="h-5 w-5 text-blue" />
                      </div>
                      <h3 className="mt-5 text-base font-semibold text-navy">
                        {w.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray">
                        {w.description}
                      </p>
                    </div>
                  </ComingSoon>
                </motion.div>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <ContactCtaButton label={t("hub.workshopsSection.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
