"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type TooltipRow = { label: string; value: string }

type ChartTooltipCardProps = {
  title?: string
  rows?: TooltipRow[]
  className?: string
}

const SAMPLE_ROWS: TooltipRow[] = [
  { label: "Revenue", value: "$48,200" },
  { label: "Collected", value: "$41,650" },
  { label: "Outstanding", value: "$6,550" },
  { label: "Invoices", value: "36" },
]

/** A small raised card for chart hover details: a title and label-value rows with tabular numbers. */
function ChartTooltipCard({ title = "March 2026", rows = SAMPLE_ROWS, className }: ChartTooltipCardProps) {
  return (
    <div
      data-slot="chart-tooltip-card"
      role="status"
      className={cn(
        "min-w-40 rounded-lg border border-border bg-raised p-2.5 shadow-lg",
        className
      )}
    >
      <p className="text-xs font-medium text-fg">{title}</p>
      <ul className="mt-1.5 space-y-1">
        {rows.map((r) => (
          <li key={r.label} className="flex justify-between gap-4 text-xs">
            <span className="text-fg-muted">{r.label}</span>
            <span className="tabular-nums text-fg">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { ChartTooltipCard }
export type { ChartTooltipCardProps, TooltipRow as ChartTooltipRow }
