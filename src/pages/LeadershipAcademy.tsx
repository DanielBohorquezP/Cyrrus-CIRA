import { usePageMeta } from "@/lib/use-page-meta";
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

const shortDescriptions: Record<string, string> = {
  "ia-para-directivos": "Decisiones de IA por instinto, no criterio",
  "innovacion-empresarial": "Presupuesto sin criterio de inversión",
  "iso-27001": "Certificación exigida, sin plan",
  "continuidad-de-negocio-drp": "Un DRP que nunca se ha probado",
  "gestion-del-cambio-para-lideres": "Adopción que no sobrevive la salida del consultor",
  "gobierno-de-datos-para-ejecutivos": "Cada área con su propia cifra",
  "liderazgo-digital-y-toma-de-decisiones": "Decisiones con la intuición de hace diez años",
};

const workshops = workshopEntries.map((w) => ({
  icon: icons[w.slug],
  title: w.title,
  description: w.intro,
  href: `/leadership-academy/${w.slug}`,
}));

const orbitWorkshops = workshopEntries.map((w) => ({
  icon: icons[w.slug],
  title: w.title,
  description: shortDescriptions[w.slug],
  href: `/leadership-academy/${w.slug}`,
}));

export default function LeadershipAcademy() {
  usePageMeta({
    title: "Talleres para Altos Ejecutivos | Leadership Academy | Cyrrus",
    description:
      "Leadership Academy: talleres para altos ejecutivos y capacitación gerencial empresarial que sostienen la fase de Adopción de CIRA. Taller de IA para directivos, innovación empresarial, ISO 27001 y continuidad de negocio (DRP).",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Talleres para altos ejecutivos y gestión del cambio organizacional",
        name: "Leadership Academy",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description:
          "Capacitación gerencial empresarial y gestión del cambio organizacional que sostiene la fase de Adopción del método CIRA.",
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Leadership Academy", item: "https://www.cyrruscs.com/leadership-academy" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Leadership Academy"
        title="Talleres para altos ejecutivos y gestión del cambio organizacional"
        description="El proyecto termina, el consultor se va, y en tres meses el equipo volvió a como trabajaba antes. Formamos al equipo del cliente para operar bajo el mismo modelo de gobierno de IA que Cyrrus implementa, para que la velocidad no dependa de que sigamos ahí."
        showVisual={false}
        visual={<WorkshopOrbit items={orbitWorkshops} className="mx-auto" />}
      >
        <ContactCtaButton variant="light" />
      </IntelligenceLabHero>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Capacitación gerencial empresarial
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Siete talleres ejecutivos.
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
            <ContactCtaButton label="Agendar un taller" />
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
