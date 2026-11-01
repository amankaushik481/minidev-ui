import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { ALTERNATIVES } from "@/content/alternatives"
import { libraryById } from "@/content/libraries"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "Alternatives to popular React UI libraries",
  description:
    "Alternatives to shadcn/ui, Material UI, Chakra UI, Tailwind Plus, Aceternity UI and Magic UI, with price, license, styling and a comparison for each option.",
  path: "/alternatives",
  keywords: ["shadcn ui alternatives", "material ui alternatives", "chakra ui alternatives", "tailwind ui alternatives", "react ui library alternatives"],
})

export default function AlternativesIndex() {
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          itemListLd(ALTERNATIVES.map((p) => ({ name: p.title, path: `/alternatives/${p.slug}` })), "Alternatives to popular React UI libraries"),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Alternatives", path: "/alternatives" }]),
        )}
      />
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Alternatives" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Alternatives to popular React UI libraries</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          Each page starts with the answer: what to use instead, and for whom. Every option comes with its price, license and styling approach, and a link to a side by side comparison. MiniDev UI is on these lists too, placed where it fits rather than first.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {ALTERNATIVES.map((p) => (
            <Link key={p.slug} href={`/alternatives/${p.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="text-[1.25rem] font-medium tracking-[-0.025em] text-fg">{libraryById(p.slug).name} alternatives</span>
              <span className="mt-2 flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{p.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">
                {p.items.length} options <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-[0.9375rem] leading-[1.6] text-fg-muted">
          Weighing two libraries against each other instead? See the{" "}
          <Link href="/compare" className="text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">comparisons and head to head pages</Link>.
        </p>
        <p className="mt-4 text-[0.8125rem] leading-[1.6] text-fg-subtle">Product names and trademarks belong to their owners. Facts were checked on the date shown on each page; check each project for current pricing and terms.</p>
      </div>
    </ContentShell>
  )
}
