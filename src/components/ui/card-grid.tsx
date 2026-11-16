import { Link } from "react-router-dom";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Img } from "@/components/ui/img";
import { cn } from "@/lib/utils";

export interface CardItem {
  title: string;
  /** Optional: a block can be a title alone. */
  description?: string;
  /** When present the card becomes a photo card: 4:3 picture above the title. */
  /** Makes the whole card a link. */
  href?: string;
  /** With `href`: a text link under the description instead of the arrow on the title. */
  linkLabel?: string;
  image?: { src: string; alt: string; /** CSS object-position, for tall photos that need a different crop. */ position?: string };
}

interface CardGridProps {
  items: CardItem[];
  /** Show a blue `01` index before each title. */
  numbered?: boolean;
  /** Smallest column width before the grid wraps: xs 240px, sm 280px, md 320px, lg 360px. */
  min?: keyof typeof columns;
  /** Narrower gutters, so four cards still fit on one row at the 1280px container. */
  tight?: boolean;
  /** `sizes` for photo cards; match the real rendered column width. */
  imageSizes?: string;
  className?: string;
}

// Literal class names (not built from a number) so Tailwind can see them.
const columns = {
  xs: "grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]",
  sm: "grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]",
  md: "grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]",
  lg: "grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))]",
} as const;

/** Cards without a box: a 2px navy rule, a title and a description. */
export function CardGrid({
  items,
  numbered = false,
  min = "md",
  tight = false,
  imageSizes = "1100px",
  className,
}: CardGridProps) {
  return (
    <RevealGroup className={cn("grid", tight ? "gap-x-8 gap-y-12" : "gap-x-16 gap-y-14", columns[min], className)}>
      {items.map((item, index) => {
        const body = (
          <>
            {item.image && (
              <Img
                src={item.image.src}
                alt={item.image.alt}
                width={640}
                height={480}
                sizes={imageSizes}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                style={item.image.position ? { objectPosition: item.image.position } : undefined}
              />
            )}
            <div className="flex-1 border-t-2 border-navy pt-6">
              <h3 className="flex items-baseline gap-3.5 font-heading text-xl font-semibold leading-snug text-navy group-hover:text-blue">
                {numbered && (
                  <span className="text-[13px] font-semibold text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                {item.href && !item.linkLabel ? `${item.title} ↗` : item.title}
              </h3>
              {item.description && <p className="mt-3.5 text-[17px] leading-[1.7] text-slate">{item.description}</p>}
              {item.href && item.linkLabel && (
                <span className="mt-4 inline-block font-heading text-sm font-medium text-blue group-hover:text-navy">
                  {`${item.linkLabel} →`}
                </span>
              )}
            </div>
          </>
        );
        return (
          <RevealItem key={item.title}>
            {item.href ? (
              <Link to={item.href} className="group flex h-full flex-col gap-5">
                {body}
              </Link>
            ) : (
              <div className="flex h-full flex-col gap-5">{body}</div>
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
