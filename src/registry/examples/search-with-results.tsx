"use client"
import * as React from "react"
import { SearchWithResults, type SearchResult } from "@/registry/ui/search-with-results"
import type { Example } from "./types"

const CUSTOMERS: SearchResult[] = [
  { id: "northwind", title: "Northwind Traders", subtitle: "12 open invoices · Lisbon" },
  { id: "acme", title: "Acme Industries", subtitle: "3 open invoices · Austin" },
  { id: "blue-harbor", title: "Blue Harbor Co.", subtitle: "No open invoices · Toronto" },
  { id: "helix", title: "Helix Biotech", subtitle: "1 overdue invoice · Berlin" },
]

function PickCustomer() {
  const [picked, setPicked] = React.useState<SearchResult | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <SearchWithResults results={CUSTOMERS} placeholder="Search customers…" onSelect={setPicked} />
      <p className="text-xs text-fg-muted">{picked ? "Opening " + picked.title : "Pick a customer"}</p>
    </div>
  )
}

function ServerSearch() {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  // Stands in for a fetch: only return results once there is a query.
  const results = q ? CUSTOMERS.filter((c) => c.title.toLowerCase().startsWith(q)) : []
  return <SearchWithResults results={results} onSearch={setQuery} placeholder="Customer name…" />
}

export const examples: Example[] = [
  {
    title: "Local filter with onSelect",
    description: "Without onSearch the list filters itself; onSelect turns each result into a button.",
    code: `const CUSTOMERS: SearchResult[] = [
  { id: "northwind", title: "Northwind Traders", subtitle: "12 open invoices · Lisbon" },
  { id: "acme", title: "Acme Industries", subtitle: "3 open invoices · Austin" },
  { id: "blue-harbor", title: "Blue Harbor Co.", subtitle: "No open invoices · Toronto" },
  { id: "helix", title: "Helix Biotech", subtitle: "1 overdue invoice · Berlin" },
]

function PickCustomer() {
  const [picked, setPicked] = React.useState<SearchResult | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <SearchWithResults results={CUSTOMERS} placeholder="Search customers…" onSelect={setPicked} />
      <p className="text-xs text-fg-muted">{picked ? "Opening " + picked.title : "Pick a customer"}</p>
    </div>
  )
}`,
    node: <PickCustomer />,
  },
  {
    title: "Results from your own search",
    description: "With onSearch you own the results; here they match by prefix, as a server might.",
    code: `function ServerSearch() {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  // Stands in for a fetch: only return results once there is a query.
  const results = q ? CUSTOMERS.filter((c) => c.title.toLowerCase().startsWith(q)) : []
  return <SearchWithResults results={results} onSearch={setQuery} placeholder="Customer name…" />
}`,
    node: <ServerSearch />,
  },
]
