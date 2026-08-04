import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const borderButtonVariants = cva(
  "group relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap overflow-hidden rounded-full border-2 font-medium backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full",
  {
    variants: {
      variant: {
        // for CTAs sitting on navy/dark backgrounds
        light:
          "border-white/70 text-white before:via-white/10 hover:border-white hover:shadow-lg hover:shadow-cyan/20",
        // for CTAs sitting on white/light backgrounds
        dark: "border-navy/70 text-navy before:via-navy/5 hover:border-navy hover:shadow-lg hover:shadow-navy/10",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  },
);

const dotVariants = {
  light: "bg-cyan",
  dark: "bg-navy",
};

export interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof borderButtonVariants> {
  asChild?: boolean;
  /** Shows the small animated dot after the label (off by default for text-heavy CTAs). */
  dot?: boolean;
}

/**
 * Ghost/outline pill button with a hover sheen and an optional pulsing
 * accent dot — brand-colored (navy/cyan). Use `variant="light"` on navy
 * hero/CTA sections, `variant="dark"` on white sections.
 */
const BorderButton = React.forwardRef<HTMLButtonElement, BorderButtonProps>(
  ({ className, variant = "light", size, asChild = false, dot = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [isHovered, setIsHovered] = React.useState(false);

    const dotEl = dot ? (
      <span
        className={cn(
          "relative inline-block h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-500 ease-out",
          variant === "light" ? dotVariants.light : dotVariants.dark,
          isHovered && "scale-125",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-70",
            variant === "light" ? "bg-cyan" : "bg-navy",
          )}
          style={{ animationDuration: "2s" }}
        />
      </span>
    ) : null;

    // Slot (asChild) requires exactly one child element — inject the dot into
    // that element's own children instead of adding a sibling/wrapper, so
    // the merged classes/handlers still land on the consumer's real <a>/<Link>.
    let content: React.ReactNode = children;
    if (dot && asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ children?: React.ReactNode }>;
      content = React.cloneElement(child, undefined, (
        <>
          {child.props.children}
          {dotEl}
        </>
      ));
    } else if (dot && !asChild) {
      content = (
        <>
          {children}
          {dotEl}
        </>
      );
    }

    return (
      <Comp
        className={cn(borderButtonVariants({ variant, size, className }))}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
BorderButton.displayName = "BorderButton";

export { BorderButton, borderButtonVariants };
