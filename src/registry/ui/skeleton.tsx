"use client"
import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-lg bg-border/80",
        className
      )}
      aria-hidden
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div data-slot="skeleton-card" className={cn("space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="mt-2 h-24 w-full" />
    </div>
  )
}

export { Skeleton, SkeletonCard }
