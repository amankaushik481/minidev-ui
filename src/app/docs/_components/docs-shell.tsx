"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRightIcon, BotIcon, PanelLeftIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { COMPONENT_LITE } from "@/lib/component-lite"
import { cn } from "@/lib/utils"

// The phone drawer (Base UI Dialog) loads the first time someone reaches for it, so desktop pays nothing.
const loadSheet = () => import("@/registry/ui/sheet")
const Sheet = React.lazy(() => loadSheet().then((m) => ({ default: m.Sheet })))

const GUIDES = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs#quick-start", label: "Quick start" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs#theming", label: "Theming" },
  { href: "/docs#materials", label: "Materials" },
  { href: "/docs#dark-mode", label: "Dark mode" },
]

const GROUPS = [
  { kind: "ui", label: "Components" },
  { kind: "block", label: "Blocks" },
  { kind: "premium", label: "Motion" },
] as const

export const humanize = (title: string) => title.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

const linkBase = "block rounded-md px-2 text-[0.8125rem] outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent"

/** Where the reader is, for the phone bar. */
function currentLabel(path: string) {
  if (path.startsWith("/docs/installation")) return "Installation"
  if (path === "/docs/ai") return "AI agents"
  const c = COMPONENT_LITE.find((x) => `/docs/${x.name}` === path)
  return c ? humanize(c.title) : "Getting started"
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname()
  const router = useRouter()
  const [q, setQ] = React.useState("")
  const boxRef = React.useRef<HTMLDivElement>(null)
  const activeRef = React.useRef<HTMLAnchorElement>(null)

  // Bring the current page into view inside the list only; scrollIntoView would also scroll the window.
  React.useEffect(() => {
    const box = boxRef.current
    const el = activeRef.current
    if (!box || !el) return
    if (el.offsetTop < box.scrollTop || el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = el.offsetTop - box.clientHeight / 2
    }
  }, [path])

  // "data table" finds data-table: every typed word must appear in the slug or the title.
  const words = q.trim().toLowerCase().split(/[\s-]+/).filter(Boolean)
  const filtering = words.length > 0
  const groups = GROUPS.map((g) => ({
    ...g,
    list: COMPONENT_LITE.filter((c) => {
      if (c.kind !== g.kind) return false
      const hay = `${c.name} ${humanize(c.title).toLowerCase()}`
      return words.every((w) => hay.includes(w))
    }),
  }))
  const matches = groups.reduce((n, g) => n + g.list.length, 0)
  const first = groups.find((g) => g.list.length)?.list[0]

  // Arrow keys walk the links, Home/End jump, from the filter box or from any link.
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return
    const inInput = e.target instanceof HTMLInputElement
    if (inInput && (e.key === "Home" || e.key === "End")) return
    const links = Array.from(boxRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])
    if (!links.length) return
    e.preventDefault()
    const i = links.indexOf(document.activeElement as HTMLAnchorElement)
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? links.length - 1 : inInput ? (e.key === "ArrowDown" ? 0 : links.length - 1) : e.key === "ArrowDown" ? Math.min(i + 1, links.length - 1) : i - 1
    if (next < 0) e.currentTarget.querySelector("input")?.focus()
    else links[next]?.focus()
  }

  return (
    <nav aria-label="Docs" className="flex h-full flex-col" onKeyDown={onKeyDown}>
      <Link
        href="/docs/ai"
        onClick={onNavigate}
        aria-current={path === "/docs/ai" ? "page" : undefined}
        className={cn(
          "group mx-1 mb-4 flex items-center gap-3 rounded-xl border p-2.5 outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
          path === "/docs/ai" ? "border-accent-line bg-accent-soft" : "border-border bg-surface shadow-xs hover:border-border-strong"
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft text-accent-fg">
          <BotIcon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.8125rem] font-medium text-fg">AI agents</span>
          <span className="block truncate text-[12px] text-fg-muted">Rules, llms.txt, one-line installs</span>
        </span>
      </Link>
      <div className="relative mx-1 mb-3">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-fg-subtle" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && q) {
              e.stopPropagation()
              setQ("")
            } else if (e.key === "Enter" && first) {
              e.preventDefault()
              onNavigate?.()
              router.push(`/docs/${first.name}`)
            }
          }}
          placeholder={`Filter ${COMPONENT_LITE.length} components…`}
          aria-label="Filter components"
          aria-describedby="docs-filter-hint"
          autoComplete="off"
          spellCheck={false}
          className="h-8 w-full rounded-lg border border-border bg-surface pr-2 pl-8 text-[0.8125rem] text-fg shadow-xs outline-none placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] [&::-webkit-search-cancel-button]:hidden"
        />
        <span id="docs-filter-hint" className="sr-only">
          Enter opens the first match. Arrow keys move through the list. Escape clears.
        </span>
        <span className="sr-only" aria-live="polite">
          {filtering ? `${matches} ${matches === 1 ? "match" : "matches"}` : ""}
        </span>
      </div>
      <div ref={boxRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-10 [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent)]">
        {!filtering ? (
          <div className="mb-6">
            <p className="mb-1.5 px-2 text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">Getting started</p>
            {GUIDES.map((g) => {
              const on = g.href === "/docs/installation" ? path.startsWith(g.href) : path === g.href
              return (
                <Link
                  key={g.href}
                  ref={on && g.href !== "/docs" ? activeRef : undefined}
                  href={g.href}
                  onClick={onNavigate}
                  aria-current={on ? "page" : undefined}
                  className={cn(linkBase, "py-1.5", on ? "bg-sunken font-medium text-fg" : "text-fg-muted hover:text-fg")}
                >
                  {g.label}
                </Link>
              )
            })}
          </div>
        ) : null}
        {filtering && !matches ? (
          <p className="px-2 py-4 text-[0.8125rem] leading-[1.6] text-fg-muted">
            No component matches “{q.trim()}”. Press <kbd className="font-mono text-[12px] text-fg">⌘K</kbd> to search the whole site.
          </p>
        ) : null}
        {groups.map((g) => {
          if (!g.list.length) return null
          return (
            <div key={g.kind} className="mb-6">
              <p className="mb-1.5 flex items-center justify-between px-2 text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">
                <span className="inline-flex items-center gap-1">{g.kind === "premium" ? <SparklesIcon className="size-3 text-accent" aria-hidden /> : null}{g.label}</span>
                <span className="font-mono tracking-normal tabular-nums">{g.list.length}</span>
              </p>
              {g.list.map((c) => {
                const href = `/docs/${c.name}`
                const on = path === href
                return (
                  <Link
                    key={c.name}
                    ref={on ? activeRef : undefined}
                    href={href}
                    onClick={onNavigate}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      linkBase,
                      "relative truncate py-[5px]",
                      on ? "bg-sunken font-medium text-fg before:absolute before:inset-y-1.5 before:-left-px before:w-[2px] before:rounded-full before:bg-accent" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {humanize(c.title)}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

/** Phone and tablet: a sticky bar under the header that opens the sidebar as a drawer. */
function MobileNav() {
  const path = usePathname()
  const [open, setOpen] = React.useState(false)
  const [used, setUsed] = React.useState(false)
  return (
    // Outside the grid on purpose: a sticky grid item only sticks within its own row.
    <div className="sticky top-14 z-30 border-b border-border bg-bg lg:hidden">
      <button
        type="button"
        onClick={() => {
          setUsed(true)
          setOpen(true)
        }}
        onPointerEnter={() => void loadSheet()}
        onFocus={() => void loadSheet()}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="mx-auto flex h-11 w-full max-w-7xl items-center gap-2 px-4 text-left text-[0.8125rem] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:px-6"
      >
        <PanelLeftIcon className="size-4 shrink-0 text-fg-subtle" aria-hidden />
        <span className="text-fg-muted">Docs</span>
        <span className="text-fg-subtle" aria-hidden>/</span>
        <span className="min-w-0 truncate font-medium text-fg">{currentLabel(path)}</span>
        <span className="sr-only">, open docs navigation</span>
      </button>
      {used ? (
        <React.Suspense fallback={null}>
          <Sheet open={open} onClose={() => setOpen(false)} side="left" title="Docs" className="max-w-[18rem]">
            <div className="h-full">
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </Sheet>
        </React.Suspense>
      ) : null}
    </div>
  )
}

export function DocsShell({ children, toc }: { children: React.ReactNode; toc?: { id: string; label: string }[] }) {
  const [active, setActive] = React.useState<string | null>(toc?.[0]?.id ?? null)
  React.useEffect(() => {
    if (!toc?.length) return
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [toc])

  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <MobileNav />
      <div className="mx-auto grid max-w-7xl gap-x-10 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[220px_minmax(0,1fr)_180px]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] pt-8 lg:block">
          <Sidebar />
        </aside>
        <main id="docs-main" className="min-w-0 pt-8 pb-24 sm:pt-12">{children}</main>
        {toc?.length ? (
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] pt-12 xl:block">
            <nav aria-label="On this page">
              <p className="text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">On this page</p>
              <ul className="mt-3 space-y-1 border-l border-border">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      aria-current={active === t.id ? "location" : undefined}
                      className={cn(
                        "-ml-px block border-l py-1 pl-3 text-[0.8125rem] outline-none transition-colors duration-[140ms] focus-visible:text-fg focus-visible:underline",
                        active === t.id ? "border-fg font-medium text-fg" : "border-transparent text-fg-muted hover:text-fg"
                      )}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 border-t border-border pt-4 text-[0.8125rem]">
              <p className="text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">For agents</p>
              <a href="/llms.txt" className="mt-2 flex items-center gap-1 font-mono text-[12px] text-fg-muted outline-none hover:text-fg focus-visible:text-fg focus-visible:underline">
                /llms.txt <ArrowUpRightIcon className="size-3" aria-hidden />
              </a>
              <Link href="/docs/ai" className="mt-1.5 block text-fg-muted outline-none hover:text-fg focus-visible:text-fg focus-visible:underline">
                Set up your agent
              </Link>
            </div>
          </aside>
        ) : null}
      </div>
      <SiteFooter />
    </div>
  )
}

export function DocsH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group scroll-mt-28 border-b border-border pb-3 text-2xl font-medium tracking-[-0.022em] text-fg lg:scroll-mt-24">
      <a href={`#${id}`} className="outline-none focus-visible:underline">
        {children}
        <span aria-hidden className="ml-2 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  )
}

export function Tabbed({ tabs, className }: { tabs: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [i, setI] = React.useState(0)
  const id = React.useId()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  // WAI-ARIA tabs: arrows move and select, Home/End jump, only the selected tab is in the Tab order.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1
    const n = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1
    if (n < 0) return
    e.preventDefault()
    setI(n)
    refs.current[n]?.focus()
  }
  return (
    <div className={className}>
      <div role="tablist" className="flex gap-4 overflow-x-auto border-b border-border" onKeyDown={onKeyDown}>
        {tabs.map((t, n) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[n] = el
            }}
            role="tab"
            type="button"
            id={`${id}-tab-${n}`}
            aria-controls={`${id}-panel`}
            aria-selected={i === n}
            tabIndex={i === n ? 0 : -1}
            onClick={() => setI(n)}
            className={cn(
              "relative -mb-px h-9 shrink-0 text-[0.8125rem] font-medium whitespace-nowrap outline-none transition-colors focus-visible:text-fg focus-visible:underline",
              i === n ? "text-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            {t.label}
            {i === n ? <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-fg" /> : null}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${i}`} className="pt-4">
        {tabs[i]?.content}
      </div>
    </div>
  )
}
