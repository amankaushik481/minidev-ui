"use client"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Slider } from "@/registry/ui/slider"
import { RangeSlider } from "@/registry/ui/range-slider"
import { Label } from "@/registry/ui/label"
import { SliderDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const cell = "w-64 space-y-3"
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function Page() {
  return (
    <GalleryPage title="Slider" description="Drag a thumb or tab to it: the value rises above the thumb, and arrow keys step it.">
      <GallerySection title="Usage alerts" description="Marks, formatted values, a range with a minimum gap">
        <SliderDemo />
      </GallerySection>

      <GallerySection title="Single" className="items-start gap-10">
        <div className={cell}><Label id="vol-label">Volume</Label><Slider defaultValue={[40]} aria-label="Volume" aria-labelledby="vol-label" /></div>
        <div className={cell}><Label id="vol-dis-label">Disabled</Label><Slider defaultValue={[40]} disabled aria-label="Disabled volume" aria-labelledby="vol-dis-label" /></div>
        <div className={cell}><Label id="inv-label">Invalid</Label><Slider defaultValue={[92]} aria-invalid aria-label="Invalid" aria-labelledby="inv-label" format={(n) => `${n}%`} /></div>
        <div className={cell}><Label id="ticks-label">Ticks only</Label><Slider defaultValue={[3]} min={1} max={5} aria-label="Priority" aria-labelledby="ticks-label" marks={[1, 2, 3, 4, 5]} format={(n) => `P${n}`} /></div>
        <div className={cell}>
          <Label id="retention-label">Log retention</Label>
          <Slider
            defaultValue={[30]}
            min={7}
            max={90}
            aria-label="Log retention"
            aria-labelledby="retention-label"
            format={(n) => `${n} days`}
            marks={[{ value: 7, label: "7d" }, { value: 30, label: "30d" }, { value: 60, label: "60d" }, { value: 90, label: "90d" }]}
          />
        </div>
        <div className={cell}><Label id="pct-label">Intl format</Label><Slider defaultValue={[0.35]} min={0} max={1} step={0.01} aria-label="Discount" aria-labelledby="pct-label" format={{ style: "percent" }} /></div>
      </GallerySection>

      <GallerySection title="Range" className="items-start gap-10">
        <div className={cell}><Label id="price-label">Price</Label><RangeSlider defaultValue={[20, 80]} aria-label="Price range" /></div>
        <div className={cell}>
          <Label id="mrr-label">MRR band</Label>
          <RangeSlider
            defaultValue={[2000, 8000]}
            min={0}
            max={10000}
            step={500}
            minStepsBetweenValues={2}
            aria-label="MRR band"
            aria-labelledby="mrr-label"
            format={usd}
            marks={[{ value: 0, label: "$0" }, { value: 5000, label: "$5k" }, { value: 10000, label: "$10k" }]}
          />
        </div>
        <div className={cell}><Label id="range-dis-label">Disabled</Label><RangeSlider defaultValue={[30, 60]} disabled aria-label="Disabled range" aria-labelledby="range-dis-label" /></div>
      </GallerySection>

      <GallerySection title="Vertical" className="justify-center gap-16">
        <div className="h-40"><Slider orientation="vertical" defaultValue={[60]} aria-label="Output gain" format={(n) => `${n} dB`} /></div>
        <div className="h-40"><Slider orientation="vertical" defaultValue={[20, 70]} aria-label="Band" /></div>
      </GallerySection>

      <GallerySection title="Edge cases" className="items-start gap-10">
        <div className={cell}><Label id="min-label">At min</Label><Slider defaultValue={[0]} aria-label="At min" aria-labelledby="min-label" /></div>
        <div className={cell}><Label id="max-label">At max</Label><Slider defaultValue={[100]} aria-label="At max" aria-labelledby="max-label" /></div>
        <div className={cell}><Label id="long-label">Long value</Label><Slider defaultValue={[12]} aria-label="Long value" aria-labelledby="long-label" format={(n) => `${n} invoices overdue by more than 30 days`} /></div>
        <div className={cell}><Label id="same-label">Thumbs together</Label><RangeSlider defaultValue={[50, 50]} aria-label="Collapsed range" aria-labelledby="same-label" /></div>
        <div className={cell}><Label id="nobubble-label">No bubble</Label><Slider defaultValue={[55]} showValue={false} aria-label="No bubble" aria-labelledby="nobubble-label" /></div>
        <DirectionProvider direction="rtl">
          <div dir="rtl" className={cell}>
            <Label id="rtl-label">الحجم</Label>
            <Slider defaultValue={[30]} aria-label="RTL" aria-labelledby="rtl-label" marks={[{ value: 0, label: "0" }, { value: 50, label: "50" }, { value: 100, label: "100" }]} />
          </div>
        </DirectionProvider>
      </GallerySection>
    </GalleryPage>
  )
}
