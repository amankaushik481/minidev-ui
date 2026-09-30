import { CATEGORIES, categoryById } from "@/content/categories"
import { componentsInCategory } from "@/content/component-seo"
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI component category"

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }))
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const c = categoryById((await params).category)
  if (!c) return ogImage({ eyebrow: "Components", title: "MiniDev UI" })
  const n = componentsInCategory(c.id).length
  return ogImage({ eyebrow: `${n} free components`, title: c.h1.replace(/^./, (m) => m.toUpperCase()), subtitle: "Copy one file with the shadcn CLI. Tailwind CSS v4, light and dark, MIT.", footer: `ui.minidev.pro/components/${c.id}` })
}
