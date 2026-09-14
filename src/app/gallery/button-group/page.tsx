"use client"

import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function ButtonGroupGallery() {
  return (
    <GalleryPage title="Button group">
      <GallerySection title="Default">
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </GallerySection>
      <GallerySection title="Selected + disabled">
        <ButtonGroup>
          <Button variant="outline" aria-pressed>Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline" disabled>Month</Button>
        </ButtonGroup>
      </GallerySection>
      <GallerySection title="Single char / long">
        <ButtonGroup>
          <Button variant="outline">A</Button>
          <Button variant="outline">Very long segment label</Button>
          <Button variant="outline">B</Button>
        </ButtonGroup>
      </GallerySection>
    </GalleryPage>
  )
}
