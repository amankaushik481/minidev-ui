"use client"
import * as React from "react"
import { SearchInput } from "@/registry/ui/search-input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { EmptySearch } from "@/registry/ui/empty-search"
import { type BrowseItem, type Kind, InstallAll, InstallCard } from "./install-card"

const GROUPS: { kind: Kind; label: string; short: string }[] = [
  { kind: "ui", label: "Components", short: "UI" },
  { kind: "block", label: "Blocks and full pages", short: "Blocks" },
  { kind: "premium", label: "Motion", short: "Motion" },
]

/** Every word must appear in the name, title or description. */
export function matches(item: BrowseItem, query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const hay = `${item.name} ${item.title} ${item.description ?? ""} ${item.meta ?? ""}`.toLowerCase()
  return words.every((w) => hay.includes(w))
}

/**
 * A category's components with a text filter, a type switch and an install command for
 * whatever is showing. With no filter the server render is the full grouped list, so crawlers see everything.
 */
export function ComponentBrowser({ items, label }: { items: BrowseItem[]; label: string }) {
  const [query, setQuery] = React.useState("")
  const [kind, setKind] = React.useState<"all" | Kind>("all")
  const groups = GROUPS.filter((g) => items.some((i) => i.kind === g.kind))
  const shown = items.filter((i) => (kind === "all" || i.kind === kind) && matches(i, query))
  const filtered = shown.length !== items.length
  const reset = () => {
    setQuery("")
    setKind("all")
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          aria-label={`Filter ${label} components`}
          placeholder={`Filter ${items.length} in ${label}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          containerClassName="w-full sm:max-w-xs"
        />
        {groups.length > 1 ? (
          <SegmentedControl
            size="sm"
            aria-label="Type"
            value={kind}
            onChange={(v) => setKind(v as "all" | Kind)}
            options={[
              { value: "all", label: "All", badge: <span className="tabular-nums">{items.length}</span> },
              ...groups.map((g) => ({ value: g.kind, label: g.short, badge: <span className="tabular-nums">{items.filter((i) => i.kind === g.kind).length}</span> })),
            ]}
          />
        ) : null}
        <p aria-live="polite" className="text-[0.8125rem] text-fg-subtle tabular-nums sm:ml-auto">
          {filtered ? `${shown.length} of ${items.length} shown` : `${items.length} items`}
        </p>
      </div>

      {shown.length ? (
        <>
          <div className="mt-4">
            <InstallAll names={shown.map((i) => i.name)} label={filtered ? `Copy ${shown.length}` : `Copy all ${shown.length}`} />
          </div>
          {groups.map((g) => {
            const list = shown.filter((i) => i.kind === g.kind)
            if (!list.length) return null
            return (
              <section key={g.kind} className="mt-12" aria-labelledby={`group-${g.kind}`}>
                <h2 id={`group-${g.kind}`} className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">
                  {g.label} <span className="font-mono text-[0.875rem] text-fg-subtle tabular-nums">{list.length}</span>
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {list.map((i) => (
                    <InstallCard key={i.name} item={i} />
                  ))}
                </ul>
              </section>
            )
          })}
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border-strong">
          <EmptySearch query={query.trim() || undefined} description={`Nothing in ${label} matches. Try a shorter word, or use the site search for every category.`} onClear={reset} />
        </div>
      )}
    </div>
  )
}
