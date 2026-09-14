"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MetricDelta } from "@/registry/ui/metric-delta"

function CaseStudyCard({
  company,
  title,
  result,
  delta,
  className,
}: {
  company: string
  title: string
  result: string
  delta?: number
  className?: string
}) {
  return (
    <div data-slot="case-study-card" className={cn("rounded-xl border border-border bg-surface p-5", className)}>
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{company}</p>
      <h3 className="mt-2 text-base font-medium text-fg">{title}</h3>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-2xl font-medium tracking-[-0.018em] tabular-nums text-fg">{result}</p>
        {delta != null ? <MetricDelta value={delta} /> : null}
      </div>
    </div>
  )
}
export { CaseStudyCard }
