"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A row of labelled segments that fill as a multi-step flow advances, for onboarding and checkout.
 *
 * Read-only progress, not navigation. Use Stepper for the numbered variant ("1. Details");
 * use Progress for a single percentage.
 *
 * @example
 * <StepProgress steps={["Account", "Company", "Review"]} current={1} />
 */
type StepProgressProps = {
  /** Step labels in order. Defaults to Lumen's workspace setup. */
  steps?: string[]
  /** Zero-based index of the active step; earlier steps count as done. */
  current?: number
  className?: string
}

const SAMPLE_STEPS = ["Account", "Company", "Bank details", "Invite team", "Review"]

function StepProgress({ steps = SAMPLE_STEPS, current = 2, className }: StepProgressProps) {
  return (
    <ol data-slot="step-progress" className={cn("flex w-full max-w-lg items-center gap-2", className)}>
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={`${s}-${i}`} className="flex min-w-0 flex-1 flex-col gap-1" aria-current={active ? "step" : undefined}>
            <div aria-hidden className={cn("h-1 rounded-full transition-colors duration-200 ease-hairline", done || active ? "bg-accent" : "bg-sunken")} />
            <span className={cn("truncate text-2xs", active ? "font-medium text-fg" : "text-fg-muted")}>
              {s}
              {done ? <span className="sr-only"> (completed)</span> : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
export { StepProgress }
export type { StepProgressProps }
