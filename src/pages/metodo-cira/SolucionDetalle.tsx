import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import {
  solutionDetailImages,
  solutionItemIcons,
  solutionsClosingIcon as ClosingIcon,
  solutionSlugs,
} from "@/lib/solutions-icons";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-soluciones";
import { Img } from "@/components/ui/img";

interface DetailEntry {
  label: string;
  eyebrow: string;
  intro: string;
  stat?: { value: string; description: string; source: string };
  items: { title: string; description: string }[];
}

export default function SolucionDetalle() {
  const { solucion } = useParams();
  const { t } = useTranslation("seleccion-soluciones");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";

  const slug = solutionSlugs.find((s) => s === solucion);
  const entry = slug ? (t(`detail.entries.${slug}`, { returnObjects: true }) as DetailEntry) : undefined;
  const meta = slug ? (t(`detailMeta.${slug}`, { returnObjects: true }) as { title: string; description: string }) : undefined;
  const assets = slug ? solutionDetailImages[slug] : undefined;
  const icons = slug ? solutionItemIcons[slug] : undefined;

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const pagePath = `${selectionPath}/${slug}`;

  usePageMeta({
    title: meta?.title ?? (lang === "en" ? "Solution Selection | Cyrrus" : "Selección de Soluciones | Cyrrus"),
    description: meta?.description ?? "",
    alternatePath: slug
      ? lang === "en"
        ? `/metodo-cira/seleccion-de-soluciones/${slug}`
        : `/en/metodo-cira/seleccion-de-soluciones/${slug}`
      : undefined,
    jsonLd:
      entry && slug
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteUrl}${pagePath}#service`,
              serviceType: `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`,
              name: entry.label,
              provider: { "@id": `${siteUrl}/#organization` },
              description: meta?.description,
              areaServed: "LATAM",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: lang === "en" ? "CIRA Method" : "Método CIRA", item: `${siteUrl}${methodPath}` },
                { "@type": "ListItem", position: 3, name: t("hero.title", { defaultValue: "" }) || (lang === "en" ? "Solution Selection" : "Selección de Soluciones"), item: `${siteUrl}${selectionPath}` },
                { "@type": "ListItem", position: 4, name: entry.label, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!entry || !slug || !assets) return <Navigate to={`${prefix}/metodo-cira/seleccion-de-soluciones`} replace />;

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={entry.eyebrow}
        title={`${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${entry.label}`}
        description={entry.intro}
      >
        <ContactCtaButton variant="light" label={t("detail.ctaLabel")} />
      </PageHero>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-4">
              <Img
                src={assets.image}
                alt={entry.label}
                width={480}
                height={600}
                className="h-64 w-full rounded-2xl object-cover md:h-full"
                style={{ objectPosition: assets.imagePosition ?? "center" }}
                sizes="(min-width: 1152px) 352px, (min-width: 768px) 33vw, calc(100vw - 3rem)"
              />
            </Reveal>
            <div className="md:col-span-8">
              <Reveal className="max-w-2xl">
                <span className="text-base font-bold uppercase tracking-wider text-blue">
                  {t("detail.whatWeHelp")}
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {entry.label}
                </h2>
              </Reveal>

              <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {entry.items.map((item, index) => {
                  const Icon = icons?.[index];
                  return (
                    <RevealItem
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-7"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                        {Icon && <Icon className="h-5 w-5 text-cyan" />}
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-gray">{item.description}</p>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {entry.stat && (
        <AnimatedNavyBackground className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
            <Reveal>
              <span className="text-6xl font-bold tracking-tight text-cyan sm:text-7xl">
                {entry.stat.value}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                {entry.stat.description}
              </p>
              <span className="mt-3 block text-sm font-medium uppercase tracking-wider text-white/50">
                {entry.stat.source}
              </span>
            </Reveal>
          </div>
        </AnimatedNavyBackground>
      )}

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <ClosingIcon className="mx-auto h-8 w-8 text-blue" />
            <p className="mt-6 border-l-2 border-cyan pl-6 text-left text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {`“${t("closingQuote")}”`}
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
