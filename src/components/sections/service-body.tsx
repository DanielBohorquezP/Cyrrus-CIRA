import type { ReactNode } from "react";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface ServiceBodyProps {
  paragraphs: string[];
  image: { src: string; alt: string; caption?: string; position?: string };
  /** Which side the photo sits on from the md breakpoint up. */
  imageSide?: "left" | "right";
  /** Links or notes shown after the paragraphs. */
  children?: ReactNode;
  className?: string;
}

/** Long-form copy beside a photo, on the mist background. */
export function ServiceBody({ paragraphs, image, imageSide = "left", children, className }: ServiceBodyProps) {
  return (
    <section className={cn("section-y w-full bg-mist", className)}>
      <Reveal className="container-site grid grid-cols-1 items-center gap-x-20 gap-y-10 md:grid-cols-2">
        <div className={cn(imageSide === "right" && "md:order-2")}>
          <PhotoCaption
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            position={image.position}
            aspect="aspect-[4/3]"
            sizes="1000px"
          />
        </div>
        <div className="space-y-6">
          {paragraphs.map((p) => (
            <p key={p} className="t-lead text-slate">
              {p}
            </p>
          ))}
          {children && <div className="space-y-3 text-base text-slate">{children}</div>}
        </div>
      </Reveal>
    </section>
  );
}
