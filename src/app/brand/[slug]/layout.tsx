import type { Metadata } from "next"
import { BRAND_SLUGS, brandMeta } from "@/lib/seo-routes"

type Params = { params: Promise<{ slug: string }> }

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
