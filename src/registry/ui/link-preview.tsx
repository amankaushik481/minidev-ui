"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

/**
 * LinkPreview — an unfurled link card: optional image, title, two-line description and the URL, opening in a new tab.
 *
 * Use it for shared links in chat, comments and notes. For a preview that
 * appears on hover over an inline link use HoverCard, and for a cited source in
 * an AI answer use SourceCard or CitationChip.
 *
 * @example
 * <LinkPreview url="https://lumen.app/changelog" title="Lumen changelog" description="Scheduled payouts and reminders." image="/og.png" />
 */
type LinkPreviewProps = {
  /** Destination, opened in a new tab. */
  url: string
  /** Page title. */
  title: string
  /** Page description, clamped to two lines. */
  description?: string
  /** Preview image URL, shown at 2:1 above the text. Decorative. */
  image?: string
  className?: string
}

function LinkPreview({ url, title, description, image, className }: LinkPreviewProps) {
  return (
    <a
      data-slot="link-preview"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block overflow-hidden rounded-xl border border-border bg-surface outline-none transition-[border-color] duration-[70ms]",
        "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {image ? (
        <AspectRatio ratio={2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        </AspectRatio>
      ) : null}
      <div className="space-y-1 p-3">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description ? <p className="line-clamp-2 text-xs text-fg-muted">{description}</p> : null}
        <p className="truncate text-[11px] text-fg-subtle">{url}</p>
        <span className="sr-only">(opens in a new tab)</span>
      </div>
    </a>
  )
}
export { LinkPreview }
export type { LinkPreviewProps }
