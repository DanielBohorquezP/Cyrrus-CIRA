import React from "react";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  icon: IconComponent;
  color: string;
}

/** Brand marks aren't in lucide-react — small inline SVGs instead of a remote icon fetch. */
export const LinkedInIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

export const InstagramIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTubeIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12s0-3.2-.4-4.7a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.8 2.8 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.8 2.8 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.8 2.8 0 0 0 2-2C22 15.2 22 12 22 12zM10 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const baseIconStyles =
      "relative flex items-center justify-center w-11 h-11 rounded-full bg-background overflow-hidden transition-[box-shadow] duration-150 ease-out group-hover:shadow-lg";
    const baseSvgStyles =
      "relative z-10 h-5 w-5 text-foreground transition-colors duration-150 ease-out group-hover:text-white";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-[height] duration-200 ease-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-36px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-xs text-white whitespace-nowrap rounded-md opacity-0 invisible transition-[opacity,visibility,bottom] duration-150 ease-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-44px]";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-3", className)}
        {...props}
      >
        {items.map((item) => (
          <li key={item.ariaLabel} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <item.icon className={cn(baseSvgStyles)} strokeWidth={1.75} />
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  },
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
