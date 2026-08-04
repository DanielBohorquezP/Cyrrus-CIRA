import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";

export interface IncludedItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface IncludedGridProps {
  eyebrow: string;
  title: string;
  items: IncludedItem[];
}

/** Generic "qué incluye" section: eyebrow + heading, then a 3-column icon/title/description grid. Reused across detail pages so the section shape stays consistent site-wide. */
export function IncludedGrid({ eyebrow, title, items }: IncludedGridProps) {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                  <Icon className="h-5 w-5 text-blue" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
