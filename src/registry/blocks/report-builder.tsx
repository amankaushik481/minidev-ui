"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { ChartCard } from "@/registry/ui/chart-card"
import { Button } from "@/registry/ui/button"
import { DateRangePicker } from "@/registry/ui/date-range-picker"
function ReportBuilder() {
  return (
    <div data-slot="report-builder" className="space-y-4">
      <PageHeader title="Report builder" actions={<Button size="sm">Export</Button>} />
      <DateRangePicker />
      <ChartCard title="Selected metrics">
        <div className="flex h-40 items-end gap-1">
          {Array.from({ length: 16 }, (_, i) => 25 + ((i * 19) % 70)).map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-accent/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
export { ReportBuilder }
