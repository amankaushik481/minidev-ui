"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function ConnectedAccount({
  provider,
  account,
  className,
}: {
  provider: string
  account: string
  className?: string
}) {
  return (
    <div data-slot="connected-account" className={cn("flex items-center justify-between rounded-xl border border-border px-3 py-3", className)}>
      <div>
        <p className="text-sm font-medium text-fg">{provider}</p>
        <p className="text-xs text-fg-muted">{account}</p>
      </div>
      <Button size="sm" variant="outline">
        Disconnect
      </Button>
    </div>
  )
}
export { ConnectedAccount }
