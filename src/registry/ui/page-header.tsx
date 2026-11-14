"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PageHeader — the top of an app page: an h1 title, an optional description and right-aligned actions, over a hairline.
 *
 * Renders the page's only h1, so use it once per page. Actions wrap under the title
 * on narrow screens. For a marketing hero use a Hero block; for a section inside a
 * page use a plain h2.
 *
 * @example
 * <PageHeader
 *   title="Invoices"
 *   description="Everything billed to customers this year."
 *   actions={<Button size="sm">New invoice</Button>}
 * />
 */
type PageHeaderProps = {
  /** Page title, rendered as the h1. */
  title: React.ReactNode
  /** One sentence under the title. */
  description?: React.ReactNode
  /** Buttons on the right, e.g. a primary action and a secondary one. */
  actions?: React.ReactNode
  className?: string
}

function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div data-slot="page-header" className={cn("mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4", className)}>
      <div className="min-w-0">
        <h1 className="text-2xl font-medium tracking-[-0.018em] text-balance text-fg">{title}</h1>
        {description ? <p className="mt-1 text-sm text-pretty text-fg-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}
export { PageHeader }
export type { PageHeaderProps }
