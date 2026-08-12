import {
  BarChart3,
  CheckCircle2,
  Cpu,
  Gauge,
  Leaf,
  ListChecks,
  Scale,
  Settings2,
  Target,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

const meta = routeMeta["/metodo-cira/seleccion-de-soluciones"];

const solutions = [
  {
    label: "Tecnologías Maduras",
    href: "/metodo-cira/seleccion-de-soluciones/tecnologias-maduras",
    note: "(ERP, CRM, HCM, aplicaciones de negocio, BI)",
    image: "/assets/decoracion/1785866224286.jpg",
  },
  {
    label: "Tecnologías Avanzadas",
    href: "/metodo-cira/seleccion-de-soluciones/tecnologias-avanzadas",
    note: "(Automatizaciones, Inteligencia Artificial, RPA, Analítica Avanzada)",
    image: "/assets/decoracion/1785872413278.jpg",
  },
  {
    label: "Infraestructura Tecnológica",
    href: "/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica",
    note: "(Ciberseguridad, Redes, Nube, Continuidad y Respaldo)",
    image: "/assets/decoracion/IMG_20230705_122802.jpg",
  },
];

const criteria = [
  {
    icon: Target,
    title: "Funcional",
    description:
      "Garantizamos la idoneidad a corto plazo resolviendo las necesidades clave operativas de su compañía.",
  },
  {
    icon: Cpu,
    title: "Técnica",
    description:
      "Aseguramos la madurez tecnológica, evaluando compatibilidades para reducir costos ocultos de integración.",
  },
  {
    icon: Scale,
    title: "Económica",
    description:
      "Mediciones precisas de viabilidad de presupuesto, asegurando sostenibilidad en inversiones y gasto operativo.",
  },
  {
    icon: Leaf,
    title: "Sostenible",
    description:
      "Compromiso con la sostenibilidad empresarial: garantizamos el crecimiento sostenido de su empresa en el tiempo.",
  },
];

const benefits = [
  {
    icon: Gauge,
    title: "Visión 360° para decisiones transformadoras",
    description:
      "Ofrecemos una visión integral que aborda todos los detalles cruciales para decisiones que transforman su negocio, con un análisis rápido y completo.",
  },
  {
    icon: ListChecks,
    title: "Selección multidimensional",
    description:
      "Nuestro servicio va más allá de la búsqueda convencional: calificamos soluciones desde una perspectiva funcional, técnica y económica.",
  },
  {
    icon: Settings2,
    title: "Enfoque integral personalizado",
    description:
      "Adaptamos el análisis según el sector económico, la madurez tecnológica y los procesos empresariales, para una solución única.",
  },
  {
    icon: BarChart3,
    title: "Medición rigurosa de propuestas",
    description:
      "Aseguramos no solo la idoneidad a corto plazo, sino también la sostenibilidad operativa, evaluando a fondo cada proponente.",
  },
  {
    icon: Wrench,
    title: "Eficiencia en la toma de decisiones",
    description:
      "Garantizamos un análisis rápido, permitiéndole tomar decisiones informadas de manera ágil y eficiente, sin perder detalle.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad empresarial",
    description:
      "Más que encontrar una solución, nos enfocamos en encontrar una herramienta que contribuya al crecimiento continuo de su organización.",
  },
];

const servicios = [
  "Creación del documento de Solicitud de Propuestas (RFP)",
  "Metodología de preselección de proponentes",
  "Recepción y evaluación de propuestas",
  "Apoyo en selección y contratación de proveedores",
];

const proceso = [
  { title: "Kickoff Estratégico", description: "Definir alcance y objetivos" },
  { title: "Descubrimiento del Negocio", description: "Comprender la estrategia y necesidades" },
  { title: "Preparación del RFP", description: "Crear un RFP estructurado" },
  { title: "Selección de Participantes", description: "Identificar proveedores calificados" },
  { title: "Invitación y Kickoff con Proveedores", description: "Presentar el proyecto a los proveedores" },
  { title: "Entendimiento del Negocio", description: "Asegurar que las propuestas respondan a las necesidades" },
  { title: "Recepción y Evaluación de Propuestas", description: "Analizar propuestas desde múltiples perspectivas" },
  { title: "Presentaciones Ejecutivas y Demostraciones", description: "Evaluar propuestas a través de presentaciones" },
  { title: "Referenciación y Validación", description: "Validar la experiencia del proveedor" },
  { title: "Evaluación Integral", description: "Consolidar evaluaciones en una matriz" },
  { title: "Informe Ejecutivo", description: "Presentar hallazgos y recomendaciones" },
  { title: "Acompañamiento a la Contratación", description: "Apoyar la negociación y contratación" },
];

export default function SeleccionDeSoluciones() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Selección de soluciones empresariales",
        name: "Selección de Soluciones",
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
          { "@type": "ListItem", position: 3, name: "Selección de Soluciones", item: "https://www.cyrruscs.com/metodo-cira/seleccion-de-soluciones" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Método CIRA — Identificar"
        title="Selección de soluciones empresariales"
        description="Se compra tecnología por moda, no por ajuste real al negocio. Nuestra consultoría de selección de software parte siempre de los requerimientos del negocio, no del catálogo del proveedor — evaluación 100% agnóstica, con criterios objetivos y comparables."
      >
        <ContactCtaButton variant="light" label="Hablemos de su solución" />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <img
              src="/assets/decoracion/Presentacion%20BEC.jpg"
              alt="Equipo de Cyrrus evaluando propuestas de proveedores tecnológicos"
              width={640}
              height={427}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-72"
            />
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-blue">
              ¿Cómo lo hacemos?
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Una solución a la medida de su contexto empresarial, no del catálogo del proveedor.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-gray">
              Incorporamos un enfoque integral que abarca factores clave como el sector
              económico, el tamaño de la empresa, su grado de madurez tecnológica y sus
              procesos de negocio. Nuestro objetivo es ofrecerle una solución a medida que se
              ajuste perfectamente a sus necesidades y contexto empresarial.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Evaluación 360º del sector, tamaño y madurez técnica de su negocio.",
                "Comparación 100% agnóstica, sin sesgo comercial hacia ninguna marca.",
                "Criterios objetivos y comparables, definidos antes de mirar proveedores.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-base leading-relaxed text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ContactCtaButton label="Agendar diagnóstico ejecutivo" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Criterios de evaluación
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Cuatro dimensiones, un solo veredicto
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map((item, index) => {
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
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Nuestro reto
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Seleccionar soluciones ajustadas a la medida de su organización.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray">
              El desafío de las corporaciones no es buscar proveedores, es asegurarse de que
              el proveedor cumple lo que promete y encaja en la operación sin fricciones.
              Analizamos cada variable en tiempo récord.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue">
              Cómo lo resolvemos
            </h3>
            <ul className="mt-6 space-y-4">
              {[
                "Reestructuramos las variables a considerar y las ligamos a las necesidades reales de la empresa.",
                "Elaboración del RFP clasificado por atributos técnicos y funcionales.",
                "Acompañamiento en negociación y cierre de contrato, buscando siempre generar valor agregado para su organización.",
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
              Categorías
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Soluciones que evaluamos y seleccionamos con usted
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <motion.div key={s.href} variants={staggerItem}>
                <Link
                  to={s.href}
                  className="block h-full overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,background-color] duration-150 ease-out hover:border-navy hover:bg-white"
                >
                  <img
                    src={s.image}
                    alt=""
                    width={400}
                    height={160}
                    loading="lazy"
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-navy">{s.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{s.note}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
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

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Proceso
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Las 12 etapas de una selección de soluciones sin fricciones
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proceso.map((step, index) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-cyan">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray">{step.description}</p>
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
