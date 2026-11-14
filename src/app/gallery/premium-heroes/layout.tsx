import type { Metadata } from "next"
import { galleryMeta } from "@/lib/seo-routes"
import { GalleryRoute } from "../_components/gallery-route"

export const metadata: Metadata = galleryMeta("premium-heroes")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GalleryRoute slug="premium-heroes">{children}</GalleryRoute>
}
