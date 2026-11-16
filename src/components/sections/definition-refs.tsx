import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export interface DefinitionRef {
  title: string;
  description?: string;
}

interface DefinitionRefsProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Small caps label above the row of references. */
  refsLabel?: string;
  /** "¿Para qué sirve …?": a ruled row of what the service is used for, shown before the references. */
  uses?: { label: string; items: DefinitionRef[] };
  /** Up to three frameworks, technologies or concepts, separated by rules. */
  refs: DefinitionRef[];
  /** Extra content under the references, e.g. the collapsible long-form detail. */
  children?: ReactNode;
}

function RefsRow({ label, items }: { label: string; items: DefinitionRef[] }) {
  // Rows made only of titles (a list of decisions, a list of options) read as
  // numbered blocks under a navy rule; rows with text keep the ruled columns.
  const titlesOnly = items.every((item) => !item.description);
  if (titlesOnly) {
    return (
      <>
        {label && (
          <h3 className="mt-20 font-heading text-sm font-semibold tracking-[0.12em] text-navy uppercase">{label}</h3>
        )}
        <RevealGroup className={cn("grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-x-8 gap-y-10", label ? "mt-8" : "mt-20")}>
          {items.map((ref, index) => (
            <RevealItem key={ref.title}>
              <div className="h-full border-t-2 border-navy pt-5">
                <span className="font-heading text-[13px] font-semibold text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-heading text-lg leading-snug font-semibold text-navy">{ref.title}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </>
    );
  }
  return (
    <>
      {label && (
        <h3 className="mt-20 border-b-2 border-navy pb-5 font-heading text-sm font-semibold tracking-[0.12em] text-navy uppercase">
          {label}
        </h3>
      )}
      <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {items.map((ref) => (
          <RevealItem key={ref.title}>
            <div className="h-full border-b border-line-2 py-8 pr-7">
              <p className="font-heading text-lg font-semibold text-navy">{ref.title}</p>
              <p className="mt-3 text-base leading-[1.65] text-slate text-pretty">{ref.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}

/** "Qué es": title and definition, then a ruled row of references. Mist background. */
export function DefinitionRefs({ eyebrow, title, body, uses, refsLabel, refs, children }: DefinitionRefsProps) {
  return (
    <section className="section-y w-full bg-mist">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={body} align="start" />
        {uses && uses.items.length > 0 && <RefsRow label={uses.label} items={uses.items} />}
        {refs.length > 0 && <RefsRow label={refsLabel ?? ""} items={refs} />}
        {children}
      </div>
    </section>
  );
}
