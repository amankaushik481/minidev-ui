"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from "lucide-react"

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
  { href: "/showcase", label: "Showcase" },
]

function MobileNavDrawer({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="mobile-nav-drawer" className={cn("relative", className)}>
      <Button type="button" size="icon" variant="outline" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen(true)}>
        <MenuIcon className="size-4" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-bg/80" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="absolute inset-y-0 right-0 flex w-72 flex-col border-l border-border bg-surface p-4 shadow-highlight">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-fg">MiniDev UI</p>
              <Button type="button" size="icon-sm" variant="ghost" aria-label="Close menu" onClick={() => setOpen(false)}>
                <XIcon className="size-4" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-fg hover:bg-sunken" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export { MobileNavDrawer }
