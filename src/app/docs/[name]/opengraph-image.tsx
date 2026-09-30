import { COMPONENT_INDEX } from "@/lib/component-index"
import { OG_SIZE, OG_TYPE, clip, ogImage } from "@/lib/og"
import { componentCopy } from "@/lib/seo-routes"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI component"

export function generateStaticParams() {
  return COMPONENT_INDEX.map((c) => ({ name: c.name }))
}

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const e = COMPONENT_INDEX.find((c) => c.name === name)
  if (!e) return ogImage({ eyebrow: "Component", title: "MiniDev UI" })
  const c = componentCopy(e)
  return ogImage({
    eyebrow: e.kind === "block" ? "Block" : e.kind === "premium" ? "Motion" : c.category?.label ?? "Component",
    title: c.name,
    subtitle: clip(c.description, 118),
    footer: `npx shadcn add ui.minidev.pro/r/${e.name}.json`,
  })
}
