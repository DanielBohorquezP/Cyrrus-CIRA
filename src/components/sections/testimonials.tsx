import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { langPath, useLang } from "@/lib/language";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { YoutubeFacade } from "@/components/ui/youtube-facade";

interface Testimonial {
  videoId: string;
  /** Empty when the client hasn't confirmed the speaker's name; the role stands in. */
  name: string;
  role: string;
  company: string;
  quote: string;
  /** The case's headline figure, shown under the quote. */
  metric: string;
  /** Slug under /experiencia/ of the full case study. */
  caseSlug: string;
}

export function Testimonials({ className }: { className?: string }) {
  const { t } = useTranslation("home");
  const lang = useLang();
  const testimonials = t("testimonials.items", { returnObjects: true }) as Testimonial[];

  return (
    <section className={cn("cv-section section-y w-full bg-mist", className)}>
      <div className="container-site">
        <Reveal>
          <Eyebrow>{t("testimonials.eyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-6 max-w-[820px] text-navy">{t("testimonials.title")}</h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-8">
          {testimonials.map((item, i) => (
            <RevealItem
              as="figure"
              key={item.videoId}
              index={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(10,44,99,0.04)]"
            >
              <YoutubeFacade
                videoId={item.videoId}
                title={`${item.name ? `${item.name}, ` : ""}${item.role} de ${item.company} — testimonio en video`}
              />
              <div className="flex flex-1 flex-col p-7">
                <blockquote className="flex-1 font-heading text-[17px] leading-[1.55] text-pretty text-navy">
                  {item.quote}
                </blockquote>
                <p className="mt-4 text-base font-semibold text-blue">{item.metric}</p>
                <figcaption className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <div className="font-heading text-[13px] font-semibold text-navy">
                      {item.name || item.role}
                    </div>
                    <div className="mt-1 text-[15px] text-slate">
                      {/* One interpolation: `{a} · {b}` is three adjacent children,
                          i.e. three text nodes React expects to hydrate, but the
                          DOM merges them into one when the page is serialised. */}
                      {item.name ? `${item.role} · ${item.company}` : item.company}
                    </div>
                  </div>
                  <Link
                    to={langPath(`/experiencia/${item.caseSlug}`, lang)}
                    className="shrink-0 font-heading text-[13px] font-medium text-blue hover:text-navy"
                  >
                    {`${t("testimonials.readCase")} →`}
                  </Link>
                </figcaption>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
