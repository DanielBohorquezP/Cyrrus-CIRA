import { Img } from "@/components/ui/img";
import { clientLogoNames } from "@/lib/client-logos";
import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  className?: string;
}

const logoSrc = (name: string) => `/assets/logos-clientes/${encodeURIComponent(name)}.webp`;

/**
 * Endless row of client logos, no text. The list is rendered twice and the
 * track slides left by half its width plus half the gap (see `logo-marquee` in
 * index.css), so the loop has no visible seam. The second copy is decorative
 * (alt="", aria-hidden). With prefers-reduced-motion the track stops and wraps
 * into a static grid, and the duplicate disappears.
 */
export function LogoMarquee({ className }: LogoMarqueeProps) {
  return (
    <div className={cn("marquee-mask group overflow-hidden", className)}>
      <ul className="flex w-max items-center gap-16 motion-safe:animate-[logo-marquee_60s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-6">
        {clientLogoNames.map((name) => (
          <li key={name} className="flex-none">
            <Img
              src={logoSrc(name)}
              alt={name}
              sizes="130px"
              className="h-9 w-[130px] object-contain opacity-80"
            />
          </li>
        ))}
        {clientLogoNames.map((name) => (
          <li key={`dup-${name}`} aria-hidden="true" className="flex-none motion-reduce:hidden">
            <Img
              src={logoSrc(name)}
              alt=""
              sizes="130px"
              className="h-9 w-[130px] object-contain opacity-80"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
