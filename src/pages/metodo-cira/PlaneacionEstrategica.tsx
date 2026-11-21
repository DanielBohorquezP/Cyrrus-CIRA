import { useTranslation } from "react-i18next";
import { SERVICE_HERO_POSTER, SERVICE_HERO_VIDEO } from "@/lib/service-media";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { splitHeroTitle } from "@/components/layout/service-child-page";
import type { Stat } from "@/components/ui/dark-stat-band";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { ServiceLead } from "@/components/sections/service-lead";
import { ServiceScope, type ScopeItem } from "@/components/sections/service-scope";
import { Testimonials } from "@/components/sections/testimonials";
import { SectionHeader } from "@/components/ui/section-header";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/estrategia";

interface Item {
  title: string;
  description: string;
}
interface Role {
  letter: string;
  title: string;
  description: string;
}
interface Faq {
  question: string;
  answer: string;
}

// One photo per intro card, in the same order as intro.bullets.
const introImages = [
  "/assets/decoracion/IMG_20230227_164810.jpg",
  "/assets/decoracion/IMG_20200313_092701647.jpg",
  "/assets/decoracion/IMG_20230302_112825.jpg",
];

export default function PlaneacionEstrategica() {
  const { t } = useTranslation("estrategia");
  const lang = useLang();

  const problems = t("diagnostico.problems", { returnObjects: true }) as Item[];
  const benefits = t("benefits.items", { returnObjects: true }) as Item[];
  const cxaas = t("cxaas.roles", { returnObjects: true }) as Role[];
  const services = t("services.items", { returnObjects: true }) as ScopeItem[];
  const uses = t("definicion.uses", { returnObjects: true }) as Item[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];
  const stats = t("whyCeos.stats", { returnObjects: true }) as Stat[];
  const bullets = t("intro.bullets", { returnObjects: true }) as string[];
  const bulletTitles = t("intro.bulletTitles", { returnObjects: true }) as string[];
  const bulletAlts = t("intro.bulletImageAlts", { returnObjects: true }) as string[];
  const [quoteLead, ...quoteRest] = t("intro.pullQuote").split(" — ");

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/servicios/estrategia" : "/servicios/estrategia";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const erpPath = lang === "en"
    ? "/en/servicios/seleccion-de-soluciones/seleccion-de-software/erp"
    : "/servicios/seleccion-de-soluciones/seleccion-de-software/erp";
  const pmoPath = lang === "en" ? "/en/servicios/gerencia-de-proyectos" : "/servicios/gerencia-de-proyectos";
  const changePath = lang === "en" ? "/en/servicios/gestion-del-cambio" : "/servicios/gestion-del-cambio";
  // The 3 Castillos case is the published proof of a strategy-to-go-live engagement.
  const casePath = lang === "en" ? "/en/experiencia/3-castillos" : "/experiencia/3-castillos";
  const itStrategyPath = lang === "en" ? "/en/servicios/estrategia/estrategia-de-ti" : "/servicios/estrategia/estrategia-de-ti";
  const continuityPath = lang === "en"
    ? "/en/servicios/estrategia/continuidad-del-negocio"
    : "/servicios/estrategia/continuidad-del-negocio";
  const relatedPaths = [erpPath, pmoPath, changePath, casePath, itStrategyPath, continuityPath];
  const relatedItems = (t("related.items", { returnObjects: true }) as Item[]).map((item, i) => ({
    ...item,
    href: relatedPaths[i],
  }));
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/servicios/estrategia" : "/en/servicios/estrategia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Strategy consulting" : "Consultoría estratégica",
        name: t("hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("meta.description"),
        areaServed: "Worldwide",
        url: `${siteUrl}${pagePath}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
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
        itemListElement: breadcrumbItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          item: `${siteUrl}${item.href ?? pagePath}`,
        })),
      },
    ],
  });

  const heroTitle = splitHeroTitle(t("hero.title"));
  const content: ServiceContent = {
    area: "estrategia",
    hero: {
      eyebrow: t("hero.eyebrow"),
      ...heroTitle,
      description: t("hero.description"),
      ctaLabel: t("hero.ctaLabel"),
      link: { href: methodPath, label: t("intro.methodLinkLabel") },
    },
    breadcrumbs: [...breadcrumbItems.slice(0, -1), { label: heroTitle.title }],
    media: { image: { src: SERVICE_HERO_POSTER.src, alt: "" }, video: SERVICE_HERO_VIDEO },
    queHacemos: {
      eyebrow: t("intro.kicker"),
      quote: quoteRest.length > 0 ? `${quoteLead} — ` : quoteLead,
      emphasis: quoteRest.length > 0 ? quoteRest.join(" — ") : undefined,
      intro: t("intro.description"),
      cards: bullets.map((description, i) => ({
        title: bulletTitles[i],
        description,
        image: { src: introImages[i], alt: bulletAlts[i], position: i === 0 ? "50% 30%" : undefined },
      })),
    },
    queEs: {
      title: t("definicion.title"),
      body: t("definicion.description"),
      refsLabel: t("definicion.usesTitle"),
      refs: uses,
      link: { href: langPath(t("definicion.linkHref"), lang), label: t("definicion.linkLabel") },
    },
    comoLoHacemos: { title: t("diagnostico.title"), intro: t("diagnostico.description"), steps: problems },
    autoridad: {
      title: t("whyCeos.title"),
      body: t("whyCeos.description"),
      stats,
      image: { src: "/assets/decoracion/Evento mesas.jpg", alt: "" },
    },
    beneficios: { title: t("benefits.title"), items: benefits },
    faq: { eyebrow: t("faq.eyebrow"), title: t("faq.title"), items: faqs },
    related: { eyebrow: t("related.eyebrow"), title: t("related.title"), items: relatedItems },
  };

  return (
    <ServiceTemplate
      content={content}
      extrasEndTone="white"
      extras={
        <>
          <ServiceScope
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            description={t("services.description")}
            items={services}
          />

          <section className="section-y w-full bg-background">
            <div className="container-site">
              <SectionHeader
                eyebrow={t("cxaas.eyebrow")}
                title={t("cxaas.title")}
                description={t("cxaas.description")}
                align="start"
              />
              <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
                {cxaas.map((role) => (
                  <RevealItem
                    key={role.title}
                    className="flex min-h-[300px] flex-col rounded-2xl bg-navy px-9 py-10 text-white"
                  >
                    <span className="font-heading text-[56px] font-semibold leading-none tracking-[-0.03em]">
                      {role.letter}
                    </span>
                    <h3 className="mt-auto pt-10 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-sky">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.65] text-pretty text-white/80">{role.description}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          <ServiceLead eyebrow={t("lead.eyebrow")} title={t("lead.title")} bio={t("lead.bio")} />

          <Testimonials className="bg-background" />
        </>
      }
    />
  );
}
