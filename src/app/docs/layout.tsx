import type { Metadata } from "next"
import { PAGE_SEO } from "@/content/pages"
import { meta } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.docs, path: "/docs" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
