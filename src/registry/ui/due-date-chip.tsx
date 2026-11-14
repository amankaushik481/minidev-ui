"use client"
import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * DueDateChip — a small calendar chip for a task or invoice due date, with a danger edge when overdue.
 *
 * Use inside issue cards, table cells and list rows. For a relative time
 * ("3 days ago") use `RelativeTime`; for a general status label use
 * `StatusBadge`. The overdue state is announced to screen readers, not only
 * shown in colour.
 *
 * @example
 * <DueDateChip date="Nov 30" />
 * <DueDateChip date="Oct 2" overdue />
 */
type DueDateChipProps = {
  /** Display text for the date, already formatted, e.g. "Nov 30". */
  date: string
  /** Mark the date as past due. */
  overdue?: boolean
  className?: string
}

function DueDateChip({ date, overdue, className }: DueDateChipProps) {
  return (
    <span
      data-slot="due-date-chip"
      data-overdue={overdue || undefined}
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-md border bg-surface px-2 text-xs font-medium text-fg tabular-nums",
        overdue ? "border-danger" : "border-border",
        className
      )}
    >
      <CalendarIcon className={cn("size-3", overdue ? "text-danger" : "text-fg-muted")} aria-hidden />
      <span className="sr-only">{overdue ? "Overdue, due " : "Due "}</span>
      {date}
    </span>
  )
}
export { DueDateChip }
export type { DueDateChipProps }
