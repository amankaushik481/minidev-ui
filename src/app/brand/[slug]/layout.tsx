import type { Metadata } from "next"
import { BRAND_SLUGS, brandMeta } from "@/lib/seo-routes"

type Params = { params: Promise<{ slug: string }> }

// Unknown slugs 404 instead of rendering a soft "not found" page with a 200.
export const dynamicParams = false

export function generateStaticParams() {
  return BRAND_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  return brandMeta(slug)
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
