import { useState } from "react";
import { RotateCcw } from "lucide-react";
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

interface LinkItem {
  label: string;
  description: string;
  href: string;
}
interface Faq {
  question: string;
  answer: string;
}

type Model = "cloud" | "perpetual";

// Example values, deliberately round and not any vendor's price list. The page
// says so; they only exist so the first render shows a coherent result.
const DEFAULTS = {
  modelo: "cloud" as Model,
  usuarios: "25",
  precioCloud: "80",
  precioPerp: "3000",
  mantenimiento: "20",
  implPct: "100",
  integPct: "25",
  trainPct: "15",
  personas: "3",
  meses: "6",
  costoMes: "4000",
  dedicacion: "50",
  infra: "3000",
  contPct: "15",
  anios: "5",
};
type Values = typeof DEFAULTS;

const SERVICE = "metodo-cira-seleccion-soluciones";

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

// Manual thousands separator instead of Intl.NumberFormat: the prerendered HTML
// and the visitor's first render must produce the same string whatever the
// browser's locale, or React drops the hydrated subtree.
function money(n: number, sep: string, currency: string) {
  const digits = String(Math.round(n));
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return `${currency} ${grouped}`;
}

// One decimal at most, so the width string React writes is the one the browser
// serialises back (no 33.33333333% vs 33.3333% drift).
const pctWidth = (part: number, total: number) =>
  total > 0 ? Math.round((part / total) * 1000) / 10 : 0;

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-base text-navy outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-blue focus:shadow-[0_0_0_3px_rgba(27,111,194,0.15)]"
        />
        {suffix && <span className="shrink-0 text-sm text-gray">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-xs leading-relaxed text-gray">{hint}</p>}
    </div>
  );
}

