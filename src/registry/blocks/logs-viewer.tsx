"use client"
import { Badge } from "@/registry/ui/badge"
import { Input } from "@/registry/ui/input"

const LOGS = [
  { level: "info", msg: "audit.pass gallery/premium-motion", time: "12:01:04" },
  { level: "warn", msg: "axe.contrast mid-animation skipped (transform-only)", time: "12:01:02" },
  { level: "info", msg: "registry.refresh items=468", time: "12:00:58" },
  { level: "error", msg: "retry.ok after stub type mismatch", time: "11:59:41" },
]

function LogsViewer() {
  return (
    <div data-slot="logs-viewer" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <h3 className="mr-auto text-sm font-medium text-fg">Logs</h3>
        <Input className="h-8 w-48" placeholder="Filter…" />
      </div>
      <ul className="max-h-72 overflow-auto font-mono text-xs" tabIndex={0}>
        {LOGS.map((l) => (
          <li key={l.time + l.msg} className="flex gap-3 border-b border-border px-4 py-2 last:border-b-0">
            <span className="tabular-nums text-fg-muted">{l.time}</span>
            <Badge variant="outline">{l.level}</Badge>
            <span className="text-fg">{l.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { LogsViewer }
