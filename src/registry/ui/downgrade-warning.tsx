"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * DowngradeWarning — an inline card that spells out what a plan downgrade removes, with keep and downgrade actions.
 *
 * Use on a billing page before a plan change. For a multi-step cancellation
 * use `CancelFlow`; for a modal confirmation use `AlertDialog`; to sell an
 * upgrade instead use `UpgradePrompt`.
 *
 * @example
 * <DowngradeWarning
 *   title="Downgrade to Starter?"
 *   description="Audit logs and SSO turn off at the end of this billing period."
 *   onKeep={() => router.back()}
 *   onDowngrade={() => downgrade("starter")}
 * />
 */
type DowngradeWarningProps = {
  /** Heading of the card. */
  title?: React.ReactNode
  /** What the user loses by downgrading. */
  description?: React.ReactNode
  /** Label of the safe (outline) action. */
  keepLabel?: string
  /** Label of the destructive action. */
  downgradeLabel?: string
  /** Called by the safe action. */
  onKeep?: () => void
  /** Called by the destructive action. */
  onDowngrade?: () => void
  className?: string
}

function DowngradeWarning({
  title = "Downgrade to Free?",
  description = "Kinetic heroes, the client showcase kit, and Premium galleries soft-lock. Free product UI stays.",
  keepLabel = "Keep Premium",
  downgradeLabel = "Downgrade",
  onKeep,
  onDowngrade,
  className,
}: DowngradeWarningProps) {
  const id = React.useId()
  return (
    <section
      data-slot="downgrade-warning"
      aria-labelledby={`${id}-title`}
      className={cn("space-y-3 rounded-xl border border-warning/40 bg-surface p-4 shadow-highlight", className)}
    >
      <h3 id={`${id}-title`} className="text-sm font-medium text-fg">
        {title}
      </h3>
      <p className="text-sm leading-[1.55] text-fg-muted">{description}</p>
      <div className="flex gap-2">
        <Button type="button" size="sm" variant="outline" onClick={onKeep}>
          {keepLabel}
        </Button>
        <Button type="button" size="sm" variant="destructive" onClick={onDowngrade}>
          {downgradeLabel}
        </Button>
      </div>
    </section>
  )
}
export { DowngradeWarning }
export type { DowngradeWarningProps }
