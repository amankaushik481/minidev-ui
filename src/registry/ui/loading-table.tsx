"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/registry/ui/skeleton"

/**
 * LoadingTable — a skeleton table (header plus rows of shimmering cells) shown while table data loads for the first time.
 *
 * Match rows and cols to the real table to avoid layout shift. For an empty
 * result use EmptyTable, for refreshing a table that already has data use
 * LoadingOverlay, and for any other shape use Skeleton.
 *
 * @example
 * {isLoading ? <LoadingTable rows={8} cols={5} /> : <DataTable … />}
 */
type LoadingTableProps = {
  /** Body rows to draw. */
  rows?: number
  /** Columns to draw. */
  cols?: number
  /** Status message read by screen readers. */
  label?: string
  className?: string
}

function LoadingTable({ rows = 5, cols = 4, label = "Loading table", className }: LoadingTableProps) {
  const grid = { gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }
  return (
    <div
      data-slot="loading-table"
      role="status"
      aria-busy="true"
      aria-label={label}
      className={cn("w-full overflow-hidden rounded-xl border border-border", className)}
    >
      <div aria-hidden className="grid border-b border-border bg-sunken px-3 py-3" style={grid}>
        {Array.from({ length: cols }, (_, i) => (
          <Skeleton key={i} className="h-3 w-20 max-w-full" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} aria-hidden className="grid gap-3 border-b border-border px-3 py-3 last:border-b-0" style={grid}>
          {Array.from({ length: cols }, (_, c) => (
            <Skeleton key={c} className="h-3 w-28 max-w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}
export { LoadingTable }
export type { LoadingTableProps }
