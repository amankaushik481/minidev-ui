"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 backdrop-blur-md",
        solid ? "bg-bg/95" : "bg-bg/80"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="text-sm font-medium tracking-[-0.008em] text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent">
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
          <Button variant="outline" size="sm" render={<Link href="/docs" />}>
            Install
          </Button>
          <Button size="sm" render={<Link href="/showcase" />}>
            Pitch
          </Button>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer data-slot="site-footer" className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
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
      <div className="border-t border-border px-6 py-4 text-center text-xs text-fg-muted">
        Geist Sans · Hue 285 · Hairline · Local craft until we ship public
      </div>
    </footer>
  )
}
