"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { RelativeTime } from "@/registry/ui/relative-time"

function BlogCard({
  title,
  excerpt,
  href = "#",
  image,
  date,
  tag,
  className,
}: {
  title: string
  excerpt: string
  href?: string
  image?: string
  date?: string | Date
  tag?: string
  className?: string
}) {
  return (
    <a
      data-slot="blog-card"
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-surface outline-none transition-[border-color] duration-[70ms]",
        "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <AspectRatio ratio={16 / 9} className="bg-sunken">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
        ) : null}
      </AspectRatio>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-xs text-fg-muted">
          {tag ? <span className="font-medium text-accent">{tag}</span> : null}
          {date ? <RelativeTime date={date} /> : null}
        </div>
        <h3 className="text-sm font-medium text-fg group-hover:text-accent">{title}</h3>
        <p className="line-clamp-2 text-xs leading-[1.55] text-fg-muted">{excerpt}</p>
      </div>
    </a>
  )
}
export { BlogCard }
