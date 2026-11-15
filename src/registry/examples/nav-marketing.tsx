"use client"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Links and real actions",
    description: "The default buttons do nothing, so pass actions; render={<a />} keeps Sign in and Start free as links.",
    code: `<NavMarketing
  className="w-full"
  brand="Lumen"
  links={[
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Docs", href: "/docs" },
  ]}
  actions={
    <>
      <Button variant="ghost" size="sm" render={<a href="/login" />}>Sign in</Button>
      <Button size="sm" render={<a href="/signup" />}>Start free</Button>
    </>
  }
/>`,
    node: (
      <NavMarketing
        className="w-full"
        brand="Lumen"
        links={[
          { label: "Product", href: "/product" },
          { label: "Pricing", href: "/pricing" },
          { label: "Changelog", href: "/changelog" },
          { label: "Docs", href: "/docs" },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm" render={<a href="/login" />}>Sign in</Button>
            <Button size="sm" render={<a href="/signup" />}>Start free</Button>
          </>
        }
      />
    ),
  },
  {
    title: "Brand mark and one action",
    description: "brand takes any node, so a small mark can sit before the name; a docs site often needs a single action.",
    code: `<NavMarketing
  className="w-full"
  brand={
    <span className="flex items-center gap-2">
      <span aria-hidden className="size-4 rounded-md bg-accent" />
      Lumen Docs
    </span>
  }
  links={[
    { label: "Guides", href: "/guides" },
    { label: "API", href: "/api" },
  ]}
  actions={<Button size="sm" variant="outline" render={<a href="/app" />}>Open app</Button>}
/>`,
    node: (
      <NavMarketing
        className="w-full"
        brand={
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-4 rounded-md bg-accent" />
            Lumen Docs
          </span>
        }
        links={[
          { label: "Guides", href: "/guides" },
          { label: "API", href: "/api" },
        ]}
        actions={<Button size="sm" variant="outline" render={<a href="/app" />}>Open app</Button>}
      />
    ),
  },
]
