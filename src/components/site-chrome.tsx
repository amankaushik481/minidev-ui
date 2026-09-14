"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const NAV = [
  { href: "/gallery", label: "Gallery" },
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
  { href: "/showcase", label: "Showcase" },
  { href: "/gallery/premium-motion", label: "Premium" },
]

export function SiteHeader({ solid }: { solid?: boolean }) {
  const path = usePathname()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(false)
  }, [path])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
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
        "sticky top-0 z-40 border-b border-border/80 backdrop-blur-md",
        solid ? "bg-bg/95" : "bg-bg/80"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-sm font-medium tracking-[-0.008em] text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          MiniDev UI
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = path === item.href || path.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-sm outline-none transition-[color,background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                  active ? "bg-sunken text-fg" : "text-fg-muted hover:text-fg"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            render={<Link href="/docs" />}
          >
            Install
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" render={<Link href="/showcase" />}>
            Pitch
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-bg md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {NAV.map((item) => {
              const active = path === item.href || path.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active ? "bg-sunken font-medium text-fg" : "text-fg hover:bg-sunken"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3 sm:hidden">
              <Button variant="outline" size="sm" className="w-full" render={<Link href="/docs" />}>
                Install
              </Button>
              <Button size="sm" className="w-full" render={<Link href="/showcase" />}>
                Pitch
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer data-slot="site-footer" className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-fg">MiniDev UI</p>
          <p className="mt-1 max-w-sm text-xs leading-[1.55] text-fg-muted">
            Hairline React + Tailwind registry. Free MIT product UI. Premium kinetic launch moments.
            Accent hue 285. Audit-gated.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.01em] text-fg-muted">Explore</p>
            <Link href="/gallery" className="block text-fg-muted hover:text-fg">Gallery</Link>
            <Link href="/docs" className="block text-fg-muted hover:text-fg">Docs</Link>
            <Link href="/playground" className="block text-fg-muted hover:text-fg">Playground</Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.01em] text-fg-muted">Premium</p>
            <Link href="/gallery/premium-heroes" className="block text-fg-muted hover:text-fg">Heroes</Link>
            <Link href="/gallery/premium-motion" className="block text-fg-muted hover:text-fg">Motion</Link>
            <Link href="/showcase" className="block text-fg-muted hover:text-fg">Client showcase</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-fg-muted sm:px-6">
        Geist Sans · Hue 285 · Hairline · ui.minidev.pro
      </div>
    </footer>
  )
}
