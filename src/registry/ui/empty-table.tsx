"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * EmptyTable — a sunken placeholder for a table or data grid with no rows yet, with an optional create action.
 *
 * Use in place of the table body when the collection is empty. For a whole
 * empty page use `EmptyState`; for zero filter matches use `EmptySearch`;
 * while rows load use `LoadingTable`.
 *
 * @example
 * <EmptyTable title="No customers yet" actionLabel="Add customer" onAction={openCreate} />
 */
type EmptyTableProps = {
  /** One short line saying what is empty. */
  title?: string
  /** What to do next. */
  description?: string
  /** Label of the create button. The button only renders when this is set. */
  actionLabel?: string
  /** Called by the create button. */
  onAction?: () => void
  className?: string
}

function EmptyTable({
  title = "No data yet",
  description = "Create your first row to get started.",
  actionLabel,
  onAction,
  className,
}: EmptyTableProps) {
  return (
    <div
      data-slot="empty-table"
      className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-sunken px-6 py-16 text-center", className)}
    >
      <h3 className="text-sm font-medium text-balance text-fg">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-pretty text-fg-muted">{description}</p>
      {actionLabel ? (
        <Button type="button" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
export { EmptyTable }
export type { EmptyTableProps }
