"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Span = { name: string; start: number; duration: number; depth?: number }

function TraceWaterfall({
  spans = [
    { name: "GET /api/gallery", start: 0, duration: 100, depth: 0 },
    { name: "auth", start: 4, duration: 18, depth: 1 },
    { name: "db.query", start: 24, duration: 40, depth: 1 },
    { name: "render", start: 68, duration: 28, depth: 1 },
  ],
  className,
}: {
  spans?: Span[]
  className?: string
}) {
  const total = Math.max(...spans.map((s) => s.start + s.duration), 1)
  return (
    <div data-slot="trace-waterfall" className={cn("space-y-1.5 rounded-xl border border-border bg-surface p-3", className)}>
      {spans.map((s) => (
        <div key={s.name} className="grid grid-cols-[140px_1fr_48px] items-center gap-2 text-xs">
          <span className="truncate font-mono text-fg" style={{ paddingLeft: (s.depth ?? 0) * 12 }}>{s.name}</span>
          <div className="relative h-5 rounded bg-sunken">
            <div
              className="absolute inset-y-0.5 rounded-sm bg-accent/70"
              style={{ left: `${(s.start / total) * 100}%`, width: `${(s.duration / total) * 100}%` }}
            />
          </div>
          <span className="text-right tabular-nums text-fg-muted">{s.duration}ms</span>
        </div>
      ))}
    </div>
  )
}
export { TraceWaterfall }
