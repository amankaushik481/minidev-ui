"use client"
import { SearchInput } from "@/registry/ui/search-input"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Search input">
      <GallerySection title="States">
        <div className="w-72 space-y-2"><Label htmlFor="q1">Search</Label><SearchInput id="q1" placeholder="Search components" /></div>
        <div className="w-72 space-y-2"><Label htmlFor="q2">Disabled</Label><SearchInput id="q2" placeholder="Disabled" disabled /></div>
        <div className="w-72 space-y-2"><Label htmlFor="q3">Filled</Label><SearchInput id="q3" defaultValue="button" /></div>
      </GallerySection>
    </GalleryPage>
  )
}
