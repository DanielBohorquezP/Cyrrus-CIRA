import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { CyrrusGlobe } from "@/components/sections/cyrrus-globe";
import { Reveal } from "@/components/ui/reveal";

const countries = [
  "México",
  "Centroamérica",
  "Panamá",
  "Colombia",
  "Ecuador",
  "Perú",
  "Brasil",
  "Chile",
  "Argentina",
  "Estados Unidos",
];

const industries = [
  "Educación",
  "Finanzas & Seguros",
  "Servicios Públicos",
  "Alimentos & Bebidas",
  "Consumo Masivo",
  "Oil & Gas",
  "Manufactura",
  "Logística",
  "Distribución",
];

export function Experience() {
  return (
    <section id="experiencia" className="w-full">
      <AnimatedNavyBackground className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan">
              Presencia multinacional
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Consultoría multinacional en LATAM, por industria
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Presencia multinacional, criterio local.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-6 w-full max-w-xl">
            <CyrrusGlobe />
          </Reveal>

          <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold tracking-tight text-white">
                  +17
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  Países de alcance
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {countries.map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {industries.length}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  Sectores atendidos
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <p className="mt-10 text-center text-sm text-white/50">
            Ver el equipo completo, industrias y clientes en la página de Experiencia.
          </p>
        </div>
      </AnimatedNavyBackground>
    </section>
  );
}
