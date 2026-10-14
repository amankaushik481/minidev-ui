"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

type Stat = { label: string; value: string; delta?: number }

type AdminStatStripProps = {
  stats?: Stat[]
  className?: string
}

const SAMPLE_STATS: Stat[] = [
  { label: "Active users", value: "2,418", delta: 12 },
  { label: "MRR", value: "$48,200", delta: 8 },
  { label: "Invoices paid", value: "212", delta: 5 },
  { label: "Trial conversion", value: "18%", delta: -3 },
]

/** A row of admin KPIs with label, value and a delta, four up on desktop. */
function AdminStatStrip({ stats = SAMPLE_STATS, className }: AdminStatStripProps) {
  return (
    <div data-slot="admin-stat-strip" className={cn("grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
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
export type { AdminStatStripProps, Stat as AdminStat }
