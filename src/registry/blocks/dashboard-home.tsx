"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { KpiRow } from "@/registry/ui/kpi-row"
import { ChartCard } from "@/registry/ui/chart-card"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { Button } from "@/registry/ui/button"

function DashboardHome() {
  return (
    <div data-slot="dashboard-home" className="space-y-6">
      <PageHeader title="Overview" description="Acme workspace" actions={<Button size="sm">New project</Button>} />
      <KpiRow items={[
        { label: "Projects", value: "18", delta: "+2" },
        { label: "Deploys", value: "96", delta: "+12" },
        { label: "Active users", value: "4.2k", delta: "+18%" },
        { label: "Uptime", value: "99.98%", delta: "30d" },
      ]} />
      <div className="grid gap-4 lg:grid-cols-5">
        <ChartCard className="lg:col-span-3" title="Active users" description="Last 30 days">
          <div className="flex h-40 items-end gap-1">
            {Array.from({length:24},(_,i)=>20+((i*17)%80)).map((h,i)=>(
              <div key={i} className="flex-1 rounded-t-[3px] bg-accent/70 transition-colors hover:bg-accent" style={{height:`${h}%`}} />
            ))}
          </div>
        </ChartCard>
        <ActivityFeed className="lg:col-span-2" items={[
          { id:"1", user:"Ada", action:"deployed web@4.2.0", time:"now" },
          { id:"2", user:"Mira", action:"invited 3 teammates", time:"2m" },
        ]} />
      </div>
    </div>
  )
}
export { DashboardHome }
