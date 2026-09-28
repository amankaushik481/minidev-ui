"use client"
import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button — the Hairline keycap.
 * Solid variants carry an inner top highlight + inner bottom edge (shadow-ink),
 * outline carries a 1px bottom "key" edge (shadow-key). Hover changes one
 * property. Press sinks 0.5px. Nothing shifts layout.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-1.5 align-middle",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium whitespace-nowrap",
    "outline-none select-none cursor-pointer",
    "transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-[140ms] ease-hairline",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "active:translate-y-[0.5px]",
    "disabled:pointer-events-none disabled:opacity-45 data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
    "aria-invalid:ring-2 aria-invalid:ring-danger/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-ink text-on-ink shadow-ink hover:bg-ink-hover [&_svg]:text-on-ink/80",
        accent:
          "bg-accent text-on-accent shadow-ink hover:bg-accent-hover",
        outline:
          "border-border bg-surface text-fg shadow-key hover:border-border-strong hover:bg-sunken/50 active:shadow-highlight [&_svg]:text-fg-muted",
        secondary:
          "bg-sunken text-fg hover:bg-border/70 [&_svg]:text-fg-muted",
        ghost:
          "text-fg-muted hover:bg-sunken hover:text-fg data-[pressed]:bg-sunken data-[pressed]:text-fg",
        soft:
          "bg-accent-soft text-accent-fg hover:bg-accent/15",
        destructive:
          "bg-danger text-white shadow-ink hover:bg-danger/90",
        link:
          "h-auto rounded-sm px-0 text-accent-fg underline decoration-accent-line decoration-1 underline-offset-4 hover:decoration-accent",
      },
      size: {
        xs: "h-7 min-h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 min-h-8 px-2.5 text-[0.8125rem]",
        default: "h-9 min-h-9 px-3.5",
        lg: "h-11 min-h-11 rounded-[0.625rem] px-5 text-[0.9375rem] tracking-[-0.005em]",
        xl: "h-12 min-h-12 rounded-xl px-6 text-base tracking-[-0.01em]",
        icon: "size-9",
        "icon-xs": "size-7 rounded-md",
        "icon-sm": "size-8",
        "icon-lg": "size-11 rounded-[0.625rem]",
      },
    },
    compoundVariants: [
      { variant: "link", size: ["xs", "sm", "default", "lg", "xl"], className: "h-auto min-h-0 px-0" },
    ],
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  // Base UI defaults nativeButton=true. When `render` swaps in a Link/<a>,
  // that must be false or it warns and a11y/forms semantics break.
  const resolvedNative = nativeButton ?? (render != null ? false : true)

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      nativeButton={resolvedNative}
      {...props}
    />
  )
}

export { Button, buttonVariants }
