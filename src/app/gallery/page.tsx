"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon, SearchIcon, SparklesIcon, XIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { JsonLd } from "@/components/seo/json-ld"
import { FEATURED_SLUGS, GALLERY_CATEGORIES, GALLERY_ENTRIES, type GalleryEntry } from "@/lib/gallery-catalog"
import { COMPONENT_COUNTS, COMPONENT_LITE } from "@/lib/component-lite"
import { graph, itemListLd } from "@/lib/seo"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"
import { GalleryPreview } from "./_components/previews"

const CHIPS = [{ id: "all", label: "All" }, ...GALLERY_CATEGORIES]
const CAT_IDS = new Set<string>(CHIPS.map((c) => c.id))
const CAT_LABEL: Record<string, string> = Object.fromEntries(GALLERY_CATEGORIES.map((c) => [c.id, c.label]))
const inCat = (e: GalleryEntry, cat: string) =>
  cat === "all" || (cat === "featured" ? (FEATURED_SLUGS as readonly string[]).includes(e.slug) : e.category === cat)
const CAT_COUNTS: Record<string, number> = Object.fromEntries(CHIPS.map((c) => [c.id, GALLERY_ENTRIES.filter((e) => inCat(e, c.id)).length]))
const SUGGESTIONS = ["table", "chat", "pricing", "chart", "sign in", "toast"]
const MAX_COMPONENT_HITS = 24
const LD = graph(
  { "@type": "CollectionPage", name: "Component gallery", url: `${SITE.url}/gallery` },
  itemListLd(GALLERY_ENTRIES.map((g) => ({ name: g.label, path: `/gallery/${g.slug}` })), "Component galleries")
)

/** Every search word must appear somewhere in the haystack: "data table" finds "Data table", "table sort" finds it too. */
const matches = (hay: string, words: string[]) => words.every((w) => hay.includes(w))
const humanTitle = (t: string) => t.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

// The URL is the state: /gallery?q=chart&category=forms deep-links any view, and
// replaceState keeps typing out of the back stack.
const urlListeners = new Set<() => void>()
function subscribeUrl(fn: () => void) {
  urlListeners.add(fn)
  window.addEventListener("popstate", fn)
  return () => {
    urlListeners.delete(fn)
    window.removeEventListener("popstate", fn)
  }
}
function setParam(key: string, value: string) {
  const p = new URLSearchParams(window.location.search)
  if (value) p.set(key, value)
  else p.delete(key)
  const qs = p.toString()
  window.history.replaceState(window.history.state, "", qs ? `?${qs}` : window.location.pathname)
  urlListeners.forEach((fn) => fn())
}
const useParam = (key: string) =>
  React.useSyncExternalStore(subscribeUrl, () => new URLSearchParams(window.location.search).get(key) ?? "", () => "")

