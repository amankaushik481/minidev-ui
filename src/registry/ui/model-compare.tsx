"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LatencyBadge } from "@/registry/ui/latency-badge"

type ModelRow = { name: string; latencyMs: number; cost: string; quality: string }

function ModelCompare({ rows, className }: { rows: ModelRow[]; className?: string }) {
  return (
    <div data-slot="model-compare" className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div className="grid grid-cols-4 gap-2 border-b border-border bg-sunken px-3 py-2 text-[11px] font-medium tracking-[0.01em] text-fg-muted uppercase">
        <span>Model</span><span>Latency</span><span>Cost</span><span>Quality</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-4 items-center gap-2 border-b border-border px-3 py-2.5 text-sm last:border-b-0">
          <span className="font-medium text-fg">{r.name}</span>
          <LatencyBadge ms={r.latencyMs} />
          <span className="tabular-nums text-fg-muted">{r.cost}</span>
          <span className="text-fg-muted">{r.quality}</span>
        </div>
      ))}
    </div>
  )
}
export { ModelCompare }
