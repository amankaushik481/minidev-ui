"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

type BreadcrumbProps = {
  items?: Crumb[]
  className?: string
}

const SAMPLE_ITEMS: Crumb[] = [
  { label: "Lumen", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Northwind", href: "#" },
  { label: "INV-2041" },
]

/** A navigation trail of links with chevron separators; the last item is the current page. */
function Breadcrumb({ items = SAMPLE_ITEMS, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <ChevronRightIcon className="size-3.5 text-fg-subtle" /> : null}
          {i === items.length - 1 ? (
            <span aria-current="page" className="font-medium text-fg">{item.label}</span>
          ) : (
            <a href={item.href ?? "#"} className="text-fg-muted transition-[color] duration-[70ms] hover:text-fg">{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
export { Breadcrumb }
export type { BreadcrumbProps, Crumb as BreadcrumbItem }
