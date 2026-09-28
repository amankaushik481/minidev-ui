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

/** StatCard — label, a big tabular value, and a delta chip that colours itself. */
function StatCard({
  label,
  value,
  delta,
  icon,
  footnote,
  invertDelta,
  className,
}: {
  label: React.ReactNode
  value: React.ReactNode
  delta?: React.ReactNode
  icon?: React.ReactNode
  footnote?: React.ReactNode
  /** For metrics where down is good (churn, latency). */
  invertDelta?: boolean
  className?: string
}) {
  let tone = deltaTone(delta)
  if (invertDelta && tone !== "neutral") tone = tone === "up" ? "down" : "up"
  return (
    <div data-slot="stat-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-raised", className)}>
      <div className="flex items-center gap-2 text-[0.8125rem] text-fg-muted">
        {icon ? <span className="text-fg-subtle [&_svg]:size-3.5">{icon}</span> : null}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        <p className="text-2xl font-medium tracking-[-0.025em] tabular-nums text-fg">{value}</p>
        {delta ? (
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
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
