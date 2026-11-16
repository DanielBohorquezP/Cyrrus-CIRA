import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { TransparentHeader } from "@/components/layout/transparent-header";
import { ServiceClosing } from "@/components/sections/service-closing";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { CiraSocialProof } from "@/components/sections/cira-social-proof";
import { CiraFaq } from "@/components/sections/cira-faq";
import { Footer } from "@/components/sections/footer";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

interface Phase {
  id: string;
  letter: string;
  title: string;
  service: string;
  ctaText: string;
  problem: string;
  how: string;
  outcome: string;
}

const phaseAssets: Record<string, { href: string; image: string }> = {
  construir: { href: "/metodo-cira/estrategia", image: "/assets/decoracion/Portada.jpg" },
  identificar: { href: "/metodo-cira/seleccion-de-soluciones", image: "/assets/decoracion/IMG_20230228_091017.jpg" },
  realizar: { href: "/metodo-cira/gestion-de-proyectos", image: "/assets/decoracion/IMG_20200313_092701647.jpg" },
  adoptar: { href: "/metodo-cira/gestion-del-cambio", image: "/assets/decoracion/1785866331023.jpg" },
};

export default function MetodoCira() {
  const { t } = useTranslation("metodo-cira");
  const lang = useLang();
  const phases = (t("phases", { returnObjects: true }) as Phase[]).map((p) => ({
    ...p,
    ...phaseAssets[p.id],
  }));

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const homePath = lang === "en" ? "/en" : "/";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira" : "/en/metodo-cira",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Digital transformation consulting" : "Consultoría de transformación digital",
        name: t("hero.eyebrow"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("meta.description"),
        areaServed: "Worldwide",
        url: `${siteUrl}${pagePath}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${siteUrl}${pagePath}#cira-methodology`,
        name: t("hero.eyebrow"),
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: phases.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@id": `${siteUrl}${langPath(p.href, lang)}#service` },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteUrl}${pagePath}#faq`,
        mainEntity: (t("faq.items", { returnObjects: true }) as { question: string; answer: string }[]).map(
          (faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          }),
        ),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
          { "@type": "ListItem", position: 2, name: t("hero.eyebrow"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  const [titleLead, ...titleRest] = t("hero.title").split("? ");
  const labels = {
    problem: t("phaseLabels.problem"),
    how: t("phaseLabels.how"),
    outcome: t("phaseLabels.outcome"),
  };

  return (
    <>
      <TransparentHeader />
      <main id="contenido">
      <AnimatedNavyBackground className="pt-[clamp(120px,12vw,160px)]">
        <div className="container-site">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-24 gap-y-10">
            <div>
              <div className="hero-rise" style={{ "--hero-rise-y": "12px" } as React.CSSProperties}>
                <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
              </div>
              <h1
                className="hero-rise mt-7 font-heading text-[clamp(40px,5vw,68px)] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-white"
                style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "50ms" } as React.CSSProperties}
              >
                {titleRest.length > 0 ? (
                  <>
                    {`${titleLead}? `}
                    <span className="font-light text-white/80">{titleRest.join("? ")}</span>
                  </>
                ) : (
                  titleLead
                )}
              </h1>
            </div>
            <div className="hero-rise" style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "100ms" } as React.CSSProperties}>
              <p className="t-lead text-white/80">{t("hero.description")}</p>
              <div className="mt-8">
                <ContactCtaButton variant="light" label={lang === "en" ? "Schedule a call" : "Agendar conversación"} />
              </div>
            </div>
          </div>

          <nav
            aria-label={t("hero.eyebrow")}
            className="mt-20 grid grid-cols-2 border-t border-white/20 md:mt-24 md:grid-cols-4"
          >
            {phases.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="block border-r border-white/15 pb-10 pr-6 pt-7 text-white transition-[background-color] duration-150 ease-out hover:bg-white/[0.04]"
              >
                <span className="block pl-[clamp(0px,1.5vw,24px)] font-heading text-[clamp(72px,11vw,168px)] font-semibold leading-[0.9] tracking-[-0.05em]">
                  {p.letter}
                </span>
                <span className="mt-5 block pl-[clamp(0px,1.5vw,24px)] font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sky">
                  {`${String(i + 1).padStart(2, "0")} · ${p.service}`}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </AnimatedNavyBackground>

      {phases.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`section-y scroll-mt-20 border-b border-line ${i % 2 ? "bg-mist" : "bg-background"}`}
        >
          <Reveal className="container-site grid grid-cols-1 gap-x-20 gap-y-12 lg:grid-cols-3">
            <div>
              <span className="cira-initial-outline-lg block font-heading text-[clamp(120px,14vw,200px)] font-bold leading-[0.85] tracking-[-0.05em] text-light-blue">
                {p.letter}
              </span>
              <Eyebrow className="mt-8">{`${String(i + 1).padStart(2, "0")} · ${p.service}`}</Eyebrow>
              <h2 className="mt-3.5 font-heading text-[clamp(28px,3vw,40px)] font-bold leading-[1.12] tracking-[-0.025em] text-navy">
                {p.title}
              </h2>
              <Link
                to={langPath(p.href, lang)}
                className="mt-7 inline-block border-b border-navy pb-1 font-heading text-sm font-medium text-navy hover:border-blue hover:text-blue"
              >
                {`${p.ctaText} →`}
              </Link>
            </div>
            <div className="grid content-end gap-10 sm:grid-cols-3 lg:col-span-2">
              <div className="border-t-2 border-navy pt-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">{labels.problem}</p>
                <p className="mt-4 text-[17px] leading-[1.7] text-pretty text-slate">{p.problem}</p>
              </div>
              <div className="border-t-2 border-navy pt-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">{labels.how}</p>
                <p className="mt-4 text-[17px] leading-[1.7] text-pretty text-slate">{p.how}</p>
              </div>
              <div className="border-t-2 border-blue pt-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-blue">{labels.outcome}</p>
                <p className="mt-4 font-heading text-lg font-medium leading-[1.55] text-pretty text-navy">{p.outcome}</p>
              </div>
            </div>
          </Reveal>
        </section>
      ))}

      <CiraSocialProof />

      <CiraFaq />

      <ServiceClosing
        eyebrow={t("hero.eyebrow")}
        ctaLabel={lang === "en" ? "Schedule a call" : "Agendar conversación"}
        items={phases.map((p) => ({ title: p.service, description: p.title, href: langPath(p.href, lang) }))}
      />
      </main>
      <Footer />
    </>
  );
}
