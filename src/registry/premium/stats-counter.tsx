"use client"
import * as React from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"
import { NumberRoll } from "@/registry/ui/number-roll"

/**
 * A single stat whose digits roll up from zero, odometer style, when it scrolls into view, for stats sections.
 * The digits spring into place with the roll preset rather than counting
 * through every value. Screen readers and search engines get the final value
 * as plain text from the first paint; reduced motion shows it straight away.
 *
 * Use it for one figure in a row of stats. Reach for MetricTickerBoard for a
 * ready-made board of several, and NumberRoll for a live value that changes.
 *
 * @example
 * <div className="grid grid-cols-3 gap-4">
 *   <StatsCounter value={12400} label="invoices paid this month" />
 *   <StatsCounter value={98.4} label="paid on time" suffix="%" format={{ maximumFractionDigits: 1 }} />
 * </div>
 */
type StatsCounterProps = {
  /** The final value. Use a real figure: never invent stats. */
  value?: number
  /** What the number counts, shown under it. */
  label?: string
  /** Text after the number, like "%" or "+". */
  suffix?: string
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" }. */
  format?: Intl.NumberFormatOptions
  className?: string
}

function StatsCounter({ value = 12400, label = "invoices paid this month", suffix = "", format, className }: StatsCounterProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const text = new Intl.NumberFormat("en-US", format).format(value)
  return (
    <div ref={ref} data-slot="stats-counter" data-tier="premium" className={cn("rounded-xl border border-border bg-surface p-4 text-center shadow-highlight", className)}>
      <p className="text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">
        <span className="sr-only">
          {text}
          {suffix}
        </span>
        <span aria-hidden>
          <NumberRoll value={inView ? value : 0} format={format} />
          {suffix}
        </span>
      </p>
      <p className="mt-1 text-xs text-fg-muted">{label}</p>
    </div>
  )
}
export { StatsCounter }
export type { StatsCounterProps }
