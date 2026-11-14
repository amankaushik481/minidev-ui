"use client"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"
import * as React from "react"

/**
 * An onboarding checklist summary: a labelled progress bar with "2/4" steps and the next step.
 *
 * Use at the top of a dashboard or settings page while setup is incomplete. Prefer `Stepper`
 * when the user moves through the steps in place, and `Progress` alone for non-setup progress.
 *
 * @example
 * <AccountSetupProgress stepsDone={3} stepsTotal={5} next="Invite your team" />
 */
type AccountSetupProgressProps = {
  /** Steps finished. Clamped to 0…stepsTotal. */
  stepsDone?: number
  /** Total steps in the setup. */
  stepsTotal?: number
  /** Heading above the bar. */
  title?: React.ReactNode
  /** What to do next, shown under the bar. Pass `null` to hide. */
  next?: React.ReactNode
  className?: string
}

function AccountSetupProgress({
  stepsDone = 2,
  stepsTotal = 4,
  title = "Account setup",
  next = "Next: connect billing · then invite your team",
  className,
}: AccountSetupProgressProps) {
  const id = React.useId()
  const total = Math.max(0, stepsTotal)
  const done = Math.min(total, Math.max(0, stepsDone))
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div data-slot="account-setup-progress" className={cn("space-y-2 rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex justify-between gap-3 text-sm">
        <span className="font-medium text-fg" id={id}>{title}</span>
        <span className="tabular-nums text-fg-muted">{done}/{total}</span>
      </div>
      <Progress value={pct} aria-labelledby={id} getAriaValueText={() => `${done} of ${total} steps done`} />
      {next ? <p className="text-xs text-fg-muted">{next}</p> : null}
    </div>
  )
}
export { AccountSetupProgress }
export type { AccountSetupProgressProps }
