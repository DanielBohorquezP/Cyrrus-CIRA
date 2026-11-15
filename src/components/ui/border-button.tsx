import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const borderButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 bg-transparent font-heading font-semibold transition-[border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // for CTAs sitting on navy/dark backgrounds
        light: "border-white/70 text-white hover:border-white",
        // for CTAs sitting on white/light backgrounds
        dark: "border-navy/70 text-navy hover:border-navy",
      },
      size: {
        default: "h-[42px] px-5 text-[13px]",
        sm: "h-9 px-4 text-[13px]",
        lg: "min-h-14 px-[30px] text-[15px]",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  },
);

export interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof borderButtonVariants> {
  asChild?: boolean;
  /** Shows the small sky dot after the label. */
  dot?: boolean;
}

const dotEl = <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-sky" />;

/**
 * The outline pill CTA (ButtonOutline in the design system): 2px border, 56px
 * tall at `lg`, optional sky dot on the right. `variant="light"` on navy/photo
 * sections, `variant="dark"` on white ones.
 */
const BorderButton = React.forwardRef<HTMLButtonElement, BorderButtonProps>(
  ({ className, variant = "light", size, asChild = false, dot = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

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
      <Comp className={cn(borderButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {content}
      </Comp>
    );
  },
);
BorderButton.displayName = "BorderButton";

const secondaryButtonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-6 font-heading text-sm font-semibold transition-[border-color,color] duration-150 ease-out after:content-['→']",
  {
    variants: {
      variant: {
        light: "border-white/25 text-white hover:border-sky/50 hover:text-sky",
        dark: "border-navy/25 text-navy hover:border-navy",
      },
    },
    defaultVariants: { variant: "light" },
  },
);

export interface SecondaryButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof secondaryButtonVariants> {
  asChild?: boolean;
}

/** Secondary CTA: 1px pill with a trailing arrow. Pass `asChild` with a `<Link>`. */
const SecondaryButton = React.forwardRef<HTMLAnchorElement, SecondaryButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return <Comp ref={ref} className={cn(secondaryButtonVariants({ variant }), className)} {...props} />;
  },
);
SecondaryButton.displayName = "SecondaryButton";

export { BorderButton, borderButtonVariants, SecondaryButton };
