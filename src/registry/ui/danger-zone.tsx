"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function DangerZone({ className }: { className?: string }) {
  return (
    <div data-slot="danger-zone" className={cn("rounded-xl border border-danger/35 bg-surface p-4 shadow-highlight", className)}>
      <h3 className="text-sm font-medium text-danger">Danger zone</h3>
      <p className="mt-1 text-sm text-fg-muted">Delete this workspace and every registry fork tied to it. This cannot be undone.</p>
      <Button className="mt-4" size="sm" variant="destructive">Delete workspace</Button>
    </div>
  )
}
export { DangerZone }
