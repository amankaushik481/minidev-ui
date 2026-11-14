"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Skeleton — a sunken plate with a hairline sheen that sweeps once per 1.6s, standing in for content while it loads.
 *
 * Size it with className to match the content it replaces (zero layout shift when the data lands).
 * Skeletons are aria-hidden: mark the loading region `aria-busy="true"` and give it a status label.
 * Use Spinner for a short action in a button; use SkeletonCard for a whole card placeholder.
 *
 * @example
 * <div aria-busy="true" aria-label="Loading invoices">
 *   <Skeleton className="h-4 w-1/3" />
 *   <Skeleton className="mt-2 h-3 w-full" />
 * </div>
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-sunken",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer-x_1.6s_var(--ease-hairline)_infinite] motion-reduce:after:hidden",
        "after:bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--fg)_5%,transparent),transparent)]",
        className
      )}
      {...props}
    />
  )
}

/** A card-shaped placeholder: title line, two text lines and a media block. */
function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="skeleton-card" aria-hidden className={cn("space-y-3 rounded-xl border border-border bg-surface p-4 shadow-raised", className)} {...props}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="mt-2 h-24 w-full" />
    </div>
  )
}

export { Skeleton, SkeletonCard }
