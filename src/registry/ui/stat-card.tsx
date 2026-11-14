"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function deltaTone(delta: React.ReactNode) {
  if (typeof delta !== "string") return "neutral"
  const s = delta.trim()
  if (s.startsWith("+") || s.startsWith("▲")) return "up"
  if (s.startsWith("-") || s.startsWith("−") || s.startsWith("▼")) return "down"
  return "neutral"
}

/**
 * StatCard — label, a big tabular value, and a delta chip that colours itself.
 *
 * The delta tone comes from its leading sign: "+", "▲" read as up (success), "-", "−", "▼" as
 * down (danger); set `invertDelta` where down is good. For a value with a trend line use
 * StatSparkline; for several numbers in one row use StatsStrip.
 *
 * @example
 * <StatCard label="MRR" value="$48,200" delta="+8.2%" footnote="vs last month" />
 * <StatCard label="p95 latency" value="182 ms" delta="-12%" invertDelta />
 */
type StatCardProps = {
  /** Metric name. */
  label: React.ReactNode
  /** Pre-formatted value, e.g. "$48,200". */
  value: React.ReactNode
  /** Change as a signed string, e.g. "+8.2%" or "−3". */
  delta?: React.ReactNode
  /** Small icon before the label. */
  icon?: React.ReactNode
  /** Muted line under the value, e.g. "vs last month". */
  footnote?: React.ReactNode
  /** For metrics where down is good (churn, latency). */
  invertDelta?: boolean
  className?: string
}

function StatCard({
  label,
  value,
  delta,
  icon,
  footnote,
  invertDelta,
  className,
}: StatCardProps) {
  let tone = deltaTone(delta)
  if (invertDelta && tone !== "neutral") tone = tone === "up" ? "down" : "up"
  return (
    <div data-slot="stat-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-raised", className)}>
      <div className="flex items-center gap-2 text-sm text-fg-muted">
        {icon ? <span aria-hidden className="text-fg-subtle [&_svg]:size-3.5">{icon}</span> : null}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        <p className="text-2xl font-medium tracking-[-0.025em] tabular-nums text-fg">{value}</p>
        {delta ? (
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-2xs font-medium tabular-nums",
              tone === "up" && "bg-success/10 text-success",
              tone === "down" && "bg-danger/10 text-danger",
              tone === "neutral" && "bg-sunken text-fg-muted"
            )}
          >
            {delta}
          </span>
        ) : null}
      </div>
      {footnote ? <p className="mt-1.5 text-xs text-fg-subtle">{footnote}</p> : null}
    </div>
  )
}
export { StatCard }
export type { StatCardProps }
