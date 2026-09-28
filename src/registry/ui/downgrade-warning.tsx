"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function DowngradeWarning({ className }: { className?: string }) {
  return (
    <div data-slot="downgrade-warning" className={cn("space-y-3 rounded-xl border border-warning/40 bg-surface p-4 shadow-highlight", className)}>
      <h3 className="text-sm font-medium text-fg">Downgrade to Free?</h3>
      <p className="text-sm leading-[1.55] text-fg-muted">
        Kinetic heroes, the client showcase kit, and Premium galleries soft-lock. Free product UI stays.
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Keep Premium</Button>
        <Button size="sm" variant="destructive">Downgrade</Button>
      </div>
    </div>
  )
}
export { DowngradeWarning }
