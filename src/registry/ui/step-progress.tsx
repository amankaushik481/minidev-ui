"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A row of labelled segments that fill as a multi-step flow advances, for onboarding and checkout. */
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
          <li key={s} className="flex flex-1 flex-col gap-1" aria-current={active ? "step" : undefined}>
            <div className={cn("h-1 rounded-full", done || active ? "bg-accent" : "bg-sunken")} />
            <span className={cn("text-[11px]", active ? "font-medium text-fg" : "text-fg-muted")}>{s}</span>
          </li>
        )
      })}
    </ol>
  )
}
export { StepProgress }
export type { StepProgressProps }
