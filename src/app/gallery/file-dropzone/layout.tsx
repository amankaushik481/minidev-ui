import type { Metadata } from "next"
import { galleryMeta } from "@/lib/seo-routes"
import { GalleryRoute } from "../_components/gallery-route"

export const metadata: Metadata = galleryMeta("file-dropzone")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GalleryRoute slug="file-dropzone">{children}</GalleryRoute>
}
