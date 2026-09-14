"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function ServerErrorState({ className }: { className?: string }) {
  return (
    <div data-slot="server-error-state" className={cn("rounded-2xl border border-danger/30 bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <p className="font-mono text-xs text-danger">500</p>
      <h3 className="mt-2 text-lg font-medium tracking-[-0.014em] text-fg">Something broke on our side</h3>
      <p className="mt-2 text-sm text-fg-muted">The audit worker or registry API failed. Retry, or copy the request id for support.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm">Retry</Button>
        <Button size="sm" variant="outline">Copy request id</Button>
      </div>
    </div>
  )
}
export { ServerErrorState }
