"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SectionHeader — a section title with an optional description on the left and actions on the right.
 *
 * Use it to head a settings group, a dashboard panel or a list. It renders an h2 by default; set
 * `level` to keep the document outline correct. For a whole page title use PageHeader.
 *
 * @example
 * <SectionHeader title="Members" description="People with access to this workspace." actions={<Button size="sm">Invite</Button>} />
 * <SectionHeader level={3} title="Danger zone" />
 */
function SectionHeader({
  title,
  description,
  actions,
  level = 2,
  className,
}: {
  title: React.ReactNode
  /** Muted line under the title. */
  description?: React.ReactNode
  /** Buttons or links aligned to the right; they wrap under the title on narrow screens. */
  actions?: React.ReactNode
  /** Heading level of the title: 2 renders h2, 3 renders h3, 4 renders h4. */
  level?: 2 | 3 | 4
  className?: string
}) {
  const Heading = `h${level}` as "h2" | "h3" | "h4"
  return (
    <div data-slot="section-header" className={cn("mb-3 flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        <Heading className="text-lg font-medium tracking-[-0.014em] text-balance text-fg">{title}</Heading>
        {description ? <p className="mt-1 text-sm text-pretty text-fg-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  )
}
export { SectionHeader }
