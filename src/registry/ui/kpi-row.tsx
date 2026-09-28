"use client"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

type Kpi = { label: string; value: string; delta?: number | string }

function KpiRow({
  items = [
    { label: "MRR", value: "$48k", delta: 8 },
    { label: "Active", value: "1,204", delta: 3 },
    { label: "NPS", value: "64", delta: 2 },
    { label: "Churn", value: "1.1%", delta: -0.3 },
  ],
  className,
}: {
  items?: Kpi[]
  className?: string
}) {
  return (
    <div data-slot="kpi-row" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((k) => (
        <div key={k.label} className="rounded-xl border border-border bg-surface p-4 shadow-highlight">
          <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{k.label}</p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <p className="text-2xl font-medium tabular-nums tracking-[-0.018em] text-fg">{k.value}</p>
            {typeof k.delta === "number" ? (
              <MetricDelta value={k.delta} />
            ) : k.delta ? (
              <span className="text-xs text-fg-muted">{k.delta}</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
export { KpiRow }
