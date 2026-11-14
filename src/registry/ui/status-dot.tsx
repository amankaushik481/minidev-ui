"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * An 8px coloured dot for status beside text: online, degraded, failed.
 *
 * Decorative by default (the adjacent text says the status). When the dot stands alone,
 * pass `label` so screen readers hear it. For a dot inside a pill use StatusBadge.
 *
 * @example
 * <span className="inline-flex items-center gap-2"><StatusDot tone="success" /> Operational</span>
 * <StatusDot tone="danger" label="Offline" />
 */
const statusDotVariants = cva("inline-block size-2 shrink-0 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-fg-muted",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
      accent: "bg-accent",
    },
  },
  defaultVariants: { tone: "neutral" },
})

type StatusDotProps = React.ComponentProps<"span"> & VariantProps<typeof statusDotVariants> & {
  /** Accessible name when the dot is shown without text; leave out when text sits beside it. */
  label?: string
}

function StatusDot({ className, tone, label, ...props }: StatusDotProps) {
  return (
    <span
      data-slot="status-dot"
      data-tone={tone ?? "neutral"}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={cn(statusDotVariants({ tone }), className)}
      {...props}
    />
  )
}
export { StatusDot, statusDotVariants }
export type { StatusDotProps }
