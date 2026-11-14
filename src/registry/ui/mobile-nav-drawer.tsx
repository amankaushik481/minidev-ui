"use client"
import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Sheet } from "@/registry/ui/sheet"
import { cn } from "@/lib/utils"

/**
 * MobileNavDrawer — a hamburger button that opens site navigation in a panel from the right edge.
 *
 * Built on Sheet (Base UI Dialog), so focus is trapped, Escape and the scrim close it,
 * the page is scroll-locked and focus returns to the hamburger. Links close the drawer
 * when followed. Show it below your desktop breakpoint (e.g. className="md:hidden") next
 * to NavMarketing or a NavigationMenu.
 *
 * @example
 * <MobileNavDrawer
 *   className="md:hidden"
 *   brand="Lumen"
 *   links={[{ href: "/pricing", label: "Pricing" }, { href: "/docs", label: "Docs" }]}
 * />
 */
type MobileNavLink = { href: string; label: string }

type MobileNavDrawerProps = {
  /** Destinations in order. Rendered with next/link. */
  links?: MobileNavLink[]
  /** Title in the drawer header. */
  brand?: string
  /** Classes for the wrapper around the hamburger button. */
  className?: string
}

const LINKS: MobileNavLink[] = [
  { href: "/gallery", label: "Gallery" },
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
  { href: "/showcase", label: "Showcase" },
]

function MobileNavDrawer({ links = LINKS, brand = "MiniDev UI", className }: MobileNavDrawerProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="mobile-nav-drawer" className={cn("relative", className)}>
      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-4" />
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)} side="right" title={brand} className="max-w-72">
        <nav aria-label="Main" className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-fg outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Sheet>
    </div>
  )
}
export { MobileNavDrawer }
export type { MobileNavDrawerProps, MobileNavLink }
