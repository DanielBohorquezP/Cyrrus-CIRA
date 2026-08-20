import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { LinkedInIcon } from "@/components/ui/social-media";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/paginas";
import { Img } from "@/components/ui/img";

interface Milestone {
  caption: string;
  alt: string;
}

const milestoneSrcs = [
  { src: "/assets/decoracion/constitucion-cyrrus-jackson.webp" },
  { src: "/assets/decoracion/Equipo%20experienica.jpg" },
  { src: "/assets/decoracion/evento-foro-caribe-2030.jpeg" },
];

export default function QuienesSomos() {
  const { t } = useTranslation("paginas");
  const lang = useLang();

  const milestones = (t("quienesSomos.milestones.items", { returnObjects: true }) as Milestone[]).map((m, i) => ({
    ...m,
    ...milestoneSrcs[i],
  }));
  const credentials = t("quienesSomos.trajectory.items", { returnObjects: true }) as string[];

  const siteUrl = "https://www.cyrruscs.com";
  const pagePath = lang === "en" ? "/en/quienes-somos" : "/quienes-somos";

  usePageMeta({
    title: t("quienesSomos.meta.title"),
    description: t("quienesSomos.meta.description"),
    image: "https://www.cyrruscs.com/assets/og-quienes-somos.png",
    alternatePath: lang === "en" ? "/quienes-somos" : "/en/quienes-somos",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}${pagePath}#jackson-bohorquez`,
        name: "Jackson Bohorquez",
        jobTitle: lang === "en" ? "CEO & Founder" : "CEO & Fundador",
        worksFor: { "@id": `${siteUrl}/#organization` },
        url: `${siteUrl}${pagePath}`,
        image: "https://www.cyrruscs.com/assets/decoracion/JacksonCEO1.jpeg",
        sameAs: ["https://www.linkedin.com/in/jacksonbohorquezb/"],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${lang === "en" ? "/en" : "/"}` },
          { "@type": "ListItem", position: 2, name: lang === "en" ? "About Us" : "Quiénes Somos", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow={t("quienesSomos.hero.eyebrow")}
        title={t("quienesSomos.hero.title")}
        description={t("quienesSomos.hero.description")}
        showVisual={false}
        visual={
          <Img
            src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
            alt="Cyrrus Consulting Services"
              className="w-full max-w-sm opacity-90"
            sizes="(min-width: 640px) 384px, 100vw"
          />
        }
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-[220px_1fr] md:px-12">
          <Reveal>
            <Img
              src="/assets/decoracion/JacksonCEO1.webp"
              alt={t("quienesSomos.photoAlt")}
              width={160}
              height={160}
              loading="eager"
              className="mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-light-blue md:mx-0"
              sizes="(min-width: 768px) 420px, 100vw"
            />
            <a
              href="https://www.linkedin.com/in/jacksonbohorquezb/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-blue transition-colors duration-150 hover:text-navy md:justify-start"
            >
              <LinkedInIcon className="h-4 w-4" />
              {t("quienesSomos.linkedInLabel")}
            </a>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {t("quienesSomos.role")}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {t("quienesSomos.bio")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-6 border-l-2 border-blue pl-5 text-lg font-medium leading-snug text-navy">
                {t("quienesSomos.quote")}
              </blockquote>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="text-base font-bold uppercase tracking-wider text-gray">
                {t("quienesSomos.trajectory.label")}
              </div>
              <RevealGroup className="mt-4 flex flex-col gap-3">
                {credentials.map((item) => (
                  <RevealItem
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-navy shadow-sm"
                  >
                    {item}
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-base font-bold uppercase tracking-wider text-blue">
              {t("quienesSomos.milestones.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("quienesSomos.milestones.title")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {milestones.map((item) => (
              <RevealItem as="figure" key={item.src} >
                <Img
                  src={item.src}
                  alt={item.alt}
                  width={480}
                  height={320}
                  className="h-56 w-full rounded-2xl object-cover object-top"
                  sizes="(min-width: 640px) 352px, calc(100vw - 3rem)"
                />
                <figcaption className="mt-3 text-sm text-gray">
                  {item.caption}
                </figcaption>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
