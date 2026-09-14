"use client"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Radio group">
      <GallerySection title="Default">
        <RadioGroup defaultValue="a" className="gap-2">
          <div className="flex items-center gap-2"><RadioGroupItem value="a" id="r1" /><Label htmlFor="r1">Alpha</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="b" id="r2" /><Label htmlFor="r2">Beta</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="c" id="r3" disabled /><Label htmlFor="r3">Disabled</Label></div>
        </RadioGroup>
      </GallerySection>
    </GalleryPage>
  )
}
