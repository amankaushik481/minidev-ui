"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * FunnelSteps — a compact conversion funnel as stacked bars, each sized against the largest step.
 *
 * Use in a card or sidebar for a quick funnel readout. For a full chart with
 * step conversion rates, drop-off, a comparison period and dataset switching
 * use `FunnelChart`; for arbitrary categories use `HorizontalBarChart`.
 *
 * @example
 * <FunnelSteps steps={[{ label: "Visited", value: 12840 }, { label: "Signed up", value: 3210 }, { label: "Paid", value: 464 }]} />
 */
type Step = {
  /** Stage name. */
  label: string
  /** Count at this stage. */
  value: number
}

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
      {steps.map((s, i) => (
        <li key={`${i}-${s.label}`} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg">{s.label}</span>
            <span className="text-fg-muted tabular-nums">{s.value.toLocaleString("en-US")}</span>
          </div>
          <div aria-hidden className="h-2 overflow-hidden rounded-full bg-sunken">
            <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, s.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  )
}
export { FunnelSteps }
export type { FunnelStepsProps, Step as FunnelStep }
