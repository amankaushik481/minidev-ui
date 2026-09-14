"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Step = { label: string; value: number }

function FunnelSteps({ steps, className }: { steps: Step[]; className?: string }) {
  const max = Math.max(...steps.map((s) => s.value), 1)
  return (
    <ol data-slot="funnel-steps" className={cn("space-y-2", className)}>
      {steps.map((s) => (
        <li key={s.label} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg">{s.label}</span>
            <span className="tabular-nums text-fg-muted">{s.value.toLocaleString()}</span>
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
