import type { Metadata } from "next"
import Link from "next/link"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { CATEGORIES } from "@/content/categories"
import { BLOCK_TYPES } from "@/content/blocks"
import { GUIDES } from "@/content/guides"
import { COMPARISONS } from "@/content/compare"
import { TOOLS } from "@/content/tools"
import { GLOSSARY } from "@/content/glossary"
import { INSTALLS } from "@/content/install"
import { TEMPLATE_SEO } from "@/content/pages"
import { humanTitle } from "@/lib/seo-routes"
import { meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "Site Map: Every Page on MiniDev UI",
  description: "A plain list of every page on ui.minidev.pro: components, blocks, templates, guides, tools, glossary terms and comparisons.",
  path: "/sitemap",
})

function Group({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-fg">
        {title} <span className="font-mono text-[0.75rem] text-fg-subtle">{items.length}</span>
      </h2>
      <ul className="mt-3 columns-1 gap-x-8 text-[0.875rem] leading-[1.9] text-fg-muted sm:columns-2 lg:columns-3">
        {items.map((i) => (
          <li key={i.href} className="break-inside-avoid">
            <Link href={i.href} className="hover:text-fg">{i.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function HtmlSitemap() {
  const byKind = (kind: string) => COMPONENT_INDEX.filter((c) => c.kind === kind).map((c) => ({ href: `/docs/${c.name}`, label: humanTitle(c.title) }))
  return (
    <ContentShell>
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Site map" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-[3.5rem]">Site map</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">Every page, in one place. The machine version is at <Link href="/sitemap.xml" className="text-fg underline underline-offset-4">/sitemap.xml</Link>.</p>
        <div className="mt-12 space-y-12">
          <Group title="Start here" items={[{ href: "/", label: "Home" }, { href: "/docs", label: "Getting started" }, { href: "/docs/installation", label: "Installation" }, ...INSTALLS.map((i) => ({ href: `/docs/installation/${i.slug}`, label: `Install with ${i.framework}` })), { href: "/components", label: "Components by category" }, { href: "/blocks", label: "Blocks by section" }, { href: "/templates", label: "Templates" }, { href: "/gallery", label: "Gallery" }, { href: "/tools", label: "Free tools" }, { href: "/guides", label: "Guides" }, { href: "/glossary", label: "Glossary" }, { href: "/compare", label: "Compare libraries" }, { href: "/changelog", label: "Changelog" }, { href: "/about", label: "About" }, { href: "/studio", label: "Hire MiniDev" }]} />
          <Group title="Component categories" items={CATEGORIES.map((c) => ({ href: `/components/${c.id}`, label: c.label }))} />
          <Group title="Block types" items={BLOCK_TYPES.map((b) => ({ href: `/blocks/${b.slug}`, label: b.name }))} />
          <Group title="Templates" items={Object.entries(TEMPLATE_SEO).map(([slug, t]) => ({ href: `/templates/${slug}`, label: t.title }))} />
          <Group title="Tools" items={TOOLS.map((t) => ({ href: `/tools/${t.slug}`, label: t.name }))} />
          <Group title="Guides" items={GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.title }))} />
          <Group title="Comparisons" items={COMPARISONS.map((c) => ({ href: `/compare/${c.slug}`, label: `MiniDev UI vs ${c.other}` }))} />
          <Group title="Glossary" items={GLOSSARY.map((t) => ({ href: `/glossary/${t.slug}`, label: t.term }))} />
          <Group title="UI components" items={byKind("ui")} />
          <Group title="Blocks and pages" items={byKind("block")} />
          <Group title="Motion" items={byKind("premium")} />
        </div>
      </div>
    </ContentShell>
  )
}
