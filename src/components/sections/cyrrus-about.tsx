import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Cpu, GraduationCap } from "lucide-react";
import { About3 } from "@/components/ui/about-3";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { RevealGroup, staggerItem } from "@/components/ui/reveal";
import { clientLogoNames } from "@/lib/client-logos";

interface Level {
  level: string;
  title: string;
  description: string;
  href: string;
}

interface CiraPhase {
  letter: string;
  title: string;
}

const icons = [Compass, Cpu, GraduationCap];

/**
 * The three levels are a stack, not three parallel services — level 1 is what
 * the business gets, level 2 is how it's built, level 3 is who sustains it.
 * Level 1 gets the solid-cyan treatment (foundation), while 2 and 3 stay
 * outlined, so the hierarchy reads at a glance without a connecting line.
 */
function LevelsStack() {
  const { t } = useTranslation("home");
  const { t: tCira } = useTranslation("metodo-cira");
  const levels = t("about.levels", { returnObjects: true }) as Level[];
  // Reuse the canonical CIRA phases rather than restating them, so the chips
  // can never drift from the Método CIRA page.
  const phases = tCira("phases", { returnObjects: true }) as CiraPhase[];

  return (
    <RevealGroup>
      <ol className="mx-auto flex max-w-2xl flex-col gap-4">
        {levels.map((item, index) => {
          const Icon = icons[index];
          const isFoundation = index === 0;

          return (
            <motion.li
              key={item.title}
              variants={staggerItem}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                to={item.href}
                className={
                  isFoundation
                    ? "group flex gap-5 rounded-2xl border border-cyan/50 bg-cyan/10 p-5 transition-[background-color,border-color] duration-200 ease-out hover:border-cyan hover:bg-cyan/15 md:gap-6 md:p-7"
                    : "group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-[background-color,border-color] duration-200 ease-out hover:border-cyan/40 hover:bg-white/[0.08] md:gap-6 md:p-7"
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    isFoundation
                      ? "flex h-12 w-12 flex-none items-center justify-center rounded-full bg-cyan text-sm font-semibold text-navy"
                      : "flex h-12 w-12 flex-none items-center justify-center rounded-full border border-cyan/40 bg-navy text-sm font-semibold text-cyan transition-[border-color] duration-200 ease-out group-hover:border-cyan"
                  }
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-sm font-bold uppercase tracking-wider text-cyan">
                        {item.level}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-white md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <Icon aria-hidden="true" className="h-5 w-5 flex-none text-cyan/60" />
                  </div>

                  <p className="mt-2 max-w-prose text-base leading-relaxed text-white/70">
                    {item.description}
                  </p>

                  {isFoundation && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {phases.map((phase) => (
                        <li
                          key={phase.letter}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/80"
                        >
                          <span className="font-semibold text-cyan">{phase.letter}</span>
                          {phase.title.split(" ")[0]}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                    {t("about.conocerMas")}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </RevealGroup>
  );
}

const clientLogos = clientLogoNames.map((name) => (
  <div
    key={name}
    className="flex h-16 w-40 items-center justify-center rounded-lg bg-white/10 p-2.5"
  >
    <img
      src={`/assets/logos-clientes/${encodeURIComponent(name)}.webp`}
      alt={name}
      width={160}
      height={80}
      loading="lazy"
      className="h-full w-full object-contain"
    />
  </div>
));

function ClientLogos() {
  const { t } = useTranslation("home");
  return (
    <div className="border-t border-white/10 pt-12">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-white/50">
        {t("about.clientesTitulo")}
      </p>
      <div className="mt-6">
        <LogoCarousel items={clientLogos} />
      </div>
    </div>
  );
}

export function CyrrusAbout() {
  const { t } = useTranslation("home");
  return (
    <About3
      title={t("about.title")}
      description={t("about.description")}
      achievements={[]}
    >
      <div className="flex flex-col gap-14">
        <LevelsStack />
        <ClientLogos />
      </div>
    </About3>
  );
}
