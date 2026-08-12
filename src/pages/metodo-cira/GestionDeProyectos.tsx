import {
  CheckCircle2,
  ClipboardCheck,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

const meta = routeMeta["/metodo-cira/gestion-de-proyectos"];

const differentiators = [
  {
    icon: Layers,
    title: "Integración completa de recursos",
    description:
      "Utilizamos nuestra experiencia comprobada para integrar todos los elementos críticos de sus proyectos, asegurando una ejecución fluida.",
  },
  {
    icon: ShieldCheck,
    title: "Aseguramiento de calidad",
    description:
      "Designamos un recurso de alto perfil en el comité ejecutivo para garantizar la calidad y una atención experta y rápida a cada solicitud.",
  },
  {
    icon: Users,
    title: "Change Management profesional",
    description:
      "Implementamos la gestión del cambio mediante un equipo de profesionales multidisciplinarios que aseguran transiciones exitosas.",
  },
  {
    icon: ClipboardCheck,
    title: "Expertos de negocio",
    description:
      "Dedicados a procesos de negocio e integración de aplicaciones, para minimizar riesgos en la alineación de metas.",
  },
];

const benefits = [
  {
    icon: Layers,
    title: "Integración completa de recursos",
    description:
      "Integramos de manera efectiva todos los elementos críticos de sus proyectos desde el inicio hasta la conclusión.",
  },
  {
    icon: ShieldCheck,
    title: "Aseguramiento de calidad integrado",
    description:
      "Incorporamos componentes de aseguramiento de calidad con supervisión estricta de perfiles de alto nivel para su comité ejecutivo.",
  },
  {
    icon: Users,
    title: "Change Management profesional",
    description:
      "Minimizamos resistencias y aseguramos la adopción efectiva del cambio en cada etapa, mediante profesionales calificados multidisciplinarios.",
  },
  {
    icon: ClipboardCheck,
    title: "Expertos en procesos de negocio",
    description:
      "Reducimos riesgos asociados a aspectos críticos y garantizamos una alineación perfecta con las mejores prácticas funcionales.",
  },
  {
    icon: Sparkles,
    title: "Resultados que transforman",
    description:
      "No nos limitamos a entregar proyectos: creamos éxitos empresariales, con un impacto positivo y duradero en la organización.",
  },
];

const servicios = [
  "Definición e identificación de proyectos",
  "Formulación y planeación de proyectos",
  "Implementación y ejecución de proyectos",
  "Evaluación y monitoreo de proyectos",
  "Cierre de proyectos",
  "Estructuración y creación de PMOs",
  "Plan de aseguramiento de calidad de proyectos",
  "Diagnóstico e intervención de proyectos en curso",
  "Gestión de cambio y gestión de riesgo",
];

const logros = [
  "Proyecto ejecutado de principio a fin bajo los lineamientos del PMBOK.",
  "Implementación con impacto positivo en la continuidad del negocio.",
  "Proyecto finalizado a tiempo, con una diferencia de solo 3% en los costos estimados.",
  "Cero desviaciones al alcance del proyecto.",
  "Ajustes operacionales con solo 2 customizaciones requeridas al código del ERP.",
  "Documentación y creación del modelo de implementación para futuros proyectos.",
];

export default function GestionDeProyectos() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Gerencia de proyectos e implementación",
        name: "Gerencia de Proyectos",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Método CIRA", item: "https://www.cyrruscs.com/metodo-cira" },
          { "@type": "ListItem", position: 3, name: "Gerencia de Proyectos", item: "https://www.cyrruscs.com/metodo-cira/gestion-de-proyectos" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Método CIRA — Realizar"
        title="Gerencia de proyectos e implementación"
        description="El proyecto se atrasa, se sale de presupuesto, nadie asume el riesgo. Nuestra gerencia de proyectos actúa como PMO externo, con responsabilidad real sobre el resultado — no solo reportes de estado."
      >
        <ContactCtaButton variant="light" label="Hablemos de sus proyectos" />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <img
              src="/assets/decoracion/IMG_20200313_092713184.jpg"
              alt="Consultor de Cyrrus presentando metodología de gerencia de proyectos"
              width={640}
              height={427}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-72"
            />
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-blue">
              Gobierno de proyecto
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Responsabilidad real sobre el resultado, no solo reportes de estado.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-gray">
              Gobierno de proyecto, aseguramiento de calidad y gestión de riesgo activa
              durante toda la ejecución, con agentes de IA que monitorean el riesgo del
              proyecto en tiempo real y anticipan desviaciones antes de que se conviertan en
              crisis.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Entrega en el tiempo y presupuesto acordado, con visibilidad total del avance en cada momento.",
                "Monitoreo continuo del riesgo, no solo un reporte de estado al final de cada fase.",
                "Base sobre la que construimos la gestión del cambio que sigue.",
              ].map((item) => (
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
              ¿Qué nos hace únicos?
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Una sola dinámica gerencial, sin fricciones entre equipos
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              Garantizamos el éxito de la transformación uniendo variables operacionales,
              pericia técnica y recursos humanos en una sola dinámica gerencial coherente.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{item.description}</p>
                </motion.div>
              );
            })}
            <motion.div variants={staggerItem} className="overflow-hidden rounded-2xl sm:col-span-2">
              <img
                src="/assets/decoracion/IMG_20230228_091017.jpg"
                alt="Presentación de gerencia de proyectos de Cyrrus"
                width={640}
                height={220}
                loading="lazy"
                className="h-full min-h-[180px] w-full object-cover"
              />
            </motion.div>
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label="Agendar diagnóstico ejecutivo" />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Nuestro reto
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Asegurar la correcta ejecución y cumplimiento de sus proyectos.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray">
              Apalancados en nuestra experiencia, tomamos en cuenta todas las variables de
              tiempo y recursos para determinar la viabilidad real y alcanzar el éxito — desde
              implementaciones complejas en tecnologías maduras y avanzadas. No solo lideramos
              la implementación de tecnologías empresariales (ERP, CRM, HCM), sino también
              proyectos de infraestructura de redes, migración a la nube y cualquier tipo de
              arquitectura tecnológica, incluida la inteligencia artificial.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue">
              Cómo lo resolvemos
            </h3>
            <ul className="mt-6 space-y-4">
              {[
                "Desarrollo integral de la planeación: definición de recursos, roles, tiempos, costos y alcance.",
                "Aprobación de comité de dirección, asegurando la alineación corporativa de presupuestos y compromiso humano.",
                "Participación de los actores directivos, operativos y técnicos para el seguimiento de la ejecución.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-base leading-relaxed text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <IncludedGrid
        eyebrow="Beneficios"
        title="Agilidad, transformación y eficiencia"
        items={benefits}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Alcance
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Servicios principales
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
            {servicios.map((service, index) => (
              <div key={service} className="flex items-center gap-6 py-5">
                <span className="text-sm font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-navy">{service}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Nuestros logros
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Resultados verificables, no promesas de venta
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {logros.map((logro) => (
              <motion.div
                key={logro}
                variants={staggerItem}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <span className="text-base leading-relaxed text-navy/80">{logro}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
