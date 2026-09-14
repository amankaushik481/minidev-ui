"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type TocItem = { id: string; title: string; level?: 1 | 2 | 3 }

function Toc({
  items,
  activeId,
  className,
}: {
  items: TocItem[]
  activeId?: string
  className?: string
}) {
  return (
    <nav data-slot="toc" aria-label="Table of contents" className={cn("space-y-1", className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block rounded-md px-2 py-1 text-sm outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
            item.level === 3 && "pl-6",
            item.level === 2 && "pl-4",
            activeId === item.id ? "bg-sunken font-medium text-fg" : "text-fg-muted"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
export { Toc }
