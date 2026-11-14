"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * GanttRow — one labelled timeline row with a bar placed from `start` to `end` on a 0..max scale.
 *
 * Use for a lightweight schedule built from a few rows (sprints, rollouts)
 * where positions are plain numbers such as day indexes or percentages. For
 * real dates, dependencies, scales and a today line use `GanttChart`; for
 * nested spans of a trace use `TraceWaterfall`.
 *
 * @example
 * <GanttRow label="Billing API" start={10} end={45} />
 * <GanttRow label="QA" start={20} end={26} max={30} />
 */
type GanttRowProps = {
  /** Task name in the left column. */
  label: string
  /** Bar start on the 0..max scale. */
  start: number
  /** Bar end on the 0..max scale. */
  end: number
  /** Length of the whole scale. */
  max?: number
  className?: string
}

function GanttRow({ label, start, end, max = 100, className }: GanttRowProps) {
  const span = max > 0 ? max : 1
  const s = Math.max(0, Math.min(span, start))
  const e = Math.max(s, Math.min(span, end))
  const left = (s / span) * 100
  const width = ((e - s) / span) * 100
  return (
    <div data-slot="gantt-row" className={cn("grid grid-cols-[140px_1fr] items-center gap-3", className)}>
      <span className="truncate text-sm text-fg">{label}</span>
      <div className="relative h-8 rounded-lg bg-sunken">
        <span className="sr-only">
          {start} to {end} of {max}
        </span>
        <div aria-hidden className="absolute top-1 bottom-1 rounded-md bg-accent" style={{ left: `${left}%`, width: `${Math.min(Math.max(width, 2), 100 - left)}%` }} />
      </div>
    </div>
  )
}
export { GanttRow }
export type { GanttRowProps }
