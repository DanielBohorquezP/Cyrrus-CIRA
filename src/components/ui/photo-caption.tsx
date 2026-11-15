import { Img } from "@/components/ui/img";
import { cn } from "@/lib/utils";

interface PhotoCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  /** `glass`: translucent caption over the photo. `below`: grey caption under it. */
  captionStyle?: "glass" | "below";
  /** Tailwind aspect utility, e.g. `aspect-[5/4]`. */
  aspect?: string;
  /** Rounded only on top, so the photo can sit flush on the section's bottom edge. */
  flushBottom?: boolean;
  /** Above-the-fold photos: fetch eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, for tall photos that need a different crop. */
  position?: string;
  className?: string;
}

/** A figure whose caption either floats over the photo (glass) or sits under it. */
export function PhotoCaption({
  src,
  alt,
  caption,
  captionStyle = "below",
  aspect = "aspect-[16/10]",
  flushBottom = false,
  priority = false,
  sizes,
  position,
  className,
}: PhotoCaptionProps) {
  return (
    <figure className={cn("relative m-0", className)}>
      <Img
        src={src}
        alt={alt}
        sizes={sizes}
        style={position ? { objectPosition: position } : undefined}
        {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : null)}
        className={cn(
          "block w-full object-cover",
          aspect,
          flushBottom ? "rounded-t-[20px]" : "rounded-2xl",
        )}
      />
      {caption && captionStyle === "glass" && (
        <figcaption className="glass-caption absolute inset-x-5 bottom-5 flex items-center gap-3.5 rounded-[14px] px-5 py-4">
          <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-sky" />
          <span className="text-[15px] leading-snug text-white/90">{caption}</span>
        </figcaption>
      )}
      {caption && captionStyle === "below" && (
        <figcaption className="mt-3 font-heading text-[13px] font-medium tracking-[0.04em] text-[#5b6472]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
