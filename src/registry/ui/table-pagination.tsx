"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function TablePagination({ page, pageCount, onPageChange, className }: {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}) {
  return (
    <div data-slot="table-pagination" className={cn("mt-3 flex items-center justify-between gap-3", className)}>
      <p className="text-xs tabular-nums text-fg-muted">Page {page} of {Math.max(pageCount, 1)}</p>
      <div className="flex gap-1">
        <Button variant="outline" size="icon-sm" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}
export { TablePagination }
