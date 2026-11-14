"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Pagination — Previous / page numbers / Next controls for a paged list, with ellipses for long ranges.
 *
 * Always shows the first and last page plus the current page's neighbours, and keeps a
 * constant seven slots so the bar never changes width as you page. The current page
 * has aria-current="page"; every button has a spoken label ("Page 4"). The component
 * is controlled: keep `page` in state (1-based) and update it in onPageChange.
 * For infinite feeds use a "Load more" button instead.
 *
 * @example
 * const [page, setPage] = React.useState(1)
 * <Pagination page={page} pageCount={Math.ceil(total / pageSize)} onPageChange={setPage} />
 */
type PaginationProps = {
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. Zero or one hides nothing but disables both arrows. */
  pageCount: number
  /** Fires with the requested 1-based page. */
  onPageChange: (p: number) => void
  className?: string
}

type Slot = number | "start-gap" | "end-gap"

// shortcut: one sibling each side of the current page; add a siblingCount prop if a wider window is ever needed.
function pageSlots(page: number, count: number): Slot[] {
  if (count <= 7) return Array.from({ length: Math.max(0, count) }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, "end-gap", count]
  if (page >= count - 3) return [1, "start-gap", count - 4, count - 3, count - 2, count - 1, count]
  return [1, "start-gap", page - 1, page, page + 1, "end-gap", count]
}

function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  return (
    <nav data-slot="pagination" aria-label="Pagination" className={cn("flex flex-wrap items-center gap-1", className)}>
      <Button size="sm" variant="outline" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeftIcon aria-hidden />
        <span className="max-sm:sr-only">Prev</span>
      </Button>
      {pageSlots(page, pageCount).map((p) =>
        typeof p === "number" ? (
          <Button
            key={p}
            size="sm"
            variant={p === page ? "default" : "outline"}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className="min-w-8 tabular-nums"
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ) : (
          <span key={p} aria-hidden className="inline-flex h-8 min-w-8 items-center justify-center text-sm text-fg-subtle">
            …
          </span>
        )
      )}
      <Button size="sm" variant="outline" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        <span className="max-sm:sr-only">Next</span>
        <ChevronRightIcon aria-hidden />
      </Button>
    </nav>
  )
}
export { Pagination }
export type { PaginationProps }
