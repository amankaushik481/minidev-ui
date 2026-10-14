"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** An indented table of contents for a docs page, with the current section highlighted. */
type TocItem = { id: string; title: string; level?: 1 | 2 | 3 }

type TocProps = {
  /** Headings in page order. Defaults to the Lumen API guide. */
  items?: TocItem[]
  /** The id of the section in view. Without it, clicks track the active entry. */
  activeId?: string
  className?: string
}

const SAMPLE_ITEMS: TocItem[] = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "getting-started", title: "Getting started", level: 1 },
  { id: "install", title: "Install the CLI", level: 2 },
  { id: "authenticate", title: "Authenticate", level: 2 },
  { id: "invoices", title: "Invoices", level: 1 },
  { id: "create-invoice", title: "Create an invoice", level: 2 },
  { id: "line-items", title: "Line items", level: 3 },
  { id: "webhooks", title: "Webhooks", level: 1 },
]

function Toc({ items = SAMPLE_ITEMS, activeId, className }: TocProps) {
  // Uncontrolled: the last clicked entry is active. The sample starts on a section so the demo shows the state.
  const [internal, setInternal] = React.useState<string | undefined>(() => (items === SAMPLE_ITEMS ? "install" : undefined))
  const current = activeId ?? internal
  return (
    <nav data-slot="toc" aria-label="Table of contents" className={cn("w-full max-w-56 space-y-1", className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={current === item.id ? "location" : undefined}
          onClick={() => setInternal(item.id)}
          className={cn(
            "block rounded-md px-2 py-1 text-sm outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
            item.level === 3 && "pl-6",
            item.level === 2 && "pl-4",
            current === item.id ? "bg-sunken font-medium text-fg" : "text-fg-muted"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
export { Toc }
export type { TocProps, TocItem }
