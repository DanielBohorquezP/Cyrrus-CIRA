import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { clientLogoNames } from "@/lib/client-logos";
import { caseStudies } from "@/lib/case-studies";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { ClientOnly } from "@/components/ui/client-only";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
import { User } from "lucide-react";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/paginas";
import { Img } from "@/components/ui/img";

interface Stat {
  value: string;
  label: string;
}
interface Industry {
  name: string;
}
interface GalleryItem {
  caption: string;
}
interface CaseCard {
  title: string;
  industry: string;
  card: { excerpt: string; metric: string };
}
interface TeamRole {
  role: string;
  name?: string;
}

const gallerySrcs = [
  { src: "/assets/decoracion/Cesar.jpg", alt: "Consultores de Cyrrus trabajando en un diagnóstico de procesos" },
  { src: "/assets/decoracion/IMG_20230302_112825.jpg", alt: "Equipo de un cliente de Cyrrus al cierre de un proyecto de transformación" },
  { src: "/assets/decoracion/Evento%20mesas.jpg", alt: "Cyrrus en un evento corporativo" },
];

const teamPhotos = ["/assets/decoracion/JacksonCEO1.jpeg", "/assets/decoracion/DanielBohorquez.JPG.jpeg"];

export default function Experiencia() {
  const { t } = useTranslation("paginas");
  const lang = useLang();

  const stats = t("experiencia.stats", { returnObjects: true }) as Stat[];
  const industries = t("experiencia.industries", { returnObjects: true }) as Industry[];
  const gallery = (t("experiencia.gallery.items", { returnObjects: true }) as GalleryItem[]).map((g, i) => ({
    ...g,
    ...gallerySrcs[i],
  }));
  const team = (t("experiencia.team.roles", { returnObjects: true }) as TeamRole[]).map((m, i) => ({
    ...m,
    photo: teamPhotos[i],
  }));

  const cases = caseStudies.map((c) => ({
    ...c,
    ...(t(`casos.${c.slug}`, { returnObjects: true }) as CaseCard),
  }));

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en/experiencia" : "/experiencia";

  usePageMeta({
    title: t("experiencia.meta.title"),
    description: t("experiencia.meta.description"),
    alternatePath: lang === "en" ? "/experiencia" : "/en/experiencia",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}${pagePath}#webpage`,
        url: `${siteUrl}${pagePath}`,
        name: t("experiencia.meta.title"),
        description: t("experiencia.meta.description"),
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${lang === "en" ? "/en" : "/"}` },
          { "@type": "ListItem", position: 2, name: lang === "en" ? "Experience" : "Experiencia", item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={t("experiencia.hero.eyebrow")}
        title={t("experiencia.hero.title")}
        description={t("experiencia.hero.description")}
        visual={
          // Deferred for the same reason as CyrrusGlobe — a WebGL canvas can't be
          // prerendered into markup React will agree with.
          <ClientOnly fallback={<div className="mx-auto aspect-square w-full max-w-[520px]" />}>
            <InteractiveGlobe className="mx-auto" />
          </ClientOnly>
        }
      />

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <RevealGroup
            as="dl"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-b border-line"
          >
            {stats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="flex flex-col-reverse justify-end border-r border-line py-10 pr-8 last:border-r-0"
              >
                <dt className="mt-4 text-base leading-[1.5] text-slate">{stat.label}</dt>
                <dd className="font-heading text-[clamp(56px,6vw,72px)] font-light leading-none tracking-[-0.04em] text-navy">
                  {stat.value}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-24 gap-y-10">
            <Reveal>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                {t("experiencia.industriesLabel")}
              </h2>
            </Reveal>
            <div className="md:col-span-2">
              <RuledBullets
                columns={2}
                numbered
                items={industries.map((industry) => `${t("experiencia.industriesPrefix")} ${industry.name.toLowerCase()}`)}
              />
            </div>
          </div>
        </div>
      </section>

      <AnimatedNavyBackground id="casos" className="section-y">
        <div className="container-site text-white">
          <SectionHeader
            tone="dark"
            eyebrow={t("experiencia.cases.eyebrow")}
            title={t("experiencia.cases.title")}
            description={t("experiencia.cases.description")}
          />
          <RevealGroup className="mt-16 border-t border-white/20">
            {cases.map((c) => (
              <RevealItem key={c.slug}>
                <Link
                  to={`${pagePath}/${c.slug}`}
                  className="group grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-x-16 gap-y-10 border-b border-white/20 py-14 text-white"
                >
                  <span className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-white/10 p-10">
                    <Img
                      src={`/assets/logos-clientes/${encodeURIComponent(c.logo)}.webp`}
                      alt={c.logo}
                      sizes="240px"
                      className="max-h-20 w-auto max-w-[70%] object-contain"
                    />
                  </span>
                  <span className="block">
                    <Eyebrow as="span" tone="dark">{c.industry}</Eyebrow>
                    <h3 className="mt-4 font-heading text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.2] tracking-[-0.02em] text-balance">
                      {c.title}
                    </h3>
                    <span className="mt-4 block text-[17px] leading-[1.7] text-white/75">{c.card.excerpt}</span>
                    <span className="mt-6 block border-t border-white/20 pt-5 font-heading text-lg font-medium">
                      {c.card.metric}
                    </span>
                    <span className="mt-5 inline-block border-b border-white/50 pb-1 font-heading text-sm font-medium group-hover:border-white">
                      {`${t("casos.labels.readCase")} →`}
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </AnimatedNavyBackground>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("experiencia.gallery.eyebrow")} title={t("experiencia.gallery.title")} />
          <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {gallery.map((item) => (
              <RevealItem key={item.src}>
                <PhotoCaption
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  aspect="aspect-[4/5]"
                  position="50% 0%"
                  sizes="1100px"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-y w-full bg-mist">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-24 gap-y-12">
          <Reveal>
            <Eyebrow>{t("experiencia.team.eyebrow")}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{t("experiencia.team.title")}</h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-8 md:col-span-2">
            {team.map((member) => (
              <RevealItem key={member.role}>
                {member.photo ? (
                  <Img
                    src={member.photo}
                    alt={member.name ?? ""}
                    width={480}
                    height={600}
                    sizes="1100px"
                    className="aspect-[4/5] w-full rounded-2xl bg-line object-cover object-top"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-line">
                    <User className="h-12 w-12 text-blue" />
                  </div>
                )}
                {member.name && (
                  <p className="mt-5 font-heading text-[19px] font-semibold text-navy">{member.name}</p>
                )}
                <p className={member.name ? "mt-1.5 text-base text-slate" : "mt-5 font-heading text-[19px] font-semibold text-navy"}>
                  {member.role}
                </p>
                {!member.name && (
                  <p className="mt-1.5 text-sm text-slate">{t("experiencia.team.photoNamePending")}</p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-y w-full bg-background">
        <div className="container-site">
          <SectionHeader eyebrow={t("experiencia.trust.eyebrow")} title={t("experiencia.trust.title")} />
          <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-px border border-navy bg-white/20">
            {clientLogoNames.map((name) => (
              <RevealItem key={name} className="flex h-28 items-center justify-center bg-navy px-7 py-5">
                <Img
                  src={`/assets/logos-clientes/${encodeURIComponent(name)}.webp`}
                  alt={name}
                  sizes="140px"
                  className="max-h-11 w-full object-contain"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
