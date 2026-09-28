"use client"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { ChartCard } from "@/registry/ui/chart-card"

function AnalyticsPage() {
  return (
    <div data-slot="analytics-page" className="space-y-6">
      <div>
        <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">Analytics</h3>
        <p className="mt-1 text-sm text-fg-muted">Product usage across web, iOS and Android.</p>
      </div>
      <AdminStatStrip stats={[
        { label: "Installs", value: "12.4k", delta: 12 },
        { label: "Trial starts", value: "3.1k", delta: 28 },
        { label: "Conversions", value: "98%", delta: 2 },
        { label: "Active seats", value: "184", delta: -1 },
      ]} />
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Installs" description="Last 30 days">
          <div className="flex h-28 items-end gap-1">
            {[40,55,48,70,62,80,74,88,76,92,85,96].map((h,i)=>(
              <div key={i} className="flex-1 rounded-sm bg-accent/80" style={{height:`${h}%`}} />
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Trial starts" description="Showcase + motion galleries">
          <div className="flex h-28 items-end gap-1">
            {[20,28,35,42,40,55,60,58,70,75,82,90].map((h,i)=>(
              <div key={i} className="flex-1 rounded-sm bg-accent/50" style={{height:`${h}%`}} />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
export { AnalyticsPage }
