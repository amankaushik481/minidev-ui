"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function OfflineState({ className }: { className?: string }) {
  return (
    <div data-slot="offline-state" className={cn("rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div className="flex items-start gap-3">
        <span className="mt-1 size-2.5 rounded-full bg-warning" aria-hidden />
        <div>
          <h3 className="text-sm font-medium text-fg">You are offline</h3>
          <p className="mt-1 text-sm text-fg-muted">Cached registry pages still work. Mutations pause until you reconnect.</p>
          <Button className="mt-4" size="sm" variant="outline">Retry connection</Button>
        </div>
      </div>
    </div>
  )
}
export { OfflineState }
