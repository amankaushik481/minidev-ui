"use client"
import * as React from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"
import { NumberRoll } from "@/registry/ui/number-roll"

/**
 * A responsive board of headline metrics whose digits roll up from zero, odometer style, the first time each card scrolls into view.
 * Every digit springs to its place with the roll preset, so numbers keep
 * their identity instead of flickering through values. Screen readers and
 * search engines get the final value as plain text; reduced motion shows it
 * straight away.
 *
 * Use it for three or four headline numbers on a marketing page. Reach for
 * StatsCounter for a single figure, FlipStatBoard for split-flap digits, and
 * the free KpiRow or StatCard for live product metrics.
 *
 * @example
 * <MetricTickerBoard metrics={[{ label: "Invoices paid", value: 12400, suffix: "+" }, { label: "Days to close", value: 2 }]} />
 */
type Metric = {
  /** Short label above the number. */
  label: string
  /** The final value the number rolls to. */
  value: number
  /** Text after the number, like "%" or "+". */
  suffix?: string
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD", maximumFractionDigits: 0 }. */
  format?: Intl.NumberFormatOptions
}

type MetricTickerBoardProps = {
  /** The metrics, in order. Use real figures: never invent stats. */
  metrics?: Metric[]
  className?: string
}

const SAMPLE: Metric[] = [
  { label: "Invoices sent", value: 1284 },
  { label: "Paid on time", value: 94, suffix: "%" },
  { label: "Days to close", value: 2 },
  { label: "Open disputes", value: 3 },
]

function MetricCell({ label, value, suffix = "", format }: Metric) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const text = new Intl.NumberFormat("en-US", format).format(value)
  return (
    <div ref={ref} data-slot="metric-ticker-board-cell" className="rounded-2xl border border-border bg-surface p-5 shadow-highlight">
      <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{label}</p>
      <p className="mt-2 text-3xl font-medium tabular-nums tracking-[-0.022em] text-fg">
        <span className="sr-only">
          {text}
          {suffix}
        </span>
        <span aria-hidden>
          <NumberRoll value={inView ? value : 0} format={format} />
          {suffix}
        </span>
      </p>
    </div>
  )
}

function MetricTickerBoard({ metrics = SAMPLE, className }: MetricTickerBoardProps) {
  return (
    <section data-slot="metric-ticker-board" data-tier="premium" className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {metrics.map((m, i) => (
        <MetricCell key={`${m.label}-${i}`} {...m} />
      ))}
    </section>
  )
}
export { MetricTickerBoard }
export type { MetricTickerBoardProps, Metric as MetricTickerBoardMetric }
