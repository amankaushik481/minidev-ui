"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A raised card that frames a chart with a title, an optional description and an optional header action.
 *
 * Wrap AreaChart, BarChart, LineChart and friends in it so every chart on a dashboard shares one header style.
 * The title labels the region for screen readers. For a single KPI with a sparkline use StatSparkline.
 *
 * @example
 * <ChartCard title="Revenue" description="Last 12 weeks" action={<Button size="sm" variant="ghost">Export</Button>}>
 *   <AreaChart data={weekly} />
 * </ChartCard>
 */
type ChartCardProps = {
  /** Card heading, rendered as an h3 that names the region. */
  title: React.ReactNode
  /** Secondary line under the title, such as the time range. */
  description?: React.ReactNode
  /** Rendered at the header's end: a range picker, a menu or a link. */
  action?: React.ReactNode
  /** The chart, plus any ChartLegend. */
  children?: React.ReactNode
  className?: string
}

function ChartCard({ title, description, action, children, className }: ChartCardProps) {
  const id = React.useId()
  return (
    <section
      data-slot="chart-card"
      aria-labelledby={`${id}-title`}
      className={cn("rounded-xl border border-border bg-surface p-5 shadow-raised", className)}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={`${id}-title`} className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
            {title}
          </h3>
          {description ? <p className="mt-1 text-xs text-fg-muted">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className="min-h-40">{children}</div>
    </section>
  )
}
export { ChartCard }
export type { ChartCardProps }
