"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A small card that explains a locked feature and offers one upgrade button, for soft paywalls.
 *
 * Show it in place of the gated feature. Use `TrialBanner` for a trial countdown, `PlanComparison` to choose between plans, and `DowngradeWarning` before a plan change.
 *
 * @example
 * <UpgradePrompt title="Forecasts are on Scale" description="See 90 days of cash flow from open invoices." onUpgrade={openBilling} />
 */
type UpgradePromptProps = {
  title?: string
  description?: string
  /** Button text. */
  actionLabel?: string
  /** Called when the upgrade button is pressed. */
  onUpgrade?: () => void
  className?: string
}

function UpgradePrompt({
  title = "Unlock cash-flow forecasts",
  description = "See 90 days ahead from your open invoices and scheduled bills. Included in the Scale plan.",
  actionLabel = "Upgrade",
  onUpgrade,
  className,
}: UpgradePromptProps) {
  return (
    <div data-slot="upgrade-prompt" className={cn("rounded-xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <p className="mt-1 text-sm leading-[1.55] text-fg-muted">{description}</p>
      <div className="mt-4">
        <Button size="sm" onClick={onUpgrade}>
          {actionLabel}
        </Button>
      </div>
    </div>
  )
}
export { UpgradePrompt }
export type { UpgradePromptProps }
