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
import { HubBrowser, type HubCategory } from "./_browse/hub-browser"
import { AgentNote, type BrowseItem } from "./_browse/install-card"

export const metadata: Metadata = meta({ ...PAGE_SEO.components, path: "/components" })

const title = (name: string) => humanTitle(COMPONENT_INDEX.find((c) => c.name === name)?.title ?? name)

const MORE = [
  { href: "/blocks", title: "Page sections by type", body: "Hero, pricing, features, FAQ, footers, login pages and dashboards, rendered live." },
  { href: "/templates", title: "Whole product templates", body: "Complete landing pages for SaaS, fintech, AI agents, healthcare and more, built from these parts." },
]

export default function ComponentsHub() {
  const cats = CATEGORIES.map((c) => ({ ...c, items: componentsInCategory(c.id) })).sort((a, b) => b.items.length - a.items.length)
  const label = new Map(CATEGORIES.map((c) => [c.id as string, c.label]))
  const hub: HubCategory[] = cats.map((c) => ({
    id: c.id,
    name: c.h1.replace(/^React /, "").replace(/^./, (m) => m.toUpperCase()),
    count: c.items.length,
    blurb: c.blurb,
    // The picker's first rows are the hand-picked starting points for each category.
    samples: c.picker.map((p) => p.use).slice(0, 6).map((n) => ({ name: n, title: title(n) })),
  }))
  // Name, title and category only: descriptions for every component would triple the page payload.
  const items: BrowseItem[] = COMPONENT_INDEX.map((e) => ({ name: e.name, title: humanTitle(e.title), kind: e.kind, meta: e.category ? label.get(e.category) : undefined }))
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
          {COMPONENT_INDEX.length} free components, blocks and motion effects for React and Tailwind CSS v4. Every one installs as a single file with one shadcn CLI command, so you own the code from the first commit. Filter the whole set below, or open a category for live demos, guidance and FAQs.
        </p>
        <HubBrowser categories={hub} items={items} />
        <AgentNote />

        <nav aria-labelledby="more-heading" className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          <h2 id="more-heading" className="sr-only">
            More ways to browse
          </h2>
          {MORE.map((m) => (
            <Link key={m.href} href={m.href} className="group rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none transition-[border-color] duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="flex items-center gap-1.5 text-[1.0625rem] font-medium tracking-[-0.02em] text-fg">
                {m.title} <ArrowRightIcon className="size-3.5 text-fg-subtle transition-transform duration-[140ms] group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-[0.875rem] leading-[1.6] text-fg-muted">{m.body}</span>
            </Link>
          ))}
        </nav>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
