import type { ReactNode } from "react"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { breadcrumbLd, graph, itemListLd } from "@/lib/seo"
import { humanTitle } from "@/lib/seo-routes"
import { GalleryRouteProvider } from "./gallery-chrome"

/**
 * Server wrapper for one gallery route. Resolves the components the page renders
 * (from the generated index) on the server, so the client bundle never ships the index,
 * and emits BreadcrumbList + ItemList JSON-LD for the page.
 */
export function GalleryRoute({ slug, children }: { slug: string; children: ReactNode }) {
  const label = GALLERY_ENTRIES.find((g) => g.slug === slug)?.label ?? slug
  const items = COMPONENT_INDEX.filter((c) => c.galleries.includes(slug)).map((c) => ({ name: c.name, title: humanTitle(c.title) }))
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Components", path: "/gallery" },
            { name: label, path: `/gallery/${slug}` },
          ]),
          ...(items.length ? [itemListLd(items.map((c) => ({ name: c.title, path: `/docs/${c.name}` })), `${label} components`)] : [])
        )}
      />
      <GalleryRouteProvider value={{ slug, items }}>{children}</GalleryRouteProvider>
    </>
  )
}
