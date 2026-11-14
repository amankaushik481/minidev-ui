"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LatencyBadge } from "@/registry/ui/latency-badge"

/**
 * ModelCompare — a compact table of AI models by latency, cost and quality, with latency colour coded.
 *
 * Exposes table semantics (role="table", rows, column headers) so screen readers can
 * move by cell. Use it on model settings or pricing pages; to choose one model use ModelPicker.
 *
 * @example
 * <ModelCompare rows={[{ name: "Mini", latencyMs: 84, cost: "$0.15 / 1M", quality: "Good" }]} />
 */

type ModelRow = {
  /** Model name; also the row key, so keep it unique. */
  name: string
  /** Typical (p50) latency in milliseconds; LatencyBadge colours it. */
  latencyMs: number
  /** Preformatted price, e.g. "$2.50 / 1M". */
  cost: string
  /** Short quality grade, e.g. "Great". */
  quality: string
}

// Models available to the Lumen assistant, with p50 latency and price per 1M tokens.
const SAMPLE_ROWS: ModelRow[] = [
  { name: "Lumen Mini", latencyMs: 84, cost: "$0.15 / 1M", quality: "Good" },
  { name: "Lumen Pro", latencyMs: 310, cost: "$2.50 / 1M", quality: "Great" },
  { name: "Lumen Ultra", latencyMs: 940, cost: "$12.00 / 1M", quality: "Best" },
  { name: "Atlas 8B", latencyMs: 46, cost: "$0.04 / 1M", quality: "Fair" },
]

type ModelCompareProps = {
  /** Models to list, in display order. */
  rows?: ModelRow[]
  className?: string
}

function ModelCompare({ rows = SAMPLE_ROWS, className }: ModelCompareProps) {
  return (
    <div data-slot="model-compare" role="table" aria-label="Model comparison" className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div role="row" className="grid grid-cols-4 gap-2 border-b border-border bg-sunken px-3 py-2 text-[11px] font-medium tracking-[0.01em] text-fg-muted uppercase">
        <span role="columnheader">Model</span><span role="columnheader">Latency</span><span role="columnheader">Cost</span><span role="columnheader">Quality</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} role="row" className="grid grid-cols-4 items-center gap-2 border-b border-border px-3 py-2.5 text-sm last:border-b-0">
          <span role="rowheader" className="font-medium text-fg">{r.name}</span>
          <span role="cell"><LatencyBadge ms={r.latencyMs} /></span>
          <span role="cell" className="tabular-nums text-fg-muted">{r.cost}</span>
          <span role="cell" className="text-fg-muted">{r.quality}</span>
        </div>
      ))}
    </div>
  )
}
export { ModelCompare }
export type { ModelCompareProps, ModelRow }
