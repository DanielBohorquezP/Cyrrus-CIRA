import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export interface RelatedItem {
  title: string;
  description?: string;
  href: string;
}

interface RelatedServicesProps {
  eyebrow: string;
  title: string;
  items: RelatedItem[];
  className?: string;
}

/** "Related services": ruled, numbered links to the neighbouring pages. */
export function RelatedServices({ eyebrow, title, items, className }: RelatedServicesProps) {
  return (
    <section className={cn("section-y w-full bg-mist", className)}>
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <RevealGroup className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-navy">
          {items.map((item, index) => (
            <RevealItem key={item.title}>
              <Link
                to={item.href}
                className="group flex h-full flex-col gap-3 border-b border-line-2 py-8 pr-8"
              >
                <span className="font-heading text-[13px] font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-[22px] font-semibold text-navy group-hover:text-blue">
                  {`${item.title} ↗`}
                </h3>
                {item.description && <p className="text-[17px] leading-[1.6] text-slate">{item.description}</p>}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
