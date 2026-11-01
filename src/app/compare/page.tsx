import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { COMPARISONS } from "@/content/compare"
import { MATCHUPS } from "@/content/matchups"
import { libraryById } from "@/content/libraries"
import { PAGE_SEO } from "@/content/pages"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.compare, path: "/compare" })

export default function CompareIndex() {
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd([...COMPARISONS, ...MATCHUPS].map((c) => ({ name: c.title, path: `/compare/${c.slug}` }))), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Compare", path: "/compare" }]))} />
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
        <section aria-labelledby="head-to-head" className="mt-16">
          <h2 id="head-to-head" className="scroll-mt-24 text-[1.75rem] font-medium tracking-[-0.03em] text-fg">Head to head</h2>
          <p className="mt-3 max-w-2xl text-[1rem] leading-[1.65] text-fg-muted">
            Two other libraries side by side. Each page opens with which one to pick and when, then a short note on where MiniDev UI fits.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {MATCHUPS.map((m) => (
              <Link key={m.slug} href={`/compare/${m.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                <span className="text-[1.25rem] font-medium tracking-[-0.025em] text-fg">{libraryById(m.a).name} vs {libraryById(m.b).name}</span>
                <span className="mt-2 flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{m.description}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Compare <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[0.9375rem] leading-[1.6] text-fg-muted">
            Replacing a library rather than choosing between two? See the{" "}
            <Link href="/alternatives" className="text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">alternatives to shadcn/ui, Material UI, Tailwind Plus and more</Link>.
          </p>
        </section>
        <p className="mt-10 text-[0.8125rem] leading-[1.6] text-fg-subtle">Product names and trademarks belong to their owners. Facts were checked on the date shown on each page; check each project for current pricing and terms.</p>
      </div>
    </ContentShell>
  )
}
