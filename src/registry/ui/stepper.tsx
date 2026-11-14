"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A numbered progress bar for multi-step forms: one segment per step, filled up to the current one, with "1. Details" style labels.
 *
 * Read-only progress, not navigation. Use StepProgress for the unnumbered, smaller-label variant.
 * Keep `current` in your form state and render the step's fields below.
 *
 * @example
 * <Stepper steps={["Details", "Members", "Billing"]} current={step} />
 */
type StepperProps = {
  /** Step labels in order. */
  steps?: string[]
  /** Zero-based index of the active step; earlier steps count as done. */
  current?: number
  className?: string
}

function Stepper({ steps = ["Details", "Members", "Billing"], current = 0, className }: StepperProps) {
  return (
    <ol data-slot="stepper" className={cn("flex w-full items-center gap-2", className)}>
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={`${s}-${i}`} className="flex min-w-0 flex-1 flex-col gap-1.5" aria-current={active ? "step" : undefined}>
            <div
              aria-hidden
              className={cn("h-1 rounded-full transition-colors duration-200 ease-hairline", done || active ? "bg-accent" : "bg-border")}
            />
            <span className={cn("truncate text-xs tabular-nums", active ? "font-medium text-fg" : "text-fg-muted")}>
              {i + 1}. {s}
              {done ? <span className="sr-only"> (completed)</span> : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
export { Stepper }
export type { StepperProps }
