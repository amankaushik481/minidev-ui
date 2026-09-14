"use client"
import { Badge } from "@/registry/ui/badge"
import { HealthIndicator } from "@/registry/ui/health-indicator"

const SERVICES = [
  { name: "Registry CDN", status: "operational" as const },
  { name: "Docs", status: "operational" as const },
  { name: "Audit workers", status: "degraded" as const },
  { name: "Playground", status: "operational" as const },
]

function StatusPage() {
  return (
    <div data-slot="status-page" className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">System status</h3>
          <p className="mt-1 text-sm text-fg-muted">All core surfaces up. Audit workers delayed.</p>
        </div>
        <Badge variant="outline">Partial outage</Badge>
      </div>
      <ul className="space-y-2">
        {SERVICES.map((s) => (
          <li key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2.5">
            <span className="text-sm text-fg">{s.name}</span>
            <HealthIndicator status={s.status} label={s.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export { StatusPage }
