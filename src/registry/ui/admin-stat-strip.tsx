"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

type Stat = { label: string; value: string; delta?: number }

function AdminStatStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <div data-slot="admin-stat-strip" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-fg-muted">{s.label}</p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p className="text-xl font-medium tabular-nums text-fg">{s.value}</p>
            {s.delta != null ? <MetricDelta value={s.delta} /> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
export { AdminStatStrip }
