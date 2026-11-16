import { CardGrid, type CardItem } from "@/components/ui/card-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export interface SpotlightContent {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Ruled blocks under the heading; each may be title-only. */
  items?: CardItem[];
  /** One closing sentence, set as a pull line under the blocks. */
  note?: string;
  /** A single cited figure beside the heading. */
  stat?: { value: string; description: string; source: string };
  /** A photo beside the heading (used together with `stat`). */
  image?: { src: string; alt: string; position?: string };
}

/**
 * An extra section for a service that has a part of its offer no other service
 * has (a deliverable, a cited figure, a timeline). It follows the same recipe
 * as the rest of the template: eyebrow, H2, short intro, ruled blocks.
 */
export function SpotlightBlock({ block, tone }: { block: SpotlightContent; tone: "white" | "mist" }) {
  const { eyebrow, title, intro, items, note, stat, image } = block;
  return (
    <section className={cn("section-y w-full", tone === "mist" ? "bg-mist" : "bg-background")}>
      <div className="container-site">
        {stat || image ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-x-24 gap-y-14">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="t-h2 mt-5 text-navy">{title}</h2>
              {intro && <p className="t-lead mt-6 text-slate">{intro}</p>}
              {stat && (
                <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-3 border-t border-line-2 pt-8">
                  <p className="font-heading text-[clamp(72px,9vw,112px)] leading-none font-bold tracking-[-0.04em] text-blue">
                    {stat.value}
                  </p>
                  <div className="max-w-xs pb-2">
                    <p className="font-heading text-lg leading-snug font-semibold text-navy">{stat.description}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{stat.source}</p>
                  </div>
                </div>
              )}
            </Reveal>
            {image && (
              <PhotoCaption src={image.src} alt={image.alt} position={image.position} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 560px, 100vw" />
            )}
          </div>
        ) : (
          <SectionHeader eyebrow={eyebrow} title={title} description={intro} align="start" />
        )}
        {items && items.length > 0 && <CardGrid className="mt-16" items={items} numbered tight min="xs" />}
        {note && (
          <Reveal>
            <p className="mt-12 max-w-[820px] border-l-2 border-sky pl-6 font-heading text-[clamp(20px,2vw,26px)] leading-[1.4] font-medium text-navy">
              {note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
