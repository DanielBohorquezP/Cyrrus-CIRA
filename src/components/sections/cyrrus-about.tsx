import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";
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

// Grows top-down instead of appearing instantly, so it never visually races
// ahead of the numbered nodes it's supposed to connect — the two previously
// animated on different clocks (line: none, cards: staggered slide-in),
// which could show a brief misaligned frame right after mount (e.g. on
// every ES/EN route switch, since that remounts this section).
const spineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

/**
 * The three levels are a stack, not three parallel services — level 1 is what
 * the business gets, level 2 is how it's built, level 3 is who sustains it.
 * A connecting spine through numbered nodes says that structurally, so the
 * layout reinforces the section heading instead of contradicting it.
 */
function LevelsStack() {
  const { t } = useTranslation("home");
  const { t: tCira } = useTranslation("metodo-cira");
  const levels = t("about.levels", { returnObjects: true }) as Level[];
  // Reuse the canonical CIRA phases rather than restating them, so the chips
  // can never drift from the Método CIRA page.
  const phases = tCira("phases", { returnObjects: true }) as CiraPhase[];

  return (
    <RevealGroup className="relative">
      {/* Spine: visible in the gaps between rows, aligned to the node centers.
          Grows from the top (transformOrigin) in sync with the stagger below,
          rather than being fully drawn on the first frame. */}
      <motion.div
        aria-hidden="true"
        variants={spineVariants}
        style={{ transformOrigin: "top" }}
        className="absolute bottom-8 left-11 top-8 w-px bg-gradient-to-b from-cyan/50 via-cyan/25 to-transparent md:left-[3.25rem]"
      />

      <ol className="relative flex flex-col gap-4">
        {levels.map((item, index) => {
          const Icon = icons[index];
          const isFoundation = index === 0;

          return (
            <motion.li key={item.title} variants={staggerItem} className="relative">
              <Link
                to={item.href}
                className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-[background-color,border-color] duration-200 ease-out hover:border-cyan/40 hover:bg-white/[0.08] md:gap-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-cyan/40 bg-navy text-sm font-semibold text-cyan transition-[border-color] duration-200 ease-out group-hover:border-cyan"
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                        {item.level}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-white md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <Icon aria-hidden="true" className="h-5 w-5 flex-none text-cyan/60" />
                  </div>

                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/70">
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
      src={`/assets/logos-clientes/${encodeURIComponent(name)}.png`}
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
