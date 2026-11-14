import type { Metadata } from "next"
import { galleryMeta } from "@/lib/seo-routes"
import { GalleryRoute } from "../_components/gallery-route"

export const metadata: Metadata = galleryMeta("dropdown-menu")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GalleryRoute slug="dropdown-menu">{children}</GalleryRoute>
}
