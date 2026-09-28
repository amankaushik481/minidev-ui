"use client"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

function IntegrationCard({
  name = "Linear",
  description = "Sync issues into the engineering gallery.",
  connected = false,
  className,
}: {
  name?: string
  description?: string
  connected?: boolean
  className?: string
}) {
  return (
    <div data-slot="integration-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-fg">{name}</h3>
          <p className="mt-1 text-xs leading-[1.55] text-fg-muted">{description}</p>
        </div>
        <Badge variant="outline">{connected ? "Connected" : "Available"}</Badge>
      </div>
      <Button className="mt-4 w-full" size="sm" variant={connected ? "outline" : "default"}>
        {connected ? "Manage" : "Connect"}
      </Button>
    </div>
  )
}
export { IntegrationCard }
