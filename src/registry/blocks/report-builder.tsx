"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { BarChart } from "@/registry/ui/bar-chart"
import { Button } from "@/registry/ui/button"
import { ChartCard } from "@/registry/ui/chart-card"
import { DateRangePicker } from "@/registry/ui/date-range-picker"
import { PageHeader } from "@/registry/ui/page-header"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/**
 * ReportBuilder — a report editor page: title with Export, a date range, a metric switch and a live chart preview.
 *
 * Use when people assemble a saved report from a metric and a period. For a read-only dashboard use
 * DashboardHome or AnalyticsPage. Composes DateRangePicker, SegmentedControl, ChartCard and BarChart.
 *
 * @example
 * <ReportBuilder onExport={({ metric, range }) => downloadCsv(metric, range)} />
 */
type ReportMetric = "revenue" | "refunds" | "new-customers"

type ReportBuilderProps = {
  /** Called by "Export CSV" with the selected metric and date range (ISO yyyy-mm-dd strings). */
  onExport?: (report: { metric: ReportMetric; range: { from?: string; to?: string } }) => void
  className?: string
}

const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const DATA: Record<ReportMetric, { label: string; values: number[]; format: (n: number) => string }> = {
  revenue: { label: "Revenue by month", values: [38200, 47500, 51300, 44700, 56100, 61400], format: (n) => `$${(n / 1000).toFixed(1)}k` },
  refunds: { label: "Refunds by month", values: [1240, 980, 1610, 2280, 1420, 1190], format: (n) => `$${n.toLocaleString("en-US")}` },
  "new-customers": { label: "New customers by month", values: [42, 51, 48, 63, 71, 84], format: (n) => String(n) },
}

function ReportBuilder({ onExport, className }: ReportBuilderProps) {
  const [metric, setMetric] = React.useState<ReportMetric>("revenue")
  const [range, setRange] = React.useState<{ from?: string; to?: string }>({ from: "2026-05-01", to: "2026-10-31" })
  const d = DATA[metric]
  return (
    <div data-slot="report-builder" className={cn("space-y-6", className)}>
      <PageHeader
        title="Report builder"
        description="Pick a metric and a period. The preview updates as you go."
        actions={
          <Button size="sm" onClick={() => onExport?.({ metric, range })}>
            Export CSV
          </Button>
        }
      />
      <div className="flex flex-wrap items-end gap-4">
        <DateRangePicker value={range} onChange={setRange} />
        <SegmentedControl
          aria-label="Metric"
          value={metric}
          onChange={(v) => setMetric(v as ReportMetric)}
          options={[
            { value: "revenue", label: "Revenue" },
            { value: "refunds", label: "Refunds" },
            { value: "new-customers", label: "New customers" },
          ]}
        />
      </div>
      <ChartCard title={d.label} description="Northwind workspace, monthly">
        <BarChart label={d.label} format={d.format} data={MONTHS.map((label, i) => ({ label, value: d.values[i] }))} className="h-48 w-full" />
      </ChartCard>
    </div>
  )
}

export { ReportBuilder }
export type { ReportBuilderProps, ReportMetric }
