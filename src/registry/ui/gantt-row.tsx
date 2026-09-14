"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function GanttRow({
  label,
  start,
  end,
  max = 100,
  className,
}: {
  label: string
  start: number
  end: number
  max?: number
  className?: string
}) {
  const left = (start / max) * 100
  const width = ((end - start) / max) * 100
  return (
    <div data-slot="gantt-row" className={cn("grid grid-cols-[140px_1fr] items-center gap-3", className)}>
      <span className="truncate text-sm text-fg">{label}</span>
      <div className="relative h-8 rounded-lg bg-sunken">
        <div
          className="absolute top-1 bottom-1 rounded-md bg-accent/80"
          style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
        />
      </div>
    </div>
  )
}
export { GanttRow }
