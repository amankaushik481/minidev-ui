"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Stat = { label: string; value: string }

function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <div
      data-slot="stats-strip"
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
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
