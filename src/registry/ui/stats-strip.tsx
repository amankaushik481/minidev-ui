"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A hairline-divided row of headline numbers, for landing pages and report headers.
 *
 * Marked up as a description list so each value is read with its label. Use real, sourced
 * figures only. For dashboard metrics with deltas use StatCard; with trend lines, SparklineSet.
 *
 * @example
 * <StatsStrip stats={[{ label: "Components", value: "300+" }, { label: "Dependencies", value: "2" }]} />
 */
type Stat = {
  /** What the number counts. */
  label: string
  /** Pre-formatted figure, e.g. "98.2%". */
  value: string
}

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
    <dl
      data-slot="stats-strip"
      className={cn(
        "grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
        className
      )}
    >
      {stats.map((s, i) => (
        // label first in the DOM so it is read first; flex-col-reverse puts the number on top
        <div key={`${s.label}-${i}`} className="flex flex-col-reverse bg-surface px-4 py-5 text-center">
          <dt className="mt-1 text-xs text-fg-muted">{s.label}</dt>
          <dd className="text-2xl font-medium tracking-[-0.018em] text-fg tabular-nums">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
export { StatsStrip }
export type { StatsStripProps, Stat }
