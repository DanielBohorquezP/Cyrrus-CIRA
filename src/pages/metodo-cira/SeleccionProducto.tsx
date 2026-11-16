import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { RelatedServices } from "@/components/sections/related-services";
import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CARD_IMAGE_POOL } from "@/lib/service-media";
import { definitionFromFaq, useGroupBlocks } from "@/lib/use-group-blocks";
import { SOLUCIONES_HERO_MEDIA } from "@/lib/service-media";
import { ServiceTemplate, type ServiceContent } from "@/components/layout/service-template";
import { splitHeroTitle, splitQuote } from "@/components/layout/service-child-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { productSlugs } from "@/lib/solutions-icons";
import { Testimonials } from "@/components/sections/testimonials";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NumberedList } from "@/components/ui/numbered-list";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/seleccion-productos";
import "@/i18n/ns/seleccion-de-software";
import "@/i18n/ns/seleccion-soluciones";

interface DolorItem {
  title: string;
  description: string;
}
interface Dolor {
  eyebrow: string;
  title: string;
  items: DolorItem[];
  narrativa: string;
}
interface ProblemaReal {
  eyebrow: string;
  title: string;
  body: string;
  punch: string;
}
interface Solucion {
  eyebrow: string;
  title: string;
  linkLabel: string;
  steps: string[];
}
interface EvalItem {
  title: string;
  description: string;
}
interface Evaluamos {
  eyebrow: string;
  title: string;
  items: EvalItem[];
}
interface Entregables {
  eyebrow: string;
  title: string;
  items: string[];
  closingQuote?: string;
}
interface Faq {
  question: string;
  answer: string;
}
interface Meta {
  title: string;
  description: string;
}
/** Optional answer-first block under the hero ("what does a consultant do?"). Only the ERP page has one so far. */
interface Respuesta {
  eyebrow: string;
  title: string;
  body: string;
  items: EvalItem[];
}
interface Hero {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export default function SeleccionProducto() {
  const { producto } = useParams();
  const { t } = useTranslation(["seleccion-productos", "seleccion-de-software"]);
  const lang = useLang();
  const groupBlocks = useGroupBlocks("soluciones");
  const prefix = lang === "en" ? "/en" : "";

  const slug = productSlugs.find((s) => s === producto);

