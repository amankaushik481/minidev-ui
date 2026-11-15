"use client"
import { Button } from "@/registry/ui/button"
import { MobileNavDrawer } from "@/registry/ui/mobile-nav-drawer"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Marketing header on a phone",
    description: "The brand on the left, the call to action and the menu button on the right; the drawer opens from the right edge.",
    code: `<div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface px-3 py-2">
  <span className="text-sm font-semibold text-fg">Lumen</span>
  <div className="flex items-center gap-2">
    <Button size="sm">Start free</Button>
    <MobileNavDrawer
      brand="Lumen"
      links={[
        { href: "#product", label: "Product" },
        { href: "#pricing", label: "Pricing" },
        { href: "#customers", label: "Customers" },
        { href: "#signin", label: "Sign in" },
      ]}
    />
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface px-3 py-2">
        <span className="text-sm font-semibold text-fg">Lumen</span>
        <div className="flex items-center gap-2">
          <Button size="sm">Start free</Button>
          <MobileNavDrawer
            brand="Lumen"
            links={[
              { href: "#product", label: "Product" },
              { href: "#pricing", label: "Pricing" },
              { href: "#customers", label: "Customers" },
              { href: "#signin", label: "Sign in" },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    title: "Desktop links, drawer below md",
    description: "Show the inline links from md up and the drawer below it, at the same breakpoint.",
    code: `<div className="flex w-full max-w-2xl items-center justify-between rounded-xl border border-border bg-surface px-4 py-2">
  <span className="text-sm font-semibold text-fg">Halcyon Docs</span>
  <nav aria-label="Main" className="hidden gap-4 text-sm text-fg-muted md:flex">
    <a href="#guides">Guides</a>
    <a href="#api">API</a>
    <a href="#changelog">Changelog</a>
  </nav>
  <MobileNavDrawer
    className="md:hidden"
    brand="Halcyon Docs"
    links={[
      { href: "#guides", label: "Guides" },
      { href: "#api", label: "API" },
      { href: "#changelog", label: "Changelog" },
    ]}
  />
</div>`,
    node: (
      <div className="flex w-full max-w-2xl items-center justify-between rounded-xl border border-border bg-surface px-4 py-2">
        <span className="text-sm font-semibold text-fg">Halcyon Docs</span>
        <nav aria-label="Main" className="hidden gap-4 text-sm text-fg-muted md:flex">
          <a href="#guides">Guides</a>
          <a href="#api">API</a>
          <a href="#changelog">Changelog</a>
        </nav>
        <MobileNavDrawer
          className="md:hidden"
          brand="Halcyon Docs"
          links={[
            { href: "#guides", label: "Guides" },
            { href: "#api", label: "API" },
            { href: "#changelog", label: "Changelog" },
          ]}
        />
      </div>
    ),
  },
]
