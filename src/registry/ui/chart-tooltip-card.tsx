"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ChartTooltipCard({
  title,
  rows,
  className,
}: {
  title: string
  rows: { label: string; value: string }[]
  className?: string
}) {
  return (
    <div
      data-slot="chart-tooltip-card"
      role="status"
      className={cn(
        "min-w-40 rounded-lg border border-border bg-raised p-2.5 shadow-[0_8px_24px_oklch(0.35_0.02_250/0.12)]",
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
