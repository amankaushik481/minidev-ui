"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SearchIcon, SparklesIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { cn } from "@/lib/utils"

const GUIDES = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs#installation", label: "Installation" },
  { href: "/docs#theming", label: "Theming" },
  { href: "/docs#dark-mode", label: "Dark mode" },
  { href: "/docs#ai", label: "For AI agents" },
]

const GROUPS = [
  { kind: "ui", label: "Components" },
  { kind: "block", label: "Blocks" },
  { kind: "premium", label: "Motion" },
] as const

export const humanize = (title: string) => title.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

function Sidebar() {
  const path = usePathname()
  const [q, setQ] = React.useState("")
  const activeRef = React.useRef<HTMLAnchorElement>(null)
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center" })
  }, [])
  const t = q.trim().toLowerCase()
  return (
    <nav aria-label="Docs" className="flex h-full flex-col">
      <div className="relative mx-1 mb-3">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-fg-subtle" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter…"
          aria-label="Filter components"
          className="h-8 w-full rounded-lg border border-border bg-surface pr-2 pl-8 text-[0.8125rem] text-fg shadow-xs outline-none placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]"
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-10 [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent)]">
        {!t ? (
          <div className="mb-6">
            <p className="mb-1.5 px-2 text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">Getting started</p>
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className={cn("block rounded-md px-2 py-1.5 text-[0.8125rem] outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent", path === g.href ? "bg-sunken font-medium text-fg" : "text-fg-muted")}>
                {g.label}
              </Link>
            ))}
          </div>
        ) : null}
        {GROUPS.map((g) => {
          const list = COMPONENT_INDEX.filter((c) => c.kind === g.kind && (!t || c.name.includes(t) || c.title.toLowerCase().includes(t)))
          if (!list.length) return null
          return (
            <div key={g.kind} className="mb-6">
              <p className="mb-1.5 flex items-center justify-between px-2 text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">
                <span className="inline-flex items-center gap-1">{g.kind === "premium" ? <SparklesIcon className="size-3 text-accent" /> : null}{g.label}</span>
                <span className="font-mono tracking-normal">{list.length}</span>
              </p>
              {list.map((c) => {
                const href = `/docs/${c.name}`
                const on = path === href
                return (
                  <Link
                    key={c.name}
                    ref={on ? activeRef : undefined}
                    href={href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "relative block truncate rounded-md px-2 py-[5px] text-[0.8125rem] outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[220px_minmax(0,1fr)_180px]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] pt-8 lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 pt-8 pb-24 sm:pt-12">{children}</main>
        {toc?.length ? (
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] pt-12 xl:block">
            <p className="text-[11px] font-medium tracking-[0.06em] text-fg-subtle uppercase">On this page</p>
            <ul className="mt-3 space-y-1 border-l border-border">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className={cn(
                      "-ml-px block border-l py-1 pl-3 text-[0.8125rem] outline-none transition-colors duration-[140ms]",
                      active === t.id ? "border-fg font-medium text-fg" : "border-transparent text-fg-muted hover:text-fg"
                    )}
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
      <SiteFooter />
    </div>
  )
}

export function DocsH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group scroll-mt-24 border-b border-border pb-3 text-2xl font-medium tracking-[-0.022em] text-fg">
      <a href={`#${id}`} className="outline-none">
        {children}
        <span className="ml-2 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  )
}

export function Tabbed({ tabs, className }: { tabs: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [i, setI] = React.useState(0)
  return (
    <div className={className}>
      <div role="tablist" className="flex gap-4 border-b border-border">
        {tabs.map((t, n) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            aria-selected={i === n}
            onClick={() => setI(n)}
            className={cn(
              "relative -mb-px h-9 text-[0.8125rem] font-medium outline-none transition-colors focus-visible:text-fg",
              i === n ? "text-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            {t.label}
            {i === n ? <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-fg" /> : null}
          </button>
        ))}
      </div>
      <div className="pt-4">{tabs[i]?.content}</div>
    </div>
  )
}
