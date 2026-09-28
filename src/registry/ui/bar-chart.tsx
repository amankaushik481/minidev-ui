"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * BarChart — rounded-top bars on a hairline baseline. Hovering one bar dims
 * its siblings and surfaces the value; the peak is marked by default.
 */
function BarChart({
  data,
  className,
  label = "Bar chart",
  format = (n: number) => n.toLocaleString(),
}: {
  data: { label: string; value: number }[]
  className?: string
  label?: string
  format?: (n: number) => string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const peak = data.findIndex((d) => d.value === max)
  const [hover, setHover] = React.useState<number | null>(null)
  const active = hover ?? peak
  return (
    <div data-slot="bar-chart" role="img" aria-label={label} className={cn("flex h-40 flex-col pt-7", className)} onMouseLeave={() => setHover(null)}>
      <div className="relative flex flex-1 items-end gap-1.5 border-b border-border">
        {[0.25, 0.5, 0.75].map((f) => (
          <span key={f} aria-hidden className="pointer-events-none absolute inset-x-0 border-t border-dashed border-border/70" style={{ bottom: `${f * 100}%` }} />
        ))}
        {data.map((d, i) => (
          <div key={d.label} className="relative flex h-full flex-1 items-end" onMouseEnter={() => setHover(i)}>
            <div
              className={cn(
                "relative w-full rounded-t-[5px] transition-[opacity,background-color] duration-[140ms] ease-hairline",
                i === active ? "bg-accent" : "bg-accent/35",
                hover != null && i !== hover && "opacity-60"
              )}
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }}
            >
              <span className="absolute inset-x-0 top-0 h-px rounded-t-[5px] bg-white/30" />
              {i === active ? (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-on-ink shadow-md">
                  {format(d.value)}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 pt-2">
        {data.map((d, i) => (
          <span key={d.label} className={cn("flex-1 truncate text-center font-mono text-[10px]", i === active ? "text-fg" : "text-fg-subtle")}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
export { BarChart }
