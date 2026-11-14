"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"

/**
 * MergeBox — the merge panel at the foot of a pull request: check status plus the merge button.
 *
 * When `canMerge` is false the callout turns to a warning and the button is disabled.
 * Use it in code review and deploy UIs; for a generic status message use Callout.
 *
 * @example
 * <MergeBox canMerge={checks.every((c) => c.ok)} onMerge={merge} />
 */
type MergeBoxProps = {
  /** All required checks passed. False shows the pending warning and disables the button. */
  canMerge?: boolean
  /** Called when the merge button is pressed. */
  onMerge?: () => void
  /** Text under the "Ready to merge" or "Checks pending" title. */
  message?: React.ReactNode
  /** Button label. */
  actionLabel?: string
  className?: string
}

function MergeBox({ canMerge = true, onMerge, message, actionLabel = "Merge pull request", className }: MergeBoxProps) {
  return (
    <div data-slot="merge-box" className={cn("space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
      <Callout tone={canMerge ? "success" : "warning"} title={canMerge ? "Ready to merge" : "Checks pending"}>
        {message ?? (canMerge ? "All required checks passed." : "Wait for audit + typecheck.")}
      </Callout>
      <Button type="button" className="w-full" disabled={!canMerge} onClick={onMerge}>
        {actionLabel}
      </Button>
    </div>
  )
}
export { MergeBox }
export type { MergeBoxProps }
