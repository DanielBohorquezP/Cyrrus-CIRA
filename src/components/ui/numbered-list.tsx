import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export interface NumberedItem {
  title: string;
  description: string;
}

interface NumberedListProps {
  items: NumberedItem[];
  /** `stacked`: number beside title-over-text. `columns`: number | title | text on one row. */
  layout?: "stacked" | "columns";
  className?: string;
}

/** Rows with a blue `01` index, 1px separators and a navy rule on top. */
export function NumberedList({ items, layout = "stacked", className }: NumberedListProps) {
  return (
    <Reveal>
      <ol className={cn("border-t border-navy", className)}>
        {items.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              "grid border-b border-line-2 py-8",
              layout === "stacked"
                ? "grid-cols-[3.5rem_1fr] gap-x-4"
                : "grid-cols-[2.5rem_1fr] gap-x-4 md:grid-cols-[3rem_18rem_1fr] md:gap-x-8",
            )}
          >
            <span className="pt-1 font-heading text-sm font-medium text-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            {layout === "stacked" ? (
              <div>
                <h3 className="font-heading text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-2.5 text-[17px] leading-[1.7] text-slate">{item.description}</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-xl font-semibold text-navy">{item.title}</h3>
                <p className="col-start-2 mt-2 text-[17px] leading-[1.7] text-slate md:col-start-3 md:mt-0">
                  {item.description}
                </p>
              </>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
