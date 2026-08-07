import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Workflow, Bot, Gauge } from "lucide-react";

const meta = routeMeta["/intelligence-lab/automatizaciones-desarrollo"];

const included = [
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Flujos completos de trabajo, no tareas sueltas — desde el disparador hasta el resultado que el negocio realmente necesita.",
  },
  {
    icon: Bot,
    title: "Agentes por fase de CIRA",
    description:
      "Agentes especializados en diagnóstico, evaluación de proveedores, monitoreo de riesgo y medición de adopción — cada uno con un dueño y un propósito claro.",
  },
  {
    icon: Gauge,
    title: "Medición de impacto",
    description:
      "Cada agente se mide contra el proceso real que reemplaza o acelera, no contra una demo — tiempo, error y adopción por el equipo.",
  },
];

const faqs = [
  {
    question: "¿Son una fábrica de desarrollo de software?",
    answer:
      "No. Somos consultores de transformación digital, no una casa de desarrollo. Primero evaluamos si la solución correcta ya existe en el mercado — como hacemos en la fase de Selección de Soluciones de CIRA. Solo construimos cuando esa opción genuinamente no existe.",
  },
  {
    question: "Ya probamos agentes de IA y no tocaron ningún proceso real",
    answer:
      "Diseñamos cada agente sobre un proceso específico del negocio, no como una capa genérica encima de todo lo demás.",
  },
  {
    question: "No sabemos qué automatizar primero",
    answer:
      "Priorizamos con el mismo diagnóstico que usamos en la fase Construir del método CIRA — impacto real, no la tarea más vistosa de automatizar.",
  },
  {
    question: "Tenemos desarrolladores internos, ¿para qué los necesitamos?",
    answer:
      "Trabajamos con su equipo técnico, no en su lugar. La automatización queda integrada a la arquitectura y al gobierno de IA que ya definimos, para que su equipo la pueda mantener.",
  },
  {
    question: "¿Cómo sabemos si el agente realmente funciona?",
    answer:
      "Cada automatización se mide contra el proceso que reemplaza: tiempo ahorrado, tasa de error y adopción real por el equipo, no la calidad de una demo.",
  },
];

export default function AutomatizacionesDesarrollo() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Automatización de procesos con inteligencia artificial",
        name: "Automatización y Agentes IA",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.cyrruscs.com/intelligence-lab/automatizaciones-desarrollo#faq",
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
          { "@type": "ListItem", position: 2, name: "Cyrrus Intelligence Lab", item: "https://www.cyrruscs.com/intelligence-lab" },
          { "@type": "ListItem", position: 3, name: "Automatización y Agentes IA", item: "https://www.cyrruscs.com/intelligence-lab/automatizaciones-desarrollo" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Cyrrus Intelligence Lab"
        title="Automatización y Agentes IA"
        description="Agentes que hacen una demo impecable y no tocan un proceso real del negocio. No partimos de construir software: partimos del mismo diagnóstico y arquitectura que gobernamos en Intelligence Lab, y solo cuando la solución correcta no existe en el mercado, la desarrollamos a la medida — integrada a esa misma arquitectura, no como un desarrollo suelto."
        image={{
          src: "/assets/decoracion/1785866224326.jpg",
          alt: "Escritorio de trabajo con monitores y branding de Cyrrus",
        }}
      />

      <IncludedGrid
        eyebrow="Qué incluye"
        title="Automatización que se mide contra el proceso real, no contra la demo."
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal delay={0.1} className="order-2 space-y-6 text-lg leading-relaxed text-gray md:order-1 md:col-span-7">
            <p>
              No somos una fábrica de software ni le vamos a proponer construir algo que ya existe en el mercado.
              El mismo diagnóstico agnóstico que usamos para seleccionar un ERP o un CRM es el que aplicamos aquí:
              primero evaluamos si la solución correcta ya existe.
            </p>
            <p>
              Cuando genuinamente no existe, sí sabemos construirla: automatizaciones de procesos y agentes de IA
              especializados para tareas dentro de cada fase del método CIRA — diagnóstico, evaluación de
              proveedores, monitoreo de riesgo, medición de adopción — integrados a la arquitectura de IA
              empresarial que ya gobernamos, para que no se convierta en una herramienta más sin dueño.
            </p>
          </Reveal>
          <Reveal className="order-1 md:order-2 md:col-span-5">
            <img
              src="/assets/decoracion/1785866223667.jpg"
              alt="Escritorio con monitores mostrando la plataforma de Cyrrus"
              width={480}
              height={560}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover md:h-full"
            />
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow="Automatización y Agentes IA" faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
