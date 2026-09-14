"use client"
import { Slider } from "@/registry/ui/slider"
import { RangeSlider } from "@/registry/ui/range-slider"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Slider">
      <GallerySection title="Single">
        <div className="w-64 space-y-2"><Label id="vol-label">Volume</Label><Slider defaultValue={[40]} aria-label="Volume" aria-labelledby="vol-label" /></div>
        <div className="w-64 space-y-2"><Label id="vol-dis-label">Disabled</Label><Slider defaultValue={[40]} disabled aria-label="Disabled volume" aria-labelledby="vol-dis-label" /></div>
      </GallerySection>
      <GallerySection title="Range">
        <div className="w-64 space-y-2"><Label id="price-label">Price</Label><RangeSlider defaultValue={[20, 80]} aria-label="Price range" /></div>
      </GallerySection>
    </GalleryPage>
  )
}
