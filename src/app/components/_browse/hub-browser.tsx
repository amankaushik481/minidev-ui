"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { SearchInput } from "@/registry/ui/search-input"
import { EmptySearch } from "@/registry/ui/empty-search"
import { matches } from "./component-browser"
import { type BrowseItem, InstallCard } from "./install-card"

export type HubCategory = { id: string; name: string; count: number; blurb: string; samples: { name: string; title: string }[] }

// shortcut: results stop at 60 cards; add paging if people search the hub for broad words.
const LIMIT = 60

/**
 * The /components hub: the category grid, and a filter over every component that swaps the grid
 * for matching install cards. With no query the server render is the grid, so crawlers get every category link.
 */
export function HubBrowser({ categories, items }: { categories: HubCategory[]; items: BrowseItem[] }) {
  const [query, setQuery] = React.useState("")
  const q = query.trim()
  const hits = q ? items.filter((i) => matches(i, q)) : []
  const cats = q ? categories.filter((c) => matches({ name: c.id, title: c.name, kind: "ui" }, q)) : categories

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          aria-label="Filter components"
          placeholder={`Filter ${items.length} components…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          containerClassName="w-full sm:max-w-sm"
          size="lg"
        />
        <p aria-live="polite" className="text-[0.8125rem] text-fg-subtle tabular-nums sm:ml-auto">
          {q ? `${hits.length} ${hits.length === 1 ? "component" : "components"}, ${cats.length} ${cats.length === 1 ? "category" : "categories"}` : `${categories.length} categories`}
        </p>
      </div>

      {q && cats.length ? (
        <ul aria-label="Matching categories" className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <li key={c.id}>
              <Link
                href={`/components/${c.id}`}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key outline-none transition-[border-color] duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
              >
                {c.name} <span className="font-mono text-[12px] text-fg-subtle tabular-nums">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {!q ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li
              key={c.id}
              className="group/cat relative flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-raised transition-[border-color] duration-[70ms] hover:border-border-strong has-[h2_a:focus-visible]:ring-2 has-[h2_a:focus-visible]:ring-accent"
            >
              <h2 className="flex items-baseline justify-between gap-3 text-[1.125rem] font-medium tracking-[-0.02em] text-fg">
                <Link href={`/components/${c.id}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl">
                  {c.name}
                </Link>
                <span className="font-mono text-[12px] font-normal text-fg-subtle tabular-nums">{c.count}</span>
              </h2>
              <p className="mt-2 text-[0.875rem] leading-[1.6] text-fg-muted">{c.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.875rem] leading-[1.6]">
                {c.samples.map((s) => (
                  <li key={s.name}>
                    <Link href={`/docs/${s.name}`} className="relative z-10 rounded-sm text-fg-muted outline-none hover:text-fg hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <span aria-hidden className="mt-auto flex items-center gap-1 pt-5 text-[0.8125rem] font-medium text-fg">
                Browse all {c.count} <ArrowRightIcon className="size-3.5 transition-transform duration-[140ms] group-hover/cat:translate-x-0.5" />
              </span>
            </li>
          ))}
        </ul>
      ) : hits.length ? (
        <>
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hits.slice(0, LIMIT).map((i) => (
              <InstallCard key={i.name} item={i} />
            ))}
          </ul>
          {hits.length > LIMIT ? <p className="mt-6 text-[0.875rem] text-fg-muted tabular-nums">Showing the first {LIMIT} of {hits.length}. Add a word to narrow it down.</p> : null}
        </>
      ) : cats.length ? null : (
        <div className="mt-8 rounded-2xl border border-dashed border-border-strong">
          <EmptySearch query={q} description="No component or category matches. Try a shorter word, like “table”, “chart” or “dialog”." onClear={() => setQuery("")} />
        </div>
      )}
    </>
  )
}
