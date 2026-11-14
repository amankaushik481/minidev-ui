"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { RelativeTime } from "@/registry/ui/relative-time"

/**
 * A linked article card: cover image, tag, relative date, title and a two-line excerpt.
 *
 * Use in blog indexes, changelogs and "related posts". The whole card is one link, so do not nest
 * other links or buttons inside. Prefer `Card` for non-link content. Without `image` the 16:9 slot
 * shows a sunken placeholder, so grids stay aligned.
 *
 * @example
 * <BlogCard href="/blog/close-books-faster" title="Close the books in two days"
 *   excerpt="How Northwind cut month-end from a week to two days." image="/covers/close.jpg"
 *   tag="Finance" date="2026-11-02" />
 */
type BlogCardProps = {
  /** Post title (an `h3`); also the link's name. */
  title: string
  /** Summary, clamped to two lines. */
  excerpt: string
  /** Post URL. */
  href?: string
  /** Cover image URL, cropped to 16:9. Decorative: the title names the link. */
  image?: string
  /** Publish date, shown as "3d ago" with the exact time for machines. */
  date?: string | Date
  /** Category shown above the title. */
  tag?: string
  className?: string
}

function BlogCard({ title, excerpt, href = "#", image, date, tag, className }: BlogCardProps) {
  return (
    <a
      data-slot="blog-card"
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-surface outline-none transition-[border-color] duration-[70ms]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <AspectRatio ratio={16 / 9} className="bg-sunken">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        ) : null}
      </AspectRatio>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-xs text-fg-muted">
          {tag ? <span className="font-medium text-accent-fg">{tag}</span> : null}
          {date ? <RelativeTime date={date} /> : null}
        </div>
        <h3 className="text-sm font-medium text-balance text-fg transition-[color] duration-[70ms] group-hover:text-accent-fg">{title}</h3>
        <p className="line-clamp-2 text-xs leading-[1.55] text-fg-muted">{excerpt}</p>
      </div>
    </a>
  )
}
export { BlogCard }
export type { BlogCardProps }
