import * as React from "react"
import { BlogHome } from "@/registry/premium/blog-home"
import { BrowserMockup } from "@/registry/premium/browser-mockup"
import { BlogCard } from "@/registry/ui/blog-card"
import { ChipFilter } from "@/registry/ui/chip-filter"
import { FooterMega } from "@/registry/ui/footer-mega"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import type { Example } from "./types"

const POSTS = [
  { tag: "Product", title: "Reminders that pay for themselves", excerpt: "Three nudges, nine days sooner. What we learned from 40,000 overdue invoices.", date: "2026-10-02" },
  { tag: "Engineering", title: "Reconciling 1,200 invoices a night", excerpt: "How the matching engine pairs bank lines with invoices without a human in the loop.", date: "2026-09-18" },
  { tag: "Design", title: "Why our tables have no zebra stripes", excerpt: "Hairlines, tabular numbers and a lot of restraint.", date: "2026-09-04" },
  { tag: "Product", title: "Multi-currency statements", excerpt: "One statement, every currency your customers pay in, settled in yours.", date: "2026-08-21" },
]

function LumenBlog() {
  const [tag, setTag] = React.useState("all")
  const posts = tag === "all" ? POSTS : POSTS.filter((p) => p.tag.toLowerCase() === tag)
  return (
    <div className="w-full bg-bg">
      <NavMarketing brand="Lumen" links={[{ label: "Product", href: "#" }, { label: "Customers", href: "#" }, { label: "Blog", href: "#" }]} />
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Lumen journal</h1>
          <p className="mt-2 text-sm text-fg-muted">Notes from the team building invoicing for Northwind and 4,000 other companies.</p>
        </div>
        <ChipFilter
          value={tag}
          onChange={setTag}
          options={[
            { value: "all", label: "All" },
            { value: "product", label: "Product" },
            { value: "engineering", label: "Engineering" },
            { value: "design", label: "Design" },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.title} tag={p.tag} title={p.title} excerpt={p.excerpt} date={p.date} />
          ))}
        </div>
      </div>
      <FooterMega />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In a browser frame",
    description: "Drop the page inside BrowserMockup to show the template on a landing or pitch page.",
    code: `<BrowserMockup url="https://lumen.dev/blog" phone={false}>
  <BlogHome />
</BrowserMockup>`,
    node: (
      <BrowserMockup url="https://lumen.dev/blog" phone={false}>
        <BlogHome />
      </BrowserMockup>
    ),
  },
  {
    title: "Your own posts",
    description: "The page is NavMarketing, ChipFilter, a grid of BlogCard and FooterMega; rebuild it with your posts and a working filter.",
    code: `const POSTS = [
  { tag: "Product", title: "Reminders that pay for themselves", excerpt: "Three nudges, nine days sooner. What we learned from 40,000 overdue invoices.", date: "2026-10-02" },
  { tag: "Engineering", title: "Reconciling 1,200 invoices a night", excerpt: "How the matching engine pairs bank lines with invoices without a human in the loop.", date: "2026-09-18" },
  { tag: "Design", title: "Why our tables have no zebra stripes", excerpt: "Hairlines, tabular numbers and a lot of restraint.", date: "2026-09-04" },
  { tag: "Product", title: "Multi-currency statements", excerpt: "One statement, every currency your customers pay in, settled in yours.", date: "2026-08-21" },
]

function LumenBlog() {
  const [tag, setTag] = React.useState("all")
  const posts = tag === "all" ? POSTS : POSTS.filter((p) => p.tag.toLowerCase() === tag)
  return (
    <div className="w-full bg-bg">
      <NavMarketing brand="Lumen" links={[{ label: "Product", href: "#" }, { label: "Customers", href: "#" }, { label: "Blog", href: "#" }]} />
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Lumen journal</h1>
          <p className="mt-2 text-sm text-fg-muted">Notes from the team building invoicing for Northwind and 4,000 other companies.</p>
        </div>
        <ChipFilter
          value={tag}
          onChange={setTag}
          options={[
            { value: "all", label: "All" },
            { value: "product", label: "Product" },
            { value: "engineering", label: "Engineering" },
            { value: "design", label: "Design" },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.title} tag={p.tag} title={p.title} excerpt={p.excerpt} date={p.date} />
          ))}
        </div>
      </div>
      <FooterMega />
    </div>
  )
}`,
    node: <LumenBlog />,
  },
]
