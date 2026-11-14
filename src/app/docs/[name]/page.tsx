import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { BookOpenIcon, LayoutGridIcon, LibraryIcon } from "lucide-react"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GUIDES } from "@/content/guides"
import { GLOSSARY } from "@/content/glossary"
import { BLOCK_TYPES } from "@/content/blocks"
import { PropsTable } from "@/components/seo/props-table"
import { ComponentDocs, type DocsData } from "./client"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { componentCopy } from "@/lib/seo-routes"
import { DocsH2 } from "../_components/docs-shell"
import { exportedNames, mdPath, relatedTo, usageSnippet } from "./markdown"

/** Cross links computed on the server: guides that use the component, glossary terms that explain it, block hubs that list it. */
function learnLinks(name: string) {
  return {
    guides: GUIDES.filter((g) => g.related.includes(name)).slice(0, 4),
    terms: GLOSSARY.filter((t) => t.slug === name || t.related.includes(name)).slice(0, 3),
    hubs: BLOCK_TYPES.filter((b) => b.items.includes(name)).slice(0, 2),
  }
}

function LearnMore({ guides, terms, hubs }: ReturnType<typeof learnLinks>) {
  const row = "group flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
  return (
    <section className="mt-14 space-y-5">
      <DocsH2 id="learn">Learn more</DocsH2>
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
  // /docs/<name>.md is the Markdown twin agents guess first; send it to the route that serves it.
  if (name.endsWith(".md") && COMPONENT_INDEX.some((c) => c.name === name.slice(0, -3))) redirect(mdPath(name.slice(0, -3)))
  const entry = COMPONENT_INDEX.find((c) => c.name === name)
  if (!entry) notFound()
  const links = learnLinks(name)
  const hasLearn = Boolean(links.guides.length || links.terms.length || links.hubs.length)
  return <ComponentDocs data={docsData(entry)} api={<PropsTable name={entry.name} title={entry.title} />} learn={hasLearn ? <LearnMore {...links} /> : undefined} />
}

/** The slice of the index and SEO copy the docs page needs, computed here so the full data never reaches the browser. */
function docsData(entry: (typeof COMPONENT_INDEX)[number]): DocsData {
  const i = COMPONENT_INDEX.indexOf(entry)
  const lite = (c?: (typeof COMPONENT_INDEX)[number]) => (c ? { name: c.name, title: c.title } : null)
  const copy = componentCopy(entry)
  const related = relatedTo(entry).map((c) => ({ name: c.name, title: c.title, description: componentCopy(c).description }))
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
    md: mdPath(entry.name),
    usage: usageSnippet(entry),
    exports: exportedNames(entry),
    depTitles: Object.fromEntries(entry.registryDeps.map((d) => [d, COMPONENT_INDEX.find((c) => c.name === d)?.title ?? d])),
  }
}
