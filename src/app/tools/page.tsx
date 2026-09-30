import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, LayersIcon, PaletteIcon, SparklesIcon, SunIcon } from "lucide-react"
import { TOOLS } from "@/content/tools"
import { PAGE_SEO } from "@/content/pages"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.tools, path: "/tools" })

const ICONS: Record<string, typeof SunIcon> = { "box-shadow-generator": SunIcon, "glassmorphism-generator": LayersIcon, "oklch-palette-generator": PaletteIcon, "brand-kit-generator": SparklesIcon }

export default function ToolsIndex() {
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd(TOOLS.map((t) => ({ name: t.title, path: `/tools/${t.slug}` })), "Free tools"), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Tools", path: "/tools" }]))} />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Tools" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Free design tools</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">Small, precise tools for the details that make interfaces feel finished. They run in your browser, need no account, and export CSS or Tailwind you can paste straight in.</p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TOOLS.map((t) => {
            const Icon = ICONS[t.slug] ?? SparklesIcon
            return (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                <span className="grid grid-cols-1 size-10 place-items-center rounded-xl bg-accent-soft text-accent-fg"><Icon className="size-5" /></span>
                <span className="mt-5 text-[1.25rem] font-medium tracking-[-0.025em] text-fg">{t.name}</span>
                <span className="mt-2 flex-1 text-[0.875rem] leading-[1.6] text-fg-muted">{t.description}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Open tool <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            )
          })}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
