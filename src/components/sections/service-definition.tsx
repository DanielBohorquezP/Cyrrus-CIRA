import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface DefinitionPoint {
  title: string;
  description: string;
}

interface ServiceDefinitionProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional follow-up question ("¿Para qué sirve…?") answered as a short list. */
  pointsTitle?: string;
  points?: DefinitionPoint[];
  link?: { href: string; label: string };
  className?: string;
}

/**
 * A "¿Qué es X?" block: one self-contained definition near the top of a
 * service page. The first sentence is written to stand on its own, since that
 * is the passage Google's AI overview and other answer engines quote.
 */
export function ServiceDefinition({
  eyebrow,
  title,
  description,
  pointsTitle,
  points,
  link,
  className,
}: ServiceDefinitionProps) {
  return (
    <section className={cn("section-y w-full bg-mist", className)}>
      <div className="container-site">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-24 gap-y-10">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{title}</h2>
          </div>
          <div>
            <p className="t-lead text-slate">{description}</p>
            {link && (
              <a
                href={link.href}
                className="mt-6 inline-block font-heading text-sm font-medium text-blue hover:text-navy"
              >
                {link.label}
              </a>
            )}
          </div>
        </Reveal>

        {pointsTitle && points && points.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h3 className="border-b-2 border-navy pb-5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                {pointsTitle}
              </h3>
            </Reveal>
            <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))]">
              {points.map((point) => (
                <RevealItem
                  key={point.title}
                  className="border-b border-line-2 py-8 pr-7"
                >
                  <p className="font-heading text-lg font-semibold text-navy">{point.title}</p>
                  <p className="mt-3 text-base leading-[1.65] text-slate">{point.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
