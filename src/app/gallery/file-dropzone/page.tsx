"use client"
import { ImageUpload } from "@/registry/ui/image-upload"
import { DropzoneDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="File dropzone" description="Drag a file over it. The border marches, the target lifts, and wrong file types are refused before you let go.">
      <GallerySection title="Dropzone with uploads"><DropzoneDemo /></GallerySection>
      <GallerySection title="Image upload"><ImageUpload className="max-w-lg" /></GallerySection>
    </GalleryPage>
  )
}
