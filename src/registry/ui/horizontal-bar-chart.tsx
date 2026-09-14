"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function HorizontalBarChart({
  data,
  className,
  label = "Horizontal bar chart",
}: {
  data: { label: string; value: number }[]
  className?: string
  label?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div data-slot="horizontal-bar-chart" role="img" aria-label={label} className={cn("space-y-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[88px_1fr_40px] items-center gap-2">
          <span className="truncate text-xs text-fg-muted">{d.label}</span>
          <div className="h-2 overflow-hidden rounded-full bg-sunken">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
          <span className="text-right text-xs tabular-nums text-fg">{d.value}</span>
        </div>
      ))}
    </div>
  )
}
export { HorizontalBarChart }
