"use client"
import * as React from "react"
import { FilterBar } from "@/registry/ui/filter-bar"
import { FacetFilter } from "@/registry/ui/facet-filter"
import { ChipFilter } from "@/registry/ui/chip-filter"
import { BulkActionsBar } from "@/registry/ui/bulk-actions-bar"
import { MetricDelta } from "@/registry/ui/metric-delta"
import { FunnelSteps } from "@/registry/ui/funnel-steps"
import { HeatmapCell } from "@/registry/ui/heatmap-cell"
import { DensityToggle } from "@/registry/ui/density-toggle"
import { Button } from "@/registry/ui/button"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [chip, setChip] = React.useState("all")
  const [facets, setFacets] = React.useState<string[]>(["open"])
  const [density, setDensity] = React.useState<"compact" | "comfortable">("comfortable")
  return (
    <GalleryPage title="Data filters & metrics">
      <GallerySection title="Filters">
        <FilterBar onClear={() => setFacets([])}>
          <ChipFilter value={chip} onChange={setChip} options={[{ value: "all", label: "All" }, { value: "mine", label: "Mine" }, { value: "open", label: "Open" }]} />
        </FilterBar>
        <FacetFilter title="Status" value={facets} onChange={setFacets} options={[{ value: "open", label: "Open", count: 12 }, { value: "done", label: "Done", count: 40 }]} />
        <DensityToggle value={density} onChange={setDensity} />
      </GallerySection>
      <GallerySection title="Metrics">
        <div className="flex items-center gap-2 text-sm">Growth <MetricDelta value={12.4} /></div>
        <div className="flex gap-1">{[0.1,0.3,0.6,0.9,0.4].map((i, idx) => <HeatmapCell key={idx} intensity={i} label={`${Math.round(i*100)}%`} />)}</div>
        <div className="w-72"><FunnelSteps steps={[{ label: "Visited", value: 1200 }, { label: "Signed up", value: 420 }, { label: "Activated", value: 210 }]} /></div>
      </GallerySection>
      <BulkActionsBar count={3} onClear={() => {}}>
        <Button size="sm" variant="outline">Archive</Button>
        <Button size="sm" variant="outline" className="text-danger border-danger/40">Delete</Button>
      </BulkActionsBar>
    </GalleryPage>
  )
}
