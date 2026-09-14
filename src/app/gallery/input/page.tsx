"use client"

import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function InputGallery() {
  return (
    <GalleryPage title="Input">
      <GallerySection title="Sizes">
        <div className="w-64 space-y-2">
          <Label htmlFor="in-sm">Small</Label>
          <Input id="in-sm" size="sm" placeholder="Small" />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-md">Default</Label>
          <Input id="in-md" placeholder="Default" />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-lg">Large</Label>
          <Input id="in-lg" size="lg" placeholder="Large" />
        </div>
      </GallerySection>
      <GallerySection title="States">
        <div className="w-64 space-y-2">
          <Label htmlFor="in-rest">Rest</Label>
          <Input id="in-rest" placeholder="Rest" />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-disabled">Disabled</Label>
          <Input id="in-disabled" placeholder="Disabled" disabled />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-invalid">Invalid</Label>
          <Input id="in-invalid" placeholder="Invalid" aria-invalid />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-ro">Read only</Label>
          <Input id="in-ro" defaultValue="Read only" readOnly />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-empty">Empty</Label>
          <Input id="in-empty" placeholder="" />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-one">One character</Label>
          <Input id="in-one" defaultValue="A" />
        </div>
        <div className="w-64 space-y-2">
          <Label htmlFor="in-long">Long value</Label>
          <Input id="in-long" defaultValue="Very long value that should not shift layout" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
