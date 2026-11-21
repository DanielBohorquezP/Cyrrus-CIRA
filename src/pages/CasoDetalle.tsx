import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RuledBullets } from "@/components/ui/ruled-bullets";
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
  "/servicios/estrategia": { es: "Consultoría estratégica", en: "Strategy consulting" },
  "/servicios/seleccion-de-soluciones/seleccion-de-software/erp": { es: "Selección de ERP", en: "ERP selection" },
  "/servicios/gerencia-de-proyectos": { es: "Gerencia de proyectos (PMO)", en: "Project management (PMO)" },
  "/servicios/gestion-del-cambio": { es: "Gestión del cambio", en: "Change management" },
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

        <section className="section-y w-full bg-background">
          <div className="container-site">
            <RevealGroup
              as="dl"
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-b border-line"
            >
              {tr.facts.map((fact) => (
                <RevealItem
                  key={fact.label}
                  className="flex flex-col-reverse justify-end border-r border-line py-8 pr-8 last:border-r-0"
                >
                  <dt className="mt-4 text-base leading-[1.5] text-slate">{fact.label}</dt>
                  <dd className="font-heading text-[clamp(44px,5vw,64px)] font-light leading-none tracking-[-0.04em] text-navy">
                    {fact.value}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-24 gap-y-8">
              <h2 className="t-h2 text-navy">{label("challenge")}</h2>
              <div className="space-y-5">
                {tr.challenge.map((p) => (
                  <p key={p} className="t-lead text-slate">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-y w-full bg-mist">
          <div className="container-site">
            <Reveal>
              <h2 className="t-h2 text-navy">{label("approach")}</h2>
            </Reveal>
            <RevealGroup
              as="ol"
              className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-16 gap-y-12"
            >
              {tr.phases.map((phase) => (
                <RevealItem as="li" key={phase.phase} className="border-t-2 border-navy pt-6">
                  <Eyebrow as="span">{phase.phase}</Eyebrow>
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-navy">{phase.title}</h3>
                  <p className="mt-3.5 text-[17px] leading-[1.7] text-slate">{phase.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="section-y w-full bg-background">
          <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-24 gap-y-10">
            <Reveal>
              <h2 className="t-h2 text-navy">{label("results")}</h2>
            </Reveal>
            <RuledBullets items={tr.results} />
          </div>
        </section>

        <section className="section-y w-full bg-mist">
          <div className="container-site">
            <Reveal>
              <h2 className="t-h2 text-navy">{label("testimonials")}</h2>
            </Reveal>
            <RevealGroup
              className={`mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8 ${entry.videos.length > 1 ? "" : "md:max-w-xl"}`}
            >
              {entry.videos.map((video, i) => {
                const item = tr.testimonials[i];
                const who = item?.name ? `${item.name}, ${item.role}` : (item?.role ?? "");
                return (
                  <RevealItem
                    as="figure"
                    key={video.id}
                    index={i}
                    className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(10,44,99,0.04)]"
                  >
                    <YoutubeFacade videoId={video.id} title={`${who} — ${tr.company}, ${label("videoSuffix")}`} />
                    {item && (
                      <div className="flex flex-1 flex-col p-7">
                        <blockquote className="flex-1 font-heading text-[17px] leading-[1.55] text-pretty text-navy">
                          {`“${item.quote}”`}
                        </blockquote>
                        <figcaption className="mt-6 border-t border-line pt-5">
                          <div className="font-heading text-[13px] font-semibold text-navy">{item.name || item.role}</div>
                          <div className="mt-1 text-[15px] text-slate">{item.name ? `${item.role} · ${tr.company}` : tr.company}</div>
                        </figcaption>
                      </div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        <section className="section-y w-full bg-background">
          <div className="container-site">
            <Reveal>
              <h2 className="t-h2 text-navy">{label("services")}</h2>
            </Reveal>
            <RevealGroup className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border-t border-navy">
              {entry.services.map((path, i) => (
                <RevealItem key={path}>
                  <Link
                    to={`${prefix}${path}`}
                    className="group flex h-full flex-col gap-3 border-b border-line-2 py-8 pr-8"
                  >
                    <span className="font-heading text-[13px] font-semibold text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-[22px] font-semibold text-navy group-hover:text-blue">
                      {`${serviceLabels[path]?.[lang] ?? path} ↗`}
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            {other && otherTr && (
              <Reveal className="mt-16">
                <Link
                  to={`${hubPath}/${other.slug}`}
                  className="group block border-t-2 border-navy pt-6"
                >
                  <Eyebrow as="span">{label("otherCase")}</Eyebrow>
                  <span className="mt-3 block font-heading text-[clamp(22px,2.2vw,28px)] font-semibold text-navy group-hover:text-blue">
                    {`${otherTr.title} ↗`}
                  </span>
                  <span className="mt-2 block text-[17px] text-slate">{otherTr.card.metric}</span>
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
