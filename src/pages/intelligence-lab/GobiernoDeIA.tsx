import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { IncludedGrid } from "@/components/sections/included-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FileCheck, Users, Lock } from "lucide-react";

const meta = routeMeta["/intelligence-lab/gobierno-de-ia"];

const included = [
  {
    icon: FileCheck,
    title: "Políticas de uso de IA",
    description:
      "Quién puede usar qué modelo, para qué caso de negocio y con qué datos — por escrito, no por acuerdo tácito entre áreas.",
  },
  {
    icon: Users,
    title: "Roles y responsables",
    description:
      "Quién aprueba una iniciativa de IA antes de que arranque, y quién audita el resultado una vez que está en producción.",
  },
  {
    icon: Lock,
    title: "Controles de datos",
    description:
      "Qué información puede tocar un modelo y cuál queda fuera de alcance, con trazabilidad de cada decisión automatizada.",
  },
];

const faqs = [
  {
    question: "No tenemos ningún marco de IA hoy",
    answer:
      "Partimos de cero: definimos políticas, roles y controles desde la primera semana, sin frenar las iniciativas que ya están en marcha.",
  },
  {
    question: "Ya usamos IA en varias áreas, sin coordinación",
    answer:
      "Auditamos lo que ya existe y lo integramos al mismo marco de gobierno, en vez de pedirle a cada área que empiece de cero.",
  },
  {
    question: "Un cliente o regulador nos pide evidencia de gobierno de IA",
    answer:
      "Documentamos el marco de forma que resista una auditoría externa — roles, políticas y registros de decisión, no solo una presentación interna.",
  },
  {
    question: "Nos preocupa que el gobierno frene la innovación",
    answer:
      "El objetivo no es aprobar más lento, es aprobar con criterio. La mayoría de las iniciativas se mueven más rápido una vez que hay reglas claras de qué sí y qué no.",
  },
];

export default function GobiernoDeIA() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Gobierno de inteligencia artificial corporativo",
        name: "Gobierno de IA",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.cyrruscs.com/intelligence-lab/gobierno-de-ia#faq",
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
          { "@type": "ListItem", position: 3, name: "Gobierno de IA", item: "https://www.cyrruscs.com/intelligence-lab/gobierno-de-ia" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Cyrrus Intelligence Lab"
        title="Gobierno de IA"
        description="Nadie en la organización puede explicar qué modelo tomó qué decisión, ni con qué datos. Definimos las políticas, roles y controles claros sobre cómo se usa la inteligencia artificial dentro de su empresa — quién decide, quién audita, qué datos pueden tocarse y cuáles no."
      />

      <IncludedGrid
        eyebrow="Qué incluye"
        title="Gobierno que se puede auditar, no solo declarar."
        items={included}
      />

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-12 space-y-6 text-lg leading-relaxed text-gray">
          <p>
            Sin un marco de gobierno, cada iniciativa de IA queda a criterio de quien la implementó. Cuando algo
            sale mal — un dato sensible expuesto, una decisión automatizada sin trazabilidad — no hay a quién
            recurrir ni cómo auditar lo que pasó.
          </p>
          <p>
            Este marco corre de forma transversal por debajo de las cuatro fases del método CIRA, para que cada
            decisión de IA — desde el diagnóstico hasta la adopción — quede documentada y sea auditable.
          </p>
        </div>
      </section>

      <FaqSection eyebrow="Gobierno de IA" faqs={faqs} />

      <FinalCta />
      <Footer />
    </>
  );
}
