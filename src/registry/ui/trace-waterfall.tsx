"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A distributed-trace waterfall: one row per span with its name (indented by depth), a bar placed on a shared time axis, and its duration.
 *
 * Times are in milliseconds from the start of the trace. Use it for request traces and agent step timing. Use `GanttChart` for calendar schedules and `AgentTrace` for a step-by-step agent run.
 *
 * @example
 * <TraceWaterfall spans={[{ name: "POST /invoices", start: 0, duration: 120 }, { name: "db.insert", start: 18, duration: 40, depth: 1 }]} />
 */
type TraceSpan = {
  name: string
  /** Offset from the trace start, in ms. */
  start: number
  /** Length, in ms. */
  duration: number
  /** Nesting level; each level indents the name by 12px. */
  depth?: number
}

type TraceWaterfallProps = {
  /** Spans in display order. Defaults to a four-span API request. */
  spans?: TraceSpan[]
  className?: string
}

const SAMPLE_SPANS: TraceSpan[] = [
  { name: "GET /api/invoices", start: 0, duration: 100, depth: 0 },
  { name: "auth", start: 4, duration: 18, depth: 1 },
  { name: "db.query", start: 24, duration: 40, depth: 1 },
  { name: "render", start: 68, duration: 28, depth: 1 },
]

function TraceWaterfall({ spans = SAMPLE_SPANS, className }: TraceWaterfallProps) {
  const total = Math.max(...spans.map((s) => s.start + s.duration), 1)
  return (
    <ul data-slot="trace-waterfall" aria-label="Trace spans" className={cn("space-y-1.5 rounded-xl border border-border bg-surface p-3", className)}>
      {spans.map((s, i) => (
        <li key={`${i}-${s.name}`} className="grid grid-cols-[140px_1fr_48px] items-center gap-2 text-xs">
          <span className="truncate font-mono text-fg" style={{ paddingLeft: (s.depth ?? 0) * 12 }}>
            {s.name}
            <span className="sr-only">, starts at {s.start}ms</span>
          </span>
          <div aria-hidden className="relative h-5 rounded bg-sunken">
            <div className="absolute inset-y-0.5 rounded-sm bg-accent" style={{ left: `${(s.start / total) * 100}%`, width: `max(2px, ${(s.duration / total) * 100}%)` }} />
          </div>
          <span className="text-right tabular-nums text-fg-muted">{s.duration}ms</span>
        </li>
      ))}
    </ul>
  )
}
export { TraceWaterfall }
export type { TraceWaterfallProps, TraceSpan }
