"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"

/**
 * A card showing LLM tokens used against a budget: label, "used / limit" in mono, a progress bar and a note.
 *
 * Use it on AI usage and billing pages. Use `UsageMeter` for a bare labelled bar, `UsageBreakdown` for several resources, and `CreditBalance` for prepaid credits.
 *
 * @example
 * <TokenUsageMeter used={128400} limit={200000} note="Resets on the 1st" />
 */
type TokenUsageMeterProps = {
  /** Tokens used so far. */
  used?: number
  /** Token budget. The bar caps at 100%. */
  limit?: number
  /** Heading; also labels the progress bar for screen readers. */
  label?: React.ReactNode
  /** Line under the bar, after the percentage. */
  note?: React.ReactNode
  className?: string
}

// Fixed locale so the server and the browser render the same digits.
const fmt = new Intl.NumberFormat("en-US")

function TokenUsageMeter({ used = 128_400, limit = 200_000, label = "Token usage", note = "of monthly budget · resets on the 1st", className }: TokenUsageMeterProps) {
  const id = React.useId()
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0
  return (
    <div data-slot="token-usage-meter" className={cn("space-y-2 rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex justify-between gap-3 text-sm">
        <span className="font-medium text-fg" id={id}>
          {label}
        </span>
        <span className="font-mono tabular-nums text-fg-muted">
          {fmt.format(used)} / {fmt.format(limit)}
        </span>
      </div>
      <Progress value={pct} aria-labelledby={id} getAriaValueText={() => `${fmt.format(used)} of ${fmt.format(limit)} tokens, ${pct}%`} />
      <p className="text-xs text-fg-muted">
        <span className="tabular-nums">{pct}%</span> {note}
      </p>
    </div>
  )
}
export { TokenUsageMeter }
export type { TokenUsageMeterProps }
