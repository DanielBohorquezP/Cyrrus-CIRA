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
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

const meta = routeMeta["/metodo-cira/planeacion-estrategica"];

const problems = [
  {
    icon: Network,
    title: "Falta de alineación",
    description:
      "Tiene un plan estratégico bien armado. El problema es que 90 días después, cada gerente lo interpreta distinto y nadie rinde cuentas por los resultados.",
  },
  {
    icon: Eye,
    title: "Ceguera de datos",
    description:
      "Necesita 2 semanas para saber cómo cerró el mes. Para cuando tiene los números, la oportunidad ya pasó.",
  },
  {
    icon: TrendingDown,
    title: "Inversiones sin retorno",
    description:
      "Invirtió en consultoría, en capacitaciones, en nuevos procesos — pero no puede demostrarle a su junta directiva cuánto mejor está el negocio.",
  },
  {
    icon: UserX,
    title: "Dependencia del fundador",
    description:
      "La operación funciona porque usted está presente. Cuando se ausenta una semana, todo se desacomoda. Eso no es escalar — es depender.",
  },
  {
    icon: Cpu,
    title: "Tecnología subejercida",
    description:
      "Herramientas costosas que el equipo no adopta ni aprovecha. Invierte en tecnología y no ve el retorno de esa inversión.",
  },
];

const benefits = [
  {
    icon: Gauge,
    title: "Decide hoy, no en 3 meses",
    description:
      "Eliminamos la intuición directiva. Consolidamos la operación en tableros de control con KPIs ágiles, revelando las verdaderas fugas de capital y áreas de rentabilidad.",
  },
  {
    icon: Zap,
    title: "Diagnósticos que sí se implementan",
    description:
      "Condensamos meses de diagnóstico inoperante enfocado netamente a la implementación temprana, ejecutando mejoras tangibles con semanas de anticipación corporativa.",
  },
  {
    icon: TrendingDown,
    title: "Más utilidad, mismos recursos",
    description:
      "Reorganizamos su flujo corporativo. Eliminamos dependencias, silos departamentales y gastos superpuestos para potenciar márgenes de ganancia con los mismos recursos.",
  },
  {
    icon: UserX,
    title: "La empresa funciona sin usted encima",
    description:
      "Preparamos a las compañías para adaptarse a los cambios del entorno. Diseñamos planes operativos que ayudan a sostener la rentabilidad y estabilidad del negocio.",
  },
  {
    icon: Flame,
    title: "Menos apaga-incendios",
    description:
      "Estandarizamos procesos para que el día a día fluya de forma autónoma. Entregamos mayor control operacional para desatascar las tareas tácticas de la gerencia.",
  },
  {
    icon: BarChart3,
    title: "Reportes listos para junta directiva",
    description:
      "Consolidamos KPIs financieros y operativos en un solo tablero de gobierno corporativo, para que cada sesión de junta directiva cuente con información confiable y accionable.",
  },
];

const cxaas = [
  {
    letter: "CIO",
    title: "CIOaaS",
    description:
      "Dirección tecnológica ejecutiva: gobierno de TI, arquitectura empresarial y alineación de la tecnología con la estrategia de negocio.",
  },
  {
    letter: "CTO",
    title: "CTOaaS",
    description:
      "Liderazgo técnico senior para definir la hoja de ruta tecnológica, evaluar proveedores y asegurar la ejecución de proyectos críticos.",
  },
  {
    letter: "CCSO",
    title: "CCSOaaS",
    description:
      "Dirección de ciberseguridad ejecutiva: gestión de riesgo, cumplimiento normativo y respuesta ante incidentes al más alto nivel.",
  },
];

const services = [
  "Planeación Estratégica Corporativa",
  "Centros de Servicios Compartidos",
  "Planeación Estratégica de Negocio",
  "Plan de Continuidad de Negocio",
  "IT Strategy & Transformación",
];

