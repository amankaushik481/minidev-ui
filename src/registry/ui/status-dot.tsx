"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

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

function StatusDot({ className, tone, ...props }: React.ComponentProps<"span"> & VariantProps<typeof statusDotVariants>) {
  return <span data-slot="status-dot" aria-hidden className={cn(statusDotVariants({ tone }), className)} {...props} />
}
export { StatusDot, statusDotVariants }
