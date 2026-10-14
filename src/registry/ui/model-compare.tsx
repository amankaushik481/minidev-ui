"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LatencyBadge } from "@/registry/ui/latency-badge"

/** ModelCompare — a compact table of AI models by latency, cost and quality, with latency colour coded. */

type ModelRow = { name: string; latencyMs: number; cost: string; quality: string }

// Models available to the Lumen assistant, with p50 latency and price per 1M tokens.
const SAMPLE_ROWS: ModelRow[] = [
  { name: "Lumen Mini", latencyMs: 84, cost: "$0.15 / 1M", quality: "Good" },
  { name: "Lumen Pro", latencyMs: 310, cost: "$2.50 / 1M", quality: "Great" },
  { name: "Lumen Ultra", latencyMs: 940, cost: "$12.00 / 1M", quality: "Best" },
  { name: "Atlas 8B", latencyMs: 46, cost: "$0.04 / 1M", quality: "Fair" },
]

type ModelCompareProps = {
  rows?: ModelRow[]
  className?: string
}

function ModelCompare({ rows = SAMPLE_ROWS, className }: ModelCompareProps) {
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
export type { ModelCompareProps, ModelRow }
