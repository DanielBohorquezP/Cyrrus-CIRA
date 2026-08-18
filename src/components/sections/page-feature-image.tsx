import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { Img } from "@/components/ui/img";

interface PageFeatureImageProps {
  src: string;
  alt: string;
  caption?: string;
  /** "cover" crops a photo to fill the frame; "contain" fits a full infographic/slide without cropping. */
  fit?: "cover" | "contain";
}

/** Full-width photo banner used on detail pages that would otherwise be text-only between the hero and the first content section. */
export function PageFeatureImage({ src, alt, caption, fit = "cover" }: PageFeatureImageProps) {
  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal>
          <Img
            src={src}
            alt={alt}
            width={1200}
            height={600}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className={cn(
              "h-64 w-full rounded-2xl sm:h-80 md:h-[26rem]",
              fit === "cover"
                ? "object-cover"
                : "border border-border bg-white object-contain p-4",
            )}
          />
          {caption && (
            <p className="mt-3 text-sm text-gray">{caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
