"use client"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 text-[11px] font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color] duration-[70ms] ease-hairline",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg outline-none",
    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-danger",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink text-on-ink [a]:hover:bg-ink-hover",
        accent: "border-accent-line bg-accent-soft text-accent-fg [a]:hover:bg-accent/15",
        secondary: "border-transparent bg-sunken text-fg-muted [a]:hover:text-fg",
        destructive: "border-danger/20 bg-danger/10 text-danger [a]:hover:bg-danger/15",
        outline: "border-border bg-surface text-fg-muted shadow-xs [a]:hover:text-fg",
        ghost: "border-transparent text-fg-muted hover:bg-sunken",
        link: "border-transparent text-accent-fg underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        ...({ "data-slot": "badge" } as object),
      },
      props
    ),
    render,
  })
}

export { Badge, badgeVariants }
