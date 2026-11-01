import type { MetadataRoute } from "next"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { CATEGORIES } from "@/content/categories"
import { GUIDES } from "@/content/guides"
import { COMPARISONS } from "@/content/compare"
import { MATCHUPS } from "@/content/matchups"
import { ALTERNATIVES } from "@/content/alternatives"
import { TOOLS } from "@/content/tools"
import { GLOSSARY } from "@/content/glossary"
import { BLOCK_TYPES } from "@/content/blocks"
import { INSTALLS } from "@/content/install"
import { TEMPLATE_SEO } from "@/content/pages"
import { BRAND_SLUGS } from "@/lib/seo-routes"
import { SITE } from "@/lib/site"

/** Bump when the component set changes; used as lastModified for library pages. */
const LIBRARY_UPDATED = new Date("2026-10-14")

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${SITE.url}${path}`
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly", lastModified = LIBRARY_UPDATED) => ({ url: u(path), lastModified, changeFrequency, priority })
  // The alternatives index changes when any of its pages is re-checked.
  const alternativesChecked = new Date(ALTERNATIVES.map((p) => p.checked).reduce((x, y) => (x > y ? x : y)))
  return [
    page("", 1, "weekly"),
    page("/docs", 0.9),
    page("/components", 0.9),
    page("/gallery", 0.8),
    page("/templates", 0.9),
    page("/guides", 0.8),
    page("/compare", 0.6, "monthly"),
    page("/alternatives", 0.6, "monthly", alternativesChecked),
    page("/tools", 0.8),
    page("/studio", 0.8, "monthly"),
    page("/showcase", 0.5, "monthly"),
    page("/playground", 0.5, "monthly"),
    page("/glossary", 0.7, "monthly"),
    page("/changelog", 0.5, "weekly"),
    page("/docs/installation", 0.8, "monthly"),
    page("/blocks", 0.9),
    ...BLOCK_TYPES.map((b) => page(`/blocks/${b.slug}`, 0.8)),
    page("/about", 0.5, "monthly"),
    page("/sitemap", 0.3, "monthly"),
    ...INSTALLS.map((g) => page(`/docs/installation/${g.slug}`, 0.8, "monthly", new Date(g.updated ?? g.date))),
    ...GLOSSARY.map((t) => page(`/glossary/${t.slug}`, 0.6, "monthly")),
    ...CATEGORIES.map((c) => page(`/components/${c.id}`, 0.8)),
    ...COMPONENT_INDEX.map((c) => page(`/docs/${c.name}`, c.kind === "block" ? 0.7 : 0.6, "monthly")),
    ...Object.keys(TEMPLATE_SEO).map((s) => page(`/templates/${s}`, 0.8, "monthly")),
    ...BRAND_SLUGS.map((s) => page(s === "minidev" ? "/brand" : `/brand/${s}`, 0.5, "monthly")),
    ...GALLERY_ENTRIES.map((g) => page(`/gallery/${g.slug}`, 0.5, "monthly")),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", new Date(g.updated ?? g.date))),
    ...COMPARISONS.map((c) => page(`/compare/${c.slug}`, 0.6, "monthly", new Date(c.checked))),
    ...MATCHUPS.map((m) => page(`/compare/${m.slug}`, 0.6, "monthly", new Date(m.checked))),
    ...ALTERNATIVES.map((p) => page(`/alternatives/${p.slug}`, 0.6, "monthly", new Date(p.checked))),
    ...TOOLS.map((t) => page(`/tools/${t.slug}`, 0.8, "monthly")),
  ]
}
