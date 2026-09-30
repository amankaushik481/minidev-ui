import { COMPARISONS, comparisonBySlug } from "@/content/compare"
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI comparison"

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = comparisonBySlug((await params).slug)
  return ogImage({ eyebrow: "Comparison", title: c ? `MiniDev UI vs ${c.other}` : "MiniDev UI", subtitle: "Price, license, components, blocks and how to use them together.", footer: c ? `ui.minidev.pro/compare/${c.slug}` : undefined })
}
