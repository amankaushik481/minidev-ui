"use client"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import { CheckboxGroup } from "@/registry/ui/checkbox-group"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Checkbox">
      <GallerySection title="States">
        <div className="flex items-center gap-2"><Checkbox id="c1" /><Label htmlFor="c1">Unchecked</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c2" defaultChecked /><Label htmlFor="c2">Checked</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3">Disabled</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c4" disabled defaultChecked /><Label htmlFor="c4">Disabled checked</Label></div>
      </GallerySection>
      <GallerySection title="Group">
        <CheckboxGroup>
          <div className="flex items-center gap-2"><Checkbox id="g1" /><Label htmlFor="g1">Email</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="g2" defaultChecked /><Label htmlFor="g2">SMS</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="g3" /><Label htmlFor="g3">Push</Label></div>
        </CheckboxGroup>
      </GallerySection>
    </GalleryPage>
  )
}
