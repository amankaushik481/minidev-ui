"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV, SITE } from "@/lib/site"
import { Button } from "@/registry/ui/button"
import { Logo, LogoMark } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteSearch } from "@/components/site-search"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function NpmIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M0 5h16v5.33H8V11.7H4.44v-1.37H0V5Zm.89 4.44h1.78V6.78h.89v2.66h.88V5.89H.89v3.55Zm4.44-3.55v4.44h1.78V9.44h1.78V5.89H5.33Zm1.78.89h.89v1.78h-.89V6.78Zm2.67-.89v3.55h1.78V6.78h.88v2.66h.89V6.78h.89v2.66h.88V5.89H9.78Z" />
    </svg>
  )
}

function isActive(path: string, href: string) {
  if (href === "/gallery") return path === "/gallery" || (path.startsWith("/gallery/") && !path.startsWith("/gallery/blocks") && !path.startsWith("/gallery/premium"))
  return path === href || path.startsWith(href + "/")
}

export function SiteHeader({ solid }: { solid?: boolean }) {
  const path = usePathname()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => setOpen(false), [path])
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ease-hairline",
        solid || scrolled || open
          ? "border-border bg-bg/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${SITE.name} home`} className="-ml-1 flex shrink-0 items-center gap-2 rounded-lg px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <Logo />
        </Link>
        <span className="hidden rounded-full border border-border bg-surface px-1.5 py-px font-mono text-[10px] text-fg-subtle sm:inline">
          v{SITE.version}
        </span>

        <nav className="ml-4 hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(path, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-2.5 py-1.5 text-[0.8125rem] font-medium outline-none transition-colors duration-[70ms]",
                  "focus-visible:ring-2 focus-visible:ring-accent",
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                )}
              >
                {item.label}
                {active ? <span aria-hidden className="absolute inset-x-2.5 -bottom-[11px] h-px bg-fg" /> : null}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <SiteSearch className="hidden md:inline-flex" />
          <SiteSearch compact className="md:hidden" />
          {SITE.github ? (
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden size-8 items-center justify-center rounded-lg text-fg-muted outline-none transition-colors hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent sm:inline-flex">
              <GithubIcon className="size-4" />
            </a>
          ) : null}
          <a href={SITE.npm} target="_blank" rel="noreferrer" aria-label="npm package" className="hidden size-8 items-center justify-center rounded-lg text-fg-muted outline-none transition-colors hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent sm:inline-flex">
            <NpmIcon className="size-4" />
          </a>
          <ThemeToggle />
          <Button size="sm" className="ml-1 hidden lg:inline-flex" render={<Link href="/docs" />}>
            Get started
          </Button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-lg text-fg outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-border bg-bg md:hidden">
          <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${i * 30}ms` }}
                className={cn(
                  "flex h-12 animate-[rise-in_220ms_var(--ease-hairline)_both] items-center justify-between border-b border-border text-lg font-medium tracking-[-0.014em] outline-none",
                  isActive(path, item.href) ? "text-fg" : "text-fg-muted"
                )}
              >
                {item.label}
                <ArrowUpRightIcon className="size-4 text-fg-subtle" />
              </Link>
            ))}
            <div className="mt-6 grid gap-2">
              <Button size="lg" render={<Link href="/docs" />}>Get started</Button>
              <Button size="lg" variant="outline" render={<a href={SITE.studio.url} />}>Hire the studio</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

const FOOTER = [
  {
    title: "Library",
    links: [
      { href: "/docs", label: "Getting started" },
      { href: "/gallery", label: "Components" },
      { href: "/gallery/blocks", label: "Blocks" },
      { href: "/gallery/premium-motion", label: "Motion" },
      { href: "/playground", label: "Playground" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/showcase", label: "Showcase" },
      { href: "/llms.txt", label: "llms.txt" },
      { href: SITE.npm, label: "npm package", external: true },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: SITE.studio.url, label: "minidev.pro", external: true },
      { href: SITE.studio.url, label: "Free 48h prototype", external: true },
      { href: SITE.studio.url, label: "MVP in 30 days", external: true },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer data-slot="site-footer" className="relative overflow-hidden border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Studio band */}
        <div className="grid gap-6 border-b border-border py-12 md:grid-cols-[1fr_auto] md:items-center md:py-14">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.08em] text-fg-subtle uppercase">From the studio behind the kit</p>
            <p className="mt-3 text-2xl font-medium tracking-[-0.022em] text-fg sm:text-[1.75rem] sm:leading-[1.15]">
              Need the product, not just the parts?{" "}
              <span className="text-fg-muted">{SITE.studio.pitch}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" render={<a href={SITE.studio.url} target="_blank" rel="noreferrer" />}>
              Start a project <ArrowUpRightIcon />
            </Button>
            <Button size="lg" variant="outline" render={<a href={SITE.studio.url} target="_blank" rel="noreferrer" />}>
              Get a free prototype
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[0.8125rem] leading-[1.6] text-fg-muted">
              {COMPONENT_COUNT_LABEL} React + Tailwind components drawn in hairlines. Copy them, own them, ship them. MIT, free forever.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-[0.8125rem] font-medium text-fg">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-[0.8125rem] text-fg-muted outline-none transition-colors hover:text-fg focus-visible:text-fg">
                        {l.label}
                        <ArrowUpRightIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[0.8125rem] text-fg-muted outline-none transition-colors hover:text-fg focus-visible:text-fg">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <LogoMark className="size-4" /> © {new Date().getFullYear()} MiniDev · MIT licensed
          </p>
          <p>Drawn in hairlines. Built to be copied.</p>
        </div>
      </div>
      {/* Hairline wordmark — the signature, cropped by the page edge */}
      <div aria-hidden className="pointer-events-none mx-auto -mb-[3.2vw] max-w-7xl select-none px-4 sm:px-6 lg:px-8">
        <svg viewBox="0 0 1000 150" className="w-full" preserveAspectRatio="xMidYMax meet">
          <text
            x="50%"
            y="140"
            textAnchor="middle"
            className="fill-transparent stroke-border-strong font-sans"
            style={{ fontSize: 176, fontWeight: 600, letterSpacing: "-0.05em", strokeWidth: 1 }}
          >
            MiniDev UI
          </text>
        </svg>
      </div>
    </footer>
  )
}

const COMPONENT_COUNT_LABEL = "460+"
