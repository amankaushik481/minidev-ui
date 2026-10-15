"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Skeleton, SkeletonCard } from "@/registry/ui/skeleton"
import type { Example } from "./types"

function LoadingToggle() {
  const [loading, setLoading] = React.useState(true)
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-raised">
        {loading ? (
          <>
            <Skeleton className="size-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </>
        ) : (
          <>
            <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-xs font-medium text-accent-fg">MC</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-fg">Maya Chen</p>
              <p className="text-xs text-fg-muted">maya@northwind.com</p>
            </div>
          </>
        )}
      </div>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setLoading((v) => !v)}>
        {loading ? "Show content" : "Show skeleton"}
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Shapes",
    description: "Size and round it with utilities; the sheen sweeps every shape the same way.",
    code: `<Skeleton className="size-10 rounded-full" />
<Skeleton className="h-4 w-48" />
<Skeleton className="h-9 w-24 rounded-lg" />`,
    node: (
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    ),
  },
  {
    title: "List rows",
    description: "Match the layout of the rows you are about to show, so nothing jumps when data lands.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  {[0, 1, 2].map((i) => (
    <li key={i} className="flex items-center gap-3 px-3 py-2.5">
      <Skeleton className="size-8 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-5 w-12 rounded-full" />
    </li>
  ))}
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex items-center gap-3 px-3 py-2.5">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Card placeholder",
    description: "SkeletonCard is a ready made stand in for a card with a title, two lines and a chart area.",
    code: `<SkeletonCard className="w-full max-w-sm" />`,
    node: <SkeletonCard className="w-full max-w-sm" />,
  },
  {
    title: "Swap in content",
    description: "Render the skeleton while loading and the real row after; both use the same box.",
    code: `function LoadingToggle() {
  const [loading, setLoading] = React.useState(true)
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-raised">
        {loading ? (
          <>
            <Skeleton className="size-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </>
        ) : (
          <>
            <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-xs font-medium text-accent-fg">MC</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-fg">Maya Chen</p>
              <p className="text-xs text-fg-muted">maya@northwind.com</p>
            </div>
          </>
        )}
      </div>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setLoading((v) => !v)}>
        {loading ? "Show content" : "Show skeleton"}
      </Button>
    </div>
  )
}`,
    node: <LoadingToggle />,
  },
]
