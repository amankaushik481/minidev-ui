import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { CATEGORIES } from "@/content/categories"
import { componentsInCategory } from "@/content/component-seo"
import { PAGE_SEO } from "@/content/pages"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"
import { humanTitle } from "@/lib/seo-routes"
import { SITE } from "@/lib/site"

export const metadata: Metadata = meta({ ...PAGE_SEO.components, path: "/components" })

const title = (name: string) => humanTitle(COMPONENT_INDEX.find((c) => c.name === name)?.title ?? name)

export default function ComponentsHub() {
  const cats = CATEGORIES.map((c) => ({ ...c, items: componentsInCategory(c.id) })).sort((a, b) => b.items.length - a.items.length)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "CollectionPage", name: PAGE_SEO.components.title, description: PAGE_SEO.components.description, url: `${SITE.url}/components` },
          itemListLd(cats.map((c) => ({ name: c.h1, path: `/components/${c.id}` })), "Component categories"),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Components", path: "/components" }]),
        )}
      />
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Components" }]} />
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">React components by category</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          {COMPONENT_INDEX.length} free components, blocks and motion effects for React and Tailwind CSS v4. Every one installs as a single file with the shadcn CLI, so you own the code from the first commit.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/components/${c.id}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[1.125rem] font-medium tracking-[-0.02em] text-fg">{c.h1.replace(/^React /, "").replace(/^./, (m) => m.toUpperCase())}</span>
                <span className="font-mono text-[12px] text-fg-subtle tabular-nums">{c.items.length}</span>
              </span>
              <span className="mt-2 text-[0.875rem] leading-[1.6] text-fg-muted">{c.items.slice(0, 5).map(title).join(", ")}</span>
              <span className="mt-auto flex items-center gap-1 pt-5 text-[0.8125rem] font-medium text-fg">
                Browse {c.label.toLowerCase()} <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
