"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon, SearchIcon, SparklesIcon, XIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { FEATURED_SLUGS, GALLERY_CATEGORIES, GALLERY_ENTRIES, type GalleryEntry } from "@/lib/gallery-catalog"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"
import { GalleryPreview } from "./_components/previews"

const CAT_COUNTS = Object.fromEntries(
  GALLERY_CATEGORIES.map((c) => [c.id, c.id === "featured" ? FEATURED_SLUGS.length : GALLERY_ENTRIES.filter((e) => e.category === c.id).length])
)

export default function GalleryIndex() {
  const [q, setQ] = React.useState("")
  const [cat, setCat] = React.useState<string>("all")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", on)
    return () => window.removeEventListener("keydown", on)
  }, [])

  const t = q.trim().toLowerCase()
  const filtered = GALLERY_ENTRIES.filter((e) => {
    if (t) return `${e.label} ${e.description} ${e.slug} ${e.category}`.toLowerCase().includes(t)
    if (cat === "all") return true
    if (cat === "featured") return (FEATURED_SLUGS as readonly string[]).includes(e.slug)
    return e.category === cat
  })

  // Group by category when showing everything, so the page reads like a catalogue.
  const groups: [string, GalleryEntry[]][] =
    !t && cat === "all"
      ? GALLERY_CATEGORIES.filter((c) => c.id !== "featured")
          .map((c) => [c.label, GALLERY_ENTRIES.filter((e) => e.category === c.id)] as [string, GalleryEntry[]])
          .filter(([, list]) => list.length)
      : [[t ? `Results for “${q.trim()}”` : GALLERY_CATEGORIES.find((c) => c.id === cat)?.label ?? "", filtered]]

  return (
    <div className="min-h-svh bg-bg text-fg">
      <SiteHeader solid />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:40px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:px-8">
            <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{COMPONENT_INDEX.length} components · {GALLERY_ENTRIES.length} galleries</p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-6xl sm:leading-[1]">Components</h1>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-fg-muted">
              Every gallery renders the real component in every state. Open one, find the variant you need, copy the file.
            </p>
            <div className="relative mt-8 max-w-xl">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
              <input
                ref={inputRef}
                aria-label="Filter galleries"
                placeholder="Filter by name: table, chat, pricing…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-surface pr-20 pl-11 text-[0.9375rem] text-fg shadow-sm outline-none transition-[border-color,box-shadow] duration-[140ms] ease-hairline placeholder:text-fg-subtle hover:border-border-strong focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]"
              />
              <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1.5">
                {q ? (
                  <button type="button" aria-label="Clear filter" onClick={() => setQ("")} className="grid size-6 place-items-center rounded-md text-fg-subtle hover:bg-sunken hover:text-fg">
                    <XIcon className="size-3.5" />
                  </button>
                ) : (
                  <Kbd>/</Kbd>
                )}
              </div>
            </div>
          </div>

          <nav aria-label="Categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
              {[{ id: "all", label: "All" }, ...GALLERY_CATEGORIES].map((c) => {
                const on = !t && cat === c.id
                const n = c.id === "all" ? GALLERY_ENTRIES.length : CAT_COUNTS[c.id]
                if (!n) return null
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { setCat(c.id); setQ("") }}
                    aria-pressed={on}
                    className={cn(
                      "relative flex h-11 shrink-0 items-center gap-1.5 px-3 text-[0.8125rem] font-medium whitespace-nowrap outline-none transition-colors duration-[70ms]",
                      "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                      on ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {c.id === "premium" ? <SparklesIcon className="size-3.5 text-accent" /> : null}
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
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border py-24 text-center">
              <p className="text-base font-medium text-fg">Nothing matches “{q}”.</p>
              <p className="mt-1 text-sm text-fg-muted">Try “form”, “chart”, “chat” or “billing”, or search every component with ⌘K.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {groups.map(([label, list]) => (
                <section key={label}>
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h2 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">{label}</h2>
                    <span className="font-mono text-[11px] text-fg-subtle">{list.length}</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.map((e) => (
                      <GalleryCard key={e.slug} entry={e} />
                    ))}
                  </div>
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
    <div className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised transition-[border-color,box-shadow,transform] duration-200 ease-hairline hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
      <div className="relative grid h-44 place-items-center overflow-hidden border-b border-border bg-bg">
        <div aria-hidden className="absolute inset-0 bg-dots [--grid-size:12px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <GalleryPreview slug={entry.slug} />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="text-[0.875rem] font-medium tracking-[-0.005em] text-fg">
            <Link href={`/gallery/${entry.slug}`} className="outline-none after:absolute after:inset-0">
              {entry.label}
            </Link>
          </h3>
          <p className="mt-0.5 truncate text-xs text-fg-muted">{entry.description}</p>
        </div>
        {entry.premium ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-fg">
            <SparklesIcon className="size-2.5" /> Motion
          </span>
        ) : (
          <ArrowUpRightIcon className="size-4 shrink-0 text-fg-subtle opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        )}
      </div>
    </div>
  )
}
