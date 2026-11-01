"use client"
import * as React from "react"
import { SearchInput } from "@/registry/ui/search-input"
import type { Example } from "./types"

const CUSTOMERS = ["Northwind Traders", "Blue Harbor Co.", "Helix Biotech", "Meridian Freight", "Granite Peak Outfitters", "Summit Dental Group"]

function FilterDemo() {
  const [query, setQuery] = React.useState("")
  const hits = CUSTOMERS.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <div className="flex w-72 flex-col gap-2">
      <SearchInput placeholder="Filter customers" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Filter customers" />
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm" aria-live="polite">
        {hits.length ? (
          hits.map((c) => <li key={c} className="px-3 py-2 text-fg">{c}</li>)
        ) : (
          <li className="px-3 py-4 text-center text-xs text-fg-muted">No customers match “{query}”</li>
        )}
      </ul>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "Three heights to match the inputs next to it; the icon and the clear button scale with the field.",
    code: `<SearchInput size="sm" placeholder="Search" aria-label="Search" />
<SearchInput placeholder="Search invoices" aria-label="Search invoices" />
<SearchInput size="lg" placeholder="Search everything" aria-label="Search everything" />`,
    node: (
      <div className="flex w-72 flex-col gap-3">
        <SearchInput size="sm" placeholder="Search" aria-label="Search" />
        <SearchInput placeholder="Search invoices" aria-label="Search invoices" />
        <SearchInput size="lg" placeholder="Search everything" aria-label="Search everything" />
      </div>
    ),
  },
  {
    title: "Filter a list",
    description: "Control the value and filter as you type; the clear button fires onChange with an empty value.",
    code: `const CUSTOMERS = ["Northwind Traders", "Blue Harbor Co.", "Helix Biotech", "Meridian Freight", "Granite Peak Outfitters", "Summit Dental Group"]

function FilterDemo() {
  const [query, setQuery] = React.useState("")
  const hits = CUSTOMERS.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <div className="flex w-72 flex-col gap-2">
      <SearchInput placeholder="Filter customers" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Filter customers" />
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm" aria-live="polite">
        {hits.length ? (
          hits.map((c) => <li key={c} className="px-3 py-2 text-fg">{c}</li>)
        ) : (
          <li className="px-3 py-4 text-center text-xs text-fg-muted">No customers match “{query}”</li>
        )}
      </ul>
    </div>
  )
}`,
    node: <FilterDemo />,
  },
  {
    title: "Default value",
    description: "Uncontrolled with a starting query; the clear button resets it, and onClear is the place to refetch.",
    code: `<SearchInput defaultValue="INV-2041" placeholder="Search invoices" aria-label="Search invoices" />`,
    node: (
      <div className="w-72">
        <SearchInput defaultValue="INV-2041" placeholder="Search invoices" aria-label="Search invoices" />
      </div>
    ),
  },
]
