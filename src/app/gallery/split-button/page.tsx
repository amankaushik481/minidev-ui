"use client"

import { SplitButton } from "@/registry/ui/split-button"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function SplitButtonGallery() {
  return (
    <GalleryPage title="Split button">
      <GallerySection title="Default">
        <SplitButton
          label="Save"
          items={[
            { label: "Save draft" },
            { label: "Save and close" },
            { label: "Discard", destructive: true },
          ]}
        />
      </GallerySection>
      <GallerySection title="Disabled">
        <SplitButton label="Publish" disabled items={[{ label: "Schedule" }]} />
      </GallerySection>
      <GallerySection title="Long label">
        <SplitButton
          label="Export everything as CSV"
          items={[{ label: "Export JSON" }, { label: "Export PDF" }]}
        />
      </GallerySection>
    </GalleryPage>
  )
}
