"use client"
import * as React from "react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A card listing webhook endpoints (URL, subscribed events, active or paused) with an "Add endpoint" button.
 *
 * Use it on developer settings pages to show where events are delivered. Pass `hooks` (an empty
 * array shows an empty state) and `onAdd` to open your create dialog; rows have no actions of their
 * own. Use `ApiKeyList` for API keys and `IntegrationCard` for third-party connections.
 *
 * @example
 * <WebhookList hooks={[{ url: "https://api.northwind.example/hooks/lumen", events: "invoice.paid, invoice.overdue", status: "active" }]} onAdd={openCreateDialog} />
 */
type Webhook = {
  /** Endpoint URL, shown in mono. */
  url: string
  /** Subscribed events, comma separated. */
  events: string
  status: "active" | "paused"
}

type WebhookListProps = {
  /** Endpoints to list. Defaults to two Lumen endpoints. */
  hooks?: Webhook[]
  /** Called when "Add endpoint" is pressed. */
  onAdd?: () => void
  className?: string
}

const SAMPLE_HOOKS: Webhook[] = [
  { url: "https://api.northwind.com/hooks/lumen", events: "invoice.paid, invoice.overdue", status: "active" },
  { url: "https://ops.fabrikam.io/lumen/deploys", events: "deploy.succeeded", status: "paused" },
]

function WebhookList({ hooks = SAMPLE_HOOKS, onAdd, className }: WebhookListProps) {
  return (
    <div data-slot="webhook-list" className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-fg">Webhooks</h3>
        <Button size="sm" onClick={onAdd}>
          Add endpoint
        </Button>
      </div>
      {hooks.length ? (
        <ul>
          {hooks.map((h) => (
            <li key={h.url} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs text-fg">{h.url}</p>
                <p className="mt-0.5 text-xs text-fg-muted">{h.events}</p>
              </div>
              <Badge variant={h.status === "active" ? "accent" : "outline"}>{h.status === "active" ? "Active" : "Paused"}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-6 text-center text-sm text-fg-muted">No endpoints yet. Add one to get events as they happen.</p>
      )}
    </div>
  )
}
export { WebhookList }
export type { WebhookListProps, Webhook }
