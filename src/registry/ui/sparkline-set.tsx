"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"
import { MetricDelta } from "@/registry/ui/metric-delta"

function SparklineSet({
  items,
  className,
}: {
  items: { label: string; value: string; delta: number; data: number[] }[]
  className?: string
}) {
  return (
    <div data-slot="sparkline-set" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-fg-muted">{item.label}</span>
            <MetricDelta value={item.delta} />
          </div>
          <p className="mt-1 text-lg font-medium tabular-nums text-fg">{item.value}</p>
          <AreaChart data={item.data} label={item.label} className="mt-2 h-16" />
        </div>
      ))}
    </div>
  )
}
export { SparklineSet }
