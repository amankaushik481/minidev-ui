"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-xs font-medium tracking-[0.01em]",
  {
    variants: {
      tone: {
        neutral: "border-border bg-sunken text-fg",
        success: "border-transparent bg-success text-primary-foreground",
        warning: "border-transparent bg-warning text-[oklch(0.22_0.05_75)]",
        danger: "border-transparent bg-danger text-primary-foreground",
        accent: "border-transparent bg-accent text-primary-foreground",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

function StatusBadge({ className, tone, children, ...props }: React.ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants>) {
  return <span data-slot="status-badge" className={cn(statusBadgeVariants({ tone }), className)} {...props}>{children}</span>
}
export { StatusBadge, statusBadgeVariants }
