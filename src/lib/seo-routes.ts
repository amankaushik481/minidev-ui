import type { Metadata } from "next"
import { COMPONENT_INDEX, type ComponentIndexEntry } from "@/lib/component-index"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { componentSeo } from "@/content/component-seo"
import { categoryById } from "@/content/categories"
import { TEMPLATE_SEO } from "@/content/pages"
import { meta } from "@/lib/seo"

/** "PricingTable" -> "Pricing Table" */
export const humanTitle = (title: string) => title.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

export const kindLabel = (e: ComponentIndexEntry) => (e.kind === "ui" ? "Component" : e.kind === "block" ? "Block" : "Motion")

export function componentCopy(e: ComponentIndexEntry) {
  const seo = componentSeo(e.name)
  const name = humanTitle(e.title)
  const description =
    seo?.description ??
    e.description ??
    `${name} for React and Tailwind CSS v4, drawn to a hairline standard. One file with semantic tokens, light and dark, free under MIT.`
  const category = seo ? categoryById(seo.category) : undefined
  return { name, description, category, keywords: seo?.keywords ?? [], seo }
}

export function docsMeta(name: string): Metadata {
  const e = COMPONENT_INDEX.find((c) => c.name === name)
  if (!e) return { title: "Component not found", robots: { index: false } }
  const c = componentCopy(e)
  const suffix = e.kind === "block" ? "Block" : e.kind === "premium" ? "Animated Component" : "Component"
  // e.g. "Pricing Table: React Component for Tailwind" (the template adds the brand)
  const title = `${c.name}: React ${suffix} for Tailwind`
  return meta({
    title,
    description: c.description,
    path: `/docs/${e.name}`,
    image: `/docs/${e.name}/opengraph-image`,
    keywords: [...c.keywords, `${c.name.toLowerCase()} react`, `${c.name.toLowerCase()} tailwind`, "shadcn"],
  })
}

export function galleryMeta(slug: string): Metadata {
  const g = GALLERY_ENTRIES.find((x) => x.slug === slug)
  if (!g) return meta({ title: "Gallery", description: "Component gallery.", path: `/gallery/${slug}` })
  const label = g.label.replace(/^New in .*/, "New components")
  return meta({
    title: `${label} Components: Live React Examples`,
    description: `${label} components for React and Tailwind CSS, rendered live with sample data in every state: ${g.description.replace(/\.$/, "")}. Free to copy, MIT licensed.`.slice(0, 200),
    path: `/gallery/${slug}`,
  })
}

const BRAND_NAMES: Record<string, string> = { minidev: "MiniDev UI", lumen: "Lumen", ponte: "Ponte", kura: "Kura", relay: "Relay", atlas: "Atlas", cadence: "Cadence", forma: "Forma", hale: "Hale" }

export function brandMeta(slug: string): Metadata {
  const name = BRAND_NAMES[slug]
  if (!name) return { title: "Brand kit not found", robots: { index: false } }
  const kind = TEMPLATE_SEO[slug]?.kind ?? "component library"
  return meta({
    title: `${name} Brand Kit: Logo, Colors, Typography and Voice`,
    description: `The ${name} brand kit (${kind.toLowerCase()}): logo usage and clear space, live color tokens, type scale, voice guidelines and downloadable CSS tokens.`,
    path: `/brand/${slug}`,
    keywords: ["brand kit example", "brand guidelines template", "brand style guide"],
  })
}

export const BRAND_SLUGS = Object.keys(BRAND_NAMES)
