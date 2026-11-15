import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CardGrid, type CardItem } from "@/components/ui/card-grid";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { cn } from "@/lib/utils";

export interface IncludedItem {
  /** Ignored: the redesign dropped icons from these cards. Pages that still pass one keep compiling until they migrate. */
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface IncludedGridProps {
  eyebrow: string;
  title: string;
  /** Short supporting text beside the heading. With `image`, it sits under the heading instead. */
  description?: string;
  items: IncludedItem[];
  /** A photo of boards/screens next to the heading, with a grey caption. */
  image?: { src: string; alt: string; caption?: string; position?: string };
  /** Show a blue `01` index before each card title. */
  numbered?: boolean;
  className?: string;
}

/** Generic "benefits / what's included" section: heading (optionally beside a photo), then a grid of ruled cards. */
export function IncludedGrid({ eyebrow, title, description, items, image, numbered, className }: IncludedGridProps) {
  const cards: CardItem[] = items.map(({ title: t, description: d }) => ({ title: t, description: d }));

  return (
    <section className={cn("section-y w-full bg-background", className)}>
      <div className="container-site">
        {image ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-20 gap-y-10">
            <div>
              <SectionHeader eyebrow={eyebrow} title={title} className="block" />
              {description && <p className="t-lead mt-6 text-slate">{description}</p>}
            </div>
            <PhotoCaption
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              position={image.position}
              sizes="1000px"
            />
          </div>
        ) : (
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        )}
        <CardGrid items={cards} numbered={numbered} className="mt-16" />
      </div>
    </section>
  );
}
