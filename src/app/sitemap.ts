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
import { BRAND_SLUGS, galleryDuplicatesDocs } from "@/lib/seo-routes"
import { CHANGELOG } from "@/content/changelog"
import { SITE } from "@/lib/site"

/** Library pages change with each release, so the newest changelog entry dates them. */
const LIBRARY_UPDATED = new Date(CHANGELOG[0].date)
/** Keep in step with UPDATED in src/app/docs/ai/page.tsx. */
const AI_DOCS_UPDATED = new Date("2026-11-14")

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${SITE.url}${path}`
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly", lastModified = LIBRARY_UPDATED) => ({ url: u(path), lastModified, changeFrequency, priority })
  const newest = (dates: string[]) => new Date(dates.reduce((x, y) => (x > y ? x : y)))
  // An index changes when any page under it changes.
  const alternativesChecked = newest(ALTERNATIVES.map((p) => p.checked))
  const compareChecked = newest([...COMPARISONS, ...MATCHUPS].map((c) => c.checked))
  const guidesUpdated = newest(GUIDES.map((g) => g.updated ?? g.date))
  return [
    page("", 1, "weekly"),
    page("/docs", 0.9),
    page("/components", 0.9),
    page("/gallery", 0.8),
    page("/templates", 0.9),
    page("/guides", 0.8, "weekly", guidesUpdated),
    page("/compare", 0.6, "monthly", compareChecked),
    page("/alternatives", 0.6, "monthly", alternativesChecked),
    page("/tools", 0.8),
    page("/studio", 0.8, "monthly"),
    page("/showcase", 0.5, "monthly"),
    page("/glossary", 0.7, "monthly"),
    page("/changelog", 0.5, "weekly"),
    page("/docs/installation", 0.8, "monthly"),
    page("/docs/ai", 0.9, "weekly", AI_DOCS_UPDATED),
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
    // Left out: /playground (robots.txt blocks /playground/) and the noindexed galleries that repeat a docs page.
    ...GALLERY_ENTRIES.filter((g) => !galleryDuplicatesDocs(g.slug)).map((g) => page(`/gallery/${g.slug}`, 0.5, "monthly")),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", new Date(g.updated ?? g.date))),
    ...COMPARISONS.map((c) => page(`/compare/${c.slug}`, 0.6, "monthly", new Date(c.checked))),
    ...MATCHUPS.map((m) => page(`/compare/${m.slug}`, 0.6, "monthly", new Date(m.checked))),
    ...ALTERNATIVES.map((p) => page(`/alternatives/${p.slug}`, 0.6, "monthly", new Date(p.checked))),
    ...TOOLS.map((t) => page(`/tools/${t.slug}`, 0.8, "monthly")),
  ]
}
