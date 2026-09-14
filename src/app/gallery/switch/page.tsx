"use client"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Switch">
      <GallerySection title="States">
        <div className="flex items-center gap-2">
          <Switch id="s1" aria-label="Off" />
          <Label htmlFor="s1">Off</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s2" defaultChecked aria-label="On" />
          <Label htmlFor="s2">On</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s3" disabled aria-label="Disabled" />
          <Label htmlFor="s3">Disabled</Label>
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
