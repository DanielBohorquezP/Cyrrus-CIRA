import { Reveal } from "@/components/ui/reveal";
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
    <section className={cn("w-full bg-background py-20 md:py-28", className)}>
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray">{description}</p>
          {link && (
            <a
              href={link.href}
              className="mt-6 inline-block text-sm font-semibold text-blue underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          )}
        </Reveal>

        {pointsTitle && points && points.length > 0 && (
          <Reveal delay={0.1} className="mt-14">
            <h3 className="text-center text-xl font-semibold text-navy sm:text-2xl">
              {pointsTitle}
            </h3>
            <ul className="mt-8 space-y-5">
              {points.map((point) => (
                <li key={point.title} className="border-l-2 border-cyan pl-5">
                  <span className="block text-base font-semibold text-navy">{point.title}</span>
                  <span className="mt-1 block text-base leading-relaxed text-gray">
                    {point.description}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
