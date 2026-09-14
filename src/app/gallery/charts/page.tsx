"use client"
import { AreaChart } from "@/registry/ui/area-chart"
import { BarChart } from "@/registry/ui/bar-chart"
import { LineChart } from "@/registry/ui/line-chart"
import { DonutChart } from "@/registry/ui/donut-chart"
import { HorizontalBarChart } from "@/registry/ui/horizontal-bar-chart"
import { StackedBarChart } from "@/registry/ui/stacked-bar-chart"
import { RadarChart } from "@/registry/ui/radar-chart"
import { GaugeChart } from "@/registry/ui/gauge-chart"
import { SparklineSet } from "@/registry/ui/sparkline-set"
import { ChartLegend } from "@/registry/ui/chart-legend"
import { ChartTooltipCard } from "@/registry/ui/chart-tooltip-card"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Charts">
      <GallerySection title="Sparklines">
        <div className="w-full">
          <SparklineSet items={[
            { label: "Revenue", value: "$48.2k", delta: 12.4, data: [12,18,15,28,22,36,30,42] },
            { label: "Signups", value: "1,204", delta: 4.1, data: [8,10,9,14,13,18,16,20] },
            { label: "Churn", value: "2.1%", delta: -0.4, data: [6,5,7,4,5,3,4,3] },
          ]} />
        </div>
      </GallerySection>
      <GallerySection title="Area / line / bar">
        <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-4"><AreaChart data={[12,18,15,28,22,36,30,42]} /></div>
        <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-4"><LineChart series={[[10,14,12,20,18,26],[8,9,15,14,21,19]]} /></div>
        <div className="w-72 rounded-xl border border-border bg-surface p-4"><BarChart data={[{label:"Mon",value:12},{label:"Tue",value:18},{label:"Wed",value:9},{label:"Thu",value:22},{label:"Fri",value:16}]} /></div>
      </GallerySection>
      <GallerySection title="Stacked / horizontal">
        <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-4">
          <StackedBarChart
            seriesLabels={["New", "Returning"]}
            data={[
              { label: "W1", values: [12, 8] },
              { label: "W2", values: [15, 10] },
              { label: "W3", values: [9, 14] },
              { label: "W4", values: [18, 11] },
            ]}
          />
        </div>
        <div className="w-80 rounded-xl border border-border bg-surface p-4">
          <HorizontalBarChart data={[{label:"Design",value:42},{label:"Eng",value:68},{label:"Growth",value:35}]} />
        </div>
      </GallerySection>
      <GallerySection title="Radar / gauge / donut">
        <RadarChart labels={["Speed","A11y","DX","Motion","Tokens"]} values={[0.8,0.95,0.75,0.7,0.9]} />
        <GaugeChart value={78} label="Health" />
        <DonutChart value={72} label="Completion" />
      </GallerySection>
      <GallerySection title="Legend / tooltip">
        <ChartLegend items={[{ label: "Free" }, { label: "Premium" }, { label: "Studio" }]} />
        <ChartTooltipCard title="Sep 14" rows={[{ label: "Views", value: "12.4k" }, { label: "Signups", value: "318" }]} />
      </GallerySection>
    </GalleryPage>
  )
}
