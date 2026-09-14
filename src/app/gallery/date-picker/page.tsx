"use client"
import { DatePicker } from "@/registry/ui/date-picker"
import { DateRangePicker } from "@/registry/ui/date-range-picker"
import { TimePicker } from "@/registry/ui/time-picker"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Date & time">
      <GallerySection title="Date">
        <div className="space-y-2"><Label htmlFor="d1">Date</Label><DatePicker id="d1" aria-label="Date" /></div>
        <div className="space-y-2"><Label htmlFor="d2">Disabled</Label><DatePicker id="d2" disabled aria-label="Disabled date" /></div>
      </GallerySection>
      <GallerySection title="Range">
        <div className="space-y-2">
          <span className="text-sm font-medium">Date range</span>
          <DateRangePicker fromId="dr-from" toId="dr-to" />
        </div>
      </GallerySection>
      <GallerySection title="Time">
        <div className="space-y-2"><Label htmlFor="t1">Time</Label><TimePicker id="t1" aria-label="Time" /></div>
      </GallerySection>
    </GalleryPage>
  )
}
