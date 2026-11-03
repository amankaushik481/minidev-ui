import Link from "next/link"
import { notFound } from "next/navigation"
import { BookOpenIcon, LayoutGridIcon, LibraryIcon } from "lucide-react"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GUIDES } from "@/content/guides"
import { GLOSSARY } from "@/content/glossary"
import { BLOCK_TYPES } from "@/content/blocks"
import { PropsTable } from "@/components/seo/props-table"
import { ComponentDocs, type DocsData } from "./client"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { componentCopy } from "@/lib/seo-routes"
import { componentsInCategory } from "@/content/component-seo"

/** Cross links computed on the server: guides that use the component, glossary terms that explain it, block hubs that list it. */
function LearnMore({ name }: { name: string }) {
  const guides = GUIDES.filter((g) => g.related.includes(name)).slice(0, 4)
  const terms = GLOSSARY.filter((t) => t.slug === name || t.related.includes(name)).slice(0, 3)
  const hubs = BLOCK_TYPES.filter((b) => b.items.includes(name)).slice(0, 2)
  if (!guides.length && !terms.length && !hubs.length) return null
  const row = "group flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
  return (
    <section className="mt-14 space-y-5">
      <h2 id="learn" className="scroll-mt-24 text-[1.25rem] font-medium tracking-[-0.025em] text-fg">Learn more</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className={row}>
            <BookOpenIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
            <span><span className="block text-[0.875rem] font-medium text-fg">{g.title}</span><span className="mt-0.5 block text-xs text-fg-muted">Guide</span></span>
          </Link>
        ))}
        {terms.map((t) => (
          <Link key={t.slug} href={`/glossary/${t.slug}`} className={row}>
            <LibraryIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
            <span><span className="block text-[0.875rem] font-medium text-fg">What is {t.term.toLowerCase().startsWith("a ") ? t.term.slice(2) : t.term}?</span><span className="mt-0.5 block text-xs text-fg-muted">Glossary</span></span>
          </Link>
        ))}
        {hubs.map((b) => (
          <Link key={b.slug} href={`/blocks/${b.slug}`} className={row}>
            <LayoutGridIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
            <span><span className="block text-[0.875rem] font-medium text-fg">All {b.name.toLowerCase()}</span><span className="mt-0.5 block text-xs text-fg-muted">{b.items.length} blocks</span></span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/** Server shell: the interactive docs are a client component; the API table and cross links render on the server. */
export default async function ComponentDocsPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const entry = COMPONENT_INDEX.find((c) => c.name === name)
  if (!entry) notFound()
  return <ComponentDocs data={docsData(entry)} api={<PropsTable name={entry.name} title={entry.title} />} learn={<LearnMore name={name} />} />
}

/** The slice of the index and SEO copy the docs page needs, computed here so the full data never reaches the browser. */
function docsData(entry: (typeof COMPONENT_INDEX)[number]): DocsData {
  const i = COMPONENT_INDEX.indexOf(entry)
  const lite = (c?: (typeof COMPONENT_INDEX)[number]) => (c ? { name: c.name, title: c.title } : null)
  const copy = componentCopy(entry)
  const related = copy.category
    ? componentsInCategory(copy.category.id)
        .filter((n) => n !== entry.name)
        .map((n) => COMPONENT_INDEX.find((c) => c.name === n))
        .filter((c): c is (typeof COMPONENT_INDEX)[number] => Boolean(c))
        .sort((a, b) => Number(b.kind === entry.kind) - Number(a.kind === entry.kind))
        .slice(0, 6)
        .map((c) => ({ name: c.name, title: c.title, description: componentCopy(c).description }))
    : []
  return {
    entry,
    prev: lite(COMPONENT_INDEX[i - 1]),
    next: lite(COMPONENT_INDEX[i + 1]),
    galleries: entry.galleries
      .map((s) => GALLERY_ENTRIES.find((g) => g.slug === s))
      .filter((g): g is (typeof GALLERY_ENTRIES)[number] => Boolean(g))
      .map((g) => ({ slug: g.slug, label: g.label, description: g.description })),
    description: copy.description,
    category: copy.category ? { id: copy.category.id, label: copy.category.label, h1: copy.category.h1 } : null,
    related,
    depTitles: Object.fromEntries(entry.registryDeps.map((d) => [d, COMPONENT_INDEX.find((c) => c.name === d)?.title ?? d])),
  }
}
