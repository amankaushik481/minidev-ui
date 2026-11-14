"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A navigation trail of links with chevron separators; the last item is the current page.
 *
 * Use at the top of nested pages (Customers › Northwind › INV-2041). Prefer `BackLink` when there
 * is only one level to go back. Follows the WAI-ARIA breadcrumb pattern: a labelled `nav` with an
 * ordered list, separators hidden from screen readers, and `aria-current="page"` on the last item.
 * Long trails wrap; pass `BreadcrumbEllipsis` yourself if you collapse the middle.
 *
 * @example
 * <Breadcrumb items={[{ label: "Customers", href: "/customers" }, { label: "Northwind", href: "/customers/northwind" }, { label: "INV-2041" }]} />
 */
type Crumb = {
  /** Text of the step. */
  label: string
  /** Link target. The last item is always rendered as plain text (the current page). */
  href?: string
}

type BreadcrumbProps = {
  /** Steps from the root to the current page. Omit for sample data. */
  items?: Crumb[]
  className?: string
}

const SAMPLE_ITEMS: Crumb[] = [
  { label: "Lumen", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Northwind", href: "#" },
  { label: "INV-2041" },
]

function Breadcrumb({ items = SAMPLE_ITEMS, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="inline-flex min-w-0 items-center gap-1">
            {i > 0 ? <ChevronRightIcon aria-hidden className="size-3.5 shrink-0 text-fg-subtle" /> : null}
            {i === items.length - 1 ? (
              <span aria-current="page" className="truncate font-medium text-fg">{item.label}</span>
            ) : (
              <a
                href={item.href ?? "#"}
                className="truncate rounded-sm text-fg-muted outline-none transition-[color] duration-[70ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export { Breadcrumb }
export type { BreadcrumbProps, Crumb as BreadcrumbItem }
