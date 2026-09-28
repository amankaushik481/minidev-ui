"use client"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { ArrowRightIcon, BoxIcon, CornerDownLeftIcon, FileTextIcon, LayoutTemplateIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { NAV } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"

type Result = { id: string; label: string; hint: string; href: string; group: "Pages" | "Components" | "Blocks" | "Motion" }

const PAGES: Result[] = [
  { id: "p-home", label: "Home", hint: "/", href: "/", group: "Pages" },
  ...NAV.map((n) => ({ id: "p-" + n.href, label: n.label, hint: n.href, href: n.href, group: "Pages" as const })),
  { id: "p-play", label: "Playground", hint: "/playground", href: "/playground", group: "Pages" },
]

const ITEMS: Result[] = COMPONENT_INDEX.map((c) => ({
  id: c.name,
  label: c.title.replace(/([a-z])([A-Z])/g, "$1 $2"),
  hint: c.name,
  href: `/docs/${c.name}`,
  group: c.kind === "block" ? "Blocks" : c.kind === "premium" ? "Motion" : "Components",
}))

function score(q: string, r: Result) {
  const l = r.label.toLowerCase()
  const h = r.hint.toLowerCase()
  if (l === q) return 100
  if (l.startsWith(q)) return 80
  if (l.split(" ").some((w) => w.startsWith(q))) return 60
  if (l.includes(q) || h.includes(q)) return 40
  // loose subsequence
  let i = 0
  for (const ch of l) if (ch === q[i]) i++
  return i === q.length ? 10 : 0
}

const ICONS = { Pages: FileTextIcon, Components: BoxIcon, Blocks: LayoutTemplateIcon, Motion: SparklesIcon }

export function SiteSearch({ className, compact }: { className?: string; compact?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [active, setActive] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !/input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") && !(e.target as HTMLElement)?.isContentEditable)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const results = React.useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return [...PAGES, ...ITEMS.filter((r) => ["button", "data-table", "chat-thread", "command-palette", "pricing-table", "dialog", "hero-kinetic-type", "dashboard-home"].includes(r.id))]
    return [...PAGES, ...ITEMS]
      .map((r) => ({ r, s: score(t, r) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((x) => x.r)
  }, [q])

  React.useEffect(() => setActive(0), [q])
  React.useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  const go = (r?: Result) => {
    if (!r) return
    setOpen(false)
    window.location.href = r.href
  }

  const groups = React.useMemo(() => {
    const m = new Map<string, { r: Result; i: number }[]>()
    results.forEach((r, i) => {
      if (!m.has(r.group)) m.set(r.group, [])
      m.get(r.group)!.push({ r, i })
    })
    return [...m.entries()]
  }, [results])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ("") }}>
      <DialogPrimitive.Trigger
        className={cn(
          "group/search inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface pr-1.5 pl-2.5 text-[0.8125rem] text-fg-subtle shadow-xs outline-none",
          "transition-[border-color,color] duration-[70ms] hover:border-border-strong hover:text-fg-muted focus-visible:ring-2 focus-visible:ring-accent",
          compact ? "w-8 justify-center px-0" : "w-full sm:w-56",
          className
        )}
        aria-label="Search components"
      >
        <SearchIcon className="size-3.5 shrink-0" />
        {compact ? null : (
          <>
            <span className="flex-1 text-left">Search components…</span>
            <Kbd className="h-5 text-[10px]">⌘K</Kbd>
          </>
        )}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-scrim backdrop-blur-[2px] transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-[12vh] left-1/2 z-50 flex max-h-[min(560px,76vh)] w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2 flex-col overflow-hidden",
            "rounded-2xl border border-border bg-raised text-fg shadow-overlay outline-none",
            "origin-top transition-[opacity,transform] duration-200 ease-hairline",
            "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.99] data-[ending-style]:opacity-0 data-[ending-style]:duration-150"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Search MiniDev UI</DialogPrimitive.Title>
          <div className="flex h-14 items-center gap-3 border-b border-border px-4">
            <SearchIcon className="size-4 shrink-0 text-fg-subtle" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)) }
                if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
                if (e.key === "Enter") { e.preventDefault(); go(results[active]) }
              }}
              placeholder={`Search ${COMPONENT_INDEX.length} components, blocks and pages…`}
              className="h-full flex-1 bg-transparent text-[0.9375rem] text-fg outline-none placeholder:text-fg-subtle"
              aria-label="Search"
              role="combobox"
              aria-expanded
              aria-controls="site-search-list"
              aria-activedescendant={results[active] ? `ss-${results[active].id}` : undefined}
            />
            <Kbd>Esc</Kbd>
          </div>
          <div ref={listRef} id="site-search-list" role="listbox" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
            {results.length === 0 ? (
              <div className="grid place-items-center gap-1 py-14 text-center">
                <p className="text-sm font-medium text-fg">No match for “{q}”</p>
                <p className="text-xs text-fg-muted">Try “table”, “chat”, “pricing” or “hero”.</p>
              </div>
            ) : (
              groups.map(([g, rows]) => {
                const Icon = ICONS[g as keyof typeof ICONS]
                return (
                  <div key={g} className="mb-1 last:mb-0">
                    <p className="px-2.5 pt-2 pb-1.5 text-[11px] font-medium text-fg-subtle">{q ? g : g === "Pages" ? "Jump to" : "Popular"}</p>
                    {rows.map(({ r, i }) => (
                      <button
                        key={r.id}
                        id={`ss-${r.id}`}
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => go(r)}
                        className={cn(
                          "flex h-10 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[0.8125rem] outline-none",
                          i === active ? "bg-sunken text-fg" : "text-fg-muted"
                        )}
                      >
                        <span className={cn("grid size-6 shrink-0 place-items-center rounded-md border", i === active ? "border-accent-line bg-accent-soft text-accent-fg" : "border-border bg-surface text-fg-subtle")}>
                          <Icon className="size-3.5" />
                        </span>
                        <span className="flex-1 truncate font-medium text-fg">{r.label}</span>
                        <span className="hidden truncate font-mono text-[11px] text-fg-subtle sm:block">{r.hint}</span>
                        <ArrowRightIcon className={cn("size-3.5 shrink-0 transition-opacity", i === active ? "opacity-100" : "opacity-0")} />
                      </button>
                    ))}
                  </div>
                )
              })
            )}
          </div>
          <div className="flex h-10 items-center gap-4 border-t border-border bg-sunken/50 px-4 text-[11px] text-fg-subtle">
            <span className="inline-flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
            <span className="inline-flex items-center gap-1.5"><Kbd><CornerDownLeftIcon /></Kbd> open</span>
            <span className="ml-auto hidden sm:inline">{results.length} results</span>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
