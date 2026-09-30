import { GLOSSARY, termBySlug } from "@/content/glossary"
import { OG_SIZE, OG_TYPE, clip, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI glossary"

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const t = termBySlug((await params).slug)
  return ogImage({ eyebrow: "Glossary", title: t ? `What is ${t.term}?` : "Glossary", subtitle: t ? clip(t.short, 120) : undefined, footer: t ? `ui.minidev.pro/glossary/${t.slug}` : undefined })
}
