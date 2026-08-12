import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Compass, Cpu, GraduationCap } from "lucide-react";
import { About3 } from "@/components/ui/about-3";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { clientLogoNames } from "@/lib/client-logos";
import { cn } from "@/lib/utils";

interface Level {
  level: string;
  title: string;
  description: string;
  href: string;
}

const icons = [Compass, Cpu, GraduationCap];

function LevelsRow() {
  const { t } = useTranslation("home");
  const levels = t("about.levels", { returnObjects: true }) as Level[];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {levels.map((item, index) => {
        const Icon = icons[index];
        return (
          <Link
            key={item.title}
            to={item.href}
            className={cn(
              "group flex flex-col rounded-xl border p-6 transition-colors",
              index === 0
                ? "border-cyan/30 bg-white/10 hover:bg-white/15"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-5 w-5 text-cyan" />
            </div>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan">
              {item.level}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
              {item.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white">
              {t("about.conocerMas")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        );
      })}
    </div>
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
    <div>
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
        <LevelsRow />
        <ClientLogos />
      </div>
    </About3>
  );
}
