import { SectionHeader } from "@/components/ui/section-header";
import { NumberedList, type NumberedItem } from "@/components/ui/numbered-list";
import { cn } from "@/lib/utils";

export type ScopeItem = NumberedItem;

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
    <section className={cn("section-y w-full bg-mist", className)}>
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <NumberedList items={items} layout="columns" className="mt-16" />
      </div>
    </section>
  );
}
