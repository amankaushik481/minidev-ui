"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function TrialBanner({ daysLeft = 5, className }: { daysLeft?: number; className?: string }) {
  return (
    <div data-slot="trial-banner" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.45)]", className)}>
      <div>
        <p className="text-sm font-medium text-fg">Premium trial · {daysLeft} days left</p>
        <p className="text-xs text-fg-muted">Kinetic heroes and the client showcase stay unlocked until then.</p>
      </div>
      <Button size="sm">Upgrade</Button>
    </div>
  )
}
export { TrialBanner }
