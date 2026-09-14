"use client"
import { FileDropzone } from "@/registry/ui/file-dropzone"
import { ImageUpload } from "@/registry/ui/image-upload"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="File dropzone / image upload">
      <GallerySection title="Dropzone"><FileDropzone className="max-w-lg" /></GallerySection>
      <GallerySection title="Image upload"><ImageUpload className="max-w-lg" /></GallerySection>
    </GalleryPage>
  )
}
