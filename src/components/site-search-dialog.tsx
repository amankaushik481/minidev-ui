"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { ArrowRightIcon, BotIcon, BoxIcon, CheckIcon, ClockIcon, CopyIcon, CornerDownLeftIcon, FileTextIcon, LayoutTemplateIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { COMPONENT_LITE } from "@/lib/component-lite"
import { NAV, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"

type Group = "Pages" | "Agents" | "Components" | "Blocks" | "Motion"
type Result = {
  id: string
  label: string
  hint: string
  href: string
  group: Group
  /** shadcn CLI command, components only */
  install?: string
  /** A plain file (llms.txt): full navigation, not the client router */
  raw?: boolean
  // normalised search fields
  l: string
  h: string
  sq: string
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

function entry(r: Omit<Result, "l" | "h" | "sq">): Result {
  const l = norm(r.label)
  return { ...r, l, h: norm(r.hint), sq: l.replace(/ /g, "") }
}

const page = (href: string, label: string, group: Group = "Pages", raw?: boolean) => entry({ id: "p-" + href, label, hint: href, href, group, raw })

const PAGES: Result[] = [
  page("/", "Home"),
  ...NAV.map((n) => page(n.href, n.label)),
  page("/docs/installation", "Installation"),
  page("/components", "Browse by category"),
  page("/guides", "Guides"),
  page("/compare", "Compare libraries"),
  page("/changelog", "Changelog"),
  page("/playground", "Theme playground"),
  page("/docs/ai", "AI agents: MCP, rules and skills", "Agents"),
  page("/llms.txt", "llms.txt", "Agents", true),
  page("/llms-full.txt", "llms-full.txt", "Agents", true),
  page("/AGENTS.md", "AGENTS.md rules file", "Agents", true),
].filter((r, i, all) => all.findIndex((x) => x.href === r.href) === i)

const ITEMS: Result[] = COMPONENT_LITE.map((c) =>
  entry({
    id: c.name,
    label: c.title.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
    hint: c.name,
    href: `/docs/${c.name}`,
    group: c.kind === "block" ? "Blocks" : c.kind === "premium" ? "Motion" : "Components",
    install: `npx shadcn@latest add ${SITE.registry}/${c.name}`,
  })
)

const ALL = [...PAGES, ...ITEMS]
const BY_ID = new Map(ALL.map((r) => [r.id, r]))
const POPULAR = ["button", "data-table", "chat-thread", "command-palette", "pricing-table", "dialog", "hero-kinetic-type", "dashboard-home"]
const JUMP = ["p-/docs", "p-/docs/ai", "p-/gallery", "p-/blocks", "p-/templates", "p-/llms.txt"]

function wordScore(w: string, r: Result) {
  if (r.l === w) return 100
  if (r.l.startsWith(w)) return 80
  if (r.l.split(" ").some((x) => x.startsWith(w))) return 60
  if (r.l.includes(w) || r.h.includes(w) || r.sq.includes(w)) return 40
  // loose subsequence: "dtbl" finds "data table", "buton" finds "button"
  let i = 0
  for (const ch of r.sq) if (ch === w[i]) i++
  return i === w.length ? 10 : 0
}

/** Every word must hit; shorter labels win ties. */
export function searchIndex(query: string, limit = 40): Result[] {
  const q = norm(query)
  if (!q) return []
  const words = q.split(" ")
  return ALL.map((r) => {
    let s = r.l === q || r.sq === q.replace(/ /g, "") ? 200 : 0
    for (const w of words) {
      const ws = wordScore(w, r)
      if (!ws) return { r, s: 0 }
      s += ws
    }
    return { r, s }
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.r.l.length - b.r.l.length)
    .slice(0, limit)
    .map((x) => x.r)
}

const RECENT_KEY = "minidev:search-recent"
function readRecent(): string[] {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && BY_ID.has(x)) : []
  } catch {
    return []
  }
}
function pushRecent(id: string) {
  const next = [id, ...readRecent().filter((x) => x !== id)].slice(0, 5)
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch {}
  return next
}

const ICONS = { Recent: ClockIcon, Pages: FileTextIcon, Agents: BotIcon, Components: BoxIcon, Blocks: LayoutTemplateIcon, Motion: SparklesIcon }
type Row = { r: Result; g: string }

/** Loaded on first use by SiteSearch: the dialog, the search index and the result list. */
export default function SearchDialog({
  open,
  onOpenChange,
  returnFocus,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  returnFocus: React.RefObject<HTMLElement | null>
}) {
  const router = useRouter()
  const [q, setQ] = React.useState("")
  const [active, setActive] = React.useState(0)
  // Only ever rendered on the client (lazy, after the first open), so storage is safe here.
  const [recent, setRecent] = React.useState(readRecent)
  const [copied, setCopied] = React.useState<string | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const rows = React.useMemo<Row[]>(() => {
    if (q.trim()) return searchIndex(q).map((r) => ({ r, g: r.group }))
    const seen = new Set(recent)
    const pick = (ids: string[], g: string) => ids.filter((id) => BY_ID.has(id) && (g === "Recent" || !seen.has(id))).map((id) => ({ r: BY_ID.get(id)!, g }))
    return [...pick(recent, "Recent"), ...pick(JUMP, "Jump to"), ...pick(POPULAR, "Popular")]
  }, [q, recent])

  const current = rows[active]?.r

  React.useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(null), 1400)
    return () => clearTimeout(t)
  }, [copied])

  const close = () => {
    onOpenChange(false)
    setQ("")
    setActive(0)
  }

  const go = (r?: Result) => {
    if (!r) return
    setRecent(pushRecent(r.id))
    close()
    if (r.raw) window.location.assign(r.href)
    else router.push(r.href)
  }

  const copy = (r?: Result) => {
    if (!r?.install) return
    navigator.clipboard?.writeText(r.install).then(() => setCopied(r.id), () => {})
  }

  const groups = React.useMemo(() => {
    const m = new Map<string, { r: Result; i: number }[]>()
    rows.forEach(({ r, g }, i) => {
      if (!m.has(g)) m.set(g, [])
      m.get(g)!.push({ r, i })
    })
    return [...m.entries()]
  }, [rows])

  const move = (d: number) => setActive((a) => (rows.length ? (a + d + rows.length) % rows.length : 0))

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-scrim backdrop-blur-[2px] transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          finalFocus={returnFocus}
          className={cn(
            "fixed top-[12vh] left-1/2 z-50 flex max-h-[min(560px,76vh)] w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2 flex-col overflow-hidden",
            "rounded-2xl border border-border bg-raised text-fg shadow-overlay outline-none",
            "origin-top transition-[opacity,transform] duration-200 ease-hairline",
            "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.99] data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[ending-style]:ease-exit"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Search MiniDev UI</DialogPrimitive.Title>
          <div className="flex h-14 items-center gap-3 border-b border-border px-4">
            <SearchIcon className="size-4 shrink-0 text-fg-subtle" />
            <input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setActive(0)
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); move(1) }
                else if (e.key === "ArrowUp") { e.preventDefault(); move(-1) }
                else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); copy(current) }
                else if (e.key === "Enter") { e.preventDefault(); go(current) }
              }}
              placeholder={`Search ${COMPONENT_LITE.length} components, blocks and pages…`}
              className="h-full min-w-0 flex-1 bg-transparent text-[0.9375rem] text-fg outline-none placeholder:text-fg-subtle"
              aria-label="Search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded
              aria-controls="site-search-list"
              aria-activedescendant={current ? `ss-${current.id}` : undefined}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
            />
            <Kbd>Esc</Kbd>
          </div>
          <div ref={listRef} id="site-search-list" role="listbox" aria-label="Results" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
            {rows.length === 0 ? (
              <div className="grid place-items-center gap-1 py-14 text-center">
                <p className="text-sm font-medium text-fg">No match for “{q}”</p>
                <p className="text-xs text-fg-muted">Try “table”, “chat”, “pricing” or “hero”.</p>
                <p className="mt-3 text-xs text-fg-subtle">
                  Using an AI agent? It can read every component at{" "}
                  <a href="/llms.txt" className="font-mono text-accent-fg underline decoration-accent-line underline-offset-4">/llms.txt</a>
                </p>
              </div>
            ) : (
              groups.map(([g, items]) => {
                const gid = `ss-g-${g.replace(/\s+/g, "-")}`
                return (
                  <div key={g} role="group" aria-labelledby={gid} className="mb-1 last:mb-0">
                    <p id={gid} className="px-2.5 pt-2 pb-1.5 text-[11px] font-medium text-fg-subtle">{g}</p>
                    {items.map(({ r, i }) => {
                      const RowIcon = ICONS[g === "Recent" ? "Recent" : r.group]
                      return (
                        <div
                          key={r.id}
                          id={`ss-${r.id}`}
                          role="option"
                          aria-selected={i === active}
                          data-index={i}
                          onMouseMove={() => i !== active && setActive(i)}
                          onClick={() => go(r)}
                          className={cn(
                            "flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 text-left text-[0.8125rem]",
                            i === active ? "bg-sunken text-fg" : "text-fg-muted"
                          )}
                        >
                          <span className={cn("grid size-6 shrink-0 place-items-center rounded-md border", i === active ? "border-accent-line bg-accent-soft text-accent-fg" : "border-border bg-surface text-fg-subtle")}>
                            <RowIcon className="size-3.5" />
                          </span>
                          <span className="flex-1 truncate font-medium text-fg">{r.label}</span>
                          <span className="hidden truncate font-mono text-[11px] text-fg-subtle sm:block">{r.hint}</span>
                          <ArrowRightIcon aria-hidden className={cn("size-3.5 shrink-0", i === active ? "opacity-100" : "opacity-0")} />
                        </div>
                      )
                    })}
                  </div>
                )
              })
            )}
          </div>
          <div className="flex h-10 items-center gap-3 border-t border-border bg-sunken px-4 text-[11px] text-fg-subtle">
            {current?.install ? (
              <>
                <code className="min-w-0 flex-1 truncate font-mono text-fg-muted">{current.install}</code>
                <button
                  type="button"
                  onClick={() => copy(current)}
                  className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md px-1.5 text-fg-muted outline-none hover:bg-surface hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {copied === current.id ? <CheckIcon className="size-3.5 text-accent-fg" /> : <CopyIcon className="size-3.5" />}
                  <span>{copied === current.id ? "Copied" : "Copy"}</span>
                  <Kbd className="hidden sm:inline-flex">⌘<CornerDownLeftIcon /></Kbd>
                </button>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
                <span className="inline-flex items-center gap-1.5"><Kbd><CornerDownLeftIcon /></Kbd> open</span>
                <span className="ml-auto hidden tabular-nums sm:inline">{rows.length} results</span>
              </>
            )}
          </div>
          <p aria-live="polite" className="sr-only">{copied ? "Install command copied" : ""}</p>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** On the 404 page: components whose names look like the broken URL. Client-only, after hydration. */
export function NotFoundSuggestions() {
  const path = usePathname()
  const hydrated = React.useSyncExternalStore(noop, () => true, () => false)
  if (!hydrated) return null
  let slug = path.split("/").filter(Boolean).pop() ?? ""
  try { slug = decodeURIComponent(slug) } catch {}
  const hits = searchIndex(slug.replace(/\.(md|json|txt)$/, ""), 8).filter((r) => r.install).slice(0, 6)
  if (!hits.length) return null
  return (
    <section aria-labelledby="nf-suggest" className="mt-10">
      <h2 id="nf-suggest" className="text-[1.125rem] font-medium text-fg">Did you mean</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {hits.map((r) => (
          <li key={r.id}>
            <Link href={r.href} className="flex h-12 items-center gap-3 rounded-xl border border-border bg-surface px-4 text-[0.875rem] text-fg shadow-xs outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="flex-1 truncate font-medium">{r.label}</span>
              <span className="truncate font-mono text-[11px] text-fg-subtle">{r.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

const noop = () => () => {}
