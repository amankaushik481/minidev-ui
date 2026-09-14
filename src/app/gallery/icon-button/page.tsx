"use client"

import { PencilIcon, SearchIcon, Trash2Icon } from "lucide-react"
import { IconButton } from "@/registry/ui/icon-button"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function IconButtonGallery() {
  return (
    <GalleryPage title="Icon button">
      <GallerySection title="Variants">
        <IconButton aria-label="Search" variant="default"><SearchIcon /></IconButton>
        <IconButton aria-label="Search outline" variant="outline"><SearchIcon /></IconButton>
        <IconButton aria-label="Edit" variant="ghost"><PencilIcon /></IconButton>
        <IconButton aria-label="Delete" variant="destructive"><Trash2Icon /></IconButton>
      </GallerySection>
      <GallerySection title="Sizes">
        <IconButton aria-label="Search small" size="icon-sm"><SearchIcon /></IconButton>
        <IconButton aria-label="Search" size="icon"><SearchIcon /></IconButton>
        <IconButton aria-label="Search large" size="icon-lg"><SearchIcon /></IconButton>
      </GallerySection>
      <GallerySection title="States">
        <IconButton aria-label="Rest"><SearchIcon /></IconButton>
        <IconButton aria-label="Disabled" disabled><SearchIcon /></IconButton>
        <IconButton aria-label="Invalid" aria-invalid><SearchIcon /></IconButton>
      </GallerySection>
    </GalleryPage>
  )
}
