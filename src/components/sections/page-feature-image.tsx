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
    <section className="w-full bg-background py-[clamp(48px,6vw,80px)]">
      <div className="container-site">
        <Reveal>
          <Img
            src={src}
            alt={alt}
            width={1200}
            height={600}
            sizes="(min-width: 1280px) 1152px, 100vw"
            className={cn(
              "h-64 w-full rounded-2xl sm:h-80 md:h-[26rem]",
              fit === "cover"
                ? "object-cover"
                : "border border-border bg-white object-contain p-4",
            )}
          />
          {caption && (
            <p className="mt-3 font-heading text-[13px] font-medium tracking-[0.04em] text-[#5b6472]">{caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
