"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * An accent-tinted banner counting down the days left in a free trial, with an upgrade button.
 *
 * Place it above page content or in a settings sidebar. Use `UpgradePrompt` for a feature-gated card and `AnnouncementBar` for a site-wide strip.
 *
 * @example
 * <TrialBanner daysLeft={5} description="Invoice automations stay on until then." onUpgrade={() => router.push("/billing")} />
 */
type TrialBannerProps = {
  /** Days remaining. 0 reads "ends today". */
  daysLeft?: number
  /** Plan name in the heading. */
  plan?: string
  /** Supporting line under the heading. */
  description?: React.ReactNode
  /** Button text. */
  actionLabel?: string
  /** Called when the upgrade button is pressed. */
  onUpgrade?: () => void
  className?: string
}

function TrialBanner({
  daysLeft = 5,
  plan = "Scale",
  description = "Invoice automations and the cash-flow forecast stay unlocked until then.",
  actionLabel = "Upgrade",
  onUpgrade,
  className,
}: TrialBannerProps) {
  const left = daysLeft <= 0 ? "ends today" : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`
  return (
    <div
      data-slot="trial-banner"
      className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent-line bg-accent-soft px-4 py-3", className)}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">
          {plan} trial · <span className="tabular-nums">{left}</span>
        </p>
        {description ? <p className="text-xs text-fg-muted">{description}</p> : null}
      </div>
      <Button size="sm" onClick={onUpgrade}>
        {actionLabel}
      </Button>
    </div>
  )
}
export { TrialBanner }
export type { TrialBannerProps }
