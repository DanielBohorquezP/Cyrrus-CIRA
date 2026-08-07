import { usePageMeta } from "@/lib/use-page-meta";
import { clientLogoNames } from "@/lib/client-logos";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import {
  User,
  Globe2,
  Layers,
  Sparkles,
  Factory,
  Landmark,
  Zap,
  Fuel,
  ShoppingBag,
  HeartPulse,
} from "lucide-react";

const stats = [
  {
    value: "+17",
    label: "países con presencia",
    icon: Globe2,
    bg: "bg-navy",
  },
  {
    value: "4",
    label: "fases, un solo método",
    icon: Layers,
    bg: "bg-blue",
  },
  {
    value: "60%",
    label: "diagnóstico más rápido con IA",
    icon: Sparkles,
    bg: "bg-cyan",
  },
];

const industries = [
  { name: "Manufactura", icon: Factory, bg: "bg-navy" },
  { name: "Servicios financieros", icon: Landmark, bg: "bg-blue" },
  { name: "Energía", icon: Zap, bg: "bg-cyan" },
  { name: "Oil & Gas", icon: Fuel, bg: "bg-navy" },
  { name: "Retail", icon: ShoppingBag, bg: "bg-blue" },
  { name: "Salud", icon: HeartPulse, bg: "bg-cyan" },
];

const gallery = [
  {
    src: "/assets/decoracion/Cesar.jpg",
    alt: "Consultores de Cyrrus trabajando en un diagnóstico de procesos",
    caption: "Diagnóstico de procesos en sitio con el equipo consultor.",
  },
  {
    src: "/assets/decoracion/IMG_20230302_112825.jpg",
    alt: "Equipo de Cyrrus Consulting Services",
    caption: "El equipo de Cyrrus en Barranquilla.",
  },
  {
    src: "/assets/decoracion/Evento%20mesas.jpg",
    alt: "Cyrrus en un evento corporativo",
    caption: "Cyrrus presente en foros y eventos del sector en toda LATAM.",
  },
];

const team = [
  { role: "CEO & Fundador", name: "Jackson Bohorquez", photo: "/assets/decoracion/JacksonCEO1.jpeg" },
  { role: "Director de Cyrrus Intelligence Lab", name: "Daniel Bohorquez" },
  { role: "Director de Leadership Academy" },
  { role: "Directora de Operaciones" },
];


export default function Experiencia() {
  usePageMeta({
    title: "Experiencia | Consultoría multinacional LATAM | Cyrrus",
    description:
      "Cyrrus: consultoría multinacional con presencia en +17 países. Casos de éxito en transformación digital para manufactura, servicios financieros, energía y oil & gas. Conozca al equipo detrás del método CIRA.",
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Experiencia"
        title="Consultoría multinacional en LATAM, con presencia en +17 países"
        description="Casos de éxito en transformación digital a través de industrias, un equipo de liderazgo con trayectoria real ejecutando el método CIRA, y las empresas que ya confiaron en nosotros."
        showVisual={false}
        visual={<InteractiveGlobe className="mx-auto" />}
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl ${stat.bg} p-8 text-center shadow-sm transition-shadow duration-150 hover:shadow-xl`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                <stat.icon
                  className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-white/10"
                  strokeWidth={1.5}
                />
                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <stat.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div className="relative mt-4 text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="relative mt-2 text-sm text-white/75">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-16">
            <div className="text-sm font-semibold uppercase tracking-wider text-gray">
              Industrias donde operamos
            </div>
            <RevealGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <motion.div
                  key={industry.name}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-shadow duration-150 hover:shadow-md hover:border-blue/40"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${industry.bg} text-white`}
                  >
                    <industry.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-medium text-navy">
                    Consultoría para {industry.name.toLowerCase()}
                  </span>
                </motion.div>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              En acción
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Cyrrus en el terreno
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {gallery.map((item) => (
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

      <section className="w-full bg-light-blue/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Liderazgo
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              El equipo detrás del método.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.role}
                variants={staggerItem}
                className={`flex flex-col items-center rounded-2xl border p-6 text-center ${
                  member.name ? "border-border bg-card" : "border-dashed border-border bg-card"
                }`}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-light-blue">
                    <User className="h-7 w-7 text-blue" />
                  </div>
                )}
                {member.name && (
                  <div className="mt-4 text-sm font-semibold text-navy">
                    {member.name}
                  </div>
                )}
                <div className={member.name ? "mt-1 text-xs text-muted-foreground" : "mt-4 text-sm font-semibold text-navy"}>
                  {member.role}
                </div>
                {!member.name && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Foto y nombre pendientes
                  </div>
                )}
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Confianza
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Empresas que han confiado en Cyrrus.
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {clientLogoNames.map((name) => (
              <motion.div
                key={name}
                variants={staggerItem}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex h-20 items-center justify-center rounded-xl bg-navy p-3 shadow-sm"
              >
                <img
                  src={`/assets/logos-clientes/${encodeURIComponent(name)}.png`}
                  alt={name}
                  width={160}
                  height={80}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
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
