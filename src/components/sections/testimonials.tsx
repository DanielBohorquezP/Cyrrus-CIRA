import { useTranslation } from "react-i18next";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { YoutubeFacade } from "@/components/ui/youtube-facade";

interface Testimonial {
  videoId: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export function Testimonials() {
  const { t } = useTranslation("home");
  const testimonials = t("testimonials.items", { returnObjects: true }) as Testimonial[];

  return (
    <section className="cv-section w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t("testimonials.title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <RevealItem
              as="figure"
              key={item.videoId}
              index={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <YoutubeFacade
                videoId={item.videoId}
                title={`${item.name}, ${item.role} de ${item.company} — testimonio en video`}
              />
              <div className="flex flex-1 flex-col p-6">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="text-sm font-semibold text-navy">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray">
                    {item.role} · {item.company}
                  </div>
                </figcaption>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
