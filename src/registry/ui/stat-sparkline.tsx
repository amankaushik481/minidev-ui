"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"

function StatWithSparkline({
  label,
  value,
  delta,
  points,
  className,
}: {
  label: string
  value: string
  delta?: string
  points: number[]
  className?: string
}) {
  const up = delta ? !/^[-−▼]/.test(delta.trim()) : true
  return (
    <div data-slot="stat-with-sparkline" className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="p-4 pb-0">
        <p className="text-[0.8125rem] text-fg-muted">{label}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-medium tabular-nums tracking-[-0.025em] text-fg">{value}</p>
          {delta ? <span className={cn("text-xs font-medium tabular-nums", up ? "text-success" : "text-danger")}>{delta}</span> : null}
        </div>
      </div>
      <AreaChart data={points} grid={false} tone={up ? "accent" : "danger"} highlight={points.length - 1} className="mt-2 h-12" label={`${label} trend`} />
    </div>
  )
}
export { StatWithSparkline }
