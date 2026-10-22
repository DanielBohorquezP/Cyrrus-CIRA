import { useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardCheck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/herramientas";

interface Question {
  dimension: number;
  text: string;
  options: string[];
}
interface Dimension {
  id: string;
  name: string;
}
interface Band {
  title: string;
  summary: string;
}
interface LinkItem {
  label: string;
  description: string;
  href: string;
}
interface Faq {
  question: string;
  answer: string;
}

type Level = "low" | "mid" | "high";

const MAX_PER_QUESTION = 3;
const SERVICE = "metodo-cira-seleccion-soluciones";

// Per-dimension score is 0-6 (two questions of 0-3). Thresholds are on that
// scale; the overall band is on the 0-30 total.
function dimensionLevel(score: number): Level {
  if (score <= 2) return "low";
  if (score <= 4) return "mid";
  return "high";
}
function bandIndex(total: number): number {
  if (total <= 13) return 0;
  if (total <= 22) return 1;
  return 2;
}

export default function TestPreparacionErp() {
  const { t } = useTranslation("herramientas");
  const lang = useLang();

  const questions = t("testErp.questions", { returnObjects: true }) as Question[];
  const dimensions = t("testErp.dimensions", { returnObjects: true }) as Dimension[];
  const bands = t("testErp.results.bands", { returnObjects: true }) as Band[];
  const links = t("testErp.results.links", { returnObjects: true }) as LinkItem[];
  const faqs = t("testErp.faq.items", { returnObjects: true }) as Faq[];
  const bullets = t("testErp.intro.bullets", { returnObjects: true }) as string[];
  const total = questions.length;

  // answers[i] is the option index chosen for question i. State starts empty on
  // both the server and the client's first pass, so the prerendered HTML (the
  // intro plus question 1) is exactly what React renders before any click.
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const finished = step >= total;

  const dimensionScores = dimensions.map((_, d) =>
    questions.reduce((sum, q, i) => (q.dimension === d ? sum + (answers[i] ?? 0) : sum), 0),
  );
  const totalScore = dimensionScores.reduce((a, b) => a + b, 0);
  const maxScore = total * MAX_PER_QUESTION;
  const band = bands[bandIndex(totalScore)];

  const goTo = (next: number) => {
    setStep(next);
    // Move focus to the new heading so keyboard and screen-reader users land on
    // the next question. Runs only after a click, never on mount.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const choose = (optionIndex: number) => {
    if (!started.current) {
      started.current = true;
      trackEvent("tool_start", { tool_name: "test_preparacion_erp" });
    }
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
    if (step === total - 1) {
      const sum = questions.reduce((s, _q, i) => s + (next[i] ?? 0), 0);
      trackEvent("tool_complete", {
        tool_name: "test_preparacion_erp",
        result_band: bandIndex(sum) + 1,
        score: sum,
      });
    }
    goTo(step + 1);
  };

  const restart = () => {
    setAnswers([]);
    started.current = false;
    goTo(0);
  };

  const siteUrl = "https://cyrruscs.com";
  const pagePath = langPath("/herramientas/test-preparacion-erp", lang);
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: langPath("/", lang) },
    { label: t("testErp.hero.title") },
  ];

  usePageMeta({
    title: t("testErp.meta.title"),
    description: t("testErp.meta.description"),
    alternatePath: lang === "en" ? "/herramientas/test-preparacion-erp" : "/en/herramientas/test-preparacion-erp",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${siteUrl}${pagePath}#app`,
        name: t("testErp.hero.title"),
        description: t("testErp.meta.description"),
        url: `${siteUrl}${pagePath}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: lang,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${siteUrl}/#organization` },
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

  const question = questions[Math.min(step, total - 1)];
  // Gaps worth acting on, weakest first.
  const gaps = dimensions
    .map((d, i) => ({ id: d.id, name: d.name, score: dimensionScores[i], level: dimensionLevel(dimensionScores[i]) }))
    .filter((d) => d.level !== "high")
    .sort((a, b) => a.score - b.score);

  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <PageHero
          eyebrow={t("testErp.hero.eyebrow")}
          title={t("testErp.hero.title")}
          description={t("testErp.hero.description")}
          breadcrumbs={breadcrumbItems}
        >
          <ContactCtaButton variant="light" label={t("testErp.hero.ctaLabel")} prefill={{ servicio: SERVICE }} />
        </PageHero>

        <section className="w-full bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-12">
            <div className="md:col-span-4">
              <span className="block text-base font-bold uppercase tracking-wider text-blue">
                {t("testErp.intro.kicker")}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-gray">{t("testErp.intro.text")}</p>
              <ul className="mt-6 space-y-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <span className="text-base leading-relaxed text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-navy/70">{t("testErp.quiz.title")}</p>

                {!finished ? (
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm text-gray">
                      <span aria-live="polite">{t("testErp.quiz.step", { n: step + 1, total })}</span>
                      <span className="font-semibold text-blue">{dimensions[question.dimension].name}</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
                      <div
                        className="h-full w-full origin-left rounded-full bg-blue transition-transform duration-200 ease-out"
                        style={{ transform: `scaleX(${(step + 1) / total})` }}
                      />
                    </div>

                    <h2
                      ref={headingRef}
                      tabIndex={-1}
                      className="mt-6 text-xl font-semibold leading-snug text-navy outline-none sm:text-2xl"
                    >
                      {question.text}
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-3" role="group" aria-label={question.text}>
                      {question.options.map((option, oi) => {
                        const selected = answers[step] === oi;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => choose(oi)}
                            aria-pressed={selected}
                            className={cn(
                              "rounded-xl border px-4 py-3.5 text-left text-base leading-snug transition-[background-color,border-color] duration-150 ease-out",
                              selected
                                ? "border-blue bg-light-blue/60 text-navy"
                                : "border-border bg-background text-navy/85 hover:border-blue hover:bg-light-blue/40",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors duration-150 ease-out hover:text-navy"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {t("testErp.quiz.back")}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-5">
                    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-blue">
                      <ClipboardCheck className="h-5 w-5" />
                      <span>{t("testErp.quiz.score", { score: totalScore, max: maxScore })}</span>
                    </div>
                    <h2
                      ref={headingRef}
                      tabIndex={-1}
                      className="mt-3 text-2xl font-bold leading-snug text-navy outline-none sm:text-3xl"
                    >
                      {band.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-gray">{band.summary}</p>

                    <h3 className="mt-8 text-lg font-semibold text-navy">{t("testErp.quiz.dimensionsTitle")}</h3>
                    <ul className="mt-4 space-y-4">
                      {dimensions.map((d, i) => {
                        const level = dimensionLevel(dimensionScores[i]);
                        return (
                          <li key={d.id}>
                            <div className="flex items-baseline justify-between gap-3 text-sm">
                              <span className="font-semibold text-navy">{d.name}</span>
                              <span
                                className={cn(
                                  "font-semibold",
                                  level === "low" && "text-red-700",
                                  level === "mid" && "text-amber-700",
                                  level === "high" && "text-emerald-700",
                                )}
                              >
                                {t(`testErp.quiz.levels.${level}`)}
                              </span>
                            </div>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
                              <div
                                className={cn(
                                  "h-full w-full origin-left rounded-full",
                                  level === "low" && "bg-red-500",
                                  level === "mid" && "bg-amber-500",
                                  level === "high" && "bg-emerald-500",
                                )}
                                style={{ transform: `scaleX(${dimensionScores[i] / (2 * MAX_PER_QUESTION)})` }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {gaps.length > 0 && (
                      <>
                        <h3 className="mt-8 text-lg font-semibold text-navy">{t("testErp.quiz.gapsTitle")}</h3>
                        <ol className="mt-4 space-y-4">
                          {gaps.slice(0, 3).map((g, i) => (
                            <li key={g.id} className="rounded-xl border border-border bg-background p-4">
                              <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                                {`${String(i + 1).padStart(2, "0")} · ${g.name}`}
                              </span>
                              <p className="mt-2 text-base leading-relaxed text-navy/85">
                                {t(`testErp.results.recommendations.${g.id}.${g.level}`)}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </>
                    )}

                    <div className="mt-8 rounded-xl bg-navy p-6">
                      <p className="text-base leading-relaxed text-white/85">{t("testErp.quiz.ctaText")}</p>
                      <div className="mt-4">
                        <ContactCtaButton
                          variant="light"
                          label={t("testErp.quiz.ctaLabel")}
                          prefill={{ servicio: SERVICE }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={restart}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors duration-150 ease-out hover:text-navy"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t("testErp.quiz.restart")}
                    </button>
                  </div>
                )}

                <p className="mt-8 border-t border-border pt-4 text-xs leading-relaxed text-gray">
                  {t("testErp.quiz.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{t("testErp.quiz.nextTitle")}</h2>
            <div className={cn("mt-8 grid grid-cols-1 gap-6", links.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
              {links.map((item) => (
                <Link
                  key={item.href}
                  to={langPath(item.href, lang)}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-150 ease-out hover:border-blue hover:shadow-md"
                >
                  <span className="text-base font-semibold text-navy">{item.label}</span>
                  <span className="text-sm leading-relaxed text-gray">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection eyebrow={t("testErp.faq.eyebrow")} title={t("testErp.faq.title")} faqs={faqs} />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
