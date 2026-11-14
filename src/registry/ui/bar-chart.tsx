"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Rounded-top bars on a hairline baseline; hovering one bar dims its siblings and surfaces the value, and the peak is marked by default.
 *
 * Use for one value per period or category (monthly revenue, signups per day). Prefer
 * `StackedBarChart` for parts of a whole, `HorizontalBarChart` for long category names, and
 * `AreaChart` for a continuous trend. Screen readers get `label` followed by every label and value.
 * Size it with `className` (default `h-40 w-full`).
 *
 * @example
 * <BarChart label="Revenue by month" format={(n) => `$${(n / 1000).toFixed(1)}k`}
 *   data={[{ label: "Sep", value: 56100 }, { label: "Oct", value: 61400 }]} />
 */
type BarChartProps = {
  /** One bar per item, left to right. `label` is printed under the bar. Omit for sample data. */
  data?: { label: string; value: number }[]
  className?: string
  /** Accessible name; every label and formatted value is appended for screen readers. */
  label?: string
  /** Formats values in the hover bubble and the accessible summary. */
  format?: (n: number) => string
}

// Monthly revenue for the last twelve months.
const SAMPLE_DATA: { label: string; value: number }[] = [
  { label: "Nov", value: 31200 },
  { label: "Dec", value: 36400 },
  { label: "Jan", value: 28900 },
  { label: "Feb", value: 33100 },
  { label: "Mar", value: 39800 },
  { label: "Apr", value: 42600 },
  { label: "May", value: 38200 },
  { label: "Jun", value: 47500 },
  { label: "Jul", value: 51300 },
  { label: "Aug", value: 44700 },
  { label: "Sep", value: 56100 },
  { label: "Oct", value: 61400 },
]

function BarChart({
  data = SAMPLE_DATA,
  className,
  label = "Bar chart",
  // Fixed locale so the server and client render the same digits.
  format = (n: number) => n.toLocaleString("en-US"),
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const peak = data.findIndex((d) => d.value === max)
  const [hover, setHover] = React.useState<number | null>(null)
  const active = hover ?? peak
  const summary = data.length ? `${label}. ${data.map((d) => `${d.label}: ${format(d.value)}`).join(", ")}.` : `${label}. No data.`
  return (
    <div data-slot="bar-chart" role="img" aria-label={summary} className={cn("flex h-40 w-full flex-col pt-7", className)} onMouseLeave={() => setHover(null)}>
      <div className="relative flex flex-1 items-end gap-1.5 border-b border-border">
        {[0.25, 0.5, 0.75].map((f) => (
          <span key={f} aria-hidden className="pointer-events-none absolute inset-x-0 border-t border-dashed border-border/70" style={{ bottom: `${f * 100}%` }} />
        ))}
        {data.map((d, i) => (
          <div key={i} className="relative flex h-full flex-1 items-end" onMouseEnter={() => setHover(i)}>
            <div
              className={cn(
                "relative w-full rounded-t-md transition-[opacity,background-color] duration-[140ms] ease-hairline",
                i === active ? "bg-accent" : "bg-accent/35",
                hover != null && i !== hover && "opacity-60"
              )}
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px rounded-t-md bg-on-accent/30" />
              {i === active ? (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-on-ink tabular-nums shadow-md">
                  {format(d.value)}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 pt-2">
        {data.map((d, i) => (
          <span key={i} aria-hidden className={cn("flex-1 truncate text-center font-mono text-[10px]", i === active ? "text-fg" : "text-fg-subtle")}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
export { BarChart }
export type { BarChartProps }
