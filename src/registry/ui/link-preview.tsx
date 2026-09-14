"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

function LinkPreview({
  url,
  title,
  description,
  image,
  className,
}: {
  url: string
  title: string
  description?: string
  image?: string
  className?: string
}) {
  return (
    <a
      data-slot="link-preview"
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "block overflow-hidden rounded-xl border border-border bg-surface outline-none transition-[border-color] duration-[70ms]",
        "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {image ? (
        <AspectRatio ratio={2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
        </AspectRatio>
      ) : null}
      <div className="space-y-1 p-3">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description ? <p className="line-clamp-2 text-xs text-fg-muted">{description}</p> : null}
        <p className="truncate text-[11px] text-fg-subtle">{url}</p>
      </div>
    </a>
  )
}
export { LinkPreview }
