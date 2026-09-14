"use client"
import { ColorPicker } from "@/registry/ui/color-picker"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Color picker">
      <GallerySection title="Swatches"><ColorPicker /></GallerySection>
    </GalleryPage>
  )
}
