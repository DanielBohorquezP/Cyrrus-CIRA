import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
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
  const education = t("quienesSomos.education.items", { returnObjects: true }) as string[];

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/quienes-somos" : "/quienes-somos";

  usePageMeta({
    title: t("quienesSomos.meta.title"),
    description: t("quienesSomos.meta.description"),
    image: "https://cyrruscs.com/assets/og-quienes-somos.png",
    alternatePath: lang === "en" ? "/quienes-somos" : "/en/quienes-somos",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        // One @id for both languages: index.html (founder) and every article
        // (author) point at the Spanish URL.
        "@id": `${siteUrl}/quienes-somos#jackson-bohorquez`,
        name: "Jackson Bohorquez",
        jobTitle: lang === "en" ? "CEO & Founder" : "CEO & Fundador",
        description: t("quienesSomos.bio"),
        worksFor: { "@id": `${siteUrl}/#organization` },
        url: `${siteUrl}${pagePath}`,
        image: "https://cyrruscs.com/assets/decoracion/JacksonCEO1.jpeg",
        sameAs: ["https://www.linkedin.com/in/jacksonbohorquezb/"],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Universidad del Norte" },
          { "@type": "CollegeOrUniversity", name: "Pontificia Universidad Javeriana" },
          { "@type": "CollegeOrUniversity", name: "Universidad Distrital Francisco José de Caldas" },
        ],
        knowsAbout:
          lang === "en"
            ? ["Business and IT strategy", "Digital transformation", "ERP, CRM and EAM selection and implementation", "Project management", "Change management", "IT governance", "Shared services centers"]
            : ["Estrategia de negocio y de TI", "Transformación digital", "Selección e implementación de ERP, CRM y EAM", "Gerencia de proyectos", "Gestión del cambio", "Gobierno de TI", "Centros de servicios compartidos"],
      },
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${siteUrl}${pagePath}#webpage`,
        url: `${siteUrl}${pagePath}`,
        name: t("quienesSomos.meta.title"),
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        mainEntity: { "@id": `${siteUrl}/quienes-somos#jackson-bohorquez` },
        inLanguage: lang,
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
      <main id="contenido">
      <PageHero
        eyebrow={t("quienesSomos.hero.eyebrow")}
        title={t("quienesSomos.hero.title")}
        description={t("quienesSomos.hero.description")}
        visual={
          <Img
            src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
            alt="Cyrrus Consulting Services"
            className="mx-auto w-full max-w-sm opacity-90"
            sizes="1100px"
          />
        }
      />

      <section className="section-y w-full bg-background">
        <div className="container-site grid grid-cols-1 items-start gap-x-20 gap-y-12 md:grid-cols-[280px_1fr]">
          <Reveal>
            <Img
              src="/assets/decoracion/JacksonCEO1.jpeg"
              alt={t("quienesSomos.photoAlt")}
              width={280}
              height={350}
              loading="eager"
              className="aspect-[4/5] w-full max-w-[280px] rounded-2xl object-cover object-top"
              sizes="280px"
            />
            <a
              href="https://www.linkedin.com/in/jacksonbohorquezb/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 font-heading text-sm font-medium text-blue transition-colors duration-150 hover:text-navy"
            >
              <LinkedInIcon className="h-4 w-4" />
              {t("quienesSomos.linkedInLabel")}
            </a>
          </Reveal>

          <div className="max-w-[760px]">
            <Reveal>
              <h2 className="t-h2 text-navy">{t("quienesSomos.role")}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="t-lead mt-6 text-slate">{t("quienesSomos.bio")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-light leading-[1.4] text-navy">
                {t("quienesSomos.quote")}
              </blockquote>
            </Reveal>

            <div className="mt-14">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                {t("quienesSomos.trajectory.label")}
              </h3>
              <RuledBullets items={credentials} />
            </div>

            <div className="mt-14">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                {t("quienesSomos.education.label")}
              </h3>
              <RuledBullets items={education} />
            </div>

            <Reveal delay={0.2} className="mt-10">
              <Link
                to={langPath("/metodo-cira", lang)}
                className="font-heading text-sm font-medium text-blue hover:text-navy"
              >
                {`${t("quienesSomos.trajectory.methodLinkLabel")} →`}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y w-full bg-mist">
        <div className="container-site">
          <SectionHeader eyebrow={t("quienesSomos.milestones.eyebrow")} title={t("quienesSomos.milestones.title")} />
          <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {milestones.map((item) => (
              <RevealItem key={item.src}>
                <PhotoCaption
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  aspect="aspect-[4/3]"
                  position="50% 0%"
                  sizes="1100px"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
