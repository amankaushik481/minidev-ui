"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/registry/ui/skeleton"

function LoadingTable({ rows=5, cols=4, className }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div data-slot="loading-table" className={cn("w-full overflow-hidden rounded-xl border border-border", className)} role="status" aria-busy="true" aria-label="Loading table">
      <div className="grid gap-0">
        <div className="grid border-b border-border bg-sunken px-3 py-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} className="h-3 w-20" />)}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="grid border-b border-border px-3 py-3 last:border-b-0" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
            {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className="h-3 w-28" />)}
          </div>
        ))}
      </div>
    </div>
  )
}
export { LoadingTable }
