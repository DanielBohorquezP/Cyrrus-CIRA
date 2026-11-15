import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { langPath, useLang } from "@/lib/language";

interface Level {
  level: string;
  title: string;
  description: string;
  href: string;
}

/**
 * The three levels (method, AI lab, academy) are a stack, not parallel
 * services: level 1 is what the business gets, level 2 how it is built, level
 * 3 who sustains it. They read as three ruled columns on a dark band.
 */
export function CyrrusAbout() {
  const { t } = useTranslation("home");
  const lang = useLang();
  const levels = t("about.levels", { returnObjects: true }) as Level[];

  return (
    <AnimatedNavyBackground className="cv-section section-y [--cv-h:700px]">
      <div className="container-site text-white">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-20 gap-y-10">
          <h2 className="t-h2 text-white">{t("about.title")}</h2>
          <p className="t-lead text-white/75">{t("about.description")}</p>
        </Reveal>

        <RevealGroup className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-9 border-t border-white/20">
          {levels.map((item, index) => (
            <RevealItem key={item.title} index={index} className="border-b border-white/20">
              <Link
                to={langPath(item.href, lang)}
                className="group flex min-h-[280px] flex-col py-10 text-white"
              >
                <span className="font-heading text-sm font-bold uppercase tracking-[0.06em] text-sky">
                  {item.level}
                </span>
                <h3 className="mt-4 font-heading text-[26px] font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[17px] leading-[1.7] text-white/75">{item.description}</p>
                <span className="mt-auto pt-7 font-heading text-sm font-medium text-white group-hover:text-sky">
                  {`${t("about.conocerMas")} ↗`}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </AnimatedNavyBackground>
  );
}