  const meta = slug ? (t(`${slug}.meta`, { ns: "seleccion-productos", returnObjects: true }) as Meta) : undefined;
  const hero = slug ? (t(`${slug}.hero`, { ns: "seleccion-productos", returnObjects: true }) as Hero) : undefined;
  const dolor = slug ? (t(`${slug}.dolor`, { ns: "seleccion-productos", returnObjects: true }) as Dolor) : undefined;
  const problemaReal = slug ? (t(`${slug}.problemaReal`, { ns: "seleccion-productos", returnObjects: true }) as ProblemaReal) : undefined;
  const solucion = slug ? (t(`${slug}.solucion`, { ns: "seleccion-productos", returnObjects: true }) as Solucion) : undefined;
  const evaluamos = slug ? (t(`${slug}.evaluamos`, { ns: "seleccion-productos", returnObjects: true }) as Evaluamos) : undefined;
  const entregables = slug ? (t(`${slug}.entregables`, { ns: "seleccion-productos", returnObjects: true }) as Entregables) : undefined;
  const faqs = slug ? (t(`${slug}.faq`, { ns: "seleccion-productos", returnObjects: true }) as Faq[]) : undefined;
  // A missing key comes back as the key string, so only an object counts.
  const respuestaRaw = slug ? t(`${slug}.respuesta`, { ns: "seleccion-productos", returnObjects: true }) : undefined;
  const respuesta = typeof respuestaRaw === "object" && respuestaRaw !== null ? (respuestaRaw as Respuesta) : undefined;

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const methodPath = lang === "en" ? "/en/metodo-cira" : "/metodo-cira";
  const selectionPath = `${prefix}/metodo-cira/seleccion-de-soluciones`;
  const softwarePath = `${selectionPath}/seleccion-de-software`;
  const pagePath = `${softwarePath}/${slug}`;
  const changePath = `${prefix}/metodo-cira/gestion-del-cambio`;
  const pmoPath = `${prefix}/metodo-cira/gestion-de-proyectos`;
  const articlePath = `${prefix}/perspectivas/por-que-fracasan-los-proyectos-de-transformacion-digital`;
  const relatedServices = [
    {
      href: changePath,
      title: lang === "en" ? "Change management" : "Gestión del cambio",
      description: lang === "en"
        ? "So the organization actually adopts the new platform."
        : "Para que la organización adopte realmente la nueva plataforma.",
    },
    {
      href: pmoPath,
      title: lang === "en" ? "Project management (PMO)" : "Gerencia de proyectos (PMO)",
      description: lang === "en"
        ? "External PMO for the implementation once you've chosen."
        : "PMO externo para la implementación una vez decida.",
    },
    // The ERP page links to the ERP guide, which owns the informational
    // "qué es un ERP" query; this page keeps the commercial one. The CRM page
    // links to the CRM comparison for the same reason.
    slug === "erp"
      ? {
          href: `${prefix}/perspectivas/que-es-un-erp-guia-para-elegirlo`,
          title: lang === "en"
            ? "What is an ERP and how to choose one"
            : "Qué es un ERP y cómo elegirlo",
          description: lang === "en"
            ? "A practical guide: modules, selection criteria and common mistakes."
            : "Guía práctica: módulos, criterios de selección y errores comunes.",
        }
      : slug === "crm"
      ? {
          href: `${prefix}/perspectivas/salesforce-vs-hubspot-vs-dynamics-365-crm`,
          title: lang === "en"
            ? "Salesforce vs HubSpot vs Dynamics 365"
            : "Salesforce vs HubSpot vs Dynamics 365",
          description: lang === "en"
            ? "An independent comparison of Salesforce, HubSpot and Dynamics 365, with published prices."
            : "Comparación independiente de Salesforce, HubSpot y Dynamics 365, con precios publicados.",
        }
      : slug === "hcm"
      ? {
          href: `${prefix}/perspectivas/software-recursos-humanos-nomina-mas-de-100-empleados`,
          title: lang === "en"
            ? "HR and payroll software for 100+ employees"
            : "Software de RR. HH. y nómina para más de 100 empleados",
          description: lang === "en"
            ? "What to evaluate in an HR and payroll platform before choosing one."
            : "Qué evaluar en una plataforma de RR. HH. y nómina antes de elegirla.",
        }
      : slug === "eam"
      ? {
          href: `${prefix}/perspectivas/software-cmms-eam-como-elegir`,
          title: lang === "en"
            ? "CMMS and EAM software: how to choose"
            : "Software CMMS y EAM: cómo elegirlo",
          description: lang === "en"
            ? "The difference between a CMMS, an EAM and the ERP's maintenance module."
            : "Diferencia entre CMMS, EAM y el módulo de mantenimiento del ERP.",
        }
      : {
          href: articlePath,
          title: lang === "en"
            ? "Why transformation projects fail"
            : "Por qué fracasan los proyectos de transformación",
          description: lang === "en"
            ? "What derails these projects before they reach go-live."
            : "Qué descarrila estos proyectos antes de llegar a producción.",
        },
    // Interactive tool, ERP page only: the readiness test is the entry point for
    // a buyer who isn't ready to compare vendors yet.
    ...(slug === "erp"
      ? [
          {
            href: `${prefix}/herramientas/test-preparacion-erp`,
            title: lang === "en" ? "ERP readiness test" : "Test de preparación para un ERP",
            description: lang === "en"
              ? "Ten questions to see whether your company is ready to select."
              : "Diez preguntas para saber si su empresa está lista para seleccionar.",
          },
        ]
      : []),
    // The 3 Castillos case is the published proof of an ERP and CRM go-live with the method.
    ...(slug === "erp" || slug === "crm"
      ? [
          {
            href: `${prefix}/experiencia/3-castillos`,
            title: lang === "en" ? "3 Castillos case: ERP and CRM" : "Caso 3 Castillos: ERP y CRM",
            description: lang === "en"
              ? "From strategic planning to an ERP and CRM go-live in October 2021 with the CIRA Method."
              : "De la planeación estratégica al go-live de ERP y CRM en octubre de 2021 con el Método CIRA.",
          },
        ]
      : []),
  ];

  usePageMeta({
    title: meta?.title ?? "",
    description: meta?.description ?? "",
    alternatePath: slug
      ? lang === "en"
        ? `/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${slug}`
        : `/en/metodo-cira/seleccion-de-soluciones/seleccion-de-software/${slug}`
      : undefined,
    jsonLd:
      hero && slug && faqs
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${siteUrl}${pagePath}#service`,
              serviceType: `${lang === "en" ? "Selection consulting for" : "Consultoría de selección de"} ${slug.toUpperCase()}`,
              name: `${lang === "en" ? "Selection of" : "Selección de"} ${slug.toUpperCase()}`,
              provider: { "@id": `${siteUrl}/#organization` },
              description: meta?.description,
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
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: lang === "en" ? "CIRA Method" : "Método CIRA", item: `${siteUrl}${methodPath}` },
                { "@type": "ListItem", position: 3, name: lang === "en" ? "Solution Selection" : "Selección de Soluciones", item: `${siteUrl}${selectionPath}` },
                { "@type": "ListItem", position: 4, name: lang === "en" ? "Software Selection" : "Selección de Software", item: `${siteUrl}${softwarePath}` },
                { "@type": "ListItem", position: 5, name: slug.toUpperCase(), item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!slug || !hero || !dolor || !problemaReal || !solucion || !evaluamos || !entregables || !faqs) {
    return <Navigate to={`${prefix}/metodo-cira/seleccion-de-soluciones/seleccion-de-software`} replace />;
  }

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "CIRA Method" : "Método CIRA", href: methodPath },
    { label: lang === "en" ? "Solution Selection" : "Selección de Soluciones", href: selectionPath },
    { label: lang === "en" ? "Software Selection" : "Selección de Software", href: softwarePath },
    { label: slug.toUpperCase() },
  ];

