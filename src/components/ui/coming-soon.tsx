import * as React from "react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  children: React.ReactNode;
  className?: string;
  message?: string;
}

/**
 * Wraps a disabled CTA that should look and sit like a real button/card but
 * not navigate anywhere yet — shows a "Coming soon" tooltip on hover/focus.
 * Use this instead of `Link`/`a` for any entry point into an individual
 * workshop page while Leadership Academy detail pages aren't live.
 */
export function ComingSoon({ children, className, message = "Próximamente" }: ComingSoonProps) {
  return (
    <div
      className={cn("group/coming-soon relative cursor-not-allowed [&_*]:pointer-events-none", className)}
      aria-disabled="true"
      tabIndex={0}
    >
      {children}
      <span
        className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 ease-out group-hover/coming-soon:opacity-100 group-focus-within/coming-soon:opacity-100"
        role="tooltip"
      >
        {message}
      </span>
    </div>
  );
}
