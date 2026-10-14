import { BLOCK_TYPES, blockTypeBySlug } from "@/content/blocks"
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI blocks"

export function generateStaticParams() {
  return BLOCK_TYPES.map((b) => ({ type: b.slug }))
}

export default async function Image({ params }: { params: Promise<{ type: string }> }) {
  const b = blockTypeBySlug((await params).type)
  if (!b) return ogImage({ eyebrow: "Blocks", title: "MiniDev UI" })
  return ogImage({ eyebrow: `${b.items.length} free blocks`, title: b.h1, subtitle: "Copy one file with the shadcn CLI. Tailwind CSS v4, light and dark, MIT.", footer: `ui.minidev.pro/blocks/${b.slug}` })
}
