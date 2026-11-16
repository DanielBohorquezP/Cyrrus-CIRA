import { DarkStatBand, type Stat } from "@/components/ui/dark-stat-band";

interface AuthorityBandProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Large figures. Only verifiable ones: a cited source, or facts about Cyrrus's own method. */
  stats: Stat[];
  image?: { src: string; alt: string };
}

/** "Por qué Cyrrus": dark band over a photo with a heading, one paragraph and big figures. */
export function AuthorityBand({ eyebrow, title, body, stats, image }: AuthorityBandProps) {
  return <DarkStatBand eyebrow={eyebrow} title={title} description={body} stats={stats} image={image} />;
}
