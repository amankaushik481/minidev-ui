"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { EmptyState } from "@/registry/ui/empty-state"

/**
 * EmptySearch — the "no results" state for a search or filtered list, echoing the query back.
 *
 * Use when a search or filter returns nothing. For a list that has no data
 * yet use `EmptyState` or `EmptyTable`; for a failed request use `ErrorState`.
 *
 * @example
 * <EmptySearch query={query} onClear={() => setQuery("")} />
 */
type EmptySearchProps = {
  /** The search text, quoted in the title. */
  query?: string
  /** Hint under the title. */
  description?: string
  /** When set, shows a "Clear search" button that calls it. */
  onClear?: () => void
  className?: string
}

function EmptySearch({ query, description = "Try a different query or clear filters.", onClear, className }: EmptySearchProps) {
  return (
    <div data-slot="empty-search" role="status">
      <EmptyState
        className={cn(className)}
        title={query ? `No results for “${query}”` : "No results"}
        description={description}
        actionLabel={onClear ? "Clear search" : undefined}
        onAction={onClear}
      />
    </div>
  )
}
export { EmptySearch }
export type { EmptySearchProps }
