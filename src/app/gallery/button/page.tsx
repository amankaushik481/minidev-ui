"use client"

import { Loader2Icon, PlusIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function ButtonGallery() {
  return (
    <GalleryPage title="Button">
      <GallerySection title="Variants">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </GallerySection>
      <GallerySection title="Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </GallerySection>
      <GallerySection title="States">
        <Button>Rest</Button>
        <Button disabled>Disabled</Button>
        <Button aria-invalid>Invalid</Button>
        <Button disabled>
          <Loader2Icon className="animate-spin" />
          Loading
        </Button>
        <Button>
          <PlusIcon />
          With icon
        </Button>
        <Button aria-label="Add only">
          <PlusIcon />
        </Button>
        <Button>A</Button>
        <Button>Very long label that should not shift layout on hover or focus</Button>
      </GallerySection>
      <GallerySection title="RTL">
        <div dir="rtl" className="flex flex-wrap gap-4">
          <Button>
            <PlusIcon />
            إضافة
          </Button>
          <Button variant="outline">إلغاء</Button>
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
