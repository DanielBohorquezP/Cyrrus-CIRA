import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Img } from "@/components/ui/img";
import { BorderButton } from "@/components/ui/border-button";
import { Reveal } from "@/components/ui/reveal";

interface ArticleServiceCtaProps {
  title: string;
  description: string;
  checklist: [string, string];
  ctaLabel: string;
  href: string;
  image: { src: string; alt: string };
}

/**
 * Mid-article promo card for the service a blog post is about — the two
 * fixed slots an article's `serviceCtaIndexes` point to (see blog-data.ts).
 * Not a full-bleed section, so it doesn't use AnimatedNavyBackground per
 * CLAUDE.md — it's a contained card inside the article's prose column.
 */
export function ArticleServiceCta({
  title,
  description,
  checklist,
  ctaLabel,
  href,
  image,
}: ArticleServiceCtaProps) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border-l-4 border-cyan bg-navy">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4 p-8 md:p-10">
          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{title}</h3>
          <p className="text-sm leading-relaxed text-white/70">{description}</p>
          <ul className="space-y-2.5">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                <span className="text-sm font-medium text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <BorderButton variant="light" dot asChild className="mt-2 self-start">
            <Link to={href}>{ctaLabel}</Link>
          </BorderButton>
        </div>
        <div className="relative min-h-[220px]">
          <Img
            src={image.src}
            alt={image.alt}
            sizes="1280px"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </Reveal>
  );
}
