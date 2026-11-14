"use client"
import * as React from "react"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * A citation card for AI answers and RAG results: source title, its URL or path in mono, and a quoted snippet.
 *
 * Show one per retrieved source under a StreamingMessage. When `href` is set the title becomes a link.
 *
 * @example
 * <SourceCard title="Billing API" url="docs.acme.com/billing" href="https://docs.acme.com/billing" snippet="Invoices are finalised after 1 hour." />
 */
type SourceCardProps = {
  /** Source name, e.g. a document title. */
  title?: string
  /** URL or path shown under the title. */
  url?: string
  /** Opens the source; makes the title a link. */
  href?: string
  /** The quoted passage the answer relied on. */
  snippet?: string
  /** Badge text in the corner. */
  badge?: React.ReactNode
  className?: string
}

function SourceCard({
  title = "DESIGN.md",
  url = "local://DESIGN.md",
  href,
  snippet = "Hairline · Geist Sans · accent hue 285 · zero blur shadows outside overlays.",
  badge = "source",
  className,
}: SourceCardProps) {
  return (
    <article data-slot="source-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-sm font-medium text-fg">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer" className="rounded-sm outline-none hover:underline hover:underline-offset-2 focus-visible:ring-2 focus-visible:ring-accent">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {badge ? <Badge variant="outline">{badge}</Badge> : null}
      </div>
      <p className="mt-1 truncate font-mono text-2xs text-fg-muted">{url}</p>
      <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{snippet}</p>
    </article>
  )
}
export { SourceCard }
export type { SourceCardProps }
