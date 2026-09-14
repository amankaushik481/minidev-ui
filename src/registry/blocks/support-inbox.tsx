"use client"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

const THREADS = [
  { id: "T-4821", subject: "Seat upgrade stuck on invoice", from: "sam@acme.co", status: "open", sla: "2h" },
  { id: "T-4819", subject: "Dark mode contrast on tables", from: "lee@north.io", status: "pending", sla: "6h" },
  { id: "T-4810", subject: "Premium license for agency", from: "ava@studio.dev", status: "open", sla: "1h" },
]

function SupportInbox() {
  return (
    <div data-slot="support-inbox" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-medium text-fg">Support inbox</h3>
          <p className="text-xs text-fg-muted">3 open · 1 SLA risk</p>
        </div>
        <div className="flex gap-2">
          <Input className="h-8 w-44" placeholder="Search tickets" />
          <Button size="sm">Compose</Button>
        </div>
      </div>
      <ul>
        {THREADS.map((t) => (
          <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0">
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-fg-muted">{t.id}</p>
              <p className="truncate text-sm font-medium text-fg">{t.subject}</p>
              <p className="text-xs text-fg-muted">{t.from}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{t.status}</Badge>
              <span className="font-mono text-xs tabular-nums text-fg-muted">SLA {t.sla}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { SupportInbox }