export default function GalleryIndex() {
  const q = useParam("q")
  const rawCat = useParam("category")
  const cat = CAT_IDS.has(rawCat) ? rawCat : "all"
  const setQ = (v: string) => setParam("q", v)
  const setCat = (v: string) => setParam("category", v === "all" ? "" : v)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener("keydown", on)
    return () => window.removeEventListener("keydown", on)
  }, [])

  // The grid holds live previews; let typing stay responsive while it re-renders.
  const dq = React.useDeferredValue(q)
  const words = dq.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const searching = words.length > 0
  const filtered = GALLERY_ENTRIES.filter(
    (e) => inCat(e, cat) && (!searching || matches(`${e.label} ${e.description} ${e.slug} ${CAT_LABEL[e.category] ?? ""}`.toLowerCase(), words))
  )
  const componentHits = searching
    ? COMPONENT_LITE.filter((c) => matches(`${c.name} ${humanTitle(c.title)}`.toLowerCase(), words))
    : []

  // Group by category when showing everything, so the page reads like a catalogue.
  const groups: [string, GalleryEntry[]][] =
    !searching && cat === "all"
      ? GALLERY_CATEGORIES.map((c) => [c.label, GALLERY_ENTRIES.filter((e) => e.category === c.id)] as [string, GalleryEntry[]]).filter(([, list]) => list.length)
      : [[searching ? `Galleries matching “${dq.trim()}”` : (CAT_LABEL[cat] ?? ""), filtered]]

  const status = searching
    ? `${filtered.length} ${filtered.length === 1 ? "gallery" : "galleries"} and ${componentHits.length} ${componentHits.length === 1 ? "component" : "components"} match “${dq.trim()}”`
    : `${filtered.length} galleries`

  return (
    <div className="min-h-svh bg-bg text-fg">
      <JsonLd data={LD} />
      <SiteHeader solid />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:40px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:px-8">
            <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase tabular-nums">{COMPONENT_COUNTS.total} components · {GALLERY_ENTRIES.length} galleries</p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-6xl sm:leading-[1]">Components</h1>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-fg-muted">
              Every gallery renders the real component in every state. Open one, find the variant you need, install it with one command.
            </p>
            <form role="search" className="relative mt-8 max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                aria-label="Search galleries and components"
                aria-describedby="gallery-status"
                placeholder="Search: table, chat, pricing, date…"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && q) {
                    e.preventDefault()
                    setQ("")
                  }
                }}
                className="h-12 w-full rounded-xl border border-border bg-surface pr-20 pl-11 text-base text-fg shadow-sm outline-none transition-[border-color,box-shadow] duration-[140ms] ease-hairline placeholder:text-fg-subtle hover:border-border-strong focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] sm:text-[0.9375rem] [&::-webkit-search-cancel-button]:hidden"
              />
              <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1.5">
                {q ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setQ("")
                      inputRef.current?.focus()
                    }}
                    className="grid size-8 place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <XIcon aria-hidden className="size-3.5" />
                  </button>
                ) : (
                  <Kbd aria-hidden>/</Kbd>
                )}
              </div>
            </form>
          </div>

          <nav aria-label="Categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CHIPS.map((c) => {
                const on = cat === c.id
                const n = CAT_COUNTS[c.id]
                if (!n) return null
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCat(c.id)}
                    aria-pressed={on}
                    className={cn(
                      "relative flex h-11 shrink-0 items-center gap-1.5 px-3 text-[0.8125rem] font-medium whitespace-nowrap outline-none transition-colors duration-[70ms]",
                      "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                      on ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {c.id === "premium" ? <SparklesIcon aria-hidden className="size-3.5 text-accent" /> : null}
                    {c.label}
                    <span className="font-mono text-[10px] text-fg-subtle tabular-nums">{n}</span>
                    {on ? <span aria-hidden className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-fg" /> : null}
                  </button>
                )
              })}
            </div>
          </nav>
        </section>

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-28 sm:px-6 lg:px-8">
          <p id="gallery-status" role="status" className="sr-only">{status}</p>

          {componentHits.length ? (
            <section aria-labelledby="component-hits" className="mb-12">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 id="component-hits" className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">Components</h2>
                <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{componentHits.length}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {componentHits.slice(0, MAX_COMPONENT_HITS).map((c) => (
                  <li key={c.name}>
                    <Link
                      href={`/docs/${c.name}`}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-[0.8125rem] text-fg shadow-key outline-none transition-colors duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {c.kind === "premium" ? <SparklesIcon aria-hidden className="size-3 text-accent" /> : null}
                      {humanTitle(c.title)}
                      {c.kind === "block" ? <span className="text-[10px] text-fg-subtle">Block</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
              {componentHits.length > MAX_COMPONENT_HITS ? (
                <p className="mt-3 text-xs text-fg-subtle">
                  Showing <span className="tabular-nums">{MAX_COMPONENT_HITS}</span> of <span className="tabular-nums">{componentHits.length}</span>. Add a word to narrow it down.
                </p>
              ) : null}
            </section>
          ) : null}

          {filtered.length === 0 ? (
            componentHits.length ? null : (
              <div className="grid place-items-center rounded-2xl border border-dashed border-border px-4 py-20 text-center">
                <p className="text-base font-medium text-fg">Nothing matches “{dq.trim()}”{cat !== "all" ? ` in ${CAT_LABEL[cat]}` : ""}.</p>
                <p className="mt-1 text-sm text-fg-muted">Try one of these, or search every doc with ⌘K.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {cat !== "all" ? (
                    <button type="button" onClick={() => setCat("all")} className="h-8 rounded-lg border border-accent-line bg-accent-soft px-3 text-[0.8125rem] font-medium text-accent-fg outline-none focus-visible:ring-2 focus-visible:ring-accent">
                      Search all categories
                    </button>
                  ) : null}
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setCat("all")
                        setQ(s)
                      }}
                      className="h-8 rounded-lg border border-border bg-surface px-3 text-[0.8125rem] text-fg shadow-key outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="space-y-14">
              {groups.map(([label, list]) => (
                <section key={label}>
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h2 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">{label}</h2>
                    <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{list.length}</span>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.map((e) => (
                      <li key={e.slug} className="flex min-w-0">
                        <GalleryCard entry={e} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function GalleryCard({ entry }: { entry: GalleryEntry }) {
  return (
    <div className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised transition-[border-color,box-shadow,transform] duration-200 ease-hairline [contain-intrinsic-size:auto_260px] [content-visibility:auto] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative grid h-44 place-items-center overflow-hidden border-b border-border bg-bg">
        <div aria-hidden className="absolute inset-0 bg-dots [--grid-size:12px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <GalleryPreview slug={entry.slug} />
      </div>
      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="text-[0.875rem] font-medium tracking-[-0.005em] text-fg">
            <Link href={`/gallery/${entry.slug}`} className="outline-none after:absolute after:inset-0">
              {entry.label}
            </Link>
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs leading-[1.5] text-fg-muted">{entry.description}</p>
        </div>
        {entry.premium ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-fg">
            <SparklesIcon aria-hidden className="size-2.5" /> Motion
          </span>
        ) : (
          <ArrowUpRightIcon aria-hidden className="size-4 shrink-0 text-fg-subtle opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        )}
      </div>
    </div>
  )
}
