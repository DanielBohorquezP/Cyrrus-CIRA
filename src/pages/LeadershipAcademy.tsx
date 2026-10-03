import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { WorkshopOrbit } from "@/components/ui/workshop-orbit";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { ComingSoon } from "@/components/ui/coming-soon";
import { useContactWizard } from "@/lib/contact-wizard-context";
import { trackEvent } from "@/lib/analytics";
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
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/leadership-academy";

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
  intro: string;
}

const WORKSHOP_GROUPS = [
  { key: "iaDatos", slugs: ["ia-para-directivos", "gobierno-de-datos-para-ejecutivos"] },
  { key: "seguridadContinuidad", slugs: ["iso-27001", "continuidad-de-negocio-drp"] },
  {
    key: "liderazgoCambio",
    slugs: ["innovacion-empresarial", "gestion-del-cambio-para-lideres", "liderazgo-digital-y-toma-de-decisiones"],
  },
] as const;

export default function LeadershipAcademy() {
  const { t } = useTranslation("leadership-academy");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";
  const { openWizard } = useContactWizard();

  function handleWorkshopInterest(slug: string) {
    trackEvent("workshop_interest_click", { workshop: slug });
    openWizard({ servicio: `leadership-academy-${slug}` });
  }

  const workshopTranslations = t("workshops", { returnObjects: true }) as Record<string, WorkshopTranslation>;

  const workshops = workshopEntries.map((w) => ({
    slug: w.slug,
    icon: icons[w.slug],
    title: workshopTranslations[w.slug].title,
    description: workshopTranslations[w.slug].intro,
    href: `${prefix}/leadership-academy/${w.slug}`,
  }));
  const workshopsBySlug = new Map(workshops.map((w) => [w.slug, w]));
  const groups = WORKSHOP_GROUPS.map((group) => ({
    title: t(`hub.groups.${group.key}`),
    items: group.slugs.map((slug) => workshopsBySlug.get(slug)!),
  }));

  const orbitWorkshops = workshopEntries.map((w) => ({
    icon: icons[w.slug],
    title: workshopTranslations[w.slug].title,
    description: workshopTranslations[w.slug].shortDescription,
    href: `${prefix}/leadership-academy/${w.slug}`,
  }));

  const siteUrl = "https://cyrruscs.com";
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
        areaServed: { "@type": "Place", name: "Worldwide" },
        url: `${siteUrl}${pagePath}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
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
      <main id="contenido">
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
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("hub.workshopsSection.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("hub.workshopsSection.title")}
            </h2>
          </Reveal>

          <div className="mt-14 space-y-14">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue">
                  {group.title}
                </h3>
                <RevealGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((w) => {
                    const Icon = w.icon;
                    return (
                      <RevealItem key={w.title}>
                        <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                          <ComingSoon className="block flex-1">
                            <div>
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                                <Icon className="h-5 w-5 text-blue" />
                              </div>
                              <h4 className="mt-5 text-base font-semibold text-navy">
                                {w.title}
                              </h4>
                              <p className="mt-2 text-base leading-relaxed text-gray">
                                {w.description}
                              </p>
                            </div>
                          </ComingSoon>
                          <button
                            type="button"
                            onClick={() => handleWorkshopInterest(w.slug)}
                            className="mt-5 text-left text-sm font-semibold text-blue transition-colors duration-150 hover:text-navy"
                          >
                            {t("hub.workshopsSection.interestCta")}
                          </button>
                        </div>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </div>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-14">
            <ContactCtaButton label={t("hub.workshopsSection.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