const faqs = [
  {
    question: "¿Qué es la Planeación Estratégica?",
    answer:
      "La Planeación Estratégica es el proceso mediante el cual una empresa define su rumbo a mediano y largo plazo, traduce ese rumbo en objetivos medibles (KPIs) y alinea a cada área de la organización — desde la Alta Dirección hasta la operación diaria — para ejecutarlo de forma consistente. No es un documento que se archiva: es un sistema de decisiones y prioridades que se revisa y ajusta con datos reales de la operación. Para un CEO o CIO, el valor está en que la estrategia deje de vivir en una presentación y empiece a reflejarse en el flujo de caja, la rentabilidad y el gobierno corporativo del negocio.",
  },
  {
    question: "¿Cuándo necesita una empresa consultoría estratégica?",
    answer:
      "Una empresa necesita consultoría estratégica cuando los planes existen pero no se ejecutan de forma consistente entre áreas, cuando los indicadores financieros tardan semanas en estar disponibles para la toma de decisiones, o cuando el crecimiento del negocio depende demasiado de la presencia constante del fundador o del equipo directivo. También es el momento indicado cuando una compañía mediana o gran corporación necesita transformación empresarial, IT Strategy o continuidad del negocio ante un cambio de mercado, tecnología o estructura organizacional, y requiere un socio externo que ayude a ejecutar — no solo a diagnosticar.",
  },
];

export default function PlaneacionEstrategica() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Consultoría de planeación estratégica",
        name: "Planeación Estratégica",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.cyrruscs.com/metodo-cira/planeacion-estrategica#faq",
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
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Método CIRA", item: "https://www.cyrruscs.com/metodo-cira" },
          { "@type": "ListItem", position: 3, name: "Planeación Estratégica", item: "https://www.cyrruscs.com/metodo-cira/planeacion-estrategica" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Método CIRA — Construir"
        title="Consultoría de planeación estratégica"
        description="Se define una estrategia... pero nadie sabe cómo bajarla a la operación. Nuestra consultoría de planeación estratégica conecta la visión del negocio con un plan ejecutable, no con un documento que queda en un cajón."
      >
        <ContactCtaButton variant="light" label="Agendar diagnóstico ejecutivo" />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Consultoría Estratégica para CEOs
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Ejecución directa y rentabilidad medible — no un documento que queda en un cajón.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-gray">
              Diagnosticamos su negocio a fondo, definimos prioridades junto a su equipo
              directivo y trazamos una hoja de ruta accionable, con inteligencia artificial
              aplicada al análisis de datos para decisiones más rápidas y mejor
              fundamentadas.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Diagnóstico profundo del negocio, no una encuesta de clima organizacional.",
                "Prioridades y métricas de éxito definidas desde el día uno.",
                "Implementación acompañada — el mismo equipo ejecuta lo que diagnostica.",
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
              Diagnóstico
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Los problemas que tienen en común los CEOs que nos llaman
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              Lleva meses con los mismos problemas: reuniones que no producen decisiones,
              gerentes que no rinden cuentas, y un flujo de caja que no refleja cuánto
              trabaja. Eso no es mala suerte — es un problema de ejecución estratégica que
              tiene solución.
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
            <ContactCtaButton label="Agendar diagnóstico ejecutivo" />
          </Reveal>
        </div>
      </section>

      <AnimatedNavyBackground className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
              Por qué los CEOs nos eligen
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Ejecución directa, no reportes de 200 páginas
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              La mayoría de consultoras le entregan un reporte de 200 páginas y desaparecen.
              Nosotros nos quedamos hasta que los cambios estén funcionando en la operación
              real — no en las diapositivas.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { value: "60%", label: "Reducción en tiempo de diagnóstico frente a consultoras tradicionales." },
              { value: "S1", label: "Comenzamos a ejecutar desde la semana 1, no al cierre del diagnóstico." },
            ].map((stat) => (
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
        eyebrow="Beneficios"
        title="Agilidad, transformación y eficiencia"
        items={benefits}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              CXaaS
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Dirección ejecutiva as a Service
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              ¿Su organización necesita liderazgo ejecutivo de alto nivel, pero no está lista
              para una contratación de tiempo completo? Ponemos a su disposición ejecutivos
              senior — bajo modelo "as a Service" — para cubrir roles críticos de tecnología,
              ciberseguridad y experiencia del cliente con la misma exigencia de un C-Level
              interno.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
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
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label="Agendar diagnóstico ejecutivo" />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Alcance
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Servicios principales de Strategy
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

      <FaqSection eyebrow="Preguntas frecuentes" title="Sobre planeación estratégica" faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
