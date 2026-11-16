import type { ReactNode } from "react";
import { CardGrid, type CardItem } from "@/components/ui/card-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { RuledBullets } from "@/components/ui/ruled-bullets";

interface PhotoCardsProps {
  eyebrow: string;
  /** Light-weight lead-in of the big quote. */
  quote: string;
  /** Closing words of the quote, set in a heavier weight. */
  emphasis?: string;
  /** Paragraph to the right of the quote. */
  intro?: string;
  /** 3 or 4 cards; each one a 4:3 photo, an index, a title and one sentence. */
  cards: CardItem[];
  /** Plain bullets, for pages whose intro has no titled items to turn into cards. */
  bullets?: string[];
  /** Link lines shown under the intro paragraph. */
  children?: ReactNode;
  className?: string;
}

/** "Qué hacemos": a big light quote beside one paragraph, then photo cards. */
export function PhotoCards({ eyebrow, quote, emphasis, intro, cards, bullets, children, className }: PhotoCardsProps) {
  return (
    <section className={className ?? "section-y w-full bg-background"}>
      <div className="container-site">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-24 gap-y-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <blockquote className="m-0 mt-7 font-heading text-[clamp(28px,3vw,40px)] leading-[1.3] font-light tracking-[-0.02em] text-pretty text-navy">
              {emphasis ? `${quote} ` : quote}
              {emphasis && <span className="font-semibold">{emphasis}</span>}
            </blockquote>
          </div>
          {(intro || children) && (
            <div>
              {intro && <p className="t-lead text-slate">{intro}</p>}
              {children && <div className="mt-6 space-y-3 text-base text-slate">{children}</div>}
            </div>
          )}
        </Reveal>
        {cards.length > 0 && (
          <CardGrid
            className="mt-[72px]"
            items={cards}
            numbered
            tight
            min="xs"
            imageSizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw"
          />
        )}
        {bullets && bullets.length > 0 && <RuledBullets items={bullets} columns={2} className="mt-16" />}
      </div>
    </section>
  );
}
