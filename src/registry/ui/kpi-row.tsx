"use client"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

/**
 * KpiRow — a responsive row of headline numbers, each with a label, a value and an optional change.
 *
 * Use it at the top of a dashboard for three to six metrics. For one metric
 * with more detail use StatCard, for a metric with a trend line use
 * StatSparkline, and for a slim inline band use StatsStrip.
 *
 * @example
 * <KpiRow items={[
 *   { label: "MRR", value: "$48k", delta: 8 },
 *   { label: "Churn", value: "1.1%", delta: -0.3, invert: true },
 * ]} />
 */
type Kpi = {
  label: string
  /** Preformatted value, for example "$48k". */
  value: string
  /** A number renders as a percent change with an arrow; a string renders as muted text, for example "vs last week". */
  delta?: number | string
  /** Down is good for this metric (churn, latency, cost): negative deltas turn green. */
  invert?: boolean
}

type KpiRowProps = {
  /** The metrics, in order. Defaults to four sample SaaS metrics. */
  items?: Kpi[]
  className?: string
}

function KpiRow({
  items = [
    { label: "MRR", value: "$48k", delta: 8 },
    { label: "Active", value: "1,204", delta: 3 },
    { label: "NPS", value: "64", delta: 2 },
    { label: "Churn", value: "1.1%", delta: -0.3, invert: true },
  ],
  className,
}: KpiRowProps) {
  return (
    <dl data-slot="kpi-row" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((k) => (
        <div key={k.label} className="rounded-xl border border-border bg-surface p-4 shadow-highlight">
          <dt className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{k.label}</dt>
          <dd className="mt-2 flex items-end justify-between gap-2">
            <span className="text-2xl font-medium tabular-nums tracking-[-0.018em] text-fg">{k.value}</span>
            {typeof k.delta === "number" ? (
              <MetricDelta value={k.delta} invert={k.invert} />
            ) : k.delta ? (
              <span className="text-xs text-fg-muted">{k.delta}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
export { KpiRow }
export type { KpiRowProps, Kpi }