export default function CalculadoraCostoErp() {
  const { t } = useTranslation("herramientas");
  const lang = useLang();
  const [v, setV] = useState<Values>(DEFAULTS);
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    if (!touched) {
      setTouched(true);
      trackEvent("tool_start", { tool_name: "calculadora_costo_erp" });
    }
    setV((prev) => ({ ...prev, [key]: value }));
  };

  const links = t("calculadoraErp.links.items", { returnObjects: true }) as LinkItem[];
  const faqs = t("calculadoraErp.faq.items", { returnObjects: true }) as Faq[];
  const sep = lang === "en" ? "," : ".";
  const cur = t("calculadoraErp.results.currency");
  const fmt = (n: number) => money(n, sep, cur);

  // --- model ---------------------------------------------------------------
  const years = Math.min(10, Math.max(1, Math.round(num(v.anios)) || 1));
  const users = num(v.usuarios);
  const cloud = v.modelo === "cloud";
  const firstYearLicense = cloud ? users * num(v.precioCloud) * 12 : users * num(v.precioPerp);
  const licenseOneTime = cloud ? 0 : users * num(v.precioPerp);
  const licenseRecurring = cloud ? firstYearLicense : users * num(v.precioPerp) * (num(v.mantenimiento) / 100);
  const implementation = firstYearLicense * (num(v.implPct) / 100);
  const integration = firstYearLicense * (num(v.integPct) / 100);
  const training = implementation * (num(v.trainPct) / 100);
  const project = implementation + integration + training;
  const team = num(v.personas) * num(v.meses) * num(v.costoMes) * (num(v.dedicacion) / 100);
  const contingency = (project + team) * (num(v.contPct) / 100);
  const infraTotal = num(v.infra) * years;
  const licenseTotal = licenseOneTime + licenseRecurring * years;
  const total = licenseTotal + project + team + infraTotal + contingency;
  const licenseShare = total > 0 ? Math.round((licenseTotal / total) * 100) : 0;

  const categories = [
    { key: "license", value: licenseTotal, color: "bg-blue" },
    { key: "project", value: project, color: "bg-cyan" },
    { key: "team", value: team, color: "bg-navy" },
    { key: "infra", value: infraTotal, color: "bg-amber-500" },
    { key: "contingency", value: contingency, color: "bg-gray-400" },
  ];

  const oneTimeProject = project + team + contingency;
  const yearRows = Array.from({ length: years }, (_, i) => {
    const recurring = licenseRecurring + num(v.infra);
    return i === 0 ? recurring + licenseOneTime + oneTimeProject : recurring;
  });

  const siteUrl = "https://cyrruscs.com";
  const pagePath = langPath("/herramientas/calculadora-costo-erp", lang);
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: langPath("/", lang) },
    { label: t("calculadoraErp.hero.title") },
  ];

  usePageMeta({
    title: t("calculadoraErp.meta.title"),
    description: t("calculadoraErp.meta.description"),
    alternatePath:
      lang === "en" ? "/herramientas/calculadora-costo-erp" : "/en/herramientas/calculadora-costo-erp",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${siteUrl}${pagePath}#app`,
        name: t("calculadoraErp.hero.title"),
        description: t("calculadoraErp.meta.description"),
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

  const f = (key: string) => ({
    label: t(`calculadoraErp.fields.${key}.label`),
    hint: t(`calculadoraErp.fields.${key}.hint`) || undefined,
  });

  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <PageHero
          eyebrow={t("calculadoraErp.hero.eyebrow")}
          title={t("calculadoraErp.hero.title")}
          description={t("calculadoraErp.hero.description")}
          breadcrumbs={breadcrumbItems}
        >
          <ContactCtaButton variant="light" label={t("calculadoraErp.hero.ctaLabel")} prefill={{ servicio: SERVICE }} />
        </PageHero>

        <section className="w-full bg-background py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <p className="max-w-3xl text-base leading-relaxed text-gray">{t("calculadoraErp.intro.text")}</p>
              <button
                type="button"
                onClick={() => setV(DEFAULTS)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors duration-150 ease-out hover:text-navy"
              >
                <RotateCcw className="h-4 w-4" />
                {t("calculadoraErp.intro.reset")}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-7">
                <fieldset className="rounded-2xl border border-border bg-card p-6">
                  <legend className="px-2 text-base font-bold text-navy">{t("calculadoraErp.groups.license")}</legend>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="modelo" className="block text-sm font-semibold text-navy">
                        {t("calculadoraErp.fields.modelo.label")}
                      </label>
                      <select
                        id="modelo"
                        value={v.modelo}
                        onChange={(e) => set("modelo", e.target.value as Model)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-base text-navy outline-none focus:border-blue"
                      >
                        <option value="cloud">{t("calculadoraErp.fields.modelo.cloud")}</option>
                        <option value="perpetual">{t("calculadoraErp.fields.modelo.perpetual")}</option>
                      </select>
                    </div>
                    <Field id="usuarios" {...f("usuarios")} value={v.usuarios} onChange={(x) => set("usuarios", x)} />
                    {cloud ? (
                      <Field
                        id="precioCloud"
                        {...f("precioCloud")}
                        value={v.precioCloud}
                        onChange={(x) => set("precioCloud", x)}
                        suffix={cur}
                      />
                    ) : (
                      <Field
                        id="precioPerp"
                        {...f("precioPerpetual")}
                        value={v.precioPerp}
                        onChange={(x) => set("precioPerp", x)}
                        suffix={cur}
                      />
                    )}
                    {!cloud && (
                      <Field
                        id="mantenimiento"
                        {...f("mantenimiento")}
                        value={v.mantenimiento}
                        onChange={(x) => set("mantenimiento", x)}
                        suffix="%"
                      />
                    )}
                  </div>
                </fieldset>

                <fieldset className="rounded-2xl border border-border bg-card p-6">
                  <legend className="px-2 text-base font-bold text-navy">{t("calculadoraErp.groups.project")}</legend>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="implPct" {...f("implPct")} value={v.implPct} onChange={(x) => set("implPct", x)} suffix="%" />
                    <Field id="integPct" {...f("integPct")} value={v.integPct} onChange={(x) => set("integPct", x)} suffix="%" />
                    <Field id="trainPct" {...f("trainPct")} value={v.trainPct} onChange={(x) => set("trainPct", x)} suffix="%" />
                    <Field id="contPct" {...f("contPct")} value={v.contPct} onChange={(x) => set("contPct", x)} suffix="%" />
                  </div>
                </fieldset>

                <fieldset className="rounded-2xl border border-border bg-card p-6">
                  <legend className="px-2 text-base font-bold text-navy">{t("calculadoraErp.groups.team")}</legend>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="personas" {...f("personas")} value={v.personas} onChange={(x) => set("personas", x)} />
                    <Field id="meses" {...f("meses")} value={v.meses} onChange={(x) => set("meses", x)} />
                    <Field id="costoMes" {...f("costoMes")} value={v.costoMes} onChange={(x) => set("costoMes", x)} suffix={cur} />
                    <Field id="dedicacion" {...f("dedicacion")} value={v.dedicacion} onChange={(x) => set("dedicacion", x)} suffix="%" />
                  </div>
                </fieldset>

                <fieldset className="rounded-2xl border border-border bg-card p-6">
                  <legend className="px-2 text-base font-bold text-navy">{t("calculadoraErp.groups.other")}</legend>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="infra" {...f("infra")} value={v.infra} onChange={(x) => set("infra", x)} suffix={cur} />
                    <Field id="anios" {...f("anios")} value={v.anios} onChange={(x) => set("anios", x)} />
                  </div>
                </fieldset>
              </div>

              <aside className="lg:col-span-5">
                <div className="rounded-2xl bg-navy p-6 text-white lg:sticky lg:top-24 sm:p-8">
                  <h2 className="text-lg font-semibold text-white/80">{t("calculadoraErp.results.title")}</h2>
                  <p className="mt-4 text-sm uppercase tracking-wider text-cyan">
                    {t("calculadoraErp.results.total", { years })}
                  </p>
                  <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl" aria-live="polite">
                    {fmt(total)}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {`${t("calculadoraErp.results.perYear")}: ${fmt(total / years)}`}
                  </p>

                  <div className="mt-6 rounded-xl bg-white/10 p-4">
                    <p className="text-base font-semibold">
                      {t("calculadoraErp.results.share", { pct: licenseShare })}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{t("calculadoraErp.results.shareNote")}</p>
                  </div>

                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/70">
                    {t("calculadoraErp.results.breakdown")}
                  </h3>
                  <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                    {categories.map((c) => (
                      <div
                        key={c.key}
                        className={cn("h-full", c.color)}
                        style={{ width: `${pctWidth(c.value, total)}%` }}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {categories.map((c) => (
                      <li key={c.key} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2">
                          <span className={cn("inline-block h-2.5 w-2.5 rounded-full", c.color)} aria-hidden="true" />
                          <span className="text-white/85">{t(`calculadoraErp.results.categories.${c.key}`)}</span>
                        </span>
                        <span className="font-semibold">{fmt(c.value)}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/70">
                    {t("calculadoraErp.results.byYear")}
                  </h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {yearRows.map((value, i) => (
                          <tr key={i} className="border-b border-white/10">
                            <td className="py-1.5 text-white/75">{t("calculadoraErp.results.year", { n: i + 1 })}</td>
                            <td className="py-1.5 text-right font-semibold">{fmt(value)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="pt-2 font-semibold">{t("calculadoraErp.results.yearTotal")}</td>
                          <td className="pt-2 text-right font-semibold">{fmt(total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/60">{t("calculadoraErp.results.note")}</p>

                  <div className="mt-6 border-t border-white/15 pt-6">
                    <p className="text-sm leading-relaxed text-white/80">{t("calculadoraErp.results.ctaText")}</p>
                    <div className="mt-4">
                      <ContactCtaButton
                        variant="light"
                        label={t("calculadoraErp.results.ctaLabel")}
                        prefill={{ servicio: SERVICE }}
                      />
                    </div>
                    <p className="mt-4 text-sm">
                      <Link
                        to={langPath("/diagnostico", lang)}
                        className="font-semibold text-white underline underline-offset-4"
                      >
                        {t("calculadoraErp.results.diagnosticLink")}
                      </Link>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gray">{t("calculadoraErp.results.disclaimer")}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="w-full bg-light-blue/40 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{t("calculadoraErp.links.title")}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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

        <FaqSection eyebrow={t("calculadoraErp.faq.eyebrow")} title={t("calculadoraErp.faq.title")} faqs={faqs} />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
