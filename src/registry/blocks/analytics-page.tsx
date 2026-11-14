"use client"
import { cn } from "@/lib/utils"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { BarChart } from "@/registry/ui/bar-chart"
import { ChartCard } from "@/registry/ui/chart-card"
import { InteractiveAreaChart } from "@/registry/ui/interactive-area-chart"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * AnalyticsPage — a metrics page: four KPIs with deltas, a hoverable revenue trend and a signups bar chart.
 *
 * Use for a product or revenue analytics screen with a few headline charts. For the app home with activity use
 * DashboardHome; to let people build their own chart use ReportBuilder. Charts carry text summaries for screen
 * readers and stack on small screens.
 *
 * @example
 * <AnalyticsPage />
 */
type AnalyticsPageProps = {
  className?: string
}

function AnalyticsPage({ className }: AnalyticsPageProps) {
  return (
    <div data-slot="analytics-page" className={cn("space-y-6", className)}>
      <PageHeader title="Analytics" description="Revenue and growth for the Northwind workspace." />
      <AdminStatStrip
        stats={[
          { label: "Trial starts", value: "312", delta: 18 },
          { label: "Trial to paid", value: "24.6%", delta: 2.1 },
          { label: "ARPA", value: "$412", delta: 4 },
          { label: "Active seats", value: "1,184", delta: -1 },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard className="min-w-0" title="Revenue" description="Last 12 months, vs prior year">
          <InteractiveAreaChart />
        </ChartCard>
        <ChartCard className="min-w-0" title="Trial starts" description="Last 8 weeks">
          <BarChart
            label="Trial starts by week"
            className="h-48 w-full"
            data={[
              { label: "W38", value: 214 },
              { label: "W39", value: 236 },
              { label: "W40", value: 228 },
              { label: "W41", value: 251 },
              { label: "W42", value: 267 },
              { label: "W43", value: 259 },
              { label: "W44", value: 288 },
              { label: "W45", value: 312 },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  )
}

export { AnalyticsPage }
export type { AnalyticsPageProps }
