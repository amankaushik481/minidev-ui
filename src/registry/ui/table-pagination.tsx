"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Previous/next pagination for a data table, with a "Page 2 of 9" readout.
 *
 * Pages are 1-based and controlled: keep `page` in state and set it in `onPageChange`.
 * A `page` outside 1..pageCount is shown and stepped from the nearest valid page.
 * Page changes are announced to screen readers. For numbered page links on content
 * pages use Pagination.
 *
 * @example
 * <TablePagination page={page} pageCount={Math.ceil(total / 20)} onPageChange={setPage} />
 */
type TablePaginationProps = {
  /** Current page, 1-based. Clamped to 1..pageCount for display and stepping. */
  page: number
  /** Total pages; 0 is shown as 1. */
  pageCount: number
  /** Called with the requested page number. */
  onPageChange: (page: number) => void
  className?: string
}

function TablePagination({ page, pageCount, onPageChange, className }: TablePaginationProps) {
  const last = Math.max(pageCount, 1)
  const p = Math.min(Math.max(page, 1), last)
  return (
    <nav aria-label="Pagination" data-slot="table-pagination" className={cn("mt-3 flex items-center justify-between gap-3", className)}>
      <p aria-live="polite" className="text-xs tabular-nums text-fg-muted">Page {p} of {last}</p>
      <div className="flex gap-1">
        <Button variant="outline" size="icon-sm" aria-label="Previous page" disabled={p <= 1} onClick={() => onPageChange(p - 1)}>
          <ChevronLeftIcon aria-hidden />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page" disabled={p >= last} onClick={() => onPageChange(p + 1)}>
          <ChevronRightIcon aria-hidden />
        </Button>
      </div>
    </nav>
  )
}
export { TablePagination }
export type { TablePaginationProps }
