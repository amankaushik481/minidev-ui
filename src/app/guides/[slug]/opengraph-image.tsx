import { GUIDES, guideBySlug } from "@/content/guides"
import { readingMinutes } from "@/content/reading"
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI guide"

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug)
  if (!g) return ogImage({ eyebrow: "Guide", title: "MiniDev UI guides" })
  return ogImage({ eyebrow: `Guide · ${readingMinutes(g.body, g.faq)} min read`, title: g.title, footer: `ui.minidev.pro/guides/${g.slug}` })
}
