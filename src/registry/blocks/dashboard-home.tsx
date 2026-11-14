"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { BarChart } from "@/registry/ui/bar-chart"
import { Button } from "@/registry/ui/button"
import { ChartCard } from "@/registry/ui/chart-card"
import { KpiRow } from "@/registry/ui/kpi-row"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * DashboardHome — an app home: page title with a primary action, four KPIs with deltas, a revenue chart and recent activity.
 *
 * Use as the first screen after sign-in. For a metrics-only page with more charts use AnalyticsPage; for an ops
 * home driven by ⌘K use CommandCenter. Composes PageHeader, KpiRow, ChartCard, BarChart and ActivityFeed; the
 * chart and feed stack on small screens.
 *
 * @example
 * <DashboardHome />
 */
type DashboardHomeProps = {
  className?: string
}

function DashboardHome({ className }: DashboardHomeProps) {
  const id = React.useId()
  return (
    <div data-slot="dashboard-home" className={cn("space-y-6", className)}>
      <PageHeader title="Overview" description="Northwind workspace, November 2026" actions={<Button size="sm">New report</Button>} />
      <KpiRow
        items={[
          { label: "MRR", value: "$48,290", delta: 3.1 },
          { label: "Net revenue retention", value: "112%", delta: 1.4 },
          { label: "Churn", value: "1.2%", delta: -0.3, invert: true },
          { label: "Open invoices", value: "$18,640", delta: "14 invoices" },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <ChartCard className="min-w-0 lg:col-span-3" title="Revenue" description="Last 12 months">
          <BarChart label="Revenue by month" format={(n) => `$${(n / 1000).toFixed(1)}k`} className="h-48 w-full" />
        </ChartCard>
        <section aria-labelledby={`${id}-activity`} className="min-w-0 space-y-3 lg:col-span-2">
          <h2 id={`${id}-activity`} className="text-sm font-medium text-fg">
            Recent activity
          </h2>
          <ActivityFeed
            className="max-w-none"
            items={[
              { id: "d1", user: "Northwind", action: "paid INV-2041, $12,400.00", time: "4m ago" },
              { id: "d2", user: "Priya Raman", action: "approved the Q4 board pack", time: "12m ago" },
              { id: "d3", user: "Lumen", action: "flagged a refund spike in #finance", time: "52m ago" },
              { id: "d4", user: "Hana Ito", action: "invited 3 teammates", time: "2h ago" },
            ]}
          />
        </section>
      </div>
    </div>
  )
}

export { DashboardHome }
export type { DashboardHomeProps }
