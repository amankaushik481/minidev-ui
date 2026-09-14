"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Link } from "@/registry/ui/link"

function NavMarketing({
  brand = "MiniDev",
  links = [
    { label: "Product", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  className,
}: {
  brand?: string
  links?: { label: string; href: string }[]
  className?: string
}) {
  return (
    <header
      data-slot="nav-marketing"
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-raised/90 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent">{brand}</a>
          <nav className="hidden items-center gap-4 md:flex">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-fg-muted hover:text-fg no-underline hover:underline">{l.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>
    </header>
  )
}
export { NavMarketing }
