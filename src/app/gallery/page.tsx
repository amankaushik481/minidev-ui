"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"

import * as React from "react"
import Link from "next/link"
import { SearchIcon, SparklesIcon } from "lucide-react"
import {
  FEATURED_SLUGS,
  GALLERY_CATEGORIES,
  GALLERY_ENTRIES,
} from "@/lib/gallery-catalog"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type Filter = "all" | "free" | "premium"

export default function GalleryIndex() {
  const [q, setQ] = React.useState("")
  const [cat, setCat] = React.useState<string>("featured")
  const [tier, setTier] = React.useState<Filter>("all")

  const filtered = GALLERY_ENTRIES.filter((e) => {
    const hay = `${e.label} ${e.description} ${e.slug}`.toLowerCase()
    if (q.trim() && !hay.includes(q.trim().toLowerCase())) return false
    if (tier === "premium" && !e.premium) return false
    if (tier === "free" && e.premium) return false
    if (!q.trim()) {
      if (cat === "featured") return (FEATURED_SLUGS as readonly string[]).includes(e.slug)
      if (cat !== "all" && e.category !== cat) return false
    }
    return true
  })

  return (
    <div className="min-h-svh overflow-x-hidden bg-bg text-fg">
      <SiteHeader solid />
      <main className="min-h-0">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.01em] text-accent uppercase">MiniDev UI</p>
              <h1 className="mt-1 text-3xl font-medium tracking-[-0.022em]">Gallery</h1>
              <p className="mt-2 max-w-xl text-sm text-fg-muted">
                Search and browse by category. Free primitives stay MIT. Premium is motion-heavy launch UI.
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="h-8 rounded-lg border border-border px-3 text-xs hover:border-fg-subtle" onClick={() => document.documentElement.classList.remove("dark")}>Light</button>
              <button type="button" className="h-8 rounded-lg border border-border px-3 text-xs hover:border-fg-subtle" onClick={() => document.documentElement.classList.add("dark")}>Dark</button>
            </div>
          </div>

          <div className="relative max-w-lg">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-muted" aria-hidden />
            <input
              aria-label="Search gallery"
              placeholder="Search components…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={cn(inputVariants({ size: "default" }), "pl-9")}
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Tier">
            {([
              ["all", "All"],
              ["free", "Free"],
              ["premium", "Premium"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tier === id}
                onClick={() => setTier(id)}
                className={cn(
                  "h-8 rounded-full border px-3 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  tier === id ? "border-accent bg-surface text-fg shadow-[inset_0_0_0_1px_var(--accent)]" : "border-border bg-surface text-fg hover:border-fg-subtle"
                )}
              >
                {id === "premium" ? (
                  <span className="inline-flex items-center gap-1"><SparklesIcon className="size-3.5 text-accent" />{label}</span>
                ) : label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Categories" className="min-w-0 max-w-full lg:sticky lg:top-6 lg:self-start">
          <ul className="flex w-full min-w-0 flex-nowrap gap-1 overflow-x-auto overscroll-x-contain pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <li>
              <CatButton active={cat === "featured"} onClick={() => setCat("featured")}>Featured</CatButton>
            </li>
            <li>
              <CatButton active={cat === "all"} onClick={() => setCat("all")}>All sections</CatButton>
            </li>
            {GALLERY_CATEGORIES.filter((c) => c.id !== "featured").map((c) => (
              <li key={c.id}>
                <CatButton active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</CatButton>
              </li>
            ))}
          </ul>
        </nav>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">
              {q.trim()
                ? `Results (${filtered.length})`
                : cat === "featured"
                  ? "Featured"
                  : cat === "all"
                    ? "All sections"
                    : GALLERY_CATEGORIES.find((c) => c.id === cat)?.label ?? "Sections"}
            </h2>
            <p className="text-xs text-fg-muted tabular-nums">{GALLERY_ENTRIES.length} galleries · 370 registry items</p>
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-fg-muted">No matches. Try another search.</p>
          ) : (
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((e) => (
                <GalleryCard key={e.slug} entry={e} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
      <SiteFooter />
    </div>
  )
}

function CatButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active ? "bg-sunken font-medium text-fg" : "text-fg hover:bg-sunken/60"
      )}
    >
      {children}
    </button>
  )
}

function GalleryCard({ entry }: { entry: (typeof GALLERY_ENTRIES)[number] }) {
  return (
    <Link
      href={`/gallery/${entry.slug}`}
      className={cn(
        "group relative flex min-w-0 flex-col rounded-xl border border-border bg-surface p-4 outline-none transition-[border-color] duration-[70ms]",
        "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        entry.premium && "border-accent/25"
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="min-w-0 break-words text-sm font-medium text-fg group-hover:text-accent">{entry.label}</span>
        {entry.premium ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium tracking-[0.01em] text-fg uppercase">
            <SparklesIcon className="size-3 text-accent" /> Premium
          </span>
        ) : (
          <span className="rounded-md border border-border bg-sunken px-1.5 py-0.5 text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">Free</span>
        )}
      </div>
      <p className="min-w-0 break-words text-xs leading-[1.55] text-fg-muted">{entry.description}</p>
    </Link>
  )
}
