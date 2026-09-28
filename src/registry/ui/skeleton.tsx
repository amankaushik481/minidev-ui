"use client"
import { cn } from "@/lib/utils"

/** Skeleton — a sunken plate with a hairline sheen that sweeps once per 1.6s. */
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-sunken",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer-x_1.6s_var(--ease-hairline)_infinite]",
        "after:bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--fg)_5%,transparent),transparent)]",
        className
      )}
      aria-hidden
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div data-slot="skeleton-card" className={cn("space-y-3 rounded-xl border border-border bg-surface p-4 shadow-raised", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="mt-2 h-24 w-full" />
    </div>
  )
}

export { Skeleton, SkeletonCard }
