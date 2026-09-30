import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { GUIDES } from "@/content/guides"
import { PAGE_SEO } from "@/content/pages"
import { readingMinutes } from "@/content/reading"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.guides, path: "/guides" })

export default function GuidesIndex() {
  const [first, ...rest] = GUIDES
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd(GUIDES.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })), "Guides"), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Guides", path: "/guides" }]))} />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Guides" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Guides</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          How to build real interfaces with React, Next.js and Tailwind CSS v4, written by the team that draws MiniDev UI. Every guide uses code you can install today.
        </p>
        <Link href={`/guides/${first.slug}`} className="group mt-12 block rounded-3xl border border-border bg-surface p-8 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent sm:p-10">
          <span className="font-mono text-[12px] text-fg-subtle">{readingMinutes(first.body, first.faq)} min read</span>
          <span className="mt-3 block max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-fg">{first.title}</span>
          <span className="mt-3 block max-w-2xl text-[1rem] leading-[1.65] text-fg-muted">{first.description}</span>
          <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-fg">Read the guide <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
        </Link>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="font-mono text-[12px] text-fg-subtle">{readingMinutes(g.body, g.faq)} min read</span>
              <span className="mt-2 block text-[1.1875rem] leading-[1.25] font-medium tracking-[-0.025em] text-fg">{g.title}</span>
              <span className="mt-2 block flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{g.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Read <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
