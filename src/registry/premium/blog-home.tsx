"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { BlogCard } from "@/registry/ui/blog-card"
import { FooterMega } from "@/registry/ui/footer-mega"
import { ChipFilter } from "@/registry/ui/chip-filter"

/**
 * A blog index page: marketing navbar, title, tag chips that filter the post grid, and a mega footer.
 *
 * A page template: pass your `posts`; the chips are built from their tags
 * plus "All". Dates are fixed strings or Dates (never `new Date()` at render,
 * which would differ between server and client). For a single post card use
 * BlogCard.
 *
 * @example
 * <BlogHome posts={[{ title: "Why we ship hairlines", excerpt: "Structure from borders.", tag: "Design", date: "2026-09-14", href: "/blog/hairlines" }]} />
 */
type Post = {
  /** Post title. Must be unique. */
  title: string
  excerpt: string
  /** Filter chip and card label. */
  tag: string
  /** ISO date string or Date. */
  date: string | Date
  href?: string
  /** Cover image URL. */
  image?: string
}

type BlogHomeProps = {
  /** Brand shown in the navbar and the footer. */
  brand?: string
  /** Page heading (the only h1). */
  title?: string
  description?: string
  posts?: Post[]
  className?: string
}

const SAMPLE_POSTS: Post[] = [
  { tag: "Design", title: "Why Hairline beats blur", excerpt: "Structure from borders and highlights, not soft shadows everywhere.", date: "2026-09-14" },
  { tag: "Engineering", title: "Audit gates that stick", excerpt: "Screenshots and axe on every gallery route before merge.", date: "2026-08-30" },
  { tag: "Product", title: "Free vs Premium without guilt", excerpt: "Primitives stay MIT. Motion packs soft-gate for launches.", date: "2026-08-12" },
]

function BlogHome({
  brand = "Lumen",
  title = "Blog",
  description = "Craft notes on Hairline UI, motion, and audit gates.",
  posts = SAMPLE_POSTS,
  className,
}: BlogHomeProps) {
  const [tag, setTag] = React.useState("all")
  const tags = [...new Set(posts.map((p) => p.tag))]
  const shown = tag === "all" ? posts : posts.filter((p) => p.tag === tag)
  return (
    <div data-slot="blog-home" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing brand={brand} />
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-balance text-fg">{title}</h1>
          <p className="mt-2 text-sm text-pretty text-fg-muted">{description}</p>
        </div>
        <ChipFilter label="Filter posts by tag" value={tag} onChange={setTag} options={[{ value: "all", label: "All" }, ...tags.map((t) => ({ value: t, label: t }))]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <BlogCard key={p.title} tag={p.tag} title={p.title} excerpt={p.excerpt} date={p.date} href={p.href} image={p.image} />
          ))}
        </div>
      </div>
      <FooterMega brand={brand} columns={[{ title: "More", links: [{ label: "Docs", href: "#" }, { label: "Gallery", href: "#" }] }]} />
    </div>
  )
}
export { BlogHome }
export type { BlogHomeProps, Post as BlogPost }
