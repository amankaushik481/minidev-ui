"use client"
import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium tracking-[0.005em] whitespace-nowrap",
    "outline-none select-none",
    "transition-[color,background-color,border-color,opacity,box-shadow,transform] duration-[70ms]",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "active:translate-y-[0.5px]",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-danger",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-accent text-primary-foreground border-transparent hover:bg-accent/90 shadow-[inset_0_1px_0_oklch(1_0_0/0.35)]",
        outline:
          "border-border bg-surface text-fg hover:border-fg-subtle shadow-[inset_0_1px_0_oklch(1_0_0/0.6)]",
        secondary: "border-border bg-sunken text-fg hover:border-fg-subtle",
        ghost: "text-fg hover:bg-sunken",
        destructive:
          "bg-danger text-primary-foreground border-transparent hover:bg-danger/90 shadow-[inset_0_1px_0_oklch(1_0_0/0.25)]",
        link: "text-accent underline-offset-4 hover:underline h-auto px-0",
      },
      size: {
        sm: "h-8 min-h-8 px-2.5 text-[0.8125rem]",
        default: "h-9 min-h-9 px-3",
        lg: "h-11 min-h-11 px-4 text-base tracking-normal",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
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
  const resolvedNative =
    nativeButton ?? (render != null ? false : true)

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      nativeButton={resolvedNative}
      {...props}
    />
  )
}

export { Button, buttonVariants }
