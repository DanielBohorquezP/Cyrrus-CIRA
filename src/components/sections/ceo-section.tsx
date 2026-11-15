import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Img } from "@/components/ui/img";

export function CeoSection() {
  const { t } = useTranslation("home");
  return (
    <AnimatedNavyBackground className="cv-section py-[clamp(96px,12vw,152px)] [--cv-h:560px]">
      <Reveal className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-start gap-x-14 gap-y-10 px-[clamp(24px,5vw,64px)] text-white sm:grid-cols-[220px_1fr]">
        <Img
          src="/assets/decoracion/JacksonCEO1.jpeg"
          alt={t("ceo.photoAlt")}
          width={220}
          height={275}
          sizes="220px"
          className="aspect-[4/5] w-[220px] rounded-2xl object-cover"
        />
        <div className="max-w-[760px]">
          <blockquote className="m-0 font-heading text-[clamp(24px,2.6vw,34px)] font-light leading-[1.4] tracking-[-0.01em] text-pretty">
            {t("ceo.quote")}
          </blockquote>
          <div className="mt-10">
            <p className="font-heading text-[15px] font-semibold">{t("ceo.name")}</p>
            <p className="mt-1 text-[15px] text-white/70">{t("ceo.role")}</p>
          </div>
        </div>
      </Reveal>
    </AnimatedNavyBackground>
  );
}
