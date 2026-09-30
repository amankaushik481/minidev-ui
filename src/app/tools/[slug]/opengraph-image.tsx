import { TOOLS, toolBySlug } from "@/content/tools"
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "Free tool from MiniDev UI"

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const t = toolBySlug((await params).slug)
  return ogImage({ eyebrow: "Free tool", title: t?.name.replace(/^./, (m) => m.toUpperCase()) ?? "Free tools", subtitle: t ? t.description.split(". ")[0] + "." : undefined, footer: t ? `ui.minidev.pro/tools/${t.slug}` : undefined })
}
