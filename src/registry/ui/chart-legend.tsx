"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ChartLegend({
  items,
  className,
}: {
  items: { label: string; color?: string }[]
  className?: string
}) {
  const fallback = ["var(--accent)", "var(--success)", "var(--warning)", "var(--danger)"]
  return (
    <ul data-slot="chart-legend" className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item, i) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
          <span className="size-2 rounded-sm" style={{ background: item.color ?? fallback[i % fallback.length] }} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
export { ChartLegend }
