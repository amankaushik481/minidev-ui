"use client"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

type Key = { id?: string; name: string; preview?: string; hint?: string; created?: string }

function ApiKeyList({
  keys,
  className,
}: {
  keys?: Key[]
  className?: string
}) {
  const list = keys ?? [
    { id: "1", name: "Production", preview: "md_live_••••8f2a", created: "Aug 12" },
    { id: "2", name: "Staging", preview: "md_test_••••91c0", created: "Sep 1" },
  ]
  return (
    <div data-slot="api-key-list" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-fg">API keys</h3>
        <Button size="sm">Create key</Button>
      </div>
      <ul>
        {list.map((k) => (
          <li key={k.id ?? k.name} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-fg">{k.name}</p>
              <p className="font-mono text-xs text-fg-muted">{k.preview ?? k.hint}</p>
            </div>
            <div className="flex items-center gap-2">
              {k.created ? <Badge variant="outline">{k.created}</Badge> : null}
              <Button size="sm" variant="outline">Rotate</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { ApiKeyList }
