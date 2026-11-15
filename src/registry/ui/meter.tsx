"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Meter — a labelled bar showing how much of a known range is used (storage, quota, seats).
 *
 * Exposes role="meter" with the value and a percentage text. Use Meter for a
 * level that can go up and down; use Progress for a task moving toward done,
 * and QuotaBar when the fill should turn warning or danger near a limit.
 * Pass `valueText` with units ("42 of 50 GB") so screen readers hear the amount.
 *
 * @example
 * <Meter label="Storage" value={42} max={50} valueText="42 of 50 GB" showValue />
 */
type MeterProps = {
  /** Current amount, in the same unit as `max`. Clamped to 0..max for display. */
  value: number
  /** Top of the range. */
  max?: number
  /** Visible label above the bar; also its accessible name. */
  label?: string
  /** What screen readers hear for the value, e.g. "42 of 50 GB". Defaults to the percentage. */
  valueText?: string
  /** Show `valueText` (or the percentage) beside the label. */
  showValue?: boolean
  className?: string
}

function Meter({ value, max = 100, label, valueText, showValue = false, className }: MeterProps) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, Math.round((value / max) * 100)))
  const text = valueText ?? `${pct}%`
  const labelId = React.useId()
  return (
    <div data-slot="meter" className={cn("space-y-1", className)}>
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-3 text-xs">
          {label ? <p id={labelId} className="text-fg-muted">{label}</p> : <span />}
          {showValue ? <span aria-hidden className="font-medium text-fg tabular-nums">{text}</span> : null}
        </div>
      ) : null}
      <div
        role="meter"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : "Meter"}
        aria-valuenow={Math.max(0, Math.min(max, value))}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={text}
        className="h-2 overflow-hidden rounded-full bg-sunken"
      >
        <div data-slot="meter-indicator" className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
export { Meter }
export type { MeterProps }
