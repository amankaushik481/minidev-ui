import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { TEMPLATE_SEO } from "@/content/pages"
import { abs, breadcrumbLd, graph, meta } from "@/lib/seo"

const t = TEMPLATE_SEO.relay

export const metadata: Metadata = meta({ title: t.title, description: t.description, keywords: t.keywords, path: "/templates/relay", image: "/og/templates/relay.jpg" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CreativeWork",
            name: t.title,
            description: t.description,
            url: abs("/templates/relay"),
            genre: t.kind,
            image: abs("/og/templates/relay.jpg"),
            isAccessibleForFree: true,
            creator: { "@id": "https://minidev.pro/#organization" },
          },
          breadcrumbLd([{ name: "Templates", path: "/templates" }, { name: t.title.split(":")[0], path: "/templates/relay" }]),
        )}
      />
      {children}
    </>
  )
}
