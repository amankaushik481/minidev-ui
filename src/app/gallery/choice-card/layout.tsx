import type { Metadata } from "next"
import { galleryMeta } from "@/lib/seo-routes"
import { GalleryRoute } from "../_components/gallery-route"

export const metadata: Metadata = galleryMeta("choice-card")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GalleryRoute slug="choice-card">{children}</GalleryRoute>
}
