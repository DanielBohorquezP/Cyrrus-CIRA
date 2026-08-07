import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Database, Link2, TrendingUp } from "lucide-react";

const meta = routeMeta["/intelligence-lab/arquitectura-de-ia"];

const included = [
  {
    icon: Database,
    title: "Mapa de sistemas y modelos",
    description:
      "Qué herramientas de IA existen hoy en la organización, quién las compró y con qué datos y sistemas se conectan — antes de sumar una más.",
  },
  {
    icon: Link2,
    title: "Integración segura",
    description:
      "Conectamos modelos, datos y sistemas existentes sin duplicar información ni abrir brechas de seguridad nuevas.",
  },
  {
    icon: TrendingUp,
    title: "Diseño para escalar",
    description:
      "Una arquitectura pensada para crecer, para que no haya que rehacerla cada vez que se suma un caso de uso nuevo.",
  },
];

const faqs = [
  {
    question: "Cada área ya compró su propia herramienta de IA",
    answer:
      "Empezamos con un inventario real de lo que existe hoy, antes de diseñar cómo debería conectarse todo.",
  },
  {
    question: "Tenemos datos en sistemas que no se hablan entre sí",
    answer:
      "La arquitectura resuelve exactamente eso: un modelo común de datos que los sistemas existentes puedan alimentar, sin migrarlo todo de golpe.",
  },
  {
    question: "No sabemos si nuestra infraestructura actual soporta más IA",
    answer:
      "Evaluamos la capacidad real de su infraestructura antes de recomendar cualquier cambio o inversión adicional.",
  },
  {
    question: "Nos preocupa la seguridad de conectar todo esto",
    answer:
      "La arquitectura se diseña junto con el marco de gobierno de IA, no después — seguridad y conectividad se definen a la vez.",
  },
];

export default function ArquitecturaDeIA() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Arquitectura de inteligencia artificial empresarial",
        name: "Arquitectura de IA",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.cyrruscs.com/intelligence-lab/arquitectura-de-ia#faq",
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
          { "@type": "ListItem", position: 3, name: "Arquitectura de IA", item: "https://www.cyrruscs.com/intelligence-lab/arquitectura-de-ia" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Cyrrus Intelligence Lab"
        title="Arquitectura de IA"
        description="Cinco herramientas de IA, compradas por cinco áreas distintas, que no se hablan entre sí. Diseñamos la arquitectura técnica que conecta modelos, datos y sistemas existentes de forma segura y escalable, antes de que la proliferación de herramientas sueltas se vuelva imposible de deshacer."
        image={{
          src: "/assets/decoracion/1785866224006.jpg",
          alt: "Pantalla de trabajo con modelos de IA y datos conectados en Cyrrus",
        }}
      />

      <IncludedGrid
        eyebrow="Qué incluye"
        title="Una arquitectura, no una colección de herramientas sueltas."
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <img
              src="/assets/decoracion/1785866223775.jpg"
              alt="Escritorio con monitores mostrando la plataforma de Cyrrus"
              width={480}
              height={560}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover md:h-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-gray md:col-span-7">
            <p>
              Cada área compra su propia herramienta de IA sin visibilidad de lo que ya existe en el resto de la
              organización. El resultado no es innovación: es una colección de sistemas aislados, sin gobierno de
              datos común y con riesgo real de seguridad.
            </p>
            <p>
              Diseñamos la capa de arquitectura que conecta esos modelos, datos y sistemas de forma segura y
              escalable — la misma que sostiene, por debajo, la automatización de procesos y el gobierno de IA
              que trabajamos en Cyrrus Intelligence Lab.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection eyebrow="Arquitectura de IA" faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
