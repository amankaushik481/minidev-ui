"use client"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

const MSGS = [
  { from: "Design Ops", preview: "Audit gate passed on premium-motion", time: "2m", unread: true },
  { from: "Billing", preview: "Invoice #1842 settled", time: "1h", unread: false },
  { from: "Agents", preview: "Thicken wave complete — 24 stubs", time: "3h", unread: false },
]

function InboxPage() {
  return (
    <div data-slot="inbox-page" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-fg">Inbox</h3>
        <Button size="sm" variant="outline">Mark all read</Button>
      </div>
      <ul>
        {MSGS.map((m) => (
          <li key={m.from + m.time} className="flex items-start justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-fg">{m.from}</p>
                {m.unread ? <Badge>New</Badge> : null}
              </div>
              <p className="mt-0.5 truncate text-sm text-fg-muted">{m.preview}</p>
            </div>
            <span className="shrink-0 font-mono text-xs tabular-nums text-fg-muted">{m.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { InboxPage }
