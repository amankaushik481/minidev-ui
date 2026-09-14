"use client"
import { KpiRow } from "@/registry/ui/kpi-row"
import { StatCard } from "@/registry/ui/stat-card"
import { ChartCard } from "@/registry/ui/chart-card"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Stats & charts">
      <GallerySection title="KPI row">
        <KpiRow className="w-full" items={[
          { label: "MRR", value: "$48.2k", delta: "+12% vs last month" },
          { label: "Active users", value: "12,480", delta: "+3.1%" },
          { label: "Churn", value: "2.4%", delta: "-0.2%" },
          { label: "NPS", value: "62", delta: "+4" },
        ]} />
      </GallerySection>
      <GallerySection title="Stat card">
        <StatCard className="w-56" label="Latency" value="142ms" delta="p95" />
      </GallerySection>
      <GallerySection title="Chart card">
        <ChartCard className="w-full max-w-xl" title="Signups" description="Last 14 days">
          <div className="flex h-40 items-end gap-1">
            {[40,55,48,70,62,80,75,90,88,95,92,100,110,120].map((h,i)=>(
              <div key={i} className="flex-1 rounded-sm bg-accent/80" style={{ height: `${h/1.4}%` }} />
            ))}
          </div>
        </ChartCard>
      </GallerySection>
    </GalleryPage>
  )
}
