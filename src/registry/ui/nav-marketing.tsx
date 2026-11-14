"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Link } from "@/registry/ui/link"

/**
 * NavMarketing — a sticky top bar for marketing sites: brand, a few links and sign-in / get-started buttons.
 *
 * The links hide below the md breakpoint; pair it with MobileNavDrawer there. Pass
 * `actions` to replace the default buttons. For app navigation with dropdown panels
 * use NavigationMenu; for an app sidebar use Sidebar.
 *
 * @example
 * <NavMarketing
 *   brand="Lumen"
 *   links={[{ label: "Pricing", href: "/pricing" }, { label: "Docs", href: "/docs" }]}
 *   actions={<Button size="sm" render={<a href="/signup" />}>Start free</Button>}
 * />
 */
type NavMarketingLink = { label: string; href: string }

type NavMarketingProps = {
  /** Brand text at the left. */
  brand?: React.ReactNode
  /** Where the brand links to. */
  brandHref?: string
  /** Primary destinations. Hidden below md. */
  links?: NavMarketingLink[]
  /** Right-hand controls. Defaults to "Sign in" and "Get started" buttons. */
  actions?: React.ReactNode
  className?: string
}

const LINKS: NavMarketingLink[] = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
]

function NavMarketing({ brand = "MiniDev", brandHref = "/", links = LINKS, actions, className }: NavMarketingProps) {
  return (
    <header
      data-slot="nav-marketing"
      className={cn("sticky top-0 z-40 border-b border-border bg-raised", className)}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <a href={brandHref} className="rounded-md text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
            {brand}
          </a>
          <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-fg-muted no-underline hover:text-fg hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {actions ?? (
            <>
              <Button variant="ghost" size="sm">Sign in</Button>
              <Button size="sm">Get started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export { NavMarketing }
export type { NavMarketingProps, NavMarketingLink }
