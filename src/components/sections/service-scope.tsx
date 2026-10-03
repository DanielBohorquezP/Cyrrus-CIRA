import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export interface ScopeItem {
  title: string;
  description: string;
}

interface ServiceScopeProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: ScopeItem[];
  className?: string;
}

/**
 * The "what the service includes" list on a service page. Each service is its
 * own <h3> with a short explanation, rather than a bare bullet, so the page
 * answers "¿qué incluyen los servicios de X?" in a shape search engines and AI
 * answers can lift directly.
 */
export function ServiceScope({ eyebrow, title, description, items, className }: ServiceScopeProps) {
  return (
    <section className={cn("w-full bg-background py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-gray">{description}</p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 md:grid-cols-[3rem_18rem_1fr] md:gap-x-8"
            >
              <span className="pt-0.5 text-sm font-semibold text-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-navy">{item.title}</h3>
              <p className="col-start-2 mt-2 text-base leading-relaxed text-gray md:col-start-3 md:mt-0">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
