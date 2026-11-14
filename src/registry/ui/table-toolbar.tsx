"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"

/**
 * The bar above a data table: a search field on the left, your filters and actions on the right.
 *
 * Search is controlled: pass `search` and update it in `onSearchChange`, then filter rows yourself.
 * Pair with Table, SortableHeader and TablePagination.
 *
 * @example
 * <TableToolbar search={q} onSearchChange={setQ} searchPlaceholder="Search invoices…">
 *   <Button size="sm">New invoice</Button>
 * </TableToolbar>
 */
type TableToolbarProps = {
  className?: string
  /** Filters and actions, right-aligned. */
  children?: React.ReactNode
  /** Current search text. */
  search?: string
  /** Called with the new search text on every keystroke. */
  onSearchChange?: (value: string) => void
  /** Placeholder for the search field. */
  searchPlaceholder?: string
  /** Accessible name for the search field. */
  searchLabel?: string
}

function TableToolbar({ className, children, search, onSearchChange, searchPlaceholder = "Search…", searchLabel = "Search table" }: TableToolbarProps) {
  return (
    <div data-slot="table-toolbar" className={cn("mb-3 flex flex-wrap items-center gap-2", className)}>
      <SearchInput
        aria-label={searchLabel}
        value={search}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className="max-w-xs"
        containerClassName="max-w-xs"
      />
      <div className="ml-auto flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
export { TableToolbar }
export type { TableToolbarProps }
