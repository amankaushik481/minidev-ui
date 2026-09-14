"use client"
import { TagsInput } from "@/registry/ui/tags-input"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Tags input">
      <GallerySection title="Default">
        <div className="w-80 space-y-2"><Label>Tags</Label><TagsInput defaultValue={["react","tailwind"]} aria-label="Tags" /></div>
        <div className="w-80 space-y-2"><Label>Disabled</Label><TagsInput defaultValue={["locked"]} disabled aria-label="Disabled tags" /></div>
      </GallerySection>
    </GalleryPage>
  )
}
