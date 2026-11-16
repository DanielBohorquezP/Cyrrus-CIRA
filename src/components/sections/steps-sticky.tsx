import { Eyebrow } from "@/components/ui/eyebrow";
import { NumberedList, type NumberedItem } from "@/components/ui/numbered-list";
import { Reveal } from "@/components/ui/reveal";

interface StepsStickyProps {
  /** Anchor id, for links such as `#metodo`. */
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Four numbered steps, each a title and one or two sentences. */
  steps: NumberedItem[];
}

/** "Cómo lo hacemos": heading pinned on the left while the numbered steps scroll on the right. */
export function StepsSticky({ id, eyebrow, title, intro, steps }: StepsStickyProps) {
  return (
    <section id={id} className="section-y w-full scroll-mt-20 bg-background">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-24 gap-y-14">
        {/* top-28 clears the 80px fixed header; the pin only applies once the two columns sit side by side. */}
        <Reveal className="min-[1000px]:sticky min-[1000px]:top-28">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="t-h2 mt-5 text-navy">{title}</h2>
          {intro && <p className="mt-6 text-lg leading-[1.7] text-slate text-pretty">{intro}</p>}
        </Reveal>
        <NumberedList items={steps} />
      </div>
    </section>
  );
}
