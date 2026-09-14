"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function UpgradePrompt({
  title = "Unlock Premium moments",
  description = "Keep free product UI. Soft-gate kinetic heroes when the first screen has to convert.",
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <div
      data-slot="upgrade-prompt"
      className={cn(
        "rounded-xl border border-border bg-surface p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        className
      )}
    >
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <p className="mt-1 text-sm leading-[1.55] text-fg">{description}</p>
      <div className="mt-4">
        <Button size="sm">Upgrade</Button>
      </div>
    </div>
  )
}
export { UpgradePrompt }
