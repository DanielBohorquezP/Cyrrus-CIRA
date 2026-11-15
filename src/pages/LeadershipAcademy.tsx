import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { WorkshopOrbit } from "@/components/ui/workshop-orbit";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
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
        areaServed: "Worldwide",
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
      <PageHero
        eyebrow="Leadership Academy"
        title={t("hub.hero.title")}
        description={t("hub.hero.description")}
        visual={<WorkshopOrbit items={orbitWorkshops} className="mx-auto" />}
      >
        <ContactCtaButton variant="light" />
      </PageHero>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("hub.workshopsSection.eyebrow")}
            title={t("hub.workshopsSection.title")}
          />

          <div className="mt-16 space-y-16">
            {groups.map((group) => (
              <div key={group.title}>
                <Eyebrow as="h3">{group.title}</Eyebrow>
                <RevealGroup className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-16 gap-y-12">
                  {group.items.map((w) => (
                    <RevealItem key={w.title} className="flex h-full flex-col border-t-2 border-navy pt-6">
                      <ComingSoon className="block flex-1">
                        <div>
                          <h4 className="font-heading text-xl font-semibold leading-snug text-navy">{w.title}</h4>
                          <p className="mt-3.5 text-[17px] leading-[1.7] text-slate">{w.description}</p>
                        </div>
                      </ComingSoon>
                      <button
                        type="button"
                        onClick={() => handleWorkshopInterest(w.slug)}
                        className="mt-5 self-start text-left font-heading text-sm font-medium text-blue transition-colors duration-150 hover:text-navy"
                      >
                        {`${t("hub.workshopsSection.interestCta")} →`}
                      </button>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16">
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
