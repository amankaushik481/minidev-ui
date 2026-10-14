"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A hairline-divided row of headline numbers, for landing pages and report headers. */
type Stat = { label: string; value: string }

type StatsStripProps = {
  /** Headline figures, four reads best. Defaults to Lumen's company stats. */
  stats?: Stat[]
  className?: string
}

const SAMPLE_STATS: Stat[] = [
  { label: "Finance teams", value: "2,400+" },
  { label: "Invoices processed", value: "$1.2B" },
  { label: "Paid on time", value: "98.2%" },
  { label: "Uptime", value: "99.99%" },
]

function StatsStrip({ stats = SAMPLE_STATS, className }: StatsStripProps) {
  return (
    <div
      data-slot="stats-strip"
      className={cn(
        "grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-4 py-5 text-center">
          <div className="text-2xl font-medium tracking-[-0.018em] text-fg tabular-nums">{s.value}</div>
          <div className="mt-1 text-xs text-fg-muted">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
export { StatsStrip }
export type { StatsStripProps, Stat }
