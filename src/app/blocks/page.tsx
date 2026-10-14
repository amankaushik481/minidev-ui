import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { BLOCK_TYPES } from "@/content/blocks"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "Free Tailwind Blocks for React: Hero, Pricing, Features, Footers",
  description: "120+ free page section blocks for React and Tailwind CSS v4: hero sections, pricing tables, feature grids, testimonials, FAQs, footers, navbars, login pages and dashboards. shadcn-compatible, MIT.",
  path: "/blocks",
  keywords: ["tailwind blocks", "react page sections", "tailwind ui blocks free", "shadcn blocks", "landing page sections react"],
})

export default function BlocksIndex() {
  const total = BLOCK_TYPES.reduce((n, b) => n + b.items.length, 0)
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd(BLOCK_TYPES.map((b) => ({ name: b.name, path: `/blocks/${b.slug}` })), "Block types"), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Blocks", path: "/blocks" }]))} />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Blocks" }]} />
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Page sections for React and Tailwind</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">{total} blocks grouped by the job they do on a page. Each one is a single file: install it with the shadcn CLI, change the copy, ship. They share one set of tokens, so sections from different groups fit together.</p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOCK_TYPES.map((b) => (
            <Link key={b.slug} href={`/blocks/${b.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="font-mono text-[11px] tracking-[0.06em] text-fg-subtle uppercase">{b.items.length} blocks</span>
              <span className="mt-3 text-[1.25rem] font-medium tracking-[-0.025em] text-fg">{b.name}</span>
              <span className="mt-2 flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{b.description.replace(/\. [A-Z][^.]*\.$/, ".")}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Browse <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
