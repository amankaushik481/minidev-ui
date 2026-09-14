"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { BlogCard } from "@/registry/ui/blog-card"
import { FooterMega } from "@/registry/ui/footer-mega"
import { ChipFilter } from "@/registry/ui/chip-filter"

function BlogHome({ className }: { className?: string }) {
  const [tag, setTag] = React.useState("all")
  return (
    <div data-slot="blog-home" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Blog</h1>
          <p className="mt-2 text-sm text-fg-muted">Craft notes on Hairline UI, motion, and audit gates.</p>
        </div>
        <ChipFilter
          value={tag}
          onChange={setTag}
          options={[
            { value: "all", label: "All" },
            { value: "design", label: "Design" },
            { value: "eng", label: "Engineering" },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard tag="Design" title="Why Hairline beats blur" excerpt="Structure from borders and highlights — not soft shadows everywhere." date={new Date().toISOString()} />
          <BlogCard tag="Engineering" title="Audit gates that stick" excerpt="Screenshots + axe on every gallery route before merge." date={new Date().toISOString()} />
          <BlogCard tag="Product" title="Free vs Premium without guilt" excerpt="Primitives stay MIT. Motion packs soft-gate for launches." date={new Date().toISOString()} />
        </div>
      </div>
      <FooterMega columns={[{ title: "More", links: [{ label: "Docs", href: "#" }, { label: "Gallery", href: "#" }] }]} />
    </div>
  )
}
export { BlogHome }
