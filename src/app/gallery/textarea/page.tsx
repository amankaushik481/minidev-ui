"use client"

import { Textarea } from "@/registry/ui/textarea"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function TextareaGallery() {
  return (
    <GalleryPage title="Textarea">
      <GallerySection title="Default">
        <div className="w-80 space-y-2">
          <Label htmlFor="ta">Notes</Label>
          <Textarea id="ta" placeholder="Write something…" />
        </div>
      </GallerySection>
      <GallerySection title="States">
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-dis">Disabled</Label>
          <Textarea id="ta-dis" placeholder="Disabled" disabled />
        </div>
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-inv">Invalid</Label>
          <Textarea id="ta-inv" placeholder="Invalid" aria-invalid />
        </div>
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-ro">Read only</Label>
          <Textarea id="ta-ro" defaultValue="Read only value" readOnly />
        </div>
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-empty">Empty</Label>
          <Textarea id="ta-empty" placeholder="" />
        </div>
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-one">One character</Label>
          <Textarea id="ta-one" defaultValue="A" />
        </div>
        <div className="w-80 space-y-2">
          <Label htmlFor="ta-long">Long</Label>
          <Textarea
            id="ta-long"
            defaultValue={Array.from({ length: 12 }, () => "line").join("\n")}
          />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
