"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

/**
 * A row of admin KPIs with label, value and a percentage delta, four up on desktop.
 *
 * Use at the top of an admin or analytics page. Prefer `StatCard` for a single, larger KPI with a
 * sparkline. Marked up as a description list (label → value) so screen readers pair them.
 *
 * @example
 * <AdminStatStrip stats={[{ label: "MRR", value: "$48,200", delta: 8 }, { label: "Churn", value: "2.1%", delta: -3 }]} />
 */
type Stat = {
  /** Short metric name, e.g. "Active users". */
  label: string
  /** Pre-formatted value, e.g. "$48,200". Rendered with tabular numbers. */
  value: string
  /** Change in percent; positive renders green with an up arrow, negative red. Omit to hide. */
  delta?: number
}

type AdminStatStripProps = {
  /** KPIs to show, in order. Omit for sample data. */
  stats?: Stat[]
  className?: string
}

const SAMPLE_STATS: Stat[] = [
  { label: "Active users", value: "2,418", delta: 12 },
  { label: "MRR", value: "$48,200", delta: 8 },
  { label: "Invoices paid", value: "212", delta: 5 },
  { label: "Trial conversion", value: "18%", delta: -3 },
]

function AdminStatStrip({ stats = SAMPLE_STATS, className }: AdminStatStripProps) {
  return (
    <dl data-slot="admin-stat-strip" className={cn("grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
          <dt className="text-xs text-fg-muted">{s.label}</dt>
          <dd className="mt-1 flex items-end justify-between gap-2">
            <span className="text-xl font-medium tabular-nums text-fg">{s.value}</span>
            {s.delta != null ? (
              <span>
                <span className="sr-only">{s.delta >= 0 ? "up" : "down"}</span>
                <MetricDelta value={s.delta} />
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
export { AdminStatStrip }
export type { AdminStatStripProps, Stat as AdminStat }
