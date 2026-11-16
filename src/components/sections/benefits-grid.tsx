import { CardGrid, type CardItem } from "@/components/ui/card-grid";
import { SectionHeader } from "@/components/ui/section-header";

interface BenefitsGridProps {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Four blocks: a 2px rule, a title and one sentence. */
  items: CardItem[];
}

/** "Beneficios": heading beside one sentence, then four ruled blocks. */
export function BenefitsGrid({ eyebrow, title, intro, items }: BenefitsGridProps) {
  return (
    <section className="section-y w-full bg-background">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={intro} />
        <CardGrid className="mt-16" items={items} tight min="xs" />
      </div>
    </section>
  );
}
