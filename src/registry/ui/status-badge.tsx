"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * StatusBadge — tinted fill, hairline edge, and a status dot that carries the
 * meaning. Tones share lightness so a row of badges reads as one set.
 */
const statusBadgeVariants = cva(
  [
    "inline-flex h-[22px] items-center gap-1.5 rounded-md border px-2 text-xs font-medium whitespace-nowrap",
    "before:size-1.5 before:shrink-0 before:rounded-full before:bg-current",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "border-border bg-sunken text-fg-muted before:bg-fg-subtle",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-warning/25 bg-warning/12 text-[color-mix(in_oklch,var(--warning)_70%,var(--fg))]",
        danger: "border-danger/20 bg-danger/10 text-danger",
        accent: "border-accent-line bg-accent-soft text-accent-fg",
        info: "border-info/20 bg-info/10 text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

function StatusBadge({ className, tone, children, ...props }: React.ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants>) {
  return <span data-slot="status-badge" data-tone={tone ?? "neutral"} className={cn(statusBadgeVariants({ tone }), className)} {...props}>{children}</span>
}
export { StatusBadge, statusBadgeVariants }
