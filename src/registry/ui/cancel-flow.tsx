"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A two-step subscription cancel flow: ask why (one reason), then confirm.
 *
 * Use in billing settings behind a "Cancel plan" button, or inside a `Dialog`. Prefer
 * `AlertDialog` for a one-step confirmation. Reasons are a labelled radio group, Continue is
 * disabled until one is chosen, and focus moves to each new step's heading.
 *
 * @example
 * <CancelFlow planName="Scale" onConfirm={(reason) => cancelSubscription({ reason })} />
 */
type CancelFlowProps = {
  /** Plan being cancelled, used in the heading. */
  planName?: string
  /** Reasons to choose from. */
  reasons?: string[]
  /** Called with the chosen reason when the user confirms. */
  onConfirm?: (reason: string) => void
  className?: string
}

const REASONS = ["Too expensive", "Not using motion", "Switching kits"]

function CancelFlow({ planName = "Premium", reasons = REASONS, onConfirm, className }: CancelFlowProps) {
  const [step, setStep] = React.useState<"why" | "confirm">("why")
  const [reason, setReason] = React.useState<string | null>(null)
  const name = React.useId()
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const moved = React.useRef(false)
  React.useEffect(() => {
    // Keep keyboard and screen reader users in place when the step swaps; skip the first render.
    if (moved.current) headingRef.current?.focus()
    moved.current = true
  }, [step])
  return (
    <div data-slot="cancel-flow" className={cn("space-y-4 rounded-xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <h3 ref={headingRef} tabIndex={-1} className="rounded-sm text-sm font-medium text-fg outline-none">
        {step === "why" ? `Cancel ${planName}` : `Confirm cancelling ${planName}`}
      </h3>
      {step === "why" ? (
        <>
          <p className="text-sm text-fg-muted">Free UI stays. Kinetic heroes and the showcase soft-lock after the period ends.</p>
          <fieldset className="space-y-2">
            <legend className="mb-2 text-xs font-medium text-fg-muted">Why are you cancelling?</legend>
            {reasons.map((r) => (
              <label key={r} className="flex cursor-pointer items-center gap-2 text-sm text-fg">
                <input
                  type="radio"
                  name={name}
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="size-4 accent-accent"
                />
                {r}
              </label>
            ))}
          </fieldset>
          <Button type="button" size="sm" disabled={!reason} onClick={() => setStep("confirm")}>Continue</Button>
        </>
      ) : (
        <>
          <p className="text-sm text-fg-muted">You keep {planName} until the end of the billing period.</p>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="destructive" onClick={() => reason && onConfirm?.(reason)}>Confirm cancel</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setStep("why")}>Back</Button>
          </div>
        </>
      )}
    </div>
  )
}
export { CancelFlow }
export type { CancelFlowProps }
