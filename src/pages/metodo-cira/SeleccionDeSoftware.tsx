import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { productImages, softwareHubImage, type ProductSlug } from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedServices } from "@/components/sections/related-services";
import { CardGrid } from "@/components/ui/card-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SecondaryButton } from "@/components/ui/border-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-de-software";

interface CategoryItem {
  slug: string;
  title: string;
  description: string;
  linkLabel: string;
}
interface EvalItem {
  title: string;
  description: string;
}
interface Fase {
  letra: string;
  titulo: string;
  descripcion: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Guide extends EvalItem {
  slug: string;
}


export default function SeleccionDeSoftware() {
  const { t } = useTranslation("seleccion-de-software");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const categorias = (t("categorias.items", { returnObjects: true }) as CategoryItem[]).map((c) => ({
    ...c,
    href: `${prefix}/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${c.slug}`,
    image: productImages[c.slug as ProductSlug],
  }));
  const evaluamos = t("evaluamos.items", { returnObjects: true }) as EvalItem[];
  const fases = t("metodo.fases", { returnObjects: true }) as Fase[];
  const problemaBullets = t("problema.bullets", { returnObjects: true }) as string[];
  const costoBullets = t("costo.bullets", { returnObjects: true }) as string[];
  const preguntaSteps = t("preguntaCorrecta.steps", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];
  const answerItems = t("respuesta.items", { returnObjects: true }) as EvalItem[];
  const guides = (t("guides.items", { returnObjects: true }) as Guide[]).map((g) => ({
    href: `${prefix}/perspectivas/${g.slug}`,
    title: g.title,
    description: g.description,
  }));

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const pagePath = `${selectionPath}/seleccion-de-software`;
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: t("hero.title") },
  ];

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en"
      ? "/metodo-cira/seleccion-de-soluciones/seleccion-de-software"
      : "/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Enterprise software selection" : "Selección de software empresarial",
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

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={{ src: softwareHubImage, alt: t("hero.title") }}
        breadcrumbs={breadcrumbItems}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
        <SecondaryButton asChild>
          <Link to={`${prefix}/metodo-cira`}>{t("hero.ctaSecondaryLabel")}</Link>
        </SecondaryButton>
      </PageHero>

      {/* Answer-first block: what software selection is, in the searcher's words */}
      <IncludedGrid
        className="bg-mist"
        eyebrow={t("respuesta.eyebrow")}
        title={t("respuesta.title")}
        description={t("respuesta.body")}
        items={answerItems}
      />

      {/* 02 — El problema */}
      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("problema.eyebrow")} title={t("problema.title")} description={t("problema.intro")} />
          <RuledBullets items={problemaBullets} columns={2} className="mt-14" />
          <Reveal>
            <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
              {t("problema.punch")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — El costo de equivocarse */}
      <section className="section-y w-full bg-mist">
        <div className="container-site">
          <SectionHeader eyebrow={t("costo.eyebrow")} title={t("costo.title")} />
          <RuledBullets items={costoBullets} columns={2} className="mt-14" />
          <Reveal>
            <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
              {t("costo.punch")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — La pregunta correcta */}
      <section className="section-y w-full bg-background">
        <div className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
          <Reveal>
            <Eyebrow>{t("preguntaCorrecta.eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{t("preguntaCorrecta.title")}</h2>
            <p className="mt-10 text-lg text-slate/60 line-through">{t("preguntaCorrecta.notQuestion")}</p>
            <p className="mt-3 font-heading text-[clamp(24px,2.6vw,34px)] font-light leading-[1.3] tracking-[-0.01em] text-navy">
              {t("preguntaCorrecta.realQuestion")}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {preguntaSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-line-2 px-4 py-2 font-heading text-sm font-semibold text-navy">
                  {step}
                </span>
                {i < preguntaSteps.length - 1 && (
                  <span className="text-blue" aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 05 — Nuestra solución: aquí, y solo aquí, se explica el Método CIRA completo */}
      <AnimatedNavyBackground id="metodo" className="section-y">
        <div className="container-site text-white">
          <SectionHeader tone="dark" eyebrow={t("metodo.eyebrow")} title={t("metodo.title")} description={t("metodo.intro")} />
          <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-12">
            {fases.map((fase) => (
              <RevealItem key={fase.letra} className="border-t border-white/25 pt-7">
                <span className="block font-heading text-[clamp(64px,7vw,88px)] font-light leading-none tracking-[-0.04em] text-sky">
                  {fase.letra}
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold">{fase.titulo}</h3>
                <p className="mt-3 text-[17px] leading-[1.65] text-white/75">{fase.descripcion}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </AnimatedNavyBackground>

      {/* 06 — Qué seleccionamos: enlaces a las 4 subpáginas de producto */}
      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("categorias.eyebrow")} title={t("categorias.title")} />
          <CardGrid
            className="mt-16"
            min="sm"
            items={categorias.map((c) => ({
              title: c.title,
              description: c.description,
              href: c.href,
              linkLabel: c.linkLabel,
              image: { src: c.image.image, alt: "", position: c.image.imagePosition },
            }))}
          />
        </div>
      </section>

      {/* 07 — Cómo evaluamos */}
      <IncludedGrid
        className="bg-mist"
        eyebrow={t("evaluamos.eyebrow")}
        title={t("evaluamos.title")}
        items={evaluamos}
        numbered
      />

      {/* Cierre — 100% agnósticos */}
      <section className="section-y w-full bg-background">
        <Reveal className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)] text-center">
          <blockquote className="m-0 font-heading text-[clamp(26px,3vw,40px)] font-light leading-[1.3] tracking-[-0.02em] text-pretty text-navy">
            {`"${t("closingQuote")}"`}
          </blockquote>
          <div className="mt-10 flex justify-center">
            <ContactCtaButton label={t("hero.ctaLabel")} />
          </div>
        </Reveal>
      </section>

      <RelatedServices
        className="bg-mist"
        eyebrow={t("guides.eyebrow")}
        title={t("guides.title")}
        items={guides}
      />

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} className="bg-background" />

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
