import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { YoutubeFacade } from "@/components/ui/youtube-facade";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/paginas";

interface Fact {
  value: string;
  label: string;
}
interface Phase {
  phase: string;
  title: string;
  text: string;
}
interface CaseTestimonial {
  name: string;
  role: string;
  quote: string;
}
interface CaseTranslation {
  meta: { title: string; description: string };
  company: string;
  industry: string;
  title: string;
  summary: string;
  facts: Fact[];
  challenge: string[];
  phases: Phase[];
  results: string[];
  testimonials: CaseTestimonial[];
  card: { excerpt: string; metric: string };
}

const serviceLabels: Record<string, { es: string; en: string }> = {
  "/metodo-cira/estrategia": { es: "Consultoría estratégica", en: "Strategy consulting" },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp": { es: "Selección de ERP", en: "ERP selection" },
  "/metodo-cira/gestion-de-proyectos": { es: "Gerencia de proyectos (PMO)", en: "Project management (PMO)" },
  "/metodo-cira/gestion-del-cambio": { es: "Gestión del cambio", en: "Change management" },
};

export default function CasoDetalle() {
  const { caso } = useParams();
  const { t } = useTranslation("paginas");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";
  const entry = getCaseStudyBySlug(caso);
  const tr = entry ? (t(`casos.${entry.slug}`, { returnObjects: true }) as CaseTranslation) : undefined;
  const label = (key: string) => t(`casos.labels.${key}`);

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = `${prefix}/experiencia`;
  const pagePath = entry ? `${hubPath}/${entry.slug}` : hubPath;
  const hubLabel = lang === "en" ? "Experience" : "Experiencia";

  usePageMeta({
    title: tr?.meta.title ?? "",
    description: tr?.meta.description ?? "",
    alternatePath: entry
      ? lang === "en"
        ? `/experiencia/${entry.slug}`
        : `/en/experiencia/${entry.slug}`
      : undefined,
    jsonLd:
      entry && tr
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${siteUrl}${pagePath}#article`,
              headline: tr.title,
              description: tr.meta.description,
              articleSection: label("eyebrowPrefix"),
              inLanguage: lang,
              datePublished: "2026-10-05",
              dateModified: "2026-10-05",
              image: `https://i.ytimg.com/vi/${entry.videos[0].id}/hqdefault.jpg`,
              author: { "@id": `${siteUrl}/#organization` },
              publisher: { "@id": `${siteUrl}/#organization` },
              isPartOf: { "@id": `${siteUrl}/#website` },
              mainEntityOfPage: `${siteUrl}${pagePath}`,
              about: { "@type": "Organization", name: tr.company },
              video: entry.videos.map((v) => ({ "@id": `${siteUrl}${pagePath}#video-${v.id}` })),
            },
            ...entry.videos.map((v, i) => {
              const testimonial = tr.testimonials[i];
              const speaker = testimonial?.name ? `${testimonial.name}, ${testimonial.role}` : testimonial?.role;
              return {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "@id": `${siteUrl}${pagePath}#video-${v.id}`,
                name: `${tr.company} — ${speaker ?? label("videoSuffix")}`,
                description: testimonial?.quote ?? tr.summary,
                thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
                uploadDate: v.uploadDate,
                duration: v.duration,
                contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
                embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
                publisher: { "@id": `${siteUrl}/#organization` },
              };
            }),
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: hubLabel, item: `${siteUrl}${hubPath}` },
                { "@type": "ListItem", position: 3, name: tr.company, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!entry || !tr) return <Navigate to={hubPath} replace />;

  const other = caseStudies.find((c) => c.slug !== entry.slug);
  const otherTr = other ? (t(`casos.${other.slug}`, { returnObjects: true }) as CaseTranslation) : undefined;

  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <PageHero
          eyebrow={`${label("eyebrowPrefix")} · ${tr.industry}`}
          title={tr.title}
          description={tr.summary}
          breadcrumbs={[
            { label: lang === "en" ? "Home" : "Inicio", href: homePath },
            { label: hubLabel, href: hubPath },
            { label: tr.company },
          ]}
        >
          <ContactCtaButton variant="light" />
        </PageHero>

        <section className="w-full bg-background py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {tr.facts.map((fact) => (
                <RevealItem key={fact.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                  <div className="bg-gradient-to-br from-navy to-blue bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                    {fact.value}
                  </div>
                  <div className="mt-2 text-sm text-gray">{fact.label}</div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full bg-background pb-20 md:pb-24">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{label("challenge")}</h2>
              {tr.challenge.map((p) => (
                <p key={p} className="mt-5 text-lg leading-relaxed text-gray">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{label("approach")}</h2>
            </Reveal>
            <RevealGroup as="ol" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {tr.phases.map((phase) => (
                <RevealItem as="li" key={phase.phase} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <span className="text-sm font-bold uppercase tracking-wider text-blue">{phase.phase}</span>
                  <h3 className="mt-2 text-lg font-semibold text-navy">{phase.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-gray">{phase.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full bg-background py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{label("results")}</h2>
              <ul className="mt-6 space-y-4">
                {tr.results.map((r) => (
                  <li key={r} className="flex gap-3 text-lg leading-relaxed text-foreground">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="w-full bg-background pb-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{label("testimonials")}</h2>
            </Reveal>
            <RevealGroup
              className={`mt-10 grid grid-cols-1 gap-6 ${entry.videos.length > 1 ? "md:grid-cols-3" : "md:max-w-xl"}`}
            >
              {entry.videos.map((video, i) => {
                const item = tr.testimonials[i];
                const who = item?.name ? `${item.name}, ${item.role}` : (item?.role ?? "");
                return (
                  <RevealItem
                    as="figure"
                    key={video.id}
                    index={i}
                    className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <YoutubeFacade videoId={video.id} title={`${who} — ${tr.company}, ${label("videoSuffix")}`} />
                    {item && (
                      <div className="flex flex-1 flex-col p-6">
                        <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                          {`“${item.quote}”`}
                        </blockquote>
                        <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                          <div className="font-semibold text-navy">{item.name || item.role}</div>
                          <div className="text-gray">{item.name ? `${item.role} · ${tr.company}` : tr.company}</div>
                        </figcaption>
                      </div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{label("services")}</h2>
            </Reveal>
            <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {entry.services.map((path) => (
                <RevealItem key={path}>
                  <Link
                    to={`${prefix}${path}`}
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 font-semibold text-navy transition-[border-color,box-shadow] duration-150 ease-out hover:border-blue hover:shadow-md"
                  >
                    {serviceLabels[path]?.[lang] ?? path}
                    <ArrowRight className="h-4 w-4 shrink-0 text-blue transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            {other && otherTr && (
              <Reveal className="mt-14">
                <Link
                  to={`${hubPath}/${other.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-7 transition-[border-color,box-shadow] duration-150 ease-out hover:border-blue hover:shadow-md"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-blue">{label("otherCase")}</span>
                  <span className="mt-2 block text-xl font-semibold text-navy">{otherTr.title}</span>
                  <span className="mt-2 block text-base text-gray">{otherTr.card.metric}</span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
