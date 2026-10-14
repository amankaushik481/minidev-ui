"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A conversion funnel as stacked bars: each step's bar is sized against the first step's count. */
type Step = { label: string; value: number }

const SAMPLE_STEPS: Step[] = [
  { label: "Visited pricing", value: 12840 },
  { label: "Started trial", value: 3210 },
  { label: "Sent first invoice", value: 1880 },
  { label: "Connected bank", value: 1120 },
  { label: "Upgraded to Growth", value: 464 },
]

type FunnelStepsProps = {
  /** Funnel stages, top to bottom. Defaults to a Lumen signup funnel. */
  steps?: Step[]
  className?: string
}

function FunnelSteps({ steps = SAMPLE_STEPS, className }: FunnelStepsProps) {
  const max = Math.max(...steps.map((s) => s.value), 1)
  return (
    <ol data-slot="funnel-steps" className={cn("w-full max-w-sm space-y-2", className)}>
      {steps.map((s) => (
        <li key={s.label} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg">{s.label}</span>
            <span className="tabular-nums text-fg-muted">{s.value.toLocaleString("en-US")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sunken">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(s.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  )
}
export { FunnelSteps }
export type { FunnelStepsProps, Step as FunnelStep }
