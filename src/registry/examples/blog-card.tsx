"use client"
import { BlogCard } from "@/registry/ui/blog-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Blog index",
    description: "A three column grid of posts. With no image, each card keeps a sunken 16:9 slot so titles line up across the row.",
    code: `<div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <BlogCard
    href="#"
    tag="Finance"
    date="2026-11-02"
    title="Close the books in two days"
    excerpt="How the Acme finance team cut month-end from a week to two days by reconciling every morning instead of every quarter."
  />
  <BlogCard
    href="#"
    tag="Product"
    date="2026-10-21"
    title="Scheduled payouts are here"
    excerpt="Pick a day of the week and Lumen sends every cleared payment to your bank in one transfer."
  />
  <BlogCard
    href="#"
    tag="Engineering"
    date="2026-10-08"
    title="How we made exports four times faster"
    excerpt="Streaming CSV rows straight from the database instead of building the file in memory."
  />
</div>`,
    node: (
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          href="#"
          tag="Finance"
          date="2026-11-02"
          title="Close the books in two days"
          excerpt="How the Acme finance team cut month-end from a week to two days by reconciling every morning instead of every quarter."
        />
        <BlogCard
          href="#"
          tag="Product"
          date="2026-10-21"
          title="Scheduled payouts are here"
          excerpt="Pick a day of the week and Lumen sends every cleared payment to your bank in one transfer."
        />
        <BlogCard
          href="#"
          tag="Engineering"
          date="2026-10-08"
          title="How we made exports four times faster"
          excerpt="Streaming CSV rows straight from the database instead of building the file in memory."
        />
      </div>
    ),
  },
  {
    title: "Related posts",
    description: "Two cards in a narrow column at the end of an article. The whole card is the link, so keep other links out of it.",
    code: `<aside className="w-full max-w-sm space-y-3">
  <h2 className="text-sm font-medium text-fg">Keep reading</h2>
  <BlogCard
    href="#"
    tag="Guides"
    date="2026-09-30"
    title="A checklist for your first audit"
    excerpt="What auditors ask for, and the three reports in Lumen that answer most of it."
  />
  <BlogCard
    href="#"
    tag="Guides"
    date="2026-09-12"
    title="Multi-currency invoicing without spreadsheets"
    excerpt="Lock the rate when you send the invoice, and settle to your base currency automatically."
  />
</aside>`,
    node: (
      <aside className="w-full max-w-sm space-y-3">
        <h2 className="text-sm font-medium text-fg">Keep reading</h2>
        <BlogCard
          href="#"
          tag="Guides"
          date="2026-09-30"
          title="A checklist for your first audit"
          excerpt="What auditors ask for, and the three reports in Lumen that answer most of it."
        />
        <BlogCard
          href="#"
          tag="Guides"
          date="2026-09-12"
          title="Multi-currency invoicing without spreadsheets"
          excerpt="Lock the rate when you send the invoice, and settle to your base currency automatically."
        />
      </aside>
    ),
  },
]