  const otherProducts = productSlugs
    .filter((s) => s !== slug)
    .map((s) => ({
      slug: s,
      title: t(`${s}.hero.title`, { ns: "seleccion-productos" }) as string,
    }));

  const heroTitle = splitHeroTitle(hero.title);
  const content: ServiceContent = {
    area: "seleccion-soluciones",
    hero: {
      eyebrow: hero.eyebrow,
      ...heroTitle,
      description: hero.description,
      ctaLabel: hero.ctaLabel,
      link:
        slug === "erp"
          ? {
              href: `${prefix}/herramientas/test-preparacion-erp`,
              label: lang === "en" ? "ERP readiness test" : "Test de preparación para un ERP",
            }
          : undefined,
    },
    breadcrumbs: breadcrumbItems,
    media: SOLUCIONES_HERO_MEDIA,
    queHacemos: {
      ...splitQuote(solucion.title),
      intro: problemaReal.body,
      cards: evaluamos.items.map((item, i) => ({
        title: item.title,
        description: item.description,
        image: { src: CARD_IMAGE_POOL[i % CARD_IMAGE_POOL.length], alt: item.title },
      })),
      links: (
        <p>
          <Link to={`${methodPath}#identificar`} className="font-bold text-blue hover:text-navy">
            {`${solucion.linkLabel} →`}
          </Link>
        </p>
      ),
    },
    queEs: (() => {
      const base = respuesta
        ? { title: respuesta.title, body: respuesta.body, refs: respuesta.items }
        : definitionFromFaq(faqs);
      const usos = t(`${slug}.usos`, { ns: "seleccion-productos", returnObjects: true }) as {
        title: string;
        items: EvalItem[];
      };
      return base ? { ...base, uses: { label: usos.title, items: usos.items } } : base;
    })(),
    comoLoHacemos: t(`${slug}.comoLoHacemos`, { ns: "seleccion-productos", returnObjects: true }) as ServiceContent["comoLoHacemos"],
    autoridad: groupBlocks.autoridad,
    beneficios: t(`${slug}.beneficios`, { ns: "seleccion-productos", returnObjects: true }) as {
      title: string;
      intro?: string;
      items: EvalItem[];
    },
    faq: {
      eyebrow: hero.eyebrow,
      title: lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes",
      items: faqs,
    },
    related: {
      eyebrow: lang === "en" ? "Related services" : "Servicios relacionados",
      title: lang === "en" ? "The decision doesn't end at the recommendation" : "La decisión no termina en la recomendación",
      items: relatedServices,
    },
    closingQuote: t("closingQuote", { ns: "seleccion-de-software" }),
  };

  return (
    <ServiceTemplate
      content={content}
      extrasEndTone="white"
      extras={
        <>
          {/* 01 — Dolor */}
          <section className="section-y w-full bg-background">
            <div className="container-site">
              <SectionHeader eyebrow={dolor.eyebrow} title={dolor.title} />
              <NumberedList items={dolor.items} layout="columns" className="mt-14" />
              <Reveal>
                <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
                  {dolor.narrativa}
                </p>
              </Reveal>
            </div>
          </section>

          {/* 02 — El problema real */}
          <section className="section-y w-full bg-mist">
            <Reveal className="mx-auto w-full max-w-[860px] px-[clamp(24px,5vw,64px)] text-center">
              <Eyebrow>{problemaReal.eyebrow}</Eyebrow>
              <h2 className="t-h2 mt-5 text-navy">{problemaReal.title}</h2>
              <p className="t-lead mt-6 text-slate">{problemaReal.body}</p>
              <p className="mt-8 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
                {problemaReal.punch}
              </p>
            </Reveal>
          </section>

          {/* 05 — Entregables / Resultado */}
          <section className="section-y w-full bg-background">
            <div className="container-site">
              <SectionHeader eyebrow={entregables.eyebrow} title={entregables.title} />
              <RuledBullets items={entregables.items} columns={2} className="mt-14" />
              {entregables.closingQuote && (
                <Reveal>
                  <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.4] text-navy">
                    {entregables.closingQuote}
                  </p>
                </Reveal>
              )}
              <Reveal delay={0.1} className="mt-12">
                <ContactCtaButton label={hero.ctaLabel} />
              </Reveal>
            </div>
          </section>

          {/* 06 — Otras soluciones que evaluamos */}
          <RelatedServices
            className="bg-mist"
            eyebrow={lang === "en" ? "Related solutions" : "Otras soluciones que evaluamos"}
            title={lang === "en" ? "We also help you select" : "También te ayudamos a seleccionar"}
            items={otherProducts.map((product) => ({
              href: `${softwarePath}/${product.slug}`,
              title: product.title,
              description: `${lang === "en" ? "See" : "Ver"} ${product.slug.toUpperCase()}`,
            }))}
          />

          <Testimonials className="bg-background" />
        </>
      }
    />
  );
}
