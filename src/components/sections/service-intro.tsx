import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Reveal } from "@/components/ui/reveal";
import { RuledBullets } from "@/components/ui/ruled-bullets";
import { cn } from "@/lib/utils";

interface ServiceIntroProps {
  eyebrow: string;
  /** Large light-weight statement. If it contains " — ", the part after it is set bold. */
  quote: string;
  description: string;
  /** Heading over the bullet list (e.g. "Cómo lo resolvemos"). */
  bulletsTitle?: string;
  bullets?: string[];
  image?: { src: string; alt: string; caption?: string; position?: string };
  /** Links or notes shown under the description. */
  children?: ReactNode;
  className?: string;
}

/**
 * The opening block of a service page and its "challenge" variant: eyebrow and
 * quote on the left, the explanation on the right, then an optional photo
 * beside a ruled list of bullets.
 */
export function ServiceIntro({
  eyebrow,
  quote,
  description,
  bulletsTitle,
  bullets,
  image,
  children,
  className,
}: ServiceIntroProps) {
  const [lead, ...rest] = quote.split(" — ");
  const hasBelow = Boolean(image) || Boolean(bullets?.length);

  return (
    <section className={cn("section-y w-full bg-background", className)}>
      <div className="container-site">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-24 gap-y-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <blockquote className="mt-7 font-heading text-[clamp(28px,3vw,40px)] font-light leading-[1.3] tracking-[-0.02em] text-pretty text-navy">
              {rest.length > 0 ? (
                <>
                  {`${lead} — `}
                  <span className="font-semibold">{rest.join(" — ")}</span>
                </>
              ) : (
                lead
              )}
            </blockquote>
          </div>
          <div>
            <p className="t-lead text-slate">{description}</p>
            {children && <div className="mt-6 space-y-3 text-base text-slate">{children}</div>}
          </div>
        </Reveal>

        {hasBelow && (
          <div
            className={cn(
              "mt-16 grid items-start gap-x-24 gap-y-10",
              image && bullets?.length && "grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))]",
            )}
          >
            {image && (
              <Reveal>
                <PhotoCaption
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  position={image.position}
                  aspect="aspect-[4/3]"
                  sizes="1000px"
                />
              </Reveal>
            )}
            {bullets && bullets.length > 0 && (
              <div>
                {bulletsTitle && (
                  <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                    {bulletsTitle}
                  </h3>
                )}
                <RuledBullets items={bullets} columns={image ? 1 : 2} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
