import type { Metadata } from "next"
import { galleryMeta } from "@/lib/seo-routes"

export const metadata: Metadata = galleryMeta("workflow")

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
