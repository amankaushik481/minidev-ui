"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * LogsViewer — a log panel: text filter and level switch over a scrollable, monospaced list of timestamped lines.
 *
 * Use for job, sync or request logs inside an ops screen. Filtering is client-side over the lines you pass in;
 * for streaming or server-side search, filter upstream and keep the markup. For a structured audit trail use
 * AuditLogEntry; for build steps use BuildPipeline.
 *
 * @example
 * <LogsViewer className="h-96" />
 */
type LogLevel = "info" | "warn" | "error"

type LogsViewerProps = {
  className?: string
}

const LOGS: { id: string; level: LogLevel; time: string; msg: string }[] = [
  { id: "l1", level: "info", time: "14:02:41", msg: "sync.stripe ok events=1,284 duration=3.1s" },
  { id: "l2", level: "warn", time: "14:02:07", msg: "anomaly.refunds +220% vs baseline batch=4411" },
  { id: "l3", level: "info", time: "14:01:58", msg: "alert.slack sent channel=#finance id=al_9f2c" },
  { id: "l4", level: "error", time: "14:00:12", msg: "sync.hubspot 429 rate limited, retry in 30s" },
  { id: "l5", level: "info", time: "14:00:42", msg: "sync.hubspot ok deals=2,104 after 1 retry" },
  { id: "l6", level: "info", time: "13:59:30", msg: "baseline.mrr rebuilt window=90d" },
]

const TONE = { info: "neutral", warn: "warning", error: "danger" } as const

function LogsViewer({ className }: LogsViewerProps) {
  const [q, setQ] = React.useState("")
  const [level, setLevel] = React.useState<"all" | LogLevel>("all")
  const headingId = React.useId()
  const needle = q.trim().toLowerCase()
  const rows = LOGS.filter((l) => (level === "all" || l.level === level) && (!needle || l.msg.toLowerCase().includes(needle)))
  return (
    <section
      data-slot="logs-viewer"
      aria-labelledby={headingId}
      className={cn("flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <h2 id={headingId} className="mr-auto text-sm font-medium text-fg">
          Sync logs
        </h2>
        <SegmentedControl
          size="sm"
          aria-label="Level"
          value={level}
          onChange={(v) => setLevel(v as "all" | LogLevel)}
          options={[
            { value: "all", label: "All" },
            { value: "warn", label: "Warn" },
            { value: "error", label: "Error" },
          ]}
        />
        <SearchInput size="sm" aria-label="Filter logs" placeholder="Filter…" value={q} onChange={(e) => setQ(e.target.value)} containerClassName="w-full sm:w-48" />
      </div>
      <p aria-live="polite" className="sr-only">
        {rows.length} lines shown
      </p>
      {/* tabIndex: a scroll region must be reachable by keyboard */}
      <ol tabIndex={0} aria-label="Log lines" className="max-h-72 min-h-0 flex-1 overflow-auto font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset">
        {rows.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-2 last:border-b-0">
            <time className="text-fg-muted tabular-nums">{l.time}</time>
            <StatusBadge tone={TONE[l.level]} className="uppercase">
              {l.level}
            </StatusBadge>
            <span className="min-w-0 break-all text-fg">{l.msg}</span>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-4 py-8 text-center font-sans text-fg-muted">No lines match.</li> : null}
      </ol>
    </section>
  )
}

export { LogsViewer }
export type { LogsViewerProps, LogLevel }
