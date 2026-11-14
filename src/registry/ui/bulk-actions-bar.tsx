"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A floating bar that appears when table rows are selected: "3 selected", your action buttons and Clear.
 *
 * Render it under a selectable `DataTable` or list and pass the selection size as `count`; it
 * renders nothing at 0. Sticky to the bottom of its scroll container. The count is a live region,
 * so changes are announced; the bar itself is a labelled region.
 *
 * @example
 * <BulkActionsBar count={selected.length} onClear={() => setSelected([])}>
 *   <Button size="sm" variant="outline">Export</Button>
 *   <Button size="sm" variant="destructive">Delete</Button>
 * </BulkActionsBar>
 */
type BulkActionsBarProps = {
  /** Number of selected items. The bar is hidden at 0. */
  count: number
  /** Action buttons, usually `Button size="sm"`. */
  children?: React.ReactNode
  /** Shows a Clear button and is called when it is pressed. */
  onClear?: () => void
  /** Accessible name of the bar. */
  label?: string
  className?: string
}

function BulkActionsBar({ count, children, onClear, label = "Bulk actions", className }: BulkActionsBarProps) {
  if (count <= 0) return null
  return (
    <div
      data-slot="bulk-actions-bar"
      role="region"
      aria-label={label}
      className={cn(
        "sticky bottom-4 z-40 mx-auto flex w-fit items-center gap-3 rounded-xl border border-border bg-raised px-3 py-2",
        "shadow-lg",
        className
      )}
    >
      <span role="status" className="text-sm font-medium text-fg tabular-nums">{count} selected</span>
      <div className="flex items-center gap-1.5">{children}</div>
      {onClear ? (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}
export { BulkActionsBar }
export type { BulkActionsBarProps }
