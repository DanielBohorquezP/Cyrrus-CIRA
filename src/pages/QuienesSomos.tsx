import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { LinkedInIcon } from "@/components/ui/social-media";

const milestones = [
  {
    src: "/assets/decoracion/Pa%20y%20yo.jpg",
    alt: "Constitución de Cyrrus Consulting Services S.A.S.",
    caption: "El día de la constitución legal de Cyrrus Consulting Services.",
  },
  {
    src: "/assets/decoracion/Equipo%20experienica.jpg",
    alt: "Equipo de Cyrrus Consulting Services",
    caption: "El equipo que ejecuta el método CIRA todos los días.",
  },
  {
    src: "/assets/decoracion/evento-foro-caribe-2030.jpeg",
    alt: "Jackson Bohorquez en el Foro Caribe 2030",
    caption: "Compartiendo la visión de Cyrrus en foros regionales.",
  },
];

const credentials = [
  "Fundador y CEO de Cyrrus Consulting Services",
  "Creador del método CIRA: Construir, Identificar, Realizar, Adoptar",
  "Consultor en transformación digital y gobierno de IA corporativo para empresas en LATAM",
  "Conferencista y moderador en foros universitarios y empresariales sobre estrategia, tecnología e IA",
];

export default function QuienesSomos() {
  usePageMeta({
    title: "Quiénes Somos | Jackson Bohorquez, CEO | Cyrrus",
    description:
      "Conozca a Jackson Bohorquez, CEO y fundador de Cyrrus Consulting Services, creador del método CIRA para la transformación digital de empresas en LATAM.",
    image: "https://www.cyrruscs.com/assets/decoracion/JacksonCEO1.jpeg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://www.cyrruscs.com/quienes-somos#jackson-bohorquez",
        name: "Jackson Bohorquez",
        jobTitle: "CEO & Fundador",
        worksFor: {
          "@id": "https://www.cyrruscs.com/#organization",
        },
        url: "https://www.cyrruscs.com/quienes-somos",
        image: "https://www.cyrruscs.com/assets/decoracion/JacksonCEO1.jpeg",
        sameAs: ["https://www.linkedin.com/in/jacksonbohorquez"],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Quiénes Somos", item: "https://www.cyrruscs.com/quienes-somos" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Quiénes somos"
        title="Jackson Bohorquez, CEO y fundador de Cyrrus"
        description="La persona detrás del método CIRA: dos décadas conectando estrategia, tecnología y ejecución para empresas en toda LATAM."
        showVisual={false}
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-[220px_1fr] md:px-12">
          <Reveal>
            <img
              src="/assets/decoracion/JacksonCEO1.jpeg"
              alt="Jackson Bohorquez, CEO de Cyrrus Consulting Services"
              width={160}
              height={160}
              loading="eager"
              className="mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-light-blue md:mx-0"
            />
            <a
              href="https://www.linkedin.com/in/jacksonbohorquez"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-blue transition-colors duration-150 hover:text-navy md:justify-start"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                CEO &amp; Fundador, Cyrrus Consulting Services
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Jackson Bohorquez fundó Cyrrus Consulting Services para cerrar la
                brecha que ve fallar a la mayoría de las organizaciones: no por
                falta de estrategia ni de tecnología, sino porque nadie conecta la
                decisión con la ejecución. De ahí nace el método CIRA — Construir,
                Identificar, Realizar, Adoptar — el marco que hoy guía los
                proyectos de transformación digital de Cyrrus en más de 17 países.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-6 border-l-2 border-blue pl-5 text-lg font-medium leading-snug text-navy">
                "Las organizaciones no fallan por falta de estrategia ni de
                tecnología. Fallan cuando nadie conecta la decisión con la
                ejecución. CIRA existe para cerrar exactamente esa brecha."
              </blockquote>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="text-sm font-semibold uppercase tracking-wider text-gray">
                Trayectoria
              </div>
              <RevealGroup className="mt-4 flex flex-col gap-3">
                {credentials.map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerItem}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-navy shadow-sm"
                  >
                    {item}
                  </motion.div>
                ))}
              </RevealGroup>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Momentos clave
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              La historia detrás de Cyrrus
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {milestones.map((item) => (
              <motion.figure key={item.src} variants={staggerItem}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={480}
                  height={320}
                  loading="lazy"
                  className="h-56 w-full rounded-2xl object-cover object-top"
                />
                <figcaption className="mt-3 text-sm text-gray">
                  {item.caption}
                </figcaption>
              </motion.figure>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
