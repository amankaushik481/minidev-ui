import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { COMPARISONS } from "@/content/compare"
import { PAGE_SEO } from "@/content/pages"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.compare, path: "/compare" })

export default function CompareIndex() {
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd(COMPARISONS.map((c) => ({ name: c.title, path: `/compare/${c.slug}` }))), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Compare", path: "/compare" }]))} />
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Compare" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">How MiniDev UI compares</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          Honest side by side notes on the libraries people weigh us against. Most of them work well together with MiniDev UI, and each page says where the other library is the better pick.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {COMPARISONS.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="text-[1.25rem] font-medium tracking-[-0.025em] text-fg">MiniDev UI vs {c.other}</span>
              <span className="mt-2 flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{c.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Compare <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-[0.8125rem] leading-[1.6] text-fg-subtle">Product names and trademarks belong to their owners. Facts were checked on the date shown on each page; check each project for current pricing and terms.</p>
      </div>
    </ContentShell>
  )
}
