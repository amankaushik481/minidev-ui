import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { INSTALLS } from "@/content/install"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, graph, itemListLd, meta } from "@/lib/seo"
import { CodeBlock } from "@/registry/ui/code-block"

export const metadata: Metadata = meta({
  title: "Installation: Add MiniDev UI to Next.js, Vite, Astro and More",
  description: "Install MiniDev UI components in Next.js, Vite, React Router, Astro or TanStack Start with Tailwind CSS v4 and the shadcn CLI, or from npm. Step by step.",
  path: "/docs/installation",
})

export default function InstallIndex() {
  return (
    <ContentShell>
      <JsonLd data={graph(itemListLd(INSTALLS.map((g) => ({ name: g.title, path: `/docs/installation/${g.slug}` })), "Installation guides"), breadcrumbLd([{ name: "Docs", path: "/docs" }, { name: "Installation", path: "/docs/installation" }]))} />
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "Docs", href: "/docs" }, { name: "Installation" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Installation</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          MiniDev UI works anywhere React and Tailwind CSS v4 run. Pick your framework for exact steps, or use the one line below if your project already uses the shadcn CLI.
        </p>
        <div className="mt-8">
          <CodeBlock language="bash" code="npx shadcn@latest add https://ui.minidev.pro/r/button.json" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INSTALLS.map((g) => (
            <Link key={g.slug} href={`/docs/installation/${g.slug}`} className="group min-w-0 rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="text-[1.25rem] font-medium tracking-[-0.025em] text-fg">{g.framework}</span>
              <span className="mt-2 block text-[0.875rem] leading-[1.6] text-fg-muted">{g.description}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg">Read the steps <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </div>
    </ContentShell>
  )
}
