import {
  BarChart3,
  CheckCircle2,
  Cpu,
  Eye,
  Flame,
  Gauge,
  Network,
  ShieldCheck,
  TrendingDown,
  UserX,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

interface Problem {
  title: string;
  description: string;
}
interface Benefit {
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
interface Stat {
  value: string;
  label: string;
}

const problemIcons = [Network, Eye, TrendingDown, UserX, Cpu];
const benefitIcons = [Gauge, Zap, TrendingDown, UserX, Flame, BarChart3];

export default function PlaneacionEstrategica() {
  const { t } = useTranslation("estrategia");
  const lang = useLang();

  const problems = (t("diagnostico.problems", { returnObjects: true }) as Problem[]).map((p, i) => ({
    ...p,
    icon: problemIcons[i],
  }));
  const benefits = (t("benefits.items", { returnObjects: true }) as Benefit[]).map((b, i) => ({
    ...b,
    icon: benefitIcons[i],
  }));
  const cxaas = t("cxaas.roles", { returnObjects: true }) as Role[];
  const services = t("services.items", { returnObjects: true }) as string[];
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];
  const stats = t("whyCeos.stats", { returnObjects: true }) as Stat[];

  const siteUrl = "https://www.cyrruscs.com";
  const pagePath = lang === "en" ? "/en/metodo-cira/planeacion-estrategica" : "/metodo-cira/planeacion-estrategica";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/metodo-cira/planeacion-estrategica" : "/en/metodo-cira/planeacion-estrategica",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: lang === "en" ? "Strategic planning consulting" : "Consultoría de planeación estratégica",
        name: t("hero.title"),
        provider: { "@id": `${siteUrl}/#organization` },
        description: t("meta.description"),
        areaServed: "LATAM",
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
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
          { "@type": "ListItem", position: 2, name: t("hero.eyebrow").split(" — ")[0], item: `${siteUrl}${methodPath}` },
          { "@type": "ListItem", position: 3, name: t("hero.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      >
        <ContactCtaButton variant="light" label={t("hero.ctaLabel")} />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <img
              src="/assets/decoracion/IMG_20200313_092604173.jpg"
              alt="Consultores de Cyrrus presentando planeación estratégica en conferencia"
              width={640}
              height={427}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-72"
            />
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-blue">
              {t("intro.kicker")}
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              {t("intro.pullQuote")}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-gray">
              {t("intro.description")}
            </p>
            <ul className="mt-8 space-y-4">
              {(t("intro.bullets", { returnObjects: true }) as string[]).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-base leading-relaxed text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("diagnostico.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("diagnostico.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("diagnostico.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={problem.title}
                  variants={staggerItem}
                  className="flex gap-5 rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-navy">
                      {problem.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">
                      {problem.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("hero.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <AnimatedNavyBackground className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
              {t("whyCeos.eyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t("whyCeos.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              {t("whyCeos.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <motion.div key={stat.value} variants={staggerItem} className="px-4">
                <dd className="bg-gradient-to-br from-cyan to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                  {stat.value}
                </dd>
                <span className="mt-3 block text-sm leading-relaxed text-white/70">
                  {stat.label}
                </span>
                <span className="mx-auto mt-4 block h-[3px] w-9 rounded-full bg-cyan" />
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </AnimatedNavyBackground>

      <IncludedGrid
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
        items={benefits}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("cxaas.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("cxaas.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              {t("cxaas.description")}
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
            {cxaas.map((role) => (
              <motion.div
                key={role.title}
                variants={staggerItem}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                  <ShieldCheck className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-navy">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray">{role.description}</p>
              </motion.div>
            ))}
            <motion.div variants={staggerItem} className="overflow-hidden rounded-2xl">
              <img
                src="/assets/decoracion/IMG_20230227_164810.jpg"
                alt="Consultor senior de Cyrrus definiendo la hoja de ruta con el equipo"
                width={320}
                height={400}
                loading="lazy"
                className="h-full min-h-[220px] w-full object-cover"
              />
            </motion.div>
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label={t("hero.ctaLabel")} />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              {t("services.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("services.title")}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
            {services.map((service, index) => (
              <div
                key={service}
                className="flex items-center gap-6 py-5"
              >
                <span className="text-sm font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-navy">{service}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
