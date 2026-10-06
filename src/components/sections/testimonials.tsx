import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { langPath, useLang } from "@/lib/language";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
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

export function Testimonials() {
  const { t } = useTranslation("home");
  const lang = useLang();
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

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <RevealItem
              as="figure"
              key={item.videoId}
              index={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <YoutubeFacade
                videoId={item.videoId}
                title={`${item.name ? `${item.name}, ` : ""}${item.role} de ${item.company} — testimonio en video`}
              />
              <div className="flex flex-1 flex-col p-6">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-blue">{item.metric}</p>
                <figcaption className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <div>
                    <div className="text-sm font-semibold text-navy">
                      {item.name || item.role}
                    </div>
                    <div className="text-sm text-gray">
                      {/* One interpolation: `{a} · {b}` is three adjacent children,
                          i.e. three text nodes React expects to hydrate, but the
                          DOM merges them into one when the page is serialised. */}
                      {item.name ? `${item.role} · ${item.company}` : item.company}
                    </div>
                  </div>
                  <Link
                    to={langPath(`/experiencia/${item.caseSlug}`, lang)}
                    className="shrink-0 text-sm font-semibold text-blue hover:underline"
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
