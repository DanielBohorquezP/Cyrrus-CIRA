import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface RuledBulletsProps {
  items: string[];
  /** One column, or two from the md breakpoint up. */
  columns?: 1 | 2;
  /** Blue `01` index instead of a dot. */
  numbered?: boolean;
  className?: string;
}

/** A plain list of short statements: blue dot, 1px separators, navy rule on top. */
export function RuledBullets({ items, columns = 1, numbered = false, className }: RuledBulletsProps) {
  return (
    <Reveal>
      <ul
        className={cn(
          "border-t border-navy",
          columns === 2 && "grid gap-x-16 md:grid-cols-2",
          className,
        )}
      >
        {items.map((item, index) => (
          <li
            key={item}
            className={cn(
              "grid items-start gap-x-2 border-b border-line-2 py-5",
              numbered ? "grid-cols-[2.5rem_1fr]" : "grid-cols-[1.75rem_1fr]",
            )}
          >
            {numbered ? (
              <span className="pt-0.5 font-heading text-sm font-medium text-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : (
              <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 rounded-full bg-blue" />
            )}
            <span className="text-[17px] leading-[1.65] text-slate">{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
