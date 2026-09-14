"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { KpiRow } from "@/registry/ui/kpi-row"
import { ChartCard } from "@/registry/ui/chart-card"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { Button } from "@/registry/ui/button"

function DashboardHome() {
  return (
    <div data-slot="dashboard-home" className="space-y-6">
      <PageHeader title="Overview" description="MiniDev workspace" actions={<Button size="sm">New project</Button>} />
      <KpiRow items={[
        { label: "Projects", value: "18", delta: "+2" },
        { label: "Components", value: "96", delta: "+12" },
        { label: "Installs", value: "4.2k", delta: "+18%" },
        { label: "Audit", value: "green", delta: "passing" },
      ]} />
      <div className="grid gap-4 lg:grid-cols-5">
        <ChartCard className="lg:col-span-3" title="Installs" description="30 days">
          <div className="flex h-40 items-end gap-1">
            {Array.from({length:24},(_,i)=>20+((i*17)%80)).map((h,i)=>(
              <div key={i} className="flex-1 rounded-sm bg-accent/80" style={{height:`${h}%`}} />
            ))}
          </div>
        </ChartCard>
        <ActivityFeed className="lg:col-span-2" items={[
          { id:"1", user:"Aman", action:"shipped Batch A", time:"now" },
          { id:"2", user:"System", action:"audit passed", time:"2m" },
        ]} />
      </div>
    </div>
  )
}
export { DashboardHome }
