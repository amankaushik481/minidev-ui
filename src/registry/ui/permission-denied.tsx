"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function PermissionDenied({ className }: { className?: string }) {
  return (
    <div data-slot="permission-denied" className={cn("rounded-2xl border border-border bg-surface p-6 text-center shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <h3 className="text-lg font-medium tracking-[-0.014em] text-fg">Permission denied</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">You need admin on this workspace to open billing and seat controls.</p>
      <div className="mt-5 flex justify-center gap-2">
        <Button size="sm">Request access</Button>
        <Button size="sm" variant="outline">Switch workspace</Button>
      </div>
    </div>
  )
}
export { PermissionDenied }
