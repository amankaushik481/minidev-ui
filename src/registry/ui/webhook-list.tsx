"use client"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

const HOOKS = [
  { url: "https://hooks.acme.co/minidev", events: "audit, billing", status: "active" },
  { url: "https://hooks.north.io/registry", events: "deploy", status: "paused" },
]

function WebhookList({ className }: { className?: string }) {
  return (
    <div data-slot="webhook-list" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-fg">Webhooks</h3>
        <Button size="sm">Add endpoint</Button>
      </div>
      <ul>
        {HOOKS.map((h) => (
          <li key={h.url} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs text-fg">{h.url}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{h.events}</p>
            </div>
            <Badge variant="outline">{h.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { WebhookList }
