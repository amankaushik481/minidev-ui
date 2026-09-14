"use client"
import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function DueDateChip({
  date,
  overdue,
  className,
}: {
  date: string
  overdue?: boolean
  className?: string
}) {
  return (
    <span
      data-slot="due-date-chip"
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-md border px-2 text-xs font-medium",
        overdue
          ? "border-danger bg-surface text-fg"
          : "border-border bg-surface text-fg",
        className
      )}
    >
      <CalendarIcon className={cn("size-3", overdue ? "text-danger" : "text-fg-muted")} aria-hidden />
      {date}
    </span>
  )
}
export { DueDateChip }
