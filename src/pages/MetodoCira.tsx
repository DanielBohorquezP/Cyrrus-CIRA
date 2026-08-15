import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { BorderButton } from "@/components/ui/border-button";
import { CiraSocialProof } from "@/components/sections/cira-social-proof";
import { CiraFaq } from "@/components/sections/cira-faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { CircularCarousel } from "@/components/ui/circular-carousel";

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
  construir: { href: "/metodo-cira/planeacion-estrategica", image: "/assets/decoracion/Portada.jpg" },
  identificar: { href: "/metodo-cira/seleccion-de-soluciones", image: "/assets/decoracion/evento-panel-universidad-bolivar.jpeg" },
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

  const stickyContent = phases.map((p) => ({
    title: p.title,
    description: `${p.problem} ${p.how}`,
    content: (
      <div
        className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(6,17,41,0.92), rgba(6,17,41,0.4)), url(${p.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
            {p.service}
          </span>
        </div>
        <div>
          <p className="text-base leading-relaxed text-white/90">{p.outcome}</p>
          <BorderButton asChild variant="light" size="sm" className="mt-4" dot>
            <Link to={p.href}>
              {p.ctaText}
            </Link>
          </BorderButton>
        </div>
      </div>
    ),
  }));

  const siteUrl = "https://www.cyrruscs.com";
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
        areaServed: "LATAM",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: lang === "en" ? "CIRA Method Phases" : "Fases del Método CIRA",
          itemListElement: phases.map((p, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: p.title,
              url: `${siteUrl}${p.href}`,
            },
          })),
        },
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
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${siteUrl}${pagePath}#cira-methodology`,
        name: t("hero.eyebrow"),
        description: t("meta.description"),
        inLanguage: lang === "en" ? "en" : "es",
        step: phases.map((p, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: p.title,
          text: p.how,
          url: `${siteUrl}${lang === "en" ? "/en" : ""}${p.href}`,
        })),
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        showVisual={false}
        visual={
          <CircularCarousel
            items={phases.map((p) => ({
              id: p.id,
              tag: p.letter,
              title: p.title.split(" ")[0],
              description: p.outcome,
            }))}
          />
        }
      >
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-cyan backdrop-blur-sm">
          {t("hero.badge")}
        </span>
        <div className="mt-6">
          <ContactCtaButton variant="light" label={lang === "en" ? "Schedule a call" : "Agendar conversación"} />
        </div>
      </IntelligenceLabHero>

      <StickyScroll content={stickyContent} eyebrow={t("hero.eyebrow")} />

      <CiraSocialProof />

      <CiraFaq />

      <FinalCta />
      <Footer />
    </>
  );
}
