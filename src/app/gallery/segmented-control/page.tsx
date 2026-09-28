"use client"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { SegmentedDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Segmented control" description="A raised thumb that glides between options. Arrow keys move it, Home and End jump.">
      <GallerySection title="Variants"><SegmentedDemo /></GallerySection>
      <GallerySection title="Disabled">
        <SegmentedControl disabled items={["Day", "Week", "Month"]} aria-label="Disabled range" />
      </GallerySection>
    </GalleryPage>
  )
}
