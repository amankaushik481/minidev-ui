"use client"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"
import * as React from "react"

function AccountSetupProgress({
  stepsDone = 2,
  stepsTotal = 4,
  className,
}: {
  stepsDone?: number
  stepsTotal?: number
  className?: string
}) {
  const id = React.useId()
  const pct = Math.round((stepsDone / stepsTotal) * 100)
  return (
    <div data-slot="account-setup-progress" className={cn("space-y-2 rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-fg" id={id}>Account setup</span>
        <span className="tabular-nums text-fg-muted">{stepsDone}/{stepsTotal}</span>
      </div>
      <Progress value={pct} aria-labelledby={id} />
      <p className="text-xs text-fg-muted">Next: connect billing · then invite your team</p>
    </div>
  )
}
export { AccountSetupProgress }
