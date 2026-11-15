import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Img } from "@/components/ui/img";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

export interface Stat {
  value: string;
  label: string;
}

interface DarkStatBandProps {
  eyebrow: string;
  title: string;
  description: string;
  stats: Stat[];
  /** Full-bleed photo behind the text, under a navy overlay. Omit for the plain navy background. */
  image?: { src: string; alt: string };
  /** Shown under the description, e.g. a CTA. */
  children?: ReactNode;
}

/** Dark section: heading and text on the left, large light-weight figures on the right. */
export function DarkStatBand({ eyebrow, title, description, stats, image, children }: DarkStatBandProps) {
  const content = (
    <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-x-24 gap-y-14 text-white">
      <Reveal>
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h2 className="t-h2 mt-5 text-white">{title}</h2>
        <p className="t-lead mt-6 text-white/75">{description}</p>
        {children && <div className="mt-10">{children}</div>}
      </Reveal>
      <RevealGroup
        as="dl"
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10"
      >
        {stats.map((stat) => (
          <RevealItem
            key={stat.value}
            className="flex flex-col-reverse justify-end border-t border-white/30 pt-7"
          >
            <dt className="mt-5 text-base leading-relaxed text-white/75">{stat.label}</dt>
            <dd className="font-heading text-[clamp(56px,7vw,88px)] font-light leading-none tracking-[-0.04em]">
              {stat.value}
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );

  if (!image) {
    return <AnimatedNavyBackground className="py-24 md:py-32">{content}</AnimatedNavyBackground>;
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 md:py-32">
      <Img
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1067}
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="photo-overlay-navy absolute inset-0 -z-10" />
      {content}
    </section>
  );
}
